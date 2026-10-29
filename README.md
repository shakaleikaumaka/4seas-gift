# 4Seas — The Gift

A dependency-free, trilingual drive through a living memory garden, with the complete classic Gift below it.

## Run locally

Any static server works, for example:

```sh
python3 -m http.server 8080
```

There is no build step, remote font, tracker, CDN, audio, or runtime third-party dependency. `index.html`, `door.css`, and `door.js` are the entire experience.

## Journey and accessibility

- Five stops: Gift, Memory, Circle, Code, and the road ahead.
- Native vertical scrolling and touch swiping move the sticky scene; Back, Next, route markers, and arrow keys provide explicit controls. Tab is never trapped.
- `prefers-reduced-motion` changes the drive to a static linear article with local photographs. The motion button independently pauses decorative animation.
- Without JavaScript, every stop, translation, and photograph remains readable in linear form.
- English, Thai, and Simplified Chinese can be shown together or independently. The preference stays in local storage only.

## Photographs

Responsive WebP derivatives in `assets/drive/` were made from photographs already published in the public Garden Circle history:

- `2026-2026-10-19-dsc1264.webp` — Gift
- `2026-2026-10-19-dsc1230.webp` — Memory
- `2024-devcon-sea-photography-selection-123.webp` — Circle
- `2024-devcon-sea-photography-selection-086.webp` — Code
- `2026-2026-10-19-dsc1235.webp` — Road ahead

The derivatives contain no source metadata. No NOMAD Market performer imagery, child imagery, private Drive URLs, or private proposal material is used. Takedown and correction links remain in the footer.

## Deployment

GitHub Pages serves the `main` branch at `https://4seas.org/`. Preserve `CNAME`, `robots.txt`, `sitemap.xml`, and `404.html` when replacing the experience.
