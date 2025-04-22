const socket = io();

socket.on('connect', () => {
    console.log('소켓 연결됨!', socket.id);
});