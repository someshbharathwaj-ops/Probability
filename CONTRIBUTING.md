# Contributing

## Workflow

1. Create a branch from `main`.
2. Keep changes focused and atomic.
3. Use conventional commit messages such as `feat:`, `fix:`, `refactor:`, `docs:`, `test:`, and `chore:`.
4. Run `npm run validate` before opening a pull request.

## Setup

```bash
npm install
npm run prepare:githooks
cp .env.example .env.local
```

## Coding Standards

- Prefer feature-local modules over generic utility dumping grounds.
- Keep route handlers thin and move logic into `src/features` or `src/shared`.
- Add tests for domain logic changes.
- Preserve the existing UI language unless the change intentionally redesigns a surface.

## Pull Requests

Every PR should include:

- A concise summary
- Testing notes
- Screenshots for visible UI changes
- Migration notes if behavior or configuration changed
