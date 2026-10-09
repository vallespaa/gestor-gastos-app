# Gestor de Gastos

Personal expense/income tracker for mobile (Expo 53 / React Native 0.79, plain JavaScript, no TypeScript). The UI is in Spanish. Data lives on-device in AsyncStorage; there is no backend.

## Commands
- `npm start` / `npm run android|ios|web` — dev server
- `npm run lint` / `npm run lint:fix` — ESLint with Prettier enforced as an error
- There is no test suite and no build script. Builds go through EAS (`eas.json`), so verify changes by linting and running the app.

## Architecture
Layers: `ui/` → `app/application` (one use case per file) → `app/domain` ← `app/data` (AsyncStorage repositories). Details and a "how to add a feature" checklist: @docs/ARCHITECTURE.md

Non-obvious bits:
- Contexts in `shared/context/` hold module-level repository singletons, pass them into use cases (`createX(repo, data)`), then reload the whole list. Provider nesting order in `App.js` matters.
- Each repository stores one JSON array under one key and rewrites it on every change. There are no migrations, so keep reads of old stored shapes working when changing an entity.
- Form screens pair `useXForm` with `useXFormHeader` hooks.

## Gotchas
- **Excel import/export is disabled on purpose** (`xlsx` vulnerability). `ui/features/settings/utils/{Export,Import}*.js` are orphaned and `SettingsScreen.js` has dead handlers. Don't reinstall `xlsx`.
- Spanish everywhere user-facing, including domain enums (`'INGRESOS'`/`'GASTOS'`). There is no i18n layer; keep new strings in Spanish.
- Use the tokens in `shared/styles/global.js` (`COLORS`, `SPACING`, …) rather than literals.
- `FEEDBACK_EMAIL` comes from `.env` (see `.env.example`) via `app.config.js`.
- Known bugs and inconsistencies are tracked in @docs/KNOWN_ISSUES.md. Check there before "fixing" something odd, and update it when you fix an entry.

## Git
English, short, imperative commit messages, optionally with a Conventional Commits prefix (`fix:`, `chore:`, `docs:`). Branches: `feature/…`, `enhancement/…`, `refactor/…`. Update `docs/CHANGELOG.md` for user-visible changes; `docs/ROADMAP.md` holds planned work.
