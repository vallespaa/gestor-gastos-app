---
name: release
description: Prepare a new app version - draft the CHANGELOG from PRs merged since the last tag, bump package.json, open the release PR and, once merged, tag it to start the Release workflow.
disable-model-invocation: true
---

# Release

A release is two passes: prepare a release PR, then tag `master` after the user merges it. Pushing the tag runs `.github/workflows/release.yml`, which checks the code, builds the Android APK on EAS (profile `preview`) and publishes a GitHub release with the CHANGELOG section. Never run `eas` yourself.

## 1. Prepare the release PR

1. Check that `master` is clean and up to date (`git fetch`, `git status`), and that `npm run check` passes.
2. Find the last tag (`git describe --tags --abbrev=0`) and its date (`git log -1 --format=%cI <tag>`).
3. List the PRs merged since then:
   `gh pr list --state merged --base master --search "merged:>=<date>" --json number,title,body`
4. Collect the `Changelog:` lines from each PR description. For a PR without one, draft a line from its title and diff, or leave it out if it isn't user-visible (CI, docs, refactors). Show the list to the user and ask what to change.
5. Propose the next version (patch for fixes only, minor for new features) and ask the user to confirm it.
6. Create `chore/release-vX.Y.Z` from `master`, then:
   - `npm version X.Y.Z --no-git-tag-version` (`app.config.js` reads the version from `package.json`)
   - Append a section at the end of `docs/CHANGELOG.md`, in Spanish, matching the existing ones: `---`, a blank line, `## [X.Y.Z] - YYYY-MM-DD`, then `### Añadido` / `### Cambiado` / `### Corregido` as needed.
   - Remove the released items from `docs/ROADMAP.md`.
7. Show the diff, commit `chore: release vX.Y.Z`, and ask before pushing and opening the PR.

## 2. Tag after the merge

Once the user says the PR is merged:

1. `git switch master && git pull`, and check that `package.json` has the new version.
2. Ask before pushing, then run `git tag -a vX.Y.Z -m "vX.Y.Z"` and `git push origin vX.Y.Z`.
3. Give the user the Actions run link (`gh run list --workflow release.yml --limit 1`). The workflow fails early if the tag doesn't match `package.json` or the CHANGELOG has no section for the version.
