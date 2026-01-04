import { checkLogin } from "./mainAPI.js";
import { bindUIEvents } from "./mainEvent.js";

export function initMainPage() {
    console.log("👌메인 페이지 인입");

    checkLogin();
    bindUIEvents();
}