import roomSocketHandler from './roomSocketHandler.js';

export default function setupSocket(io) {
    io.on('connection', (socket) => {
        console.log('🔥 새 연결 감지:', socket.id);   // ✅ 연결 로그
        console.log('클라이언트 handshake 정보:', socket.handshake); // ✅ 클라이언트 정보

        // 핸들러 리스트
        roomSocketHandler(io, socket);
    });

    io.on('disconnect', (socket) => {
        console.log('❌ 연결 끊김:', socket.id);
    });
}