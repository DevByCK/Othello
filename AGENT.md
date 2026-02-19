# OTHELLO 개발 규칙 (AGENT.md)

## 중요
- 코드를 작성하기 전, 반드시 아래 memory-bank 파일들을 순서대로 읽습니다.
  1. `memory-bank/game-design-document.md` (게임 기획서)
  2. `memory-bank/implementation-plan.md` (구현 계획서)
  3. `memory-bank/progress.md` (현재 진행 상황)
- 주요 기능 개발이나 마일스톤 완료 후, 아래 파일을 업데이트합니다.
  - `memory-bank/progress.md` (진행 상황)
- 각 단계(Milestone) 완료 시, 단계별 테스트를 반드시 **2회** 실행하고 결과를 보고합니다.
- 단계별 테스트 결과 보고 후, 사용자가 직접 검증하기 전까지 다음 단계를 진행하지 않습니다.

## 0) 참조 문서 우선순위
- 본 규칙을 적용할 때는 반드시 `game-design-document.md`를 1차 기준으로 참조합니다.
- 구현 중 규칙 충돌 또는 해석 차이가 있으면 `game-design-document.md`를 우선 적용하고, 필요 시 두 문서를 함께 동기화합니다.

## 1) 목적
- 본 문서는 오델로 웹 게임을 **HTML, CSS, JavaScript + React 컴포넌트**로 구현할 때의 표준 개발 규칙을 정의합니다.
- 목표는 빠른 구현보다 **유지보수성, 테스트 용이성, 확장성(AI/온라인 모드)** 을 우선하는 것입니다.

## 2) 필수 기술 스택
- **UI 프레임워크**: React 18 (함수형 컴포넌트 + Hooks)
- **언어**: JavaScript (ES2022+)
- **마크업/스타일**: HTML5, CSS3
- **번들/개발 서버**: Vite
- **패키지 매니저**: npm
- **테스트(권장)**: Vitest + React Testing Library

## 3) 표준 디렉터리 구조
```text
othello/
  public/
    favicon.svg
  src/
    app/
      App.jsx
      routes.js
    components/
      board/
        Board.jsx
        Cell.jsx
        Board.css
      game/
        ScoreBoard.jsx
        TurnIndicator.jsx
        GameControls.jsx
      common/
        Button.jsx
        Modal.jsx
    hooks/
      useOthelloGame.js
    logic/
      gameEngine.js
      moveValidator.js
      flipper.js
      scorer.js
    state/
      initialState.js
      reducers.js
      selectors.js
    styles/
      tokens.css
      global.css
    utils/
      constants.js
      helpers.js
    tests/
      logic/
      components/
    main.jsx
  index.html
  package.json
```

## 4) 아키텍처 규칙
- **게임 규칙 로직(`src/logic`)과 UI(`src/components`)를 분리**합니다.
- 컴포넌트는 화면 렌더링과 이벤트 전달에 집중하고, 규칙 판정은 엔진 모듈에서 수행합니다.
- 상태 변경은 직접 mutation하지 않고, reducer/action 또는 명확한 상태 업데이트 함수로만 처리합니다.
- `props drilling`이 2단계를 초과하면 `custom hook` 또는 `Context` 도입을 검토합니다.
- 파일 하나의 책임은 하나로 제한합니다(SRP).

## 5) React 컴포넌트 규칙
- 함수형 컴포넌트만 사용합니다.
- 컴포넌트명은 PascalCase, 훅은 `use` 접두사(camelCase)를 사용합니다.
- 한 컴포넌트 파일은 200줄 이내를 권장하고, 초과 시 하위 컴포넌트로 분리합니다.
- 컴포넌트 내부에서 게임 규칙을 직접 계산하지 않습니다. (`logic` 또는 `selectors` 사용)
- 렌더 성능이 필요한 경우에만 `useMemo`, `useCallback`, `memo`를 사용합니다(과도한 최적화 금지).

## 6) 상태 관리 규칙
- 단일 게임 상태 소스는 `useReducer` + selector 패턴을 기본으로 합니다.
- 최소 상태만 저장하고(정규화), 파생 데이터(유효 수 목록, 점수)는 selector에서 계산합니다.
- 상태 모델 기본 형식:
  - `board`: 8x8 배열 (`empty | black | white`)
  - `currentPlayer`: `black | white`
  - `validMoves`: 좌표 배열
  - `passCount`: 숫자(0~2)
  - `status`: `playing | finished`
  - `result`: `black_win | white_win | draw | null`

## 7) 스타일(CSS) 규칙
- 전역 토큰(`src/styles/tokens.css`)에 색상/간격/폰트 변수를 정의합니다.
- 컴포넌트 단위 스타일 파일을 사용하고, 클래스명은 BEM 또는 컴포넌트 스코프 규칙을 일관 적용합니다.
- 인라인 스타일은 동적 계산이 꼭 필요한 경우만 허용합니다.
- 반응형 기준:
  - 모바일 우선(Mobile First)
  - 최소 360px ~ 데스크톱 1440px 범위에서 레이아웃 깨짐 없이 동작

## 8) 게임 로직 규칙
- `moveValidator`는 유효 수 여부만 판단합니다.
- `flipper`는 뒤집을 좌표 계산만 담당합니다.
- `gameEngine`은 턴 진행/패스/종료 조건을 통합 처리합니다.
- 모든 로직 함수는 가능하면 순수 함수로 작성합니다(입력→출력 명확화).
- 랜덤/시간 의존 코드는 엔진 핵심 로직에서 분리합니다.

## 9) 품질 게이트
- PR/머지 전 최소 조건:
  - `npm run lint` 통과
  - `npm run test` 통과
  - 핵심 규칙 테스트(뒤집기, 패스, 종료, 무승부) 포함
- UI 변경 시 스크린샷 또는 짧은 동작 설명을 PR에 첨부합니다.
- 버그 수정 시 재현 조건과 수정 후 검증 시나리오를 기록합니다.

## 10) 유지보수 규칙
- 신규 기능은 `요구사항 → 상태 설계 → 로직 → UI` 순서로 구현합니다.
- `logic` 변경 시 반드시 대응 테스트를 함께 수정/추가합니다.
- 매직 넘버 사용 금지(예: `8`, `64`는 `constants.js`에 정의).
- 하드코딩 문자열은 상수화하고, 사용자 메시지는 한곳에서 관리합니다.
- 문서 동기화 원칙: 게임 규칙 변경 시 `game-design-document.md`와 함께 업데이트합니다.

## 11) 확장성 가이드
- AI 모드는 `players/ai` 모듈을 추가해 현재 엔진 인터페이스를 재사용합니다.
- 온라인 대전은 네트워크 계층(`services/socket`)을 별도 분리해 UI/엔진 침범을 방지합니다.
- Undo/Replay 기능을 대비해 액션 히스토리 저장 구조를 고려합니다.
