# Site to-dos

Tick `[x]` when done, and delete an item once it no longer matters. Nothing here is published: the site serves only `dist/`.

## Now
- [ ] **www and search engines**
  - In Vercel, add `www.dunkstone.com`, redirecting to `dunkstone.com`.
  - At the DNS host, point the `www` CNAME at the value Vercel shows.
  - Verify the domain in Google Search Console and submit `sitemap.xml`.
  - Import the site into Bing Webmaster Tools.

- [ ] **Terms of use**
  - Have a lawyer review `/cargoahoy/terms/`, and add a governing-law clause and the postal address Apple asks for.
  - In App Store Connect, replace Apple's standard EULA with the page's URL.

## When Cargo Ahoy launches
- [ ] **Store links**: fill in `appStoreUrl` and `playStoreUrl` in `dist/games.js`. The badges become links and the "Coming soon" captions go away.
- [ ] **Game structured data**: add the store links and the offer (free) to the JSON-LD in `dist/cargoahoy/index.html`. Add ratings only once they are real.
- [ ] **Android wording**: when Android ships, check support and privacy against the Play Console's Data Safety answers.
- [ ] **Privacy policy**: update it, and its date, whenever the game adds or drops an SDK.
- [ ] **`app-ads.txt`**: add the lines of each new ad network that goes live.
- [ ] **Screenshots**: recapture the three screens whenever the game's look changes.

## To grow
- [ ] **Studio social profiles**: once they exist, add them to the footer and to `sameAs` in the home page's JSON-LD.
- [ ] **Press page** (`/press/`): the studio and the game in a few lines, with logos, icon, screenshots and a contact. Needs a decision first: there's no press-kit download so far.
- [ ] **News or devlog**: short posts that give Google and AI search something to quote.
- [ ] **Visit analytics**: Vercel Web Analytics, which uses no cookies, plus a line about the site in a privacy notice.
- [ ] **Portuguese**: a pt-BR version of the main pages, if a Brazilian audience matters.
