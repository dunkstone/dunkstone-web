# dunkstone-web

The website of Dunkstone, an independent mobile game studio, at [dunkstone.com](https://dunkstone.com/). The home page speaks for the studio. Each game has its own section at `/<game>/`: the game page, `support/` and `privacy/`. Cargo Ahoy is the first.

It's static HTML, CSS and a little JavaScript, with no build step and no dependencies.

## Run it locally

```sh
python3 -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Then open http://127.0.0.1:4173.

## Deploy

Vercel serves `dist/` and deploys every push to `main` in about a minute. There is no `vercel.json`:
- Unknown paths get `404.html`.
- A page also answers without its trailing slash, so every page names its canonical URL.

## Layout

| Path | What it is |
| --- | --- |
| `dist/index.html` | Home: the studio, its games list (`#games`) and the studio section (`#studio`) |
| `dist/<game>/` | A game's page, `support/` and `privacy/` (today `cargoahoy/`) |
| `dist/404.html` | The studio's page for unknown paths |
| `dist/games.js`, `dist/app.js` | The games list's data, and the splash and list behaviour |
| `dist/styles.css` | All styles |
| `dist/protect.js` | Blocks the right-click menu and drag-out on pictures |
| `dist/assets/` | Web-sized images, the splash video and `icons.svg` (the UI icon sprite) |
| `dist/robots.txt`, `sitemap.xml`, `llms.txt`, `app-ads.txt` | Crawlers, search, AI tools and the ad networks' authorized sellers |

## Rules

**Pages**
- The footer is the studio's and the same on every page: Games · Studio · Contact. It never links to one game's pages.
- The header is the stone home, then the page group's nav (the studio's, or the game's), then Contact.
- Each page holds its own copy of the header and footer, so change them on every page together.
- Each page has its own title, description, canonical URL and sharing tags. Indexable pages are listed in `sitemap.xml`, with a `lastmod`.
- Every page loads `/protect.js`. Indexable pages also carry `<meta name="robots" content="noai, noimageai">`.

**Adding a game**
- Add its `/<slug>/` pages with their own header nav.
- Add a card in the home page's `#games` and an entry in `games.js` (`title`, `status`, `description`, `artwork`, `url`, and `appStoreUrl` / `playStoreUrl` once its listings are live: the badges then become links).
- Add its pages to `sitemap.xml` and `llms.txt`, and a `VideoGame` JSON-LD that names the studio as author and publisher.

**Assets**
- Assets come from the approved sources: studio art from `dunkstone/dunkstone-branding`, game art from the game's repository.
- Only web-sized copies ship. Masters never go in `dist/`.
- Pages show WebP copies of large PNGs, made with `cwebp`. Keep the PNG for sharing tags and JSON-LD.
- Store badges are Apple's and Google's official ones, unmodified, with their trademark line on the page.
- Icons come from `icons.svg`, never emoji or Unicode arrows.
- Studio colours are black `#000000` and off-white `#F4F3ED`. Keep the logo's proportions and clear space, and never use the studio stone as a game icon.

**Motion**
- Transitions use the `--ease`, `--fast`, `--slow`, `--ease-soft` and `--slower` tokens. Never split a `cubic-bezier()` across a value list: an invalid one drops the whole transition.
- Hover moves apply only where a pointer hovers. Nothing loops, and reduced motion turns it all off.

**Game pages**
- A game's privacy policy names every SDK that collects data. Update it, and its date, whenever the game adds or drops one.
- Each ad network that goes live adds its lines to `app-ads.txt`.

## Check before pushing

```sh
node --check dist/app.js
node --check dist/games.js
node --check dist/protect.js
```

Then, in a browser:
- Widths from 320 px up have no horizontal scroll.
- Keyboard focus is visible.
- The pages read fine with JavaScript off.
- The console is clean.

The site's open items are in [TODO.md](TODO.md).
