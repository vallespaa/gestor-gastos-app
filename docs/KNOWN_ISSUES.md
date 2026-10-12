# Known issues

Found by reading the code (not by running the app). Remove an entry when it is fixed.

| Issue | Where | Notes |
|---|---|---|
| Repositories rewrite a whole array on each change | `app/data/*` | Concurrent writes could race. SQLite is on the roadmap. |
| Test coverage is minimal | `__tests__/` | Only `Transaction`, the transaction repository, the calculator (`shared/utils/calculator.js`), `Transfer` with its use cases and `getTransfersByAccount` are covered. Add tests alongside each fix or feature. |
