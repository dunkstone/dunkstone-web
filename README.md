# Dunkstone website v2

The official website of Dunkstone, a two-founder independent mobile game studio. The home page speaks for the studio; each game has its own section at `/<game>/` (the game page, `support/` and `privacy/`). **Cargo Ahoy** is the first. V2 adopts the approved Drop In branding.

## Website contents

- Responsive monochrome homepage with “Small studio. Big play.”
- Approved SVG studio logos, size-appropriate stone icons, and updated sharing artwork.
- Three-second, silent splash with WebM/MP4 sources, a settled-frame fallback, and reduced-motion support.
- A games list on the home page, with Cargo Ahoy as its first entry (approved artwork, the pitch, development status), each entry leading to the game's own section.
- Studio introduction, keyboard navigation, visible focus, and skip-to-content link.
- Complete Cargo Ahoy introduction available without JavaScript.

No build step, backend, dependencies, or third-party runtime libraries are required.

## Preview locally

From this repository, with Python installed:

```sh
python -m http.server 4173 --bind 127.0.0.1 --directory dist
```

Open http://127.0.0.1:4173. Alternatively, serve `dist/` with any static web server.

## Update the website

`dist/index.html` contains page structure, metadata, and the accessible Cargo Ahoy feature. `dist/styles.css` controls presentation; `dist/app.js` handles splash playback and catalogue enhancement.

Add confirmed titles to `window.DUNKSTONE_GAMES` in `dist/games.js`. Supported fields are `title`, `status`, `description`, `artwork`, optional `platforms` (a string array), `appStoreUrl`, and `playStoreUrl`. Artwork paths are relative to the website root. Store links are rendered only for valid HTTPS URLs; omit them until listings are live. Status and platforms remain visible without store links. Missing status defaults to “In development”; missing platforms are omitted.

The renderer reuses the existing HTML feature by title, updates catalogue fields, and preserves its gameplay highlights. Keep the Cargo Ahoy data and HTML fallback in sync. An empty catalogue leaves the HTML introduction intact. Future titles without artwork show text rather than borrowing the studio icon.

## Asset provenance and handling

The original v2 assets below were copied byte-for-byte from these read-only sibling repositories; only Website is edited:

