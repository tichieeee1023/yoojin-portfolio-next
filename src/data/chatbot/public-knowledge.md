# 이유진 포트폴리오 — 공개 지식자료

## 소개

- 이름: 이유진 (Lee Yoojin / YOOJIN)
- 분야: 프론트엔드 개발
- 소개 메시지: 모호한 요구의 본질을 찾아, 사용하기 편한 화면으로 번역합니다.
- 작업 방식: 요구사항과 기획의 맥락을 이해하고 화면 구조·사용자 동선을 정리한 뒤 구현과 검증을 반복합니다.
- 배경: 언어·문학·번역을 통해 맥락을 읽는 경험을 쌓았고, 기획·제작·운영 과정에서 아이디어를 결과물로 구체화하는 일을 경험했습니다.
- 관심 분야: 인터랙티브 UI, React 기반 화면, 상태·데이터 연동, 게임과 서사형 인터페이스, 콘텐츠와 디자인.

## 포트폴리오 구성

- 콘셉트: 성장 과정은 게임처럼, 프로젝트는 매거진처럼.
- INTRO: R → R+ → SR → SR+ → SSR의 다섯 성장 장면. 최종 단계로 건너뛰기와 모바일 전용 인트로.
- ABOUT: 자기소개와 프론트엔드로 이어지는 경험.
- WORK: 개인 3개·팀 3개 대표 프로젝트의 기능·역할·기술.
- TOOLKIT: UI, 데이터·서비스, 인터랙션 기술의 적용 사례.
- PLAY: 개인 게임과 인터랙션 실험 4개.
- CONTACT: 공개 연락처와 문의 폼.
- 구현: Next.js 16 App Router, React 19, TypeScript, GSAP. 기존 화면은 클라이언트 렌더링으로 연결하고 챗봇은 같은 프로젝트의 서버 API에서 OpenAI Responses API를 호출합니다.
- 챗봇: 공개 자료와 이전 대화를 전달하고 답변을 스트리밍합니다. 현재 작품에 맞는 질문과 관련 작품 이동을 제공합니다. 임베딩·벡터 검색은 사용하지 않습니다.
- 연락: 챗봇 자체는 이메일을 발송하지 않습니다. CONTACT 문의 폼이나 공개 이메일을 이용할 수 있습니다.

## WORK — 개인 프로젝트

### 달빛서점 / Moonlight Bookstore

- 분류: COMMERCE EXPERIENCE — 커머스 사용자 경험.
- 소개: 도서를 탐색하고 장바구니에 담아 주문 흐름을 경험하는 온라인 서점.
- 기능: 도서 탐색, 장바구니·찜 상태 공유, 인증, 데모 주문, 관리자 상품 등록과 이미지 업로드.
- 역할: 개인 프로젝트의 화면과 주요 기능 구현.
- 기술: React / Vite, JavaScript, React Router, Zustand, Firebase Authentication / Firestore / Storage, SCSS Modules, canvas-confetti.
- 구현 내용: Zustand로 장바구니·찜 상태를 공유하고 인증·상품 데이터·이미지 업로드를 Firebase 서비스에 연결했습니다.
- 배포: https://moon-light-three.vercel.app/
- 소스: https://github.com/tichieeee1023/moon-light

### 데일리 하비스트 / Daily Harvest

- 분류: UI SYSTEM — UI와 사용자 설정 체계.
- 소개: 차트와 사용자별 화면 설정을 통합한 대시보드.
- 기능: 테마, 화면 밀도, 글자 크기, 모션 감소 설정, 통계 차트, 반응형 화면.
- 역할: 개인 대시보드의 화면과 설정 체계 구현.
- 기술: React / Vite, JavaScript, React Router, Chart.js / react-chartjs-2, localStorage, SCSS, GSAP, react-helmet-async.
- 구현 내용: 설정을 여러 컴포넌트에 적용하고 localStorage에 저장해 브라우저를 다시 열어도 유지합니다.
- 배포: https://daily-harvest-psi.vercel.app/
- 소스: https://github.com/tichieeee1023/Daily_Harvest

