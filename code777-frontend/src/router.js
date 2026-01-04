// front 시작 명령어 npx serve

async function loadPage(url) {
    try {
        console.log(url);
        const res = await fetch(url);
        if (!res.ok) throw new Error('Page not found');
        const html = await res.text();
        document.getElementById('app').innerHTML = html;
    } catch(error) {
        document.getElementById('app').innerHTML = '<h1>Page is Not Found</h1>';
    }
}

const routes = {
    '/': 'public/main.html',
    '/lobby': 'public/lobby.html',
    '/roomList': 'public/roomList.html',
    '/game': 'public/game.html'
};

export async function router() {
  const path = location.hash.replace("#", "") || "/";
  const htmlPath = routes[path];

  if (!htmlPath) {
    document.getElementById("app").innerHTML = "<h1>404</h1>";
    return;
  }

  await loadPage(htmlPath);

  if (path === "/") {
    const module = await import("./main/mainPage.js");
    console.log("모듈");
    console.log(module);
    module.initMainPage();
  }

  if (path === "/roomList") {
    const module = await import("./roomList/roomListPage.js");
    module.initRoomListPage();
  }

  if (path === "/lobby") {
    const module = await import("./lobby/lobbyPage.js");
    module.initLobbyPage();
  }

  if (path === "/game") {
    const module = await import("./game/gamePage.js");
    module.initGamePage();
  }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);