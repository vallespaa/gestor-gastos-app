# Known issues

Found by reading the code (not by running the app). Remove an entry when it is fixed.

| Issue | Where | Notes |
|---|---|---|
| `getTransfersByAccount` calls the use case without the repository argument | `shared/context/FinancialContext.js:97` | The use case expects `(repository, accountId)`, so this is almost certainly a bug. |
| Undeclared direct imports | `SettingsScreen.js` | `@expo/vector-icons` and `expo-constants` are used but not in `package.json` (they come in through `expo`). |
| Lint and formatting packages sit in `dependencies` | `package.json` | `eslint-config-expo` appears in both dependency lists. Prettier and the ESLint plugins belong in `devDependencies`. |
| Repositories rewrite a whole array on each change | `app/data/*` | Concurrent writes could race. SQLite is on the roadmap. |
| Test coverage is minimal | `__tests__/` | Only `Transaction`, the transaction repository and the calculator (`shared/utils/calculator.js`) are covered. Add tests alongside each fix or feature. |
