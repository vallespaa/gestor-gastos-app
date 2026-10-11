# Architecture

Clean-architecture layout in plain JavaScript.

```
ui/ (screens, components, hooks)
 └─ shared/context/ (React Context providers)
     └─ app/application/ (use cases)
         ├─ app/domain/entities, repositories (abstract)
         └─ app/data/ (AsyncStorage implementations)
```

## Directory map
- `App.js`, `index.js` — entry; providers nest `FinancialProvider` → `AccountsProvider` → `CategoriesProvider` → `NavigationContainer`.
- `app/domain/entities/` — `Account`, `Adjustment`, `Category`, `Transaction`, `Transfer` (classes with `isValid()`, and `isIncome()`/`isExpense()` on transactions).
- `app/domain/repositories/` — abstract classes that throw "not implemented".
- `app/data/<entity>/` — `*AsyncStorageRepository.js`; accounts and categories also have `Default*`/`Static*` seed data.
- `app/application/` — `createX`, `getAllX`, `updateX`, `deleteX`, one per file. Transfers are grouped in `TransferUseCases.js`.
- `shared/context/` — `FinancialContext` (transactions, transfers, adjustments, balances), `AccountsContext`, `CategoriesContext`.
- `shared/styles/global.js` — design tokens. `shared/constants/constants.js` — category icons (Ionicons) and color palette.
- `ui/navigation/` — `RootNavigator` (native stack) containing `DrawerNavigator` (initial route `Mes`, settings at the bottom).
- `ui/features/<feature>/` — screens plus their own `components/`, `hooks/`, `utils/`.
- `ui/components/`, `ui/hooks/` — shared UI pieces.

## Data flow of a mutation
1. A screen calls a context function, e.g. `addTransaction(data)`.
2. The context calls the use case with its repository singleton: `createTransaction(repo, data)`.
3. The use case builds the entity, validates it with `isValid()`, then calls the repository.
4. The repository reads the JSON array from its AsyncStorage key, modifies it and writes it back.
5. The context reloads the full list and updates state.

Storage keys are one per entity, such as `'transactions'`, `'transfers'` and `'categories'`.

## Adding an entity or feature
1. Entity in `app/domain/entities/` and abstract repository in `app/domain/repositories/`.
2. AsyncStorage repository in `app/data/<entity>/`.
3. One use case per operation in `app/application/`.
4. Expose it through the matching context, or a new one added in `App.js`.
5. Screen under `ui/features/<feature>/` with `useXForm` and `useXFormHeader` hooks, then register it in `RootNavigator`.
6. Style with the tokens in `shared/styles/global.js`; user-facing strings in Spanish.
7. Run `npm run lint:fix`, and add a line to `docs/CHANGELOG.md`.
