# Architecture

## Overview

The repository uses a feature-first structure for product logic and a shared layer for cross-cutting concerns.

## Layers

- `src/app`: Next.js App Router entrypoints and route handlers
- `src/features/learning`: learning feature UI, content, domain logic, store, and server services
- `src/shared`: environment config, logging, route helpers, reusable utilities, and providers
- `tests/unit`: domain-level tests

## Request Flow

1. A route handler receives an HTTP request in `src/app/api`.
2. The handler validates input through feature contracts.
3. The handler delegates to the learning service.
4. The service reads or mutates repository state.
5. Shared route helpers serialize success or typed errors.

## Frontend Flow

1. `src/app/page.tsx` renders the learning dashboard.
2. The dashboard composes the feature app shell and content catalog.
3. Zustand persists learner interactions locally.
4. Progress domain functions update the learner profile so the overview and recommendations remain live.

## Cleanup Direction

The repository no longer carries the old standalone HTML prototypes. The runtime
surface, architecture docs, and contributor guidance now describe the Next.js
application as the single maintained product entrypoint.
