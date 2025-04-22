document.addEventListener('DOMContentLoaded', () => {  
  const ruleModal = document.getElementById('ruleModal');
  const closeModal = document.getElementById('closeModal');
  const matchButton = document.getElementById('matchButton');
  const developModal = document.getElementById('developModal');
  const closeDevelopModal = document.getElementById('closeDevelopModal');
  const showRulesAgain = document.getElementById('showRulesAgain');
 
  closeModal.addEventListener('click', () => {
    ruleModal.classList.remove('show');
  });

  matchButton.addEventListener('click', () => {
    developModal.classList.add('show');
  });

  closeDevelopModal.addEventListener('click', () => {
    developModal.classList.remove('show');
  });

  showRulesAgain.addEventListener('click', () => {
    ruleModal.classList.add('show');
  })

  // const socket = io();

  // let startTime, timer;

  // matchButton.addEventListener('click', () => {
  //   matchButton.disabled = true;
  //   matchingStatus.classList.remove('hidden');
  //   startTime = Date.now();

  //   timer = setInterval(() => {
  //     const elapsed = Math.floor((Date.now() - startTime) / 1000);
  //     const minutes = String(Math.floor(elapsed / 60)).padStart(2, '0');
  //     const seconds = String(elapsed % 60).padStart(2, '0');
  //     stopwatch.textContent = `${minutes}:${seconds}`;
  //   }, 1000);

  //   // 대기열에 등록
  //   socket.emit('startMatch');
  // });

  // 매칭 완료 알림을 받으면 게임 화면으로 이동
  // socket.on('matchFound', () => {
  //   clearInterval(timer);
  //   stopwatch.textContent = '00:00';
  //   matchingStatus.classList.add('hidden');

  //   // 매칭 완료 알림 모달 띄우기
  //   const matchModal = document.createElement('div');
  //   matchModal.classList.add('modal', 'show');
  //   matchModal.setAttribute('id', 'matchModal');
  //   matchModal.innerHTML = `
  //   <div class="match-modal-content">
  //     <h2>매칭 완료</h2>
  //     <p>매칭이 완료되었습니다. 게임 화면으로 이동합니다.</p>
  //   </div>
  // `;
  //   document.body.appendChild(matchModal);

  //   // 3초 후 게임 화면으로 이동
  //   setTimeout(() => {
  //     window.location.href = 'game.html';
  //   }, 3000);
  // });

  // 매칭 취소 버튼 클릭 시
  // cancelMatchButton.addEventListener('click', () => {
  //   clearInterval(timer);
  //   stopwatch.textContent = '00:00';
  //   matchingStatus.classList.add('hidden');
  //   matchButton.disabled = false;
  //   //socket.emit('cancelMatch'); // 매칭 취소 요청
  // });
});