| Website asset (`dist/assets/`) | Approved source |
| --- | --- |
| `dunkstone-logo.svg` | `Branding/logo/vector/full-logo/dunkstone-logo-off-white.svg` |
| `dunkstone-stone.svg` | `Branding/logo/vector/stone/dunkstone-icon-off-white.svg` |
| `dunkstone-stone-small.svg` | `Branding/logo/vector/stone-small/dunkstone-tiny-off-white.svg` |
| `favicon.png`, `favicon-48.png`, `favicon-64.png` | `Branding/logo/png/stone/dunkstone-stone-{32,48,64}-off-white.png` |
| `social.png` | `Branding/press-kit/images/dunkstone-sharing-card-1200x630.png` |
| `dunkstone-splash.mp4`, `dunkstone-splash.webm` | `Branding/splash-animation/dunkstone-splash-dark.mp4`, `.webm` at `1dd26ca`, the silent cut. Branding has since added a sound to its videos (`8427ecf`, `0cc7b7a`); the site plays the splash muted, so it keeps the silent files |
| `dunkstone-splash-static.png` | `Branding/splash-animation/dunkstone-splash-dark-static.png` |
| `cargo-ahoy-icon.png` (512 px), `cargo-ahoy-icon-180.png` | the current approved app icon (the lighter-sky revision, CargoAhoy `33adeefa`), downscaled; the 180 px copy is `CargoAhoy/Assets/_Project/Art/AppIcon/iOS/T_AppIcon_iOS_180.png` |
| `badge-app-store.svg`, `badge-google-play.png` | Apple's black US-UK "Download on the App Store" badge (developer.apple.com/assets/elements/badges/download-on-the-app-store.svg) and Google's English "Get it on Google Play" badge (play.google.com/intl/en_us/badges/static/images/badges/en_badge_web_generic.png), downloaded 2026-11-09, unmodified. Shown unlinked with "Coming soon" / "Coming later" under them until each listing is live; then wrap each in a link to its store page and drop the caption. Keep them the same visible height (Google's at least as large), with a quarter of their height as clear space, and keep the trademark line under the page's links |
| `cargo-ahoy-wordmark.png` (1200 px wide) | `CargoAhoy/ArtSource/References/Logo/wordmark.png` (approved November 5, 2026), downscaled |
| `cargo-ahoy-shot-stack.jpg`, `-voyage.jpg`, `-ships.jpg` (640 px wide) | Captured 2026-11-09 from the main Editor's Device Simulator on "iOS Notch Device Large" (1284 × 2778), so the UI keeps the device's safe area: the storm tower at 62 (each drop aimed along an irregular wave and balance-checked, so it meanders like a played tower), the Map after Kraken Reef's postcard and the Collection's Ships tab (a profile owning five ships with the Red Cutter equipped, voyage at Kraken Reef). All three are whole screens at the same scale. Recapture them, not the Game view's store shots, whenever the game's look changes |
| `icons.svg` | Hand-built sprite of flat UI icons (arrows, plus, mail) on one 24 px grid with a 2 px square-capped stroke in `currentColor`. Every page uses it through `<svg class="icon"><use href="/assets/icons.svg#name"></use></svg>`; no Unicode arrows or emoji stand in for icons |

Cargo Ahoy copy is grounded in its `docs/GDD.md`. The home page's feature stays short: the wordmark and two screenshots in phone frames on a sea-coloured panel, the app icon beside its name, the pitch and a link to `/cargoahoy/`, which carries the details, badges and trademarks. Branding holds no game material, so every Cargo Ahoy asset comes from the CargoAhoy repository.

Use black `#000000` and off-white `#F4F3ED`. Preserve logo proportions, lettering, stone tilt, eyes, and clear space of at least 10% of the artwork’s longest edge. Use the small stone at 32–48 px and the faithful stone at 64 px and above. Never use the studio stone as a game icon. Do not ship the original reference raster or modify the approved motion files. No press-kit download is included.

## Hosting

`.openai/hosting.json` retains the existing Sites project identity and serves `dist`. This v2 update is local only: no deployment, domain changes, commits, or pushes. Absolute social URLs use `https://dunkstone.com/`.

## Validation

```sh
node --check dist/app.js
node --check dist/games.js
```

Check desktop, tablet, and phone widths down to 320 px, asset loading, keyboard navigation, and the Cargo Ahoy feature with JavaScript disabled. Check completed playback, blocked autoplay, missing video, and reduced motion: the settled still must remain visible. Verify status and platform text without store links, no duplicate game feature, and no horizontal overflow.

## Navigation

- The footer is the studio's and identical on every page: the stone home, Games · Studio · Contact, the copyright and Back to top. It never links to one game's pages.
- The header is the stone and "Dunkstone" home, then the page group's nav (the studio's Games / Our studio, or a game's own pages with `aria-current`), then Contact. Each page holds its own copy, so change all five together: `index.html`, `404.html` and the three `cargoahoy/` pages.
- A new game adds its own `/<slug>/` pages with its own header nav, a card in `#games` and an entry in `games.js`, never footer links.
- Support's questions and the policy's sections have ids: link to `/cargoahoy/support/#refunds`, `#restore`, `#delete-data` and so on, or `/cargoahoy/privacy/#rights`. Support opens the linked answer.
- `404.html` is Vercel's page for unknown paths. It speaks for the studio, not any one game, so it links home, to the games and to the studio. Each page names its trailing-slash URL as canonical, since the no-slash form also answers.
- Motion uses the `--ease`, `--fast` and `--slow` tokens, and `--ease-soft` with `--slower` for the bigger moves (the showcase's zoom and lift). Never split a `cubic-bezier()` when editing transitions: an invalid one drops the whole transition. Pages cross-fade (view transitions) under a still header and footer, hover moves apply only where a pointer hovers, and reduced motion turns them all off.

## Asset protection

These deter casual copying; they can't prevent it, since anything a browser shows can be screenshotted or read from dev tools.

- Only web-sized copies ship (screenshots 640 px, the wordmark 1200 px). Masters stay in the CargoAhoy and Branding repositories and never go in `dist/`.
- `protect.js` (on every page) blocks the right-click menu and drag-out on pictures; `styles.css` stops drag-out and iPhone's long-press "Save" on `img` and `video`. Text stays selectable and text links keep their menu. The splash video disallows picture-in-picture and download.
- The footer reads "© 2026 Dunkstone. All rights reserved."; the game page names Dunkstone and Cargo Ahoy as Dunkstone's trademarks.
- `robots.txt` turns away AI-training crawlers and allows everything else, so search and link previews keep working; indexable pages also carry `<meta name="robots" content="noai, noimageai">`. Images stay in image search.
- A new page loads `/protect.js`, carries the same footer and, unless it is noindex, the `noai` meta.

## Cargo Ahoy pages

- `/cargoahoy/`: the game page, the App Store Marketing URL.
- `/cargoahoy/support/`: the App Store Support URL: the contact address and common questions.
- `/cargoahoy/privacy/`: the privacy policy. The game's Settings opens it (`MonetizationSettings.privacyPolicyUrl`). It names every SDK that collects data: the ad partners, Unity IAP and Firebase. Update it, and its date, whenever the game adds or drops an SDK, and keep it in step with the App Store privacy labels in CargoAhoy's `docs/STORE_LISTING.md`.
- Support and privacy answer for both stores. The Android wording (Google account restores, the advertising ID, Google Play refunds, Play Games, Android 13's notification permission) was written ahead of CargoAhoy's M6 (D-144): re-read it against the Play Console's Data Safety answers when Android ships.
- `/app-ads.txt`: the ad networks' authorized sellers. Each network that goes live adds its lines.
