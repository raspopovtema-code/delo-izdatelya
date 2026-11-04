# Дело издателя — спасти Карамзина

Static mobile-first adventure. Serve `dist/`.

## GitHub Pages

The game is a static site: PHP, a database and a build step are not required.
Publish `dist/` using the included `.github/workflows/pages.yml` workflow.
For a new GitHub repository, copy `dist/`, `tests/`, this README and `.github/`
from the current source; omit provider-specific configuration and local files.
Select **Settings → Pages → Source → GitHub Actions** once. Push to `main`
or start **Publish game to GitHub Pages** manually. Further changes to `dist/`
on `main` will publish automatically.

All game assets use relative paths and support a repository URL prefix.
Google Fonts is optional: local system fonts are the fallback. Progress is
stored in the visitor's browser and does not migrate from the old site URL.
The separate PHP upload portal is not part of this deployment.

## Story and scope

The player witnesses a fictional arrest of Karamzin in late 1792, explores six locations, and assembles a defense petition. Karamzin leaves the office after the opening and returns only in the successful fictional ending. The real arrest of Novikov, historical suspicions about Karamzin's journey, and fiction are explicitly distinguished at entry, on document sources, in each outcome and in the mandatory historical epilogue.

Six locations: office, street, bookshop, print shop, salon, monastery. Nine main research records, two chronologically separate late records (Aonides and Makarov), dialogue, three optional side stories (parcel, cat, ribbon), three petition outcomes. No quiz questions embedded.

## Curriculum coverage

`dist/content.js` includes a questions array on each research record. Questions 1–9 and 11–14 occur before the petition. Question 10 is covered in the 1796–1799 epilogue, question 15 in the 1803 epilogue. All main records must be read before submission, and both epilogue records must be read to complete the story. An Aonides correction is retained: Karamzin's quoted preface says he did not change submitted words; the supplied test answer is C/В, not A/А.

## Source and fiction

Facts are taken from the uploaded Zapadov textbook and the user's Lotman-based course excerpts; travel testimony follows Lotman, Sotvorenie Karamzina (1987), p. 81. Fictional conversations and props are identified. The journey record explicitly says it is a reconstructed teaching summary, not an archival document.

## Files

- content.js: locations, source notes, records, petition claims
- game.js: narrative, dialogs, inventory, state, outcomes, epilogues
- scenes.js: additional scene drawings
- world.js: canvas art and navigation
- style.css: mobile/desktop layout

Progress is browser-local, under publisher-rescue-v2; the old prototype's progress remains untouched. No personal information is collected or sent.

## Verification

`node tests/story-check.cjs` verifies all 15 curriculum items are mapped, all required records are reachable, late records cannot enter the 1792 dossier, and checks 182 valid selections plus missing/wrong-evidence cases. Browser walkthrough completed from opening to release, real-history epilogue, both late readings, and final notebook. Cat interaction tested. Mobile layout inspected in a 390px iframe; not on physical hardware.
