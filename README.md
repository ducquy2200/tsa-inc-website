# TSA Inc. Static Website

Static, multipage marketing site for Traffic Survey Analysis Inc.

## Stack

- Next.js (App Router, static export)
- TypeScript (strict)
- Tailwind CSS
- Framer Motion
- Radix UI primitives
- MDX content files under `content/pages`

## Development

```bash
npm install
npm run dev
```

## Build Static Output

```bash
npm run build
```

Static files are emitted to `out/`.

## Content Source of Truth

- Each route is defined by one MDX file in `content/pages`.
- Frontmatter is validated with Zod (`lib/schema.ts`).
- Loader: `lib/content.ts`.

## Checks

```bash
npm run lint
npm run typecheck
npm run check:content
npm run test:e2e
```

## Contact Form Endpoint

Set an external endpoint for form submission:

```bash
NEXT_PUBLIC_CONTACT_ENDPOINT=https://example-form-endpoint
```

The repo has no backend/API routes.

## Important

`legacy/` is ignored and not part of this implementation.
