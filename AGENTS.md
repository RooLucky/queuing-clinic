# Repository Guidelines

## Project Structure & Module Organization

This is a Next.js 16 App Router application written in TypeScript. Route layouts, pages, and global styles live in `app/`; begin with `app/layout.tsx`, `app/page.tsx`, and `app/globals.css`. Reusable components belong in `components/`, with shadcn/Base UI primitives under `components/ui/`. Shared hooks live in `hooks/`, general helpers in `lib/`, Prisma schema and migrations in `prisma/`, and static files in `public/`. Use the configured `@/` alias for repository-root imports, for example `@/lib/utils`.

## Build, Test, and Development Commands

Use pnpm because `pnpm-lock.yaml` is committed.

- `pnpm install` installs the locked dependency set.
- `pnpm dev` starts the local development server at `http://localhost:3000`.
- `pnpm build` creates a production build and performs Next.js/TypeScript validation.
- `pnpm start` serves the completed production build.
- `pnpm db:migrate -- --name <change>` creates a migration; `pnpm db:studio` opens Prisma Studio.

There are currently no dedicated `lint` or `test` scripts. Run `pnpm build` before submitting changes.

## Coding Style & Naming Conventions

Use strict TypeScript, functional React components, two-space indentation, and double-quoted imports. Follow the formatting already present in the file being edited; generated UI primitives may omit semicolons. Name React components in PascalCase, hooks with a `use-` filename and `useX` export (for example, `hooks/use-mobile.ts`), and utility modules with concise lowercase names. Prefer Tailwind utility classes and the `cn()` helper over bespoke inline styles. Keep route-specific code in `app/` and promote code to `components/` or `lib/` only when it is reusable.

## Testing Guidelines

No test framework or coverage threshold is configured yet. For each change, verify the affected flow with `pnpm dev` and confirm `pnpm build` succeeds. When adding tests, colocate them as `*.test.ts` or `*.test.tsx`, add a documented `pnpm test` script, and cover user-visible behavior rather than implementation details.

## Commit & Pull Request Guidelines

The short history uses concise, imperative summaries such as `Initial Next.js + shadcn setup`; no Conventional Commits scheme is established. Keep commits focused and use a clear subject describing the outcome. Pull requests should include a short rationale, validation commands and results, linked issues when applicable, and screenshots or recordings for visual changes. Call out new dependencies, configuration changes, and follow-up work explicitly.

## Agent-Specific Instructions

Next.js 16 may differ from older framework knowledge. Before changing framework behavior, consult the matching documentation in `node_modules/next/dist/docs/` and heed deprecation notices.
