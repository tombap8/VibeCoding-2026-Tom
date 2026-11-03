# 한미그룹 채용 React 프로젝트

Vite와 React(JavaScript/JSX)로 구성한 한미그룹 채용 페이지입니다. 원본 사이트의 CSS, JSON 데이터, 이미지 및 Canvas 애니메이션 자산을 사용합니다.

## 개발 환경

- Node.js 20.19 이상 또는 22.12 이상
- npm

## 실행

```powershell
npm install
npm run dev
```

개발 서버는 기본적으로 `http://127.0.0.1:5173`에서 실행됩니다.

## 배포 빌드

```powershell
npm run build
npm run preview
```

배포 파일은 `dist/`에 생성됩니다. `npm run preview`로 빌드 산출물을 로컬에서 확인할 수 있습니다.

## 구조

- `src/App.jsx`: 애플리케이션 조립
- `src/components/`: 헤더, 푸터, 페이지 섹션 및 브라우저 동작 컴포넌트
- `css/`: 원본 디자인 CSS
- `public/images/`, `public/data/`: 이미지 및 JSON 데이터
- `public/hanmi-eye-tracking/`, `public/hanmi-reading-eye-tracking/`: Canvas 프레임, 메타데이터, 플레이어
- `dist/`: Vite 배포 산출물

Canvas 플레이어는 브라우저 Canvas 2D API를 그대로 사용하며 React 컴포넌트가 마운트된 뒤 초기화됩니다. 별도 Canvas 렌더링 패키지는 필요하지 않습니다.
