# Wei (James) Chen - Academic Website

A bilingual, responsive academic website for Wei (James) Chen and the NTU behavioral economics lab.

## How it works

This is a static single-page website designed for GitHub Pages:

- `index.html` loads the site shell and metadata.
- `styles.css` contains the visual system and responsive layout.
- `data.js` contains the editable profile, publication, people, teaching, and news content.
- `app.js` renders the pages, hash-based navigation, language switch, and research filters.
- Language and appearance default to the browser/system preference; visitors can select System, Light or Dark and System, 繁體中文 or English. `site-preferences.js` shares these settings across the main site, guide, and conference pages. Only a primary Traditional Chinese browser locale selects Chinese automatically; all others use English.
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
include only the seven-step PDF import walkthrough, localized screenshots, and a fictional sample PDF. Downloadable schedule and map examples are on the organizer demo page.
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
to the saved preference, then system detection. `?lang=system` explicitly selects automatic language.
Language switches update the query so refreshing retains the selected language.

The organizer demo at `acadenda/conferences/official-demo/` offers two prepared schedule examples from
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
1800 × 1200 pixels and under 100 KB. The map labels are English-only; the `-en.png` URLs ensure browsers and the app
load this version instead of cached bilingual images. The original image URLs
remain available for older imports. They are fictional testing illustrations,
not real venue plans or navigation directions.

## Conference agenda pages

`acadenda/conferences/official-demo/` renders the existing official demo JSON,
including its venue maps, without changing the JSON or its import URL.
Both guide pages link to the agenda. The page provides a canonical JSON link,
a locally generated QR code, and an expandable AI update prompt helper.
The helper re-fetches the JSON when copying; it cannot edit or publish data.

Use `scripts/create-acadenda-conference.py` to create another conference page
from a validated JSON in `acadenda/program/`. Each edition keeps its own fixed
JSON filename and page slug. Shared assets live in `acadenda/conferences/assets/`.
See [the operator instructions](acadenda/conferences/README.md) for setup,
preview, update review, and browser checks. No deployment is performed by the tool.

The main site, Acadenda guide, and conference agenda pages share `site-header.js` and
`site-header.css` for the full navigation bar. Profile names come from `data.js`.
The Acadenda card keeps its App Store download above separate attendee and organizer resources.

## Beamer Notes interactive HTML sample

The Beamer Notes resource panel on the Apps page links to the self-contained
`beamernotes/interactive-demo.html` and provides its remote URL for copying:

- `https://jamesweichen.github.io/beamernotes/interactive-demo.html?lang=en`
- `https://jamesweichen.github.io/beamernotes/interactive-demo.html?lang=zh`

The UTF-8 file includes its own styles, JavaScript, SVG chart, and English /
Traditional Chinese text. It does not request external fonts, libraries, or
assets. The site’s Space Grotesk, Source Serif 4, and Space Mono Latin fonts
are embedded as data URLs with their OFL licenses; Chinese text uses local font
fallbacks. It shares the main site’s palette and saved `jwc-theme` preference,
with a light/dark toggle and an optional `?theme=light`, `dark`, or `system`.
Its 1280 × 720 stage scales uniformly to fit the available viewport
without page scrolling; all content remains in the 16:9 stage. It uses native
range inputs and buttons and leaves Apple Pencil annotations to Beamer Notes.

The example is an illustrative linear market: inverse demand `P = 100 + d − Q`,
inverse supply `P = 20 + c + Q`, and unit tax `t`. The sliders and presets update
quantity, buyer / seller prices, tax revenue, and deadweight loss. The comparison
button overlays the initial market (`d = c = t = 0`); reset restores that market.
The HTML also opens directly from a local file without a server.

## REST 2026 conference companion

`rest-2026/` uses the same layout, search, language/theme preferences, and
Acadenda JSON structure as `tea-2026/`. Public URLs:

- Page: https://jamesweichen.github.io/rest-2026/
- Acadenda import / QR target: https://jamesweichen.github.io/rest-2026/program.json
- Snapshot of the organizer's source PDF: https://jamesweichen.github.io/rest-2026/source-program.pdf

Source: the Rural Economics Society of Taiwan's announcement dated 23 November
2026, for the 6 December meeting at NTU Agricultural Economics. The original
announcement is retained in `conference.sourceURL`.
`source-program.pdf` now preserves the user-supplied four-page 1123V3 PDF.
The supplied book of abstracts is used to populate the JSON but is not published
as a Word download. The current PDF URL is recorded in
`conference.sourcePDFURL`; `conference.organizerSourcePDFURL` retains the original
announcement’s PDF link as a historical source. Program version metadata stays
in the JSON for maintenance; the public page omits version labels.

The program has 18 sessions/activities: three keynotes, a forum and eight parallel
paper sessions (33 research papers), opening remarks, photo, lunch/member meeting,
break, closing, and dinner. There are 38 talk records including the two opening
speakers and three keynotes. Source page numbers and stable IDs are retained.
The PDF identifies the first author as presenter. Presenter affiliations follow
the revised program / presenter lines in the abstract book; explicitly supplied
coauthor affiliations come from the abstract book. Individual paper times,
keynote titles, dinner end time, and venue maps are not supplied by the PDF.
At the page author’s explicit instruction, each forum/parallel paper is assigned
a 20-minute slot in source order. Three-paper sessions use the first 60 minutes
of their 80-minute session. These assigned times are distinguished from the
organizer’s session times in the page source note and each talk’s `timingSource`.
The 1123V3 revision corrects the D2 title to 「臺灣進口啤酒市場需求體系評估」.
All 33 research papers now have verbatim `abstract` strings from the supplied
book, with `abstractSourceNumber` matching its numbered entries.
The PDF takes precedence for discussant titles where the sources differ
(F2: 孔維新 is listed as 副教授 in the revised PDF, 教授 in the abstract book).
Do not invent missing details or silently correct source titles.

Validate with the adjacent Acadenda publishing toolkit:

```sh
../Acadenda/ConferencePublishing/.venv/bin/python ../Acadenda/ConferencePublishing/publishing.py validate rest-2026/program.json
```

The import QR contains the stable JSON URL, not the website URL. Update the same
JSON while preserving IDs and its URL when the organizer publishes revisions.

REST paper records support optional `talks[].abstract` plain-text strings.
The website shows a collapsed, keyboard-accessible 摘要 / Abstract section only
for nonblank string values; absent, null, or blank values show no control.
Abstracts preserve line breaks, render as text (never HTML), and are included in
paper search. No abstract text is inferred from paper titles or the source PDF.
