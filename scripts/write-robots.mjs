import { writeFile } from "node:fs/promises";

if (process.env.NUXT_STAGING_NOINDEX === "true") {
  await writeFile(
    new URL("../.output/public/robots.txt", import.meta.url),
    "User-agent: *\nDisallow: /\n",
    "utf8",
  );
}
