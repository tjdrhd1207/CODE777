export default function openAnswerModal() {
    return new Promise((resolve, reject) => {
        let selected = [];

        // 모달 overlay 영역
        const overlay = document.createElement("div");
        overlay.style.position = "fixed";
        overlay.style.inset = "0";
        overlay.style.background = "#069710ff";
        overlay.style.display = "flex";
        overlay.style.alignItems = "center";
        overlay.style.justifyContent = "center";
        overlay.style.zIndex = "9999";

        // 모달 영역
        const modal = document.createElement("div");
        modal.style.background = "#fff";
        modal.style.padding = "24px";
        modal.style.borderRadius = "12px";
        modal.style.width = "320px";
        modal.style.textAlign = "center";        

        const title = document.createElement("h3");
        title.innerText = "숫자 3개 선택";

        const selectedView = document.createElement("div");
        selectedView.style.margin = "10px 0";
        selectedView.innerText = "선택";

        function updateSelectedView() {
            selectedView.innerText = `선택 : ${selected.join(', ')}`;
        }

        // 숫자 버튼 영역
        const grid = document.createElement("div");
        grid.style.display = "grid";
        grid.style.gridTemplateColumns = "repeat(3, 1fr)";
        grid.style.gap = "10px";
        grid.style.margin = "16px 0";

        for (let i=1; i<=7; i++) {
            const btn = document.createElement("button");
            btn.innerText = i;
            btn.classList.add("answerSelectBtn");

            btn.addEventListener("click", () => {
                if (selected.length >= 3) return;
                selected.push(i);
                updateSelectedView();
            });

            grid.appendChild(btn);
        }

        // 버튼 영역
        const submitBtn = document.createElement("button");
        submitBtn.innerText = "제출";
        submitBtn.style.marginRight = "8px";

        const backBtn = document.createElement("button");
        backBtn.innerText = "뒤로가기";
        backBtn.style.marginRight = "8px";

        const cancelBtn = document.createElement("button");
        cancelBtn.innerText = "취소";


        submitBtn.addEventListener("click", () => {
            if (selected.length !== 3) {
                alert("숫자 3개를 선택하세요");
                return;
            }
            document.body.removeChild(overlay);
            resolve(selected);
        });

        backBtn.addEventListener("click", () => {
            if (selected.length === 0) return;

            selected.pop();
            updateSelectedView();
        })

        cancelBtn.addEventListener("click", () => {
            document.body.removeChild(overlay);
            reject("cancel");
        });

        modal.appendChild(title);
        modal.appendChild(grid);
        modal.appendChild(selectedView);
        modal.appendChild(submitBtn);
        modal.appendChild(backBtn);
        modal.appendChild(cancelBtn);
        overlay.appendChild(modal);
        document.body.appendChild(overlay);
    });
}