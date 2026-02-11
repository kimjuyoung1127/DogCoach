UTF-8 / Encoding Guideline (TailLog, Windows)
목적: Windows 환경에서 발생하는 깨진 한글(모지바케)과 invalid utf-8 sequence 빌드 실패를 예방한다.
항상 지킬 규칙
• 모든 코드/문서는 UTF-8로 저장한다.
• ANSI, EUC-KR, CP949 저장 금지.
• 줄바꿈은 LF 사용.
• 커밋 전 변경된 TS/TSX/MD 파일 인코딩을 확인한다.
저장소 강제 설정
• .editorconfig: charset = utf-8, end_of_line = lf
• .gitattributes: source/doc 파일에 working-tree-encoding=UTF-8
• .vscode/settings.json: files.encoding=utf8, files.autoGuessEncoding=false
Windows Git 1회 설정
git config --global core.autocrlf false
git config --global i18n.commitEncoding utf-8
git config --global i18n.logOutputEncoding utf-8
이상 징후 대응
1. 에디터에서 파일 인코딩을 UTF-8로 다시 열기
2. UTF-8로 다시 저장
3. npm run build 재검증 후 커밋
로그/핸드오프 필수 문구
• Encoding check: UTF-8 + LF verified for changed files.