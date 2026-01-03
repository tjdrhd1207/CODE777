export function getSubmittedAnswer() {
    const submittedAnswer = document.querySelectorAll(".answer-result");

    const submittedArray = [];
    submittedAnswer.forEach((ele) => {
        submittedArray.push(ele.innerText);
    });

    return submittedArray;
}