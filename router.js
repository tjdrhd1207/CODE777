async function loadPage(url) {
    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Page not found');
        const html = await res.text();
        document.getElementById('app').innerHTML = html;
    } catch(error) {
        document.getElementById('app').innerHTML = '<h1>Page is Not Found</h1>';
    }
}

const routes = {
    '/': 'pages/main.html',
    '/lobby': '/pages/lobby.html',
    '/roomList': '/pages/roomList.html',
    '/game': 'pages/game.html'
};

async function router() {
    const path = location.hash.replace('#', '') || '/';
    const htmlPath = routes[path];
    console.log(htmlPath);
    if (htmlPath) {
        await loadPage(htmlPath);

        // 페이지별 JS 초기화 호출
        if (path === '/') {
            const module = await import('./scripts/main.js');
            module.initMainPage();
        } else if (path === '/lobby') {
            const module = await import('./scripts/lobby.js');
            module.initLobbyPage();
        } else if (path === '/roomList') {
            const module = await import('./scripts/roomList.js');
            module.initRoomListPage();
        } else if (path === '/game') {
            const module = await import('./scripts/gamePage.js');
            module.initGamePage();
        }
    } else {
        document.getElementById('app').innerHTML = '<h1>404 Page is not Found</h1>';
    }
}

window.addEventListener('hashchange', router);
window.addEventListener('load', router);