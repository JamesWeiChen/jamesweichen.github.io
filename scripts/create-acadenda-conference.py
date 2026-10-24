#!/usr/bin/env python3
"""Create a static agenda page for an existing, validated program JSON. No uploads."""
import argparse
import html
import importlib.util
import json
from pathlib import Path
import re
import tempfile

ROOT = Path(__file__).resolve().parents[1]

def create(slug, program, toolkit, demo=False):
    if not re.fullmatch(r'[a-z0-9]+(?:-[a-z0-9]+)*', slug) or slug == 'assets':
        raise ValueError('slug must use lowercase letters, numbers and hyphens; assets is reserved.')
    program = program.resolve()
    if program.parent != (ROOT / 'acadenda/program').resolve() or not re.fullmatch(r'[A-Za-z0-9_-][A-Za-z0-9._-]*\.json', program.name):
        raise ValueError('JSON must be in acadenda/program, with an ASCII filename ending in .json.')
    spec = importlib.util.spec_from_file_location('publishing', toolkit / 'publishing.py')
    publishing = importlib.util.module_from_spec(spec)
    spec.loader.exec_module(publishing)
    # Use the same validation as the Mac converter; do not create a second schema.
    publishing.validate(publishing.load_json(program))
    import qrcode
    import qrcode.image.svg
    parent = ROOT / 'acadenda/conferences'
    destination = parent / slug
    if destination.exists():
        raise ValueError(f'{destination} already exists. Update its referenced JSON instead.')
    url = 'https://jamesweichen.github.io/acadenda/program/' + program.name
    with tempfile.TemporaryDirectory(prefix='.new-conference-', dir=parent) as directory:
        temporary = Path(directory)
        relative = '../../program/' + program.name
        (temporary / 'publication.json').write_text(json.dumps({'url': url, 'file': relative, 'demo': demo}, ensure_ascii=False, indent=2) + '\n')
        template = (parent / 'assets/page-template.html').read_text()
        (temporary / 'index.html').write_text(template.replace('PROGRAM_PATH', html.escape(relative, quote=True)))
        qrcode.make(url, image_factory=qrcode.image.svg.SvgPathImage, border=4).save(temporary / 'qrcode.svg')
        temporary.rename(destination)
    print(f'Created {destination}')
    print(f'Page: https://jamesweichen.github.io/acadenda/conferences/{slug}/')
    print(f'JSON: {url}')

if __name__ == '__main__':
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--slug', required=True)
    parser.add_argument('--json', required=True, type=Path)
    parser.add_argument('--toolkit', type=Path, default=ROOT.parent / 'Acadenda/ConferencePublishing')
    parser.add_argument('--demo', action='store_true')
    args = parser.parse_args()
    try:
        create(args.slug, args.json, args.toolkit, args.demo)
    except (ValueError, OSError, ImportError) as error:
        parser.exit(1, f'Error: {error}\n')
