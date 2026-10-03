# Known issues

Found by reading the code (not by running the app). Remove an entry when it is fixed.

| Issue | Where | Notes |
|---|---|---|
| `getTransfersByAccount` calls the use case without the repository argument | `shared/context/FinancialContext.js:97` | The use case expects `(repository, accountId)`, so this is almost certainly a bug. |
| `app.config.js` references `./assets/icon.png`, which doesn't exist | `app.config.js:9` | Only `adaptive-icon.png`, `splash-icon.png` and `ios-*.png` are in `assets/`. May break prebuild or builds. |
| Version mismatch | `package.json` (1.0.0) vs `app.config.js` (0.6.0) | Pick one source of truth. |
| Excel import/export disabled; dead code remains | `ui/features/settings/SettingsScreen.js`, `ui/features/settings/utils/{Export,Import}*.js` | Intentional (xlsx vulnerability). `handleImport`/`handleExport` reference undefined functions. `ImportFromExcel.js` calls `useCategories()` outside a hook, so it must be reworked before re-enabling. |
| `Transaction.amount` handled as both string and number | Domain entity and forms | Normalise to a number at the form boundary. |
| Undeclared direct imports | `SettingsScreen.js` | `@expo/vector-icons` and `expo-constants` are used but not in `package.json` (they come in through `expo`). |
| Lint and formatting packages sit in `dependencies` | `package.json` | `eslint-config-expo` appears in both dependency lists. Prettier and the ESLint plugins belong in `devDependencies`. |
| Repositories rewrite a whole array on each change | `app/data/*` | Concurrent writes could race. SQLite is on the roadmap. |
| No tests, no CI | — | |
