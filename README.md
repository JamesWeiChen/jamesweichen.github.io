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
