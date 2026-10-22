# Toggle Concepts — landings

Static site for **concepts.toggle.studio**, deployed on Vercel from this repository.

| URL | File |
|---|---|
| concepts.toggle.studio/main | `main/index.html` |
| concepts.toggle.studio/agency | `agency/index.html` |
| concepts.toggle.studio/brand | `brand/index.html` |
| concepts.toggle.studio/ | redirects to `/main` (see `vercel.json`) |

Shared code: `assets/app.css`, `assets/app.js`. Media: `media/`.

## Where to change things
Everything lives in `assets/app.js`:
- `PAGES` — texts and block order for `main`, `agencies`, `brands`.
- `PLANS`, `CONCEPTS` — plans and prices.
- `KCFG` — KITE demo: layouts, hooks in 5 languages, scenes, formats.
- `LOGOS`, `MEDIA_DEF` — client logos, reel and demo videos.
- `FORM_ENDPOINT` — Formspree form that receives requests from all three landings.

Page title, description and link preview for each landing are in that landing's `index.html`.

## Deploy
Vercel project → Settings → Git → connected to this repo. Framework preset: **Other**, no build command, output directory: root.
Every push to `main` updates the live site; other branches get preview links.

## Run locally
`npx serve .` (or any static server) in this folder, then open http://localhost:3000/main
