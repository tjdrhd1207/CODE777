export function ensureOverlay() {
    let overlay = document.getElementById("game-overlay");

    if (overlay) return overlay;

    overlay = document.createElement("div");
    overlay.id = "game-overlay";
    overlay.className = "overlay hidden";

    overlay.innerHTML = `
    <div class="overlay-content">
      <h2 id="overlay-title"></h2>
      <p id="overlay-message"></p>
    </div>
    `;

    document.body.appendChild(overlay);
    return overlay;
}

export function showOverlay(title, message = "") {
    const overlay = ensureOverlay();
    const overlayTitle = overlay.querySelector("#overlay-title");
    overlayTitle.textContent = title;
    overlayTitle.style.color = "red";
    overlayTitle.style.fontSize = "45px";
    overlay.querySelector("#overlay-message").textContent = message;

    overlay.classList.remove("hidden");
}

export function hideOverlay() {
    const overlay = document.getElementById("game-overlay");
    if (!overlay) return;

    overlay.classList.add("hidden");
}