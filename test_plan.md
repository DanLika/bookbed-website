1. **Create/Update Test File:** Create or overwrite `src/components/AnimatedRoutes.test.tsx`.
2. **Implement Tests:**
    - Use `@testing-library/react` and `vitest`.
    - Mock page components (HomePage, NotFoundPage, AboutPage, etc.) to isolate tests.
    - Test that `/` renders `HomePage`.
    - Test that an unknown route renders `NotFoundPage` and shows a suspense fallback spinner initially.
    - Test that navigation changes trigger `window.scrollTo`.
3. **Verify Tests:** Run tests with `npx vitest run src/components/AnimatedRoutes.test.tsx` and run the full suite using `npx vitest run`.
4. **Pre-commit Checks:** Complete pre-commit steps to ensure proper testing, verification, review, and reflection are done.
