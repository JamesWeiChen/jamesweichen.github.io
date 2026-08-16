# Wei (James) Chen - Academic Website

A bilingual, responsive academic website for Wei (James) Chen and the NTU behavioral economics lab.

## How it works

This is a static single-page website designed for GitHub Pages:

- `index.html` loads the site shell and metadata.
- `styles.css` contains the visual system and responsive layout.
- `data.js` contains the editable profile, publication, people, teaching, and news content.
- `app.js` renders the pages, hash-based navigation, language switch, and research filters.
- `cv-wei.pdf` is linked directly from the navigation.

There is no database or server. GitHub Pages serves these files directly. To update content, edit `data.js`, commit the change, and push it to GitHub.

## Local preview

From this folder, run:

```powershell
python -m http.server 8000
```

Then open `http://localhost:8000/`.

## Content sources

The initial version was assembled from the August 2026 CV and the connected Notion workspace. Student photos are intentionally not published; the people page uses initials instead.