### 어린왕자 B612 / The Little Prince B612

- 분류: INTERACTION — 콘텐츠와 인터랙션.
- 소개: 어린왕자 세계관을 탐험하며 메시지를 남기는 방명록형 웹사이트.
- 기능: 이야기 지도와 행성 탐색, Firebase 인증·방명록, 목록 더보기, Canvas 별가루 효과, 화면 전환.
- 역할: 개인 프로젝트의 탐색·방명록·인터랙션 기능 구현.
- 기술: React / Vite, JavaScript, React Router, Zustand, Firebase Authentication / Firestore, Framer Motion, Canvas API, SCSS Modules.
- 구현 내용: 방명록 입력·조회와 화면 흐름을 연결하고 Firestore 커서로 글 목록을 추가 조회합니다.
- 배포: https://the-little-prince-b612.vercel.app/
- 소스: https://github.com/tichieeee1023/TheLittlePrince-B612

## WORK — 팀 프로젝트

### 포로그 / Forlog

- 분류: DATA LOGIC — 상태와 데이터 처리.
- 소개: 취향에 맞는 상품을 탐색하고 장바구니·주문 흐름을 경험하는 쇼핑몰.
- 전체 기능: 상품 탐색, 필터, 취향 테스트, 장바구니, 주문 시뮬레이션.
- 담당: 상품 영역 UI, Products & Cart 로직, 취향 테스트형 추천 기획·구현, 장바구니 CRUD와 상태 처리, 배송 정보 입력과 가상 영수증·주문 흐름.
- 기술: HTML, CSS, Vanilla JavaScript, JSON / Fetch API, localStorage, Swiper.
- 구현 내용: 상품 JSON과 선택 상품·수량·배송 정보를 브라우저 상태로 연결한 주문 시뮬레이션입니다.
- 배포: https://tae0419.github.io/forlog2/Home/index.html
- 소스: https://github.com/TAE0419/forlog2

### 미드나잇 코드 / Midnight Chord

- 분류: MEDIA CONTENT — 미디어 콘텐츠와 화면 연동.
- 소개: 팟캐스트를 탐색하고 재생하는 미디어 서비스.
- 전체 기능: 시리즈·에피소드 탐색, 재생 화면과 콘텐츠 소개.
- 담당: 시리즈·에피소드 JSON 구조, 팟캐스트 페이지, 필터링·페이지네이션, 추천 콘텐츠 전환, 재생 UI 연동, 알림 UI, 대본·페르소나·TTS 음성·BGM 제작.
- 기술: HTML, CSS, JavaScript, JSON, HTML Audio, localStorage. GSAP은 팀 전체 화면 연출에 사용한 기술입니다.
- 구현 내용: 콘텐츠 데이터와 탐색·필터·페이지네이션·재생 화면을 연결했습니다.
- 배포: https://tae0419.github.io/midnightChord/pages/opening/
- 소스: https://github.com/TAE0419/midnightChord

### 자작 / JAJAK

- 분류: SERVICE INTEGRATION — 서비스와 데이터 연동.
- 소개: 전통주 추천·탐색부터 장바구니·주문·마이페이지·관리자 기능으로 이어지는 쇼핑몰.
- 전체 기능: 상품 탐색, AI 추천, 주문 및 관리자 화면. AI 추천은 팀 서비스 기능입니다.
- 담당: Cart / Checkout / Order, MyPage, Admin과 관련 데이터 연동.
- 기술: React / Vite, JavaScript, React Router, Firebase Authentication / Firestore, localStorage, SCSS Modules, Chart.js / react-chartjs-2, GSAP. Firebase Functions / OpenAI API는 팀 공통 서비스 기술입니다.
- 구현 내용: localStorage의 productId·quantity를 Firestore 최신 상품의 가격·재고·판매 상태와 대조하고 주문 정보를 마이페이지·관리자 흐름에 연결합니다.
- 포로그와의 차이: 포로그는 브라우저 저장 기반 주문 시뮬레이션이고, 자작은 React와 Firestore의 공유 데이터·주문 상태를 연결한 서비스입니다.
- 배포: https://jajak-ten.vercel.app/cart
- 소스: https://github.com/jiwoo1012/TeamProject2

