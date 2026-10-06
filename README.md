# Wei (James) Chen - Academic Website

A bilingual, responsive academic website for Wei (James) Chen and the NTU behavioral economics lab.

## How it works

This is a static single-page website designed for GitHub Pages:

- `index.html` loads the site shell and metadata.
- `styles.css` contains the visual system and responsive layout.
- `data.js` contains the editable profile, publication, people, teaching, and news content.
- `app.js` renders the pages, hash-based navigation, language switch, and research filters.
- Dark mode is the default; the theme switch stores each visitor's light/dark preference in their browser.
- `cv-wei.pdf` is linked directly from the navigation.

There is no database or server. GitHub Pages serves these files directly. To update content, edit `data.js`, commit the change, and push it to GitHub.

## Local preview

From this folder, run:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Content sources

The initial version was assembled from the August 2026 CV and the connected Notion workspace. Student photos are intentionally not published; the Lab page uses initials instead.

## Acadenda guide

The Apps page links to `acadenda/guide.html` (English) and
`acadenda/guide-zh.html` (Traditional Chinese). These standalone HTML pages
include seven steps, localized screenshots, FAQs, and a fictional sample PDF.
They remain readable without JavaScript; `acadenda/guide.js` adds theme
preferences and preserves the current step when switching languages.

The source script and approved images came from
`/Users/jameschen/Documents/Acadenda/Screenshots/Guide/website/`.
When the app workflow changes, update both guide pages and their corresponding
images together. GitHub Pages deploys the repository root from `main`.

Language can be specified with `?lang=en` or `?lang=zh` (`zh-Hant` also works).
For the main site, place the query before the hash route, for example
`/?lang=zh#/apps`. For the guide, `acadenda/guide.html?lang=zh` redirects to
the Chinese HTML page while preserving query parameters and the current step.
A valid URL language overrides the saved preference. Unknown values fall back
to the main site's saved preference or the guide's existing page language.
Language switches update the query so refreshing retains the selected language.

The guide's `#qr-samples` section offers two prepared schedule examples from
`Acadenda/Acadenda/Docs/Samples`. Their stable direct URLs are:

- `https://jamesweichen.github.io/acadenda/program/Official_Conference_Demo.acadenda`
- `https://jamesweichen.github.io/acadenda/program/Official_Conference_Demo.json`

The QR images encode those complete URLs, not JSON content. Regenerate with
`python scripts/generate-acadenda-qr.py` after installing `qrcode[pil]` if the
URLs change. Keep filenames stable so imported conferences can follow updates.
GitHub Pages serves the raw files; it controls Content-Type by file extension
and does not support repository-defined response headers. The app's link
importer reads the response body as JSON regardless of Content-Type.

Both website schedule samples include `conference.maps` pointing to the two
original fictional PNG diagrams in `acadenda/images/maps/`. They share the
same map URLs and retain their existing schedule IDs and download URLs, so
the existing QR codes still import the updated samples. The source files in
the Acadenda app repository are not changed.

Regenerate the diagrams with `python scripts/generate-acadenda-maps.py`
(Pillow required; the script uses macOS's Arial Unicode font). Each image is
1800 × 1200 pixels and under 100 KB. They are fictional testing illustrations,
not real venue plans or navigation directions.
