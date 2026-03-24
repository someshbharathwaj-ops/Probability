# Project Analysis

## Detected Stack

- Language: TypeScript
- Framework: Next.js App Router
- UI: React, Tailwind CSS, Framer Motion, D3, KaTeX
- State: Zustand

## Initial Issues Found

- Top-level repository mixed runtime code, generated artifacts, and legacy HTML prototypes
- Missing production-grade repository files such as CI, docs, Docker support, formatter, and lint config
- API handlers depended directly on a generic in-memory store without request validation or shared error handling
- Learning progress UI accepted interactions but did not keep the learner profile in sync for live feedback
- No automated tests or coverage structure

## Refactoring Direction

- Move app code under `src`
- Organize domain logic around `src/features/learning`
- Introduce shared config, observability, and error layers
- Remove stale prototype artifacts once the new app becomes the maintained path
- Add quality gates and onboarding documentation