### 자작 관리자 페이지 — 독립형 데모

- 관리자 데모: https://jajak-admin-demo.vercel.app/
- 데모 소스: https://github.com/tichieeee1023/jajak-admin-demo
- 목적: 채용 담당자가 실제 관리자 계정 없이 관리자 페이지의 UI와 주요 기능을 직접 체험할 수 있도록 제공합니다. 로그인 없이 이용할 수 있습니다.
- 구성: 대시보드, 상품·주문·회원·리뷰·공지·이벤트·AI 추천 기록 관리.
- 기술: React, Vite, JavaScript, React Router, SCSS Modules, Chart.js, localStorage.
- 데이터: 실제 Firebase 및 운영 데이터베이스와 분리된 Mock 데이터를 사용합니다. 독립 데모는 Firebase에 연결되지 않습니다.
- 체험: 가상 데이터 등록·수정·삭제, 검색·필터링, 주문 상태 변경 및 데이터 초기화를 자유롭게 체험할 수 있습니다.
- 저장: 변경 사항은 방문자의 브라우저 localStorage에만 반영됩니다.
- 보안 설계: 실제 관리자 권한과 인증정보를 공개하지 않고 독립된 시연 환경을 제공합니다.
- 실제 서비스와의 차이: 실제 자작 서비스는 Firebase와 연동되고 독립 데모는 브라우저 내부 Mock 데이터로 동작합니다. 데모의 데이터 변경은 실제 자작 쇼핑몰에 반영되지 않습니다.

## PLAY — 게임과 인터랙션

### LAST ORDER / 라스트 오더

- 형식: 포인트 앤 클릭 방탈출, 짧은 단독 스테이지.
- 배경: 비 오는 밤의 카페에서 단서를 조사하고 마지막 손님의 주문을 완성합니다.
- 기능: 주문 확인, 장면 상호작용, 인벤토리, 진행 조건과 모달, 라테 준비와 우산 전달.
- 기술: React, TypeScript, 퍼즐 로직, 인벤토리·상태 관리.
- 피드백 반영 과정: 첫 주문표를 발견하기 어렵다는 테스트 피드백을 받아 시작 단서와 안내 동선을 재검토했습니다.
- 배포: https://last-order-1008.netlify.app/

### SUBWAY / 사라진 다음 역

- 형식: 선택과 주사위 판정에 따라 분기하는 생존 TRPG.
- 구현: 조사 횟수·아이템·이전 단서를 상태로 관리하고 D20 판정에 따라 선택지·장면을 분기합니다.
- 기술: React, useReducer, D20 판정, 상태 분기.
- 배포: https://subway-trpg.vercel.app/

### NO SIGNAL / 귀환 신호 없음

- 형식: 연구 시설을 탐사하는 서사형 TRPG 데모.
- 구현: 시나리오 데이터와 화면 로직을 분리하고 D100 판정과 동료 행동에 따라 텍스트·시각 효과를 변경합니다.
- 기술: React, TypeScript, D100 판정, Canvas.
- 배포: https://no-signal-1008.netlify.app/

### NEON BREAK / 네온 브레이크

- 형식: 레트로 벽돌깨기.
- 구현: Canvas에서 공·패들·벽돌을 프레임마다 그리고 충돌 판정을 계산합니다. 난이도별 속도·테마와 Web Audio 효과음을 제공합니다.
- 기술: Vanilla JavaScript, Canvas API, Web Audio API, requestAnimationFrame.
- 배포: https://guileless-sopapillas-65ec2b.netlify.app/

## 개발 방식

요구사항과 사용자 동선을 정리하고 구현 결과를 브라우저에서 확인하며 수정합니다. AI 도구는 구현 대안과 코드 수정 검토, 캐릭터·브랜드 이미지 제작에 활용했습니다. 작품마다 활용 방식은 다르며, 기획과 검토·테스트를 통해 결과를 조정합니다.

## 공개 연락처

- 이메일: curencandy001@gmail.com
- GitHub: https://github.com/tichieeee1023
