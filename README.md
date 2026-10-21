# YOOJIN — Frontend Portfolio & AI Guide

> 성장 과정은 게임처럼, 프로젝트는 매거진처럼.

프론트엔드 개발자 이유진의 경험과 작업을 소개하는 인터랙티브 포트폴리오입니다. 5단계 성장 인트로와 매거진 형식의 프로젝트 지면으로 구성했으며, 방문자의 질문에 답하고 관련 작품으로 안내하는 AI 챗봇을 제공합니다.

기존 React/Vite 화면을 Next.js App Router로 이전해 포트폴리오와 챗봇 서버 API를 한 프로젝트에서 관리합니다. 이 저장소는 포트폴리오 웹사이트의 소스이며, 소개된 개별 작품의 소스는 각 작품의 GitHub 링크에서 확인할 수 있습니다.

## 사이트 구성

| 섹션 | 내용 |
| --- | --- |
| INTRO | R → R+ → SR → SR+ → SSR, 5단계 성장 장면과 모바일 전용 커버 |
| ABOUT | 자기소개, 언어·기획 경험에서 프론트엔드로 이어지는 과정 |
| WORK | 개인 3개·팀 3개 프로젝트의 구현 기능, 담당 역할, 사용 기술 |
| TOOLKIT | UI, 데이터·서비스, 인터랙션 기술의 실제 적용 사례 |
| PLAY | 게임과 인터랙션 실험 4개 |
| CONTACT | 공개 연락처와 문의 폼 |

## 대표 프로젝트 — WORK

여섯 영문 카테고리는 각 프로젝트를 선정한 구현 역량을 나타냅니다. 팀 프로젝트에서는 서비스 전체의 기능과 본인의 담당 역할을 구분해 소개합니다.

| 분류 | 프로젝트 | 구분 | 구현·담당 내용 |
| --- | --- | --- | --- |
| COMMERCE EXPERIENCE | 달빛서점 | 개인 | 도서 탐색, 장바구니·찜, 인증·주문 흐름, 관리자 상품 관리 |
| UI SYSTEM | 데일리 하비스트 | 개인 | 테마·밀도·글자 크기·모션 설정, 차트, 사용자 설정 보존 |
| INTERACTION | 어린왕자 B612 | 개인 | 세계관 탐색, Firebase 방명록, Canvas 입자와 화면 전환 |
| DATA LOGIC | 포로그 | 팀 | 상품·필터·취향 테스트, 장바구니와 주문 시뮬레이션 |
| MEDIA CONTENT | 미드나잇 코드 | 팀 | 팟캐스트 데이터·탐색·재생 UI, 대본·TTS·BGM 콘텐츠 |
| SERVICE INTEGRATION | 자작 | 팀 | 장바구니·주문·마이페이지·관리자 화면의 데이터 연동 |

## 게임과 인터랙션 — PLAY

| 작품 | 형식 | 구현 요소 |
| --- | --- | --- |
| LAST ORDER | 포인트 앤 클릭 방탈출 | React, TypeScript, 인벤토리와 진행 조건 |
| SUBWAY | 분기형 생존 TRPG | React, useReducer, D20 판정과 상태 분기 |
| NO SIGNAL | 서사형 탐사 데모 | React, TypeScript, 시나리오 데이터, D100 판정, Canvas |
| NEON BREAK | 레트로 벽돌깨기 | JavaScript, Canvas 충돌 처리, Web Audio API |

작품을 선택하면 설명과 주요 구현 내용을 볼 수 있고, 플레이 버튼으로 개별 배포 사이트에 이동합니다.

## 주요 구현

### 화면과 탐색

- GSAP으로 성장 장면과 스크롤 전환을 구성했습니다. 기존 브라우저 전용 화면은 클라이언트 경계에서 실행합니다.
- WORK는 표지와 개별 프로젝트 지면을 구분하고 프로젝트별 테마를 적용했습니다.
- PC·모바일 메뉴와 챗봇의 작품 이동이 기존 챕터 탐색 흐름을 공유합니다.
- 모바일 전용 인트로, 반응형 레이아웃, 키보드 탐색과 모션 감소 설정을 고려했습니다.

### 포트폴리오 가이드 AI 챗봇

- 같은 프로젝트의 `/api/chat`에서 OpenAI Responses API를 호출합니다.
- 공개 소개와 프로젝트 자료를 바탕으로 담당 역할과 실제 구현 내용을 한국어 2~3문장으로 안내합니다.
- 답변을 스트리밍하고, 중지·연결 실패 시 질문을 복원합니다. 미완성 답변은 다음 대화 이력에서 제외합니다.
- 현재 보고 있는 작품에 맞는 추천 질문을 제공하고, 답변에서 언급된 등록 작품으로 이동하는 버튼을 표시합니다.
- 기존 색상변수와 타이포그래피를 사용합니다. PC에서는 원형 말풍선 버튼이 호버·포커스 시 확장되며 모바일에서는 원형을 유지합니다.
- 공개 문서를 매 요청에 전달하는 방식이며 임베딩·벡터 검색은 사용하지 않습니다.

## 기술 구성

| 영역 | 기술 |
| --- | --- |
| 프레임워크·UI | Next.js 16 App Router, React 19, TypeScript |
| 모션 | GSAP, ScrollTrigger, ScrollToPlugin |
| 스타일 | CSS, CSS Modules, 반응형 미디어 쿼리 |
| 챗봇 | OpenAI SDK, Responses API, gpt-5-mini, react-markdown |
| 검증 | TypeScript, Oxlint, Node.js 테스트 러너 |

## 로컬 실행

Node.js 20.9 이상을 사용합니다.

```bash
npm ci
npm run dev
```

기본 주소는 `http://localhost:3000`입니다. 실제 접속 주소는 실행 터미널에서 확인할 수 있습니다.

```bash
npm run build     # 프로덕션 빌드
npm run start     # 프로덕션 서버 실행
npm run typecheck # TypeScript 검사
npm run lint      # Oxlint 검사
npm run test:chat # 스트림 처리와 작품 이동 대상 테스트
```

챗봇 API를 실행하려면 Next.js 서버 라우트를 지원하는 실행 환경이 필요합니다.

## 프로젝트 구조

```text
public/                         이미지·영상·브랜드·게임 리소스
src/
  app/                          페이지·레이아웃·서버 API
  components/
    YoojinHero/                 성장 인트로
    PortfolioChapters/          ABOUT·TOOLKIT·CONTACT·챕터 탐색
    SelectedWorkMagazine/       WORK 표지·프로젝트 지면
    PlayGallery/                PLAY 갤러리
    PortfolioChatbot/           챗봇 UI·현재 작품 감지
    common/                     공통 메뉴·로고
  data/chatbot/                 공개 답변 자료
  lib/                          챗봇 요청·스트림·작품 이동 로직
scripts/                        챗봇 테스트
```

## 개발 과정과 검증

기획과 구현 검토에 AI 도구를 활용했으며, 요구사항·화면 구성·수정 방향을 정하고 브라우저에서 결과를 확인하는 과정을 반복했습니다. 캐릭터와 브랜드 이미지에도 AI 생성 에셋을 활용했습니다.

프로덕션 빌드·타입 검사와 챗봇 테스트 6건을 확인했습니다. PC·320px 모바일 화면에서 답변 스트리밍, 작품 이동, 중지·오류 복구를 검증했고 실제 OpenAI 응답도 확인했습니다. 기존 애니메이션 훅의 린트 경고 3건은 남아 있습니다. 실제 모바일 기기의 소프트 키보드와 배포 환경은 별도 검증 대상입니다.
