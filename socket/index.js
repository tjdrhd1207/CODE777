import roomSocketHandler from './roomSocketHandler.js';

export default function setupSocket(io) {
    io.on('connection', (socket) => {
        console.log('새 연결: ', socket.id);

        // 핸들러 리스트
        roomSocketHandler(io, socket);
    });
}
