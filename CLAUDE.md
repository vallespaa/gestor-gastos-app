# Gestor de Gastos

Personal expense/income tracker for mobile (Expo 53 / React Native 0.79, plain JavaScript, no TypeScript). The UI is in Spanish. Data lives on-device in AsyncStorage; there is no backend.

## Commands
- `npm start` / `npm run android|ios|web` — dev server (`web` serves on `http://localhost:8081`)
- `npm run check` — **run before declaring any work done**: ESLint (Prettier enforced as an error) + Jest. CI runs the same command.
- `npm test` — Jest only (`jest-expo`, AsyncStorage mocked in `jest.setup.js`; tests live in `__tests__/`)
- `npm run lint` / `npm run lint:fix` — ESLint alone
- No build script. Builds go through EAS (`eas.json`); never run `eas` commands without asking.

## Workflow
- Work on a branch (`feature/…`, `enhancement/…`, `refactor/…`, `chore/…`), commit as you go, and open a PR instead of committing to `master`. Don't push or open PRs without asking.
- For logic in `app/` (entities, use cases, repositories) write or update a Jest test; reproduce a bug with a failing test before fixing it.
- For UI changes, run `npm run web` and check the flow in the browser (Playwright MCP, Firefox). Web is not native: the date picker (`@react-native-community/datetimepicker`), document picker, sharing, file system, gestures and safe areas can differ or not work. State in the PR what was only checked on web and needs a device/beta check.
- Ask before changing the shape of stored data (there are no migrations), adding a dependency, or touching `eas.json`/`app.config.js`.
- When you finish a feature or fix, re-read this file and `docs/ARCHITECTURE.md`; correct anything that became stale or add what a newcomer would trip over. Keep this file short.

## MCP servers (`.mcp.json`)
- `playwright` — drives Firefox to check the web build.
- `context7` — up-to-date docs for React Navigation 7, Reanimated 3, date-fns 4, etc. Use it before relying on memory of a library API.
- `expo` — needs OAuth with an Expo account (`/mcp` to sign in); docs search needs a paid EAS plan, and its screenshot/tap/log tools need SDK 54+ (this app is on 53). Not in the permission allowlist; low value until the SDK upgrade.

## Architecture
Layers: `ui/` → `app/application` (one use case per file) → `app/domain` ← `app/data` (AsyncStorage repositories). Details and a "how to add a feature" checklist: @docs/ARCHITECTURE.md

Non-obvious bits:
- Contexts in `shared/context/` hold module-level repository singletons, pass them into use cases (`createX(repo, data)`), then reload the whole list. Provider nesting order in `App.js` matters.
- Each repository stores one JSON array under one key and rewrites it on every change. There are no migrations, so keep reads of old stored shapes working when changing an entity.
- Form screens pair `useXForm` with `useXFormHeader` hooks.

## Gotchas
- **Excel import/export was removed on purpose** (`xlsx` vulnerability). Don't reinstall `xlsx`. `expo-document-picker`, `expo-sharing` and `expo-file-system` remain in `package.json` but are currently unused.
- Spanish everywhere user-facing, including domain enums (`'INGRESOS'`/`'GASTOS'`). There is no i18n layer; keep new strings in Spanish.
- Use the tokens in `shared/styles/global.js` (`COLORS`, `SPACING`, …) rather than literals.
- `FEEDBACK_EMAIL` comes from `.env` (see `.env.example`) via `app.config.js`.
- Known bugs and inconsistencies are tracked in @docs/KNOWN_ISSUES.md. Check there before "fixing" something odd, and update it when you fix an entry.

## Git
English, short, imperative commit messages, optionally with a Conventional Commits prefix (`fix:`, `chore:`, `docs:`). Update `docs/CHANGELOG.md` for user-visible changes; `docs/ROADMAP.md` holds planned work.
