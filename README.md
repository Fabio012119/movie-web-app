This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://nextjs.org/docs/app/api-reference/cli/create-next-app).

## Getting Started

First, run the development server:

```bash
npm install
# Then
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

To run tests:

```bash
npm run test
# or in watch mode
npm run test:watch
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.

# MovieWebApp

## Architectural decisions

- Used simple colors, mostly black and blue
- Styled using Tailwind CSS v4
- In order to make the horizontal rows more UX friendly Swiper was used (https://www.npmjs.com/package/swiper).
  It is a light package that comes with prebuilt functionality so this helped a lot do skip complex logic.
- `tailwind-merge` was used to clean up some large classNames and make the code better looking
- Unit & integration testing with Jest, Testing Library
- TMDP movies api was used (https://developer.themoviedb.org/docs/getting-started)
