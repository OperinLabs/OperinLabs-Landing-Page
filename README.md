# OperinLabs — AI Voice Agent Landing Page

Built with Vite, React, TypeScript, Tailwind CSS, and Framer Motion.

## To make the "Book a Demo" form actually receive your leads

1. Go to https://formspree.io and create a free account
2. Create a new form — Formspree gives you a URL like `https://formspree.io/f/abc1234`
3. Open `src/components/BookDemoModal.tsx`, find this line near the top:
   `const FORM_ENDPOINT = "https://formspree.io/f/YOUR_FORM_ID";`
4. Replace `YOUR_FORM_ID` with your real Formspree form ID
5. That's the only code change needed — the form is already wired to send there.

## Local development (only needed if you want to preview before deploying)

```bash
npm install
npm run dev
```

## Deploying

See the step-by-step deployment guide provided separately for the full
GitHub + Vercel + GoDaddy domain walkthrough.
