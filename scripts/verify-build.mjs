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
const locales = ["it", "en", "fr", "de", "es"];
const spanish = JSON.parse(
  await readFile("src/data/translations.es.json", "utf8"),
);
const translations = JSON.parse(
  await readFile("src/data/translations.json", "utf8"),
);
for (const values of Object.values(translations))
  assert.ok(
    values.length === 3 &&
      values.every((value) => typeof value === "string" && value.trim()),
  );
const basePaths = { ...paths };
assert.deepEqual(Object.keys(spanish).sort(), Object.keys(translations).sort());
assert.ok(
  Object.values(spanish).every(
    (value) => typeof value === "string" && value.trim(),
  ),
);
for (const locale of locales.slice(1))
  for (const [route, file] of Object.entries(basePaths)) {
    paths[`/${locale}${route === "/" ? "" : route}`] =
      route === "/" ? locale : `${locale}/${file}`;
  }
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
const photographs = new Set();
for (const [route, html] of Object.entries(pages)) {
  const locale = route.match(/^\/(en|fr|de|es)(?:\/|$)/)?.[1] ?? "it";
  assert.doesNotMatch(
    html,
    /trattoria storica|historic trattoria|trattoria historique|traditionsreiche trattoria/i,
    `${route}: no unsupported historic claim`,
  );
  assert.doesNotMatch(
    html,
    /\bpizz[ae]\b/i,
    `${route}: obsolete offering removed`,
  );
  assert.doesNotMatch(
    html,
    /home\.[a-f0-9]+\.webp|home\.webp/,
    `${route}: old food photo removed`,
  );
  assert.equal(
    (html.match(/<h1(?:\s|>)/g) ?? []).length,
    1,
    `${route}: exactly one h1`,
  );
  assert.ok(
    html.includes(`<html lang="${locale}"`),
    `${route}: correct document language`,
  );
  for (const language of locales)
    assert.ok(
      html.includes(`hrefLang="${language}"`) ||
        html.includes(`hreflang="${language}"`),
      `${route}: language alternate ${language}`,
    );
  assert.match(
    html,
    /rel="icon"[^>]+href="\/icon/,
    `${route}: original logo icon`,
  );
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
    target.pathname = target.pathname.replace(/\/$/, "") || "/";
    assert.ok(pages[target.pathname], `${route}: route ${target.pathname}`);
    if (target.hash)
      assert.ok(
        pages[target.pathname].includes(`id="${target.hash.slice(1)}"`),
        `${route}: anchor ${href}`,
      );
    links++;
  }
  for (const [tag] of html.matchAll(/<img\b[^>]*>/g)) {
    assert.ok("alt" in attributes(tag), `${route}: image alt`);
    const image = new URL(attributes(tag).src, "https://richardus.it");
    const asset = image.searchParams.get("url") ?? image.pathname;
    if (!asset.includes("logo")) {
      assert.ok(
        !photographs.has(`${locale}:${asset}`),
        `${route}: each photograph has one placement`,
      );
      photographs.add(`${locale}:${asset}`);
    }
  }
}
assert.equal(
  photographs.size,
  7 * locales.length,
  "Seven supplied food and room photographs, used once each",
);
assert.doesNotMatch(pages["/menu"], /\d+ proposte|Informazioni sui prodotti/);
assert.match(pages["/"], /Trattoria/);
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
for (const [index, locale] of locales.slice(1).entries()) {
  const html = pages[`/${locale}/menu`];
  const schema = json(html).find((item) => item["@type"] === "Menu");
  assert.equal(schema.inLanguage, locale);
  assert.equal(schema.url, `https://richardus.it/${locale}/menu`);
  const items = schema.hasMenuSection.flatMap((section) => section.hasMenuItem);
  assert.equal(items.length, visible.length);
  assert.equal((html.match(/<article\b/g) ?? []).length, visible.length);
  for (const dish of visible) {
    const name =
      locale === "es"
        ? (spanish[dish.nome] ?? dish.nome)
        : (translations[dish.nome]?.[index] ?? dish.nome);
    assert.ok(
      items.some((item) => item.name === name),
      `${locale}: translated dish ${name}`,
    );
    assert.ok(
      html.includes(name.replaceAll("&", "&amp;").replaceAll("’", "’")),
      `${locale}: dish in initial HTML ${name}`,
    );
  }
}
assert.match(
  await readFile(`${directory}/robots.txt.body`, "utf8"),
  /Sitemap: https:\/\/richardus.it\/sitemap.xml/,
);
const sitemap = await readFile(`${directory}/sitemap.xml.body`, "utf8");
assert.equal((sitemap.match(/<loc>/g) ?? []).length, 3 * locales.length);
assert.ok(!sitemap.includes("policy"));
const image = await readFile(`${directory}/opengraph-image.body`);
assert.equal(
  image.subarray(1, 4).toString(),
  "PNG",
  "Social image renders to PNG",
);
const icon = await readFile(`${directory}/icon.body`);
assert.equal(
  icon.subarray(1, 4).toString(),
  "PNG",
  "Original logo renders as tab icon",
);
console.log(
  `Verified ${Object.keys(pages).length} routes, ${links} internal links, ${visible.length} dishes, canonical/metadata, JSON-LD, consent, sitemap, robots and social image.`,
);
