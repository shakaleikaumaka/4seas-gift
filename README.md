# 4Seas — 四海为家 · everywhere is home

A dependency-free, trilingual gift for the whole 4Seas community in Chiang Mai: a gentle six-stop drive home, with a complete quiet reading edition below it.

## Run locally

Any static server works, for example:

```sh
python3 -m http.server 8080
```

There is no build step, remote font, tracker, CDN, audio, or runtime third-party dependency. `index.html`, `door.css`, and `door.js` are the entire experience.

## Journey and accessibility

- Six stops: Home, the House, the Days, the Memory, Your pages (blank frames for the community), and the Gift. A small house waits where the road ends; its windows warm as the drive arrives.
- Native vertical scrolling and touch swiping move the sticky scene; Back, Next, route markers, and arrow keys provide explicit controls. Tab is never trapped.
- `prefers-reduced-motion` changes the drive to a static linear article. The motion button independently pauses decorative animation.
- Without JavaScript, every stop, translation, and illustration remains readable in linear form.
- English, Thai, and Simplified Chinese can be shown together or independently. The preference stays in local storage only.

## Facts and sources

Descriptions of the house (4Seas Nimman, Zuzalu Library, Mountain View, the shared spaces) and of everyday life there are summarized from the community's own home page, https://4seas.xyz/ (read 8 Nov 2026). The season of ETHChiangmai × 4Seas (8 Dec 2025 – 3 Feb 2026) is summarized from the public session list of the Pit, https://4seaspit.com/pit/. Nothing about individual people is stated or invented.

## Blank pages

`#blank-pages` holds six empty frames (`data-todo="…"`, each preceded by a `TODO(community)` comment). Fill them only with words the community sends, and photographs only with the yes of everyone in them (and a guardian's yes for any child).

## Illustrations

No photographs of people are used. Scene and linear illustrations are derivatives of two artworks already published on the 4Seas doors:

- `assets/home/solarpunk-{750,1500}.webp` ← `assets/4seas-solarpunk-banner.jpg`
- `assets/home/lakeside-{800,1600}.webp` ← `assets/eth-chiangmai-lakeside.webp`

Derivatives contain no source metadata. Takedown and correction links remain in the footer.

## Deployment

GitHub Pages serves the `main` branch at `https://4seas.org/`. Preserve `CNAME`, `robots.txt`, `sitemap.xml`, `404.html`, and the `OHANA-OPEN-DOOR-SEAL` block when replacing the experience.
