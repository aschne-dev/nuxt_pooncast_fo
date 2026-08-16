export default defineEventHandler((event) => {
  const config = useRuntimeConfig(event).public;

  if (config.stagingNoIndex === true) {
    setHeader(event, "x-robots-tag", "noindex, nofollow");
  }
});
