import test from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const analyticsSource = await readFile(new URL('../plugins/analytics.client.js', import.meta.url), 'utf8');
const firebaseSource = await readFile(new URL('../plugins/firebase.js', import.meta.url), 'utf8');

function harness(consent, supported = true) {
  const apps = [];
  const calls = { firebase: 0, load: 0, analytics: 0, reload: 0 };
  const nuxt = {};
  let onChange;
  const config = { public: { firebaseProjectId: 'test-staging' } };
  const sdk = {
    isSupported: async () => supported,
    initializeAnalytics(app) {
      assert.ok(app, 'Analytics must receive the initialized Firebase app');
      assert.equal(app, apps[0]);
      calls.analytics++;
      return { app };
    },
  };
  const analytics = new Function('defineNuxtPlugin', 'useNuxtApp', 'useRuntimeConfig', 'useCookieControl', 'watch', 'window', 'loadAnalytics',
    analyticsSource.replace('export default', 'return').replace('import("firebase/analytics")', 'loadAnalytics()'))(
    x => x, () => nuxt, () => config, () => ({ cookiesEnabledIds: { value: consent } }),
    (_source, callback) => { onChange = callback; },
    { location: { reload() { calls.reload++; } } },
    async () => { calls.load++; return sdk; },
  );
  const firebase = new Function('defineNuxtPlugin', 'useRuntimeConfig', 'getApp', 'getApps', 'initializeApp',
    firebaseSource.replace(/^import .*?;\s*/s, '').replace('export default', 'return'))(
    x => x, () => config, () => apps[0], () => apps,
    () => { calls.firebase++; const app = { name: '[DEFAULT]' }; apps.push(app); return app; },
  );
  async function boot() {
    // Nuxt uses this named dependency even when analytics sorts first by filename.
    assert.equal(firebase.name, 'firebase');
    assert.ok(analytics.dependsOn.includes(firebase.name));
    for (const plugin of [firebase, analytics]) {
      const result = await plugin.setup(nuxt);
      for (const [key, value] of Object.entries(result?.provide || {})) nuxt['$' + key] = value;
    }
  }
  return { calls, nuxt, boot, change: (current, previous) => onChange(current, previous) };
}

test('absence or refusal of consent does not load Analytics', async () => {
  for (const consent of [undefined, [], ['necessary']]) {
    const h = harness(consent);
    await h.boot();
    assert.deepEqual(h.calls, { firebase: 1, load: 0, analytics: 0, reload: 0 });
    assert.equal(h.nuxt.$analytics, null);
  }
});

test('persisted consent initializes Firebase before Analytics, once per app boot', async () => {
  const h = harness(['necessary', 'analytics']);
  await h.boot();
  assert.deepEqual(h.calls, { firebase: 1, load: 1, analytics: 1, reload: 0 });
  assert.equal(h.nuxt.$analytics.app, h.nuxt.$firebaseApp);
});

test('unsupported browser does not initialize Analytics', async () => {
  const h = harness(['analytics'], false);
  await h.boot();
  assert.equal(h.calls.analytics, 0);
  assert.equal(h.nuxt.$analytics, null);
});

test('only an Analytics consent transition reloads the app', async () => {
  const h = harness([]);
  await h.boot();
  h.change(['necessary'], []);
  assert.equal(h.calls.reload, 0);
  h.change(['necessary', 'analytics'], ['necessary']);
  assert.equal(h.calls.reload, 1);
  h.change(['analytics', 'necessary'], ['necessary', 'analytics']);
  assert.equal(h.calls.reload, 1);
  h.change(['necessary'], ['analytics', 'necessary']);
  assert.equal(h.calls.reload, 2);
});
