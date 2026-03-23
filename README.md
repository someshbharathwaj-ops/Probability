# SP//OS

SP//OS is a production-oriented Next.js learning platform for stochastic processes. The repository now uses a feature-first `src` layout, typed server boundaries, local domain state, automated lint/test/build checks, and documentation meant for contributors rather than just the original author.

## Highlights

- Next.js 15 App Router with TypeScript and Tailwind CSS
- Feature-oriented architecture under `src/features`
- Shared config, observability, and route error handling
- Zustand-powered client state with live progress updates
- Unit tests for core learning domain logic
- GitHub Actions CI, Docker build support, and repository standards docs

## Tech Stack

- Next.js
- React
- TypeScript
- Tailwind CSS
- Zustand
- D3
- Framer Motion
- Vitest
- ESLint
- Prettier

## Project Structure

```text
.
|-- docs/
|   |-- architecture.md
|   |-- legacy/
|   `-- project-analysis.md
|-- src/
|   |-- app/
|   |-- features/
|   |   `-- learning/
|   `-- shared/
|-- tests/
|   `-- unit/
|-- .github/workflows/ci.yml
|-- .githooks/pre-commit
|-- Dockerfile
`-- vitest.config.ts
```

## Quick Start

```bash
npm install
npm run prepare:githooks
npm run dev
```

Open `http://localhost:3000`.

## Environment

Copy `.env.example` to `.env.local` and adjust values as needed.

```env
NEXT_PUBLIC_APP_URL=http://localhost:3000
LOG_LEVEL=info
```

## Scripts

- `npm run dev` starts local development.
- `npm run build` creates the production build.
- `npm run lint` runs ESLint with zero-warning tolerance.
- `npm run typecheck` runs TypeScript in no-emit mode.
- `npm run test` runs the unit test suite.
- `npm run test:coverage` generates coverage output.
- `npm run validate` runs lint, typecheck, and tests.
- `npm run format` formats the repository with Prettier.

## Architecture

The learning product lives in [`src/features/learning`](./src/features/learning). Shared cross-cutting concerns live in [`src/shared`](./src/shared). Next.js route handlers stay thin and delegate to feature services plus shared error/response helpers.

For a fuller breakdown, see [`docs/architecture.md`](./docs/architecture.md) and [`docs/project-analysis.md`](./docs/project-analysis.md).

## Quality Gates

- Conventional commits
- Feature branch workflow
- Pre-commit hook
- CI on push and pull request
- Lint, typecheck, test, and production build validation

## Legacy Assets

The original HTML prototypes are preserved in [`docs/legacy`](./docs/legacy) for reference and design provenance. They are intentionally excluded from linting and production runtime paths.

## Roadmap

- Replace the in-memory repository with persistent storage
- Add authenticated learner profiles
- Expand analytics and simulation fidelity
- Introduce end-to-end tests for the App Router flows
