# Known issues

Found by reading the code (not by running the app). Remove an entry when it is fixed.

| Issue | Where | Notes |
|---|---|---|
| `Transaction.amount` handled as both string and number | Domain entity and forms | Normalise to a number at the form boundary. |
| Repositories rewrite a whole array on each change | `app/data/*` | Concurrent writes could race. SQLite is on the roadmap. |
| Test coverage is minimal | `__tests__/` | Only `Transaction`, the transaction repository and `getTransfersByAccount` are covered. Add tests alongside each fix or feature. |
