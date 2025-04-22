const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

// 정적 파일 경로 설정
app.use(express.static(path.join(__dirname, 'public')));

// 기본 라우터
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// 소켓 연결 처리
io.on('connection', (socket) => {
  console.log('🚀 사용자 연결됨:', socket.id);

  // 매칭 시작 요청을 받으면 대기열에 추가
  socket.on('startMatch', () => {
    waitingPlayers.push(socket.id);
    console.log(`${socket.id} 대기열에 추가됨`);
    
    // 대기열에 2명이 되면 매칭 완료 처리
    if (waitingPlayers.length >= 2) {
      // 첫 번째, 두 번째 사용자에게 매칭 완료 알림
      const player1 = waitingPlayers.shift();  // 첫 번째 플레이어
      const player2 = waitingPlayers.shift();  // 두 번째 플레이어

      io.to(player1).emit('matchFound');  // 첫 번째 플레이어에게 매칭 알림
      io.to(player2).emit('matchFound');  // 두 번째 플레이어에게 매칭 알림

      console.log(`매칭 완료: ${player1} vs ${player2}`);
    }
  });

  // 매칭 취소 요청을 받으면 대기열에서 제거
  socket.on('cancelMatch', () => {
    const index = waitingPlayers.indexOf(socket.id);
    if (index !== -1) {
      waitingPlayers.splice(index, 1);  // 대기열에서 제거
      console.log(`${socket.id} 대기열에서 제거됨`);
    }
  });

  socket.on('disconnect', () => {
    console.log('❌ 사용자 연결 종료:', socket.id);

    // 연결 끊긴 사용자는 대기열에서 제거
    const index = waitingPlayers.indexOf(socket.id);
    if (index !== -1) {
      waitingPlayers.splice(index, 1);
      console.log(`${socket.id} 대기열에서 제거됨`);
    }
  });
});

// 서버 실행
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`✅ 서버가 http://localhost:${PORT} 에서 실행 중`);
});
