const inputTag = document.querySelector(".input-message");
const textMsgContainer = document.querySelector(".show-messages-container");
const participant = document.querySelector(".particpant");

const userName = "삑냥이";

participant.textContent = "현재 참가자 : " + userName;

inputTag.addEventListener("keydown", (e) => {

    // Enter키 누를 시
    if (e.keyCode === 13) {
        console.log(inputTag.value);
        const messages = inputTag.value;
        
        // TO-DO : messages를 전달하는 로직 짜야함
        const textDiv = document.createElement("div");
        textDiv.textContent = userName + " : " + messages;
        textMsgContainer.appendChild(textDiv); 

        // input 초기화
        inputTag.value = "";
    }
});