  ====    ======   ======   ========  ========  ========   ======== 
 =    =   =    =   =    =   =              =          =         =
 =       =      =  =     =  ========       =        =          =
 =    =   =    =   =    =   =            =        =           =
  ====    ======   ======   ========   =         =          =



CODE777
<span>개발 해야할 부분<span>

<span>각 턴에서 대답을 어떤식으로 할지</span>
<span>카드 나눠지는 효과에서 나눌때마다 카드가 받는 효과</span>
<span>로그인 세션 기능</span>
<span>메모장 그림판 기능</span>
<span>모바일기능 구현</span>

--TODO---
- 계속턴넘기기 하다보면 버그있음
- 누구턴인지 표시하도록
- '더 많이 보이지 않습니다.'를 대신할 버튼이나 가이드를 줘야함
- 정답 실패시 처리
- 멀티일 때 동작 어떻게 처리할지

- - 되돌린 후 섞는 모션 추가해야함
- 멀티 세션관련 백엔드 만들어야함
- 방 개념 만들어야함

2025/03/08
todo: 정답 버튼 눌렀을 때, 현재 숫자선택 버튼들이 나와있고 숫자선택한 다음 다시 변경안됨
숫자 input넣는 필드 재버튼이 불가능한 문제


2025/11/22
- 현재 턴넘기기 했을 때 손이 여러개 생김 (해결)
- 게임 룰관련 전반적인 걸 수정해야될 것 같음 (정답이 대체로 안맞음)

2025/11/23
 - 첫턴 23번 문제가 고정됨
 - rule10번으로 고정해논 상태, 현재 게임 내의 프레이어의 hand가 빈값으로 보여짐


--- 세팅 시 나오는 이슈들---


2026/01/04

- Problem
Uncaught (in promise) TypeError: Failed to fetch dynamically imported module: http://localhost:3000/src/main/mainPage.js

- 해결방법
js import 시 경로 제대로 안맞는거 + import 시 뒤에 .js 를 안붙혀서 생긴 문제


- Problem
로그인 에러: TypeError: Cannot read properties of undefined (reading 'collection')

- 해결방법(아직 미해결)
mongo DB 연결이 아직 안되어있음

-------------------------------------------------------------------------------------------------------------------------------------------------

Code777

Created & Developed by Hansol

© 2026 Gegu. All rights reserved.

This game, including its systems, code, and visual assets, is protected by copyright.
Unauthorized copying, modification, or distribution is prohibited.

제작 및 개발: 게구

© 2026 Hansol.
본 게임의 모든 시스템, 소스코드, 이미지 및 디자인은
저작권법의 보호를 받으며 무단 복제·수정·배포를 금합니다.

------------------------------------------------------------------------------------------------------------------------------------------------

