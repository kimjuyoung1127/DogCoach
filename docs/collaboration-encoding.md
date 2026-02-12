# UTF-8 Collaboration Rule (Windows)

This project enforces UTF-8 + LF for source/docs to prevent Turbopack parse failures such as `invalid utf-8 sequence`.

## Always-on rules
- Never save code/docs in ANSI, EUC-KR, or CP949.
- Keep all text files in UTF-8.
- Keep line endings as LF.
- Before commit, verify changed TS/TSX/MD files are UTF-8.

## Repository enforcement
- `.editorconfig` sets `charset = utf-8` and `end_of_line = lf`.
- `.gitattributes` enforces `working-tree-encoding=UTF-8` for source/docs.
- `.vscode/settings.json` pins VS Code to UTF-8 and disables auto-guess.

## Local setup (Windows Git)
Run once:

```powershell
git config --global core.autocrlf false
git config --global i18n.commitEncoding utf-8
git config --global i18n.logOutputEncoding utf-8
```

## If mojibake appears
1. Reopen file with UTF-8 in editor.
2. Re-save as UTF-8.
3. Re-run build (`npm run build`) before push.

## Required handoff note
Every daily handoff/session log must include one line:
`Encoding check: UTF-8 + LF verified for changed files.`
