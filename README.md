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

2025/11/09
턴변경 관련하여 gameSocketHandler, gamePage, QuestionDeck, Game 파일에서 현재
충돌일어남
완벽한 정리가 필요함

2025/11/16
ISSUE
- 턴넘길 때 턴 표시 모양 안사라짐 
  Answer. 턴갱신 로직변경 해결
  - this.currentTurn = ((this.currentTurn + 1) + this.players.length) % this.players.length;
  - this.previousTurn = ((this.currentTurn - 1) + this.players.length) % this.players.length;

- 대답이 질문에 현재 안맞음
- A는 턴을 넘겼는데, 나머지 플레이어 화면에선느 안바뀌어있음
- npc 턴은 패스해야함
- 11번 문제 이슈
file:///D:/study/CODE777/game/rules/RuleQ2.js:11
                const sum = player.hand.reduce((acc, card) => acc + card.value, 0);
                                        ^

TypeError: Cannot read properties of undefined (reading 'reduce')
    at file:///D:/study/CODE777/game/rules/RuleQ2.js:11:41
    at Array.forEach (<anonymous>)
    at RuleQ2.evaluate (file:///D:/study/CODE777/game/rules/RuleQ2.js:6:17)
    at RuleEngine.evaluate (file:///D:/study/CODE777/game/rules/RuleEngine.js:58:21)
    at Socket.<anonymous> (file:///D:/study/CODE777/socket/gameSocketHandler.js:61:35)
    at Socket.emit (node:events:519:28)
    at Socket.emitUntyped (D:\study\CODE777\node_modules\socket.io\dist\typed-events.js:69:22)
    at D:\study\CODE777\node_modules\socket.io\dist\socket.js:697:39
    at process.processTicksAndRejections (node:internal/process/task_queues:85:11)