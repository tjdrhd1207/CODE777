export function showAnswerField() {
    const input = document.querySelector(".answer-container");
    input.classList.add("answer-container-show");
    let boxFlag = [false, false, false];

    const answerNumberCellArray = Array.from(input.childNodes).filter((ele) => {
        return ((ele.nodeType === ele.ELEMENT_NODE) && ele.classList.contains('answer-number-cell'));
    });

    answerNumberCellArray.forEach((answerNumberCell, index) => {
        answerNumberCell.addEventListener("click", function (e) {
            e.stopPropagation();
            boxFlag[index] = !boxFlag[index];
            const answerButtonContainer = e.target.querySelector(".answer-button-container");

            showAndHideNumber(answerButtonContainer, boxFlag, index);
        });

        const answerNumberElements = answerNumberCell.querySelectorAll(".answer-number");
        const answerResult = answerNumberCell.querySelector(".answer-result");
        answerNumberElements.forEach((answerNumber) => {
            answerNumber.addEventListener("click", function (e) {
                e.stopPropagation();

                answerResult.innerText = e.target.innerText;
                boxFlag[index] = !boxFlag[index];

                showAndHideNumber(e.target.parentNode, boxFlag, index);
            });
        })
    })
}

export function showAnswerNumberField(params, callback) {
    console.log(params.target);
    const answerContainer = params.target.querySelector(".answer-button-container");
    const oneToSevenBox = Array.from(answerContainer.childNodes).filter((ele) => ele.nodeType === ele.ELEMENT_NODE);
    console.log(params.open);
    if (params.open) {
        oneToSevenBox.forEach((box) => {
            box.classList.add('answer-container-show');
            box.removeEventListener("click", box._clickHandler);

            box._clickHandler = function (e) { // 이벤트 리스너를 변수에 저장하여 관리
                const selectedNumber = e.target.innerText.trim();

                if (callback) {
                    callback(selectedNumber);
                }
            };

            box.addEventListener("click", box._clickHandler);
        })
    } else {
        oneToSevenBox.forEach((box) => {
            box.classList.remove('answer-container-show');
            box.removeEventListener("click", box._clickHandler);
        });
    }
}