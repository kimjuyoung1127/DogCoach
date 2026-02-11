# TailLog Deploy Guide

## 1) Frontend 단독 배포 (Vercel, 데모 모드)
현재 Frontend는 `NEXT_PUBLIC_API_URL`이 없으면 DEMO_MODE로 동작하도록 되어 있어, 백엔드 없이도 데모 배포가 가능합니다.

### 절차
1. `kimjuyoung1127/DogCoach`로 푸시
2. Vercel에서 Repository Import
3. Root Directory를 `Frontend`로 지정
4. 환경변수 설정
   - `NEXT_PUBLIC_SUPABASE_URL`
   - `NEXT_PUBLIC_SUPABASE_ANON_KEY`
   - (선택) `NEXT_PUBLIC_SITE_URL` = 배포 도메인
5. Deploy

## 2) Backend 연동 배포 (추후)
Backend 서버 배포 후 Frontend 환경변수에 API URL 추가:

- `NEXT_PUBLIC_API_URL=https://<backend-domain>`

또한 Backend CORS에 Vercel 도메인을 포함해야 합니다:

- `BACKEND_CORS_ORIGINS=https://<vercel-domain>,http://localhost:3000`

## 3) OG 이미지(카카오 썸네일) 운영 규칙

### 이미지 경로/규격
- 파일: `Frontend/public/og/taillog-share.png`
- 권장 규격: `1200x630`
- 권장 포맷: PNG

### 메타데이터 설정 위치
- 공통: `Frontend/src/app/layout.tsx`
- 랜딩 override: `Frontend/src/app/(public)/page.tsx`

두 파일 모두 `openGraph.images` / `twitter.images`에서 `/og/taillog-share.png`를 참조합니다.

## 4) 카카오 캐시 갱신 체크리스트
카카오 링크 썸네일은 캐시가 남아 이전 이미지가 보일 수 있습니다.

1. 배포 URL이 최신인지 확인
2. `og:image`가 200 응답인지 확인
3. 카카오 디버거에서 URL 재수집(스크랩 갱신) 실행
4. 카카오톡으로 재전송해 썸네일 확인

## 5) 모바일 가로 스크롤 회귀 테스트
배포 후 아래 페이지에서 320/360/390/430px 기준으로 좌우 스크롤이 없는지 확인합니다.

- `/`
- `/Survey`
- `/result`
- `/dashboard`
- `/log`
- `/coach`
