# 형근 비서실 (PWA)

형근님 전용 멀티 비서실 웹앱 — 회의실 · 작업실 · 비서현황 · 메모.
서버·빌드 없이 `index.html` 하나로 동작하고, 홈 화면에 추가하면 앱처럼 열립니다.

## 바로 열기

- 실행 주소: <https://gudrms1134-lgtm.github.io/secretary-office/>
- 휴대폰(갤럭시 크롬/삼성 인터넷): 위 주소 접속 → 우측 상단 메뉴 → **홈 화면에 추가(앱 설치)**

## 구성

| 파일 | 설명 |
|---|---|
| `index.html` | 앱 본체 (외부 라이브러리 없음, 대화·작업·메모는 브라우저 localStorage에만 저장) |
| `manifest.webmanifest` | PWA 설정 — 이름 `형근 비서실`, 전체화면(standalone), 테마·배경색 `#FAF6EE` |
| `sw.js` | 서비스 워커 — 네트워크 우선 + 오프라인 캐시 폴백 |
| `icon-192.png`, `icon-512.png` | 홈 화면 아이콘 (딥네이비 + 황금 왕관, any maskable) |
| `.nojekyll` | GitHub Pages Jekyll 처리 생략 |

## 배포 구조

- GitHub Pages는 **`gh-pages` 브랜치 루트**를 서빙합니다 (자동 활성화됨, https 강제).
- `main`이 작업 원본 브랜치입니다. 파일을 고친 뒤에는 두 브랜치를 함께 올려 주세요.

```bash
git push origin main
git push origin main:gh-pages   # 배포 반영
```
