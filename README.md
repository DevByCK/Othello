# OTHELLO

React 기반 웹 오델로 게임 프로젝트입니다.  
현재는 **로컬 2인(Local 2P)** 모드를 기준으로 구현 중입니다.

## 기술 스택
- React 18
- JavaScript (ES Modules)
- Vite
- CSS3
- Vitest + Testing Library

## 실행 방법
```bash
cd /Users/haru/Documents/appiumTemplate/OTHELLO
npm install
npm run dev
```

- 개발 서버 실행 후 브라우저에서 안내된 주소(기본 `http://localhost:5173`)로 접속합니다.

## 테스트 실행
```bash
npm run test
```

- Watch 모드:
```bash
npm run test:watch
```

## 현재 구현 상태
- 8x8 보드 렌더링
- 초기 돌 배치(중앙 4개)
- 흑 선공 턴 시작
- 유효 수 계산 및 하이라이트
- 셀 클릭 시 돌 배치/뒤집기
- 무효 클릭 안내 메시지
- 새 게임 초기화

## 프로젝트 구조
```text
src/
  app/           # 앱 엔트리/레이아웃
  components/    # UI 컴포넌트
  hooks/         # 커스텀 훅
  logic/         # 게임 규칙 엔진
  state/         # 상태/리듀서/셀렉터
  styles/        # 전역 스타일/토큰
  tests/         # 단위 및 컴포넌트 테스트
  utils/         # 상수/헬퍼
memory-bank/
  game-design-document.md
  implementation-plan.md
  progress.md
```

## 문서/개발 규칙
- 상세 규칙은 `AGENT.md`를 따릅니다.
- 구현 전/후 반드시 아래 문서를 참조/갱신합니다.
  - `memory-bank/game-design-document.md`
  - `memory-bank/implementation-plan.md`
  - `memory-bank/progress.md`

