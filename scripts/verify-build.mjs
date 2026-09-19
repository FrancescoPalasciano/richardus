import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";

const directory = ".next/server/app";
const source = JSON.parse(await readFile("src/data/menu.json", "utf8"));
const paths = {
  "/": "index",
  "/menu": "menu",
  "/chi-siamo": "chi-siamo",
  "/privacy-policy": "privacy-policy",
  "/cookie-policy": "cookie-policy",
};
const pages = Object.fromEntries(
  await Promise.all(
    Object.entries(paths).map(async ([route, file]) => [
      route,
      await readFile(`${directory}/${file}.html`, "utf8"),
    ]),
  ),
);
const decode = (value) =>
  value
    .replaceAll("&amp;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#x27;", "'");
const attributes = (tag) =>
  Object.fromEntries(
    [...tag.matchAll(/([\w:-]+)="([^"]*)"/g)].map(([, name, value]) => [
      name,
      decode(value),
    ]),
  );
const json = (html) =>
  [
    ...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/gs),
  ].map(([, value]) => JSON.parse(value));
let links = 0;
for (const [route, html] of Object.entries(pages)) {
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) ?? []).length,
    1,
    `${route}: exactly one h1`,
  );
  assert.match(html, /<html lang="it"/, `${route}: Italian document`);
  const meta = Object.fromEntries(
    [...html.matchAll(/<meta[^>]*>/g)].map(([tag]) => {
      const attr = attributes(tag);
      return [attr.name ?? attr.property, attr.content];
    }),
  );
  assert.ok(meta.description?.length > 30, `${route}: description`);
  const canonical = [...html.matchAll(/<link[^>]*>/g)]
    .map(([tag]) => attributes(tag))
    .find((attr) => attr.rel === "canonical");
  assert.equal(
    new URL(canonical?.href).href,
    `https://richardus.it${route === "/" ? "/" : route}`,
    `${route}: canonical`,
  );
  assert.ok(
    meta["og:image"]?.startsWith("https://richardus.it/"),
    `${route}: social image`,
  );
  assert.equal(
    meta["twitter:card"],
    "summary_large_image",
    `${route}: Twitter card`,
  );
  if (route.endsWith("policy"))
    assert.match(meta.robots, /noindex/, `${route}: legal drafts stay noindex`);
  else assert.ok(!meta.robots?.includes("noindex"), `${route}: indexable`);
  const restaurant = json(html).find((item) => item["@type"] === "Restaurant");
  assert.equal(restaurant.telephone, "+393290090918");
  assert.equal(restaurant.hasMenu, "https://richardus.it/menu");
  assert.equal(restaurant.address.streetAddress, "Via San Giovanni 15");
  assert.equal(restaurant.openingHoursSpecification.length, 2);
  for (const [tag] of html.matchAll(/<a\b[^>]*>/g)) {
    const { href } = attributes(tag);
    assert.ok(href && href !== "#", `${route}: meaningful href`);
    if (!href.startsWith("/") && !href.startsWith("#")) continue;
    const target = new URL(href, `https://richardus.it${route}`);
    assert.ok(pages[target.pathname], `${route}: route ${target.pathname}`);
    if (target.hash)
      assert.ok(
        pages[target.pathname].includes(`id="${target.hash.slice(1)}"`),
        `${route}: anchor ${href}`,
      );
    links++;
  }
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g))
    assert.ok("alt" in attributes(tag), `${route}: image alt`);
}
const menu = json(pages["/menu"]).find((item) => item["@type"] === "Menu");
const visible = Object.values(source.prodotti).filter((dish) => dish.visibile);
assert.equal(
  menu.hasMenuSection.flatMap((section) => section.hasMenuItem).length,
  visible.length,
  "All visible products are in Menu structured data",
);
assert.equal(
  (pages["/menu"].match(/<article\b/g) ?? []).length,
  visible.length,
  "Every product is present in initial HTML, before hydration",
);
for (const section of menu.hasMenuSection) {
  const category = Object.entries(source.categorie).find(
    ([, item]) => item.nome === section.name,
  );
  assert.ok(category);
  for (const dish of section.hasMenuItem) {
    const original = visible.find(
      (item) =>
        item.nome.toLocaleLowerCase("it-IT") ===
        dish.name.toLocaleLowerCase("it-IT"),
    );
    assert.ok(original, `Real dish: ${dish.name}`);
    assert.equal(original.categoria, category[0]);
    assert.equal(dish.description ?? "", original.descrizione);
    if (!original.prezzoSuRichiesta)
      assert.equal(dish.offers.price ?? dish.offers.lowPrice, original.prezzo);
  }
}
assert.ok(
  !pages["/"].includes("<iframe"),
  "Google Maps makes no request before consent",
);
assert.match(
  await readFile(`${directory}/robots.txt.body`, "utf8"),
  /Sitemap: https:\/\/richardus.it\/sitemap.xml/,
);
const sitemap = await readFile(`${directory}/sitemap.xml.body`, "utf8");
assert.equal((sitemap.match(/<loc>/g) ?? []).length, 3);
assert.ok(!sitemap.includes("policy"));
const image = await readFile(`${directory}/opengraph-image.body`);
assert.equal(
  image.subarray(1, 4).toString(),
  "PNG",
  "Social image renders to PNG",
);
console.log(
  `Verified ${Object.keys(pages).length} routes, ${links} internal links, ${visible.length} dishes, canonical/metadata, JSON-LD, consent, sitemap, robots and social image.`,
);
