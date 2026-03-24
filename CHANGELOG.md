# Changelog

## [0.2.0] - 2026-03-25

### Added

- Searchable topic navigation, recent activity timeline, and mastery spotlight
  panels
- App error boundary plus `robots.ts` and `sitemap.ts` metadata routes
- Selector and contract unit tests with coverage thresholds

### Changed

- Removed the legacy HTML prototype bundle from the maintained repository
- Tightened progress mutation validation to require explicit topic identifiers
- Improved empty states across topic, problem, and simulation surfaces

## [0.1.0] - 2026-03-24

### Added

- Production-oriented `src` layout and feature-first learning module organization
- Shared config, logging, and route error helpers
- Vitest-based unit test suite
- ESLint, Prettier, Docker, GitHub Actions, and pre-commit tooling
- Contributor and architecture documentation

### Changed

- Moved legacy static HTML prototypes into `docs/legacy`
- Wired client progress UI to update from the learning store in real time
- Refactored API routes to use validation and service layers
