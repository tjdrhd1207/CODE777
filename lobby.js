const inputTag = document.querySelector(".input-message");

inputTag.addEventListener("keydown", (e) => {

    // Enter키 누를 시
    if (e.keyCode === 13) {
        console.log(inputTag.value);
        const messages = inputTag.value;
        
        // TO-DO : messages를 전달하는 로직 짜야함

        // input 초기화
        inputTag.value = "";
    }
});