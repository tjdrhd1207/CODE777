import { io } from "socket.io-client";

const socket = io('http://localhost:3030'); //서버주소 (배포 시 수정)

export default socket;