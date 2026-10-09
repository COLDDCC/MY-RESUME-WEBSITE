# COLDDCC — Portfolio

An accessible, multilingual, scroll-snap portfolio website. Top category navigation and bottom language switcher remain fixed on screen.

## Run

```bash
npm install
npm run dev
npm run build
```

## V1 design
- Desktop: 60/40 screenshot/text split, one project per viewport, native CSS Scroll Snap.
- Mobile: stacked image and description with natural scrolling.
- Categories: All, Productivity, Personal Interests, Content & Growth.
- Persistent language bar: 简体中文 / 繁體中文 / 日本語 / English.
- Project detail URLs: `/projects/<slug>/`.
- Accessible keyboard navigation, skip link, reduced motion support.

## Important before publishing
1. Replace screenshot placeholders with your own optimized assets (set `image` in `src/data.js`).
2. Audit project descriptions and repository URLs.
3. Replace placeholder contact email in `src/main.js`.
4. For production SEO, pre-render language and project detail routes and generate a sitemap. The current V1 is client-rendered, so direct internal link discovery works in modern crawlers but server HTML is not yet prerendered.
5. Configure deployment host to rewrite SPA URLs to `index.html` for direct detail-page access.

Project labels and descriptions are editable in `src/data.js`.
