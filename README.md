# Sasi’s portfolio

A single-page React, TypeScript, Vite, and Tailwind CSS site with a cursor-controlled portrait and sections for Work, Experiments, About, and Contact.

## Run locally

Use Node.js 22.12+ and npm. In this directory, run:

```sh
npm ci
npm run dev
```

To check types, make the production build, and preview it:

```sh
npm run build
npm run preview
```

## Portrait

`public/assets/character-turn-web.mp4` and `public/assets/character-poster.webp` are the supplied web assets. The video stays paused and seeks through a single left-to-right turn. Touch devices, reduced-motion users, and failed media loads use the still. The full-resolution source is preserved in the supplied asset pack outside the web project.

## Update your content

Edit the Work articles in `src/Portfolio.tsx` with real project titles, summaries, and case-study links as they become available. Replace the Contact placeholder with your preferred contact method. The Experiments section already points to the working portrait study. Nav labels live in `src/App.tsx`, and colors and layouts live in `src/styles.css`.

## Deploy to Vercel

Import this directory as a Vercel project and select the Vite preset. Use `npm ci` to install, `npm run build` to build, and `dist` as the output directory. If the site sits inside a larger repository, set the Vercel root directory to this project folder. The navigation uses same-page anchors and needs no route rewrites.
