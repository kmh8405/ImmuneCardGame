// 초기 변수 선언
const roleModal = document.getElementById("roleModal");
const attackBtn = document.getElementById("attackBtn");
const defenseBtn = document.getElementById("defenseBtn");
const readyButton = document.getElementById("readyButton");
const playerRoleText = document.getElementById("playerRoleText");
const dropZone = document.getElementById("dropZone");
const playerList = document.getElementById("playerList");
const resultModal = document.getElementById("resultModal");
const resultText = document.getElementById("resultText");
const restartButton = document.getElementById("restartButton");

let myRole = null;
let gamePhase = "init";
let selectedCard = null;

let myCards = [];
let opponentCards = [];

// 진영 선택 모달 표시 여부 결정
const showRoleModal = Math.random() < 0.5;
if (showRoleModal) {
  roleModal.classList.add("show");
} else {
  autoAssignRole();
}

// 버튼 이벤트
attackBtn.addEventListener("click", () => selectRole("attacker"));
defenseBtn.addEventListener("click", () => selectRole("defender"));
readyButton.addEventListener("click", handleReadyClick);
restartButton.addEventListener("click", () => location.reload());

// 역할 자동 할당
function autoAssignRole() {
  playerRoleText.textContent = "상대방이 진영을 선택 중입니다...";
  setTimeout(() => {
    myRole = Math.random() < 0.5 ? "attacker" : "defender";
    finishRoleSelection(false);
  }, 2000);
}

// 역할 선택 처리
function selectRole(role) {
  myRole = role;
  finishRoleSelection(true);
}

// 역할 선택 완료 처리
function finishRoleSelection(isPlayerChoice) {
  roleModal.classList.remove("show");
  document.body.classList.add("game-started");
  playerRoleText.textContent = isPlayerChoice
    ? `${myRole === "attacker" ? "공격" : "방어"} 진영을 선택했습니다!`
    : `상대방이 선택한 결과, 당신은 ${myRole === "attacker" ? "공격" : "방어"} 진영입니다.`;
  setupCardPiles();
  enableReady();
}

function enableReady() {
  readyButton.disabled = false;
}

// 카드 뭉치 표시
function setupCardPiles() {
  document.querySelector(".card-pile-opponent").style.display = "block";
  document.querySelector(".card-pile-player").style.display = "block";
}

// 준비 버튼 클릭 처리
function handleReadyClick() {
  if (!myRole) {
    alert("진영 선택이 완료되지 않았습니다!");
    return;
  }

  readyButton.disabled = true;

  if (gamePhase === "init") {
    playerList.innerHTML = `
      <li>나 - <span class="ready">Ready</span></li>
      <li>상대방 - <span class="ready">Ready</span></li>
    `;
    setTimeout(showCountdown, 1000);
  } else if (gamePhase === "cardSelected" && selectedCard) {
    simulateOpponentCardSelection();
  }
}

// 카운트다운 표시
function showCountdown() {
  const countdownDiv = document.createElement("div");
  countdownDiv.id = "countdown";
  countdownDiv.style.cssText = `
    position: fixed; top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    font-size: 80px; color: #fff;
    z-index: 1000; animation: pulse 1s ease infinite;
  `;
  document.body.appendChild(countdownDiv);

  let count = 3;
  countdownDiv.textContent = count;

  const interval = setInterval(() => {
    count--;
    countdownDiv.textContent = count;
    if (count === 0) {
      clearInterval(interval);
      countdownDiv.remove();
      distributeCards();
    }
  }, 1000);
}

// 카드 배분
function distributeCards() {
  const myArea = document.getElementById("myCards");
  const opponentArea = document.getElementById("opponentCards");
  myArea.innerHTML = "";
  opponentArea.innerHTML = "";

  document.querySelector(".card-pile-opponent").style.display = "none";
  document.querySelector(".card-pile-player").style.display = "none";

  myCards = myRole === "attacker"
    ? ["암세포", ...Array(4).fill("세균")]
    : ["T세포", ...Array(4).fill("항체"), "Helper T세포"];

  opponentCards = myRole === "attacker"
    ? ["T세포", "항체", "항체", "항체", "항체", "Helper T세포"]
    : ["암세포", "세균", "세균", "세균", "세균"];

  shuffle(opponentCards);

  myCards.forEach(name => createCard(myArea, name));
  opponentCards.forEach(name => createCard(opponentArea, name));

  enableCardDrag();
  readyButton.disabled = false;
}

const cardImageMap = {
  "암세포" : "image/cancer.jpg",
  "세균" : "image/bacteria.jpg",
  "T세포" : "image/Tcell.jpg",
  "항체" : "image/antibody.jpg",
  "Helper T세포" : "image/HelperTcell.jpg",
};

// 카드 생성
function createCard(container, name) {
  const card = document.createElement("div");
  card.className = "card";
  card.dataset.name = name;

  const img = document.createElement("img");
  img.src = cardImageMap[name] || "";
  img.alt = name;
  img.classList.add("card-img");

  const label = document.createElement("div");
  label.className = "card-name";
  label.textContent = name;

  // card.textContent = name;
  card.appendChild(img);
  card.appendChild(label);
  container.appendChild(card);
  setTimeout(() => card.classList.add("show"), 50);
}

// 카드 드래그
let dropListenerInitialized = false; // 전역 변수

function enableCardDrag() {
  const myCards = document.querySelectorAll("#myCards .card");

  myCards.forEach(card => {
    card.setAttribute("draggable", true);
    card.addEventListener("dragstart", (e) => {
      e.dataTransfer.setData("text/plain", card.dataset.name);
      selectedCard = card;
    });
  });

  dropZone.addEventListener("dragover", (e) => {
    e.preventDefault();
    dropZone.classList.add("dragover");
  });

  dropZone.addEventListener("dragleave", () => {
    dropZone.classList.remove("dragover");
  });

  // drop 이벤트는 한 번만 등록되도록
  if (!dropListenerInitialized) {
    dropZone.addEventListener("drop", (e) => {
      e.preventDefault();
      dropZone.classList.remove("dragover");

      // 문구 제거 (최초 드롭 시 한 번만)
      if (dropZone.textContent.includes("여기에 카드를 놓으세요")) {
        dropZone.textContent = ""; // 문구 삭제
      }

      // 여기서 중복 카드 제출을 막음
      if (dropZone.querySelector(".card")) {
        alert("카드는 한 번만 낼 수 있습니다!");
        return;
      }

      const cardName = e.dataTransfer.getData("text/plain");
      if (selectedCard && selectedCard.dataset.name === cardName) {
        const clone = selectedCard.cloneNode(true);
        clone.classList.add("submitted", "player-card");
        clone.dataset.name = cardName;
        dropZone.appendChild(clone);
        selectedCard.classList.add("submitted");
        gamePhase = "cardSelected";
      }
    });

    dropListenerInitialized = true; // 다시는 등록되지 않게 막음
  }
}

// 상대 카드 선택 시뮬레이션
function simulateOpponentCardSelection() {
  const available = Array.from(document.querySelectorAll("#opponentCards .card:not(.submitted)"));
  if (available.length === 0) return;

  const selected = available[Math.floor(Math.random() * available.length)];
  selected.classList.add("submitted");

  const clone = selected.cloneNode(true);
  clone.classList.add("submitted", "opponent-card");
  dropZone.appendChild(clone);

  setTimeout(() => {
    showResultModal(); // 결과 표시
  }, 1500);
}

// 결과 모달 표시
function showResultModal() {
  const myCard = dropZone.querySelector(".player-card")?.dataset.name;
  const opponentCard = dropZone.querySelector(".opponent-card")?.dataset.name;

  const result = getBattleResult(myCard, opponentCard);
  const resultTitle = document.getElementById("resultTitle");
  const resultContent = document.getElementById("resultText");

  resultTitle.classList.remove("win", "draw", "lose");
  resultContent.classList.remove("win", "draw", "lose");

  resultText.textContent = `결과: ${myCard} vs ${opponentCard} → ${result}`;

  if (result === "무승부") {
    resultTitle.textContent = "Draw";
    resultTitle.classList.add("draw");
    resultContent.classList.add("draw");

    restartButton.style.display = "none";
    setTimeout(() => {
      resultModal.classList.remove("show");
      clearDropZone();
      handleDrawCardRemoval(myCard, opponentCard);  // 카드 배열에서 제거
      updateCardDisplay();                          // UI 갱신
      startNextRound();
    }, 2500);
  } else if (result === "승리") {
    resultTitle.textContent = "Win!";
    resultTitle.classList.add("win");
    resultContent.classList.add("win");
  } else if (result === "패배") {
    resultTitle.textContent = "Lose...";
    resultTitle.classList.add("lose");
    resultContent.classList.add("lose");
  } 
  
  resultModal.classList.add("show");

  if (result !== "무승부") {
    restartButton.style.display = "block";
    restartButton.onclick = () => {
      resultModal.classList.remove("show");
      clearDropZone();
      removePlayedCards(myCard, opponentCard, result);
      updateCardDisplay();  // ⭐ 반드시 추가
      startNextRound();
    };
  }
}

function clearDropZone() {
  dropZone.innerHTML = "";
}

// 전투 규칙
function getBattleResult(myCard, opponentCard) {
  const rules = {
    "암세포": {
      "T세포": "패배",
      "항체": "승리",
      "Helper T세포": "무승부"
    },
    "세균": {
      "T세포": "승리",
      "항체": "무승부",
      "Helper T세포": "무승부"
    },
    "T세포": {
      "암세포": "승리",
      "세균": "패배"
    },
    "항체": {
      "암세포": "패배",
      "세균": "무승부"
    },
    "Helper T세포": {
      "암세포": "무승부",
      "세균": "무승부"
    }
  };

  return rules[myCard]?.[opponentCard] || "알 수 없음";
}


function handleDrawCardRemoval(p1Card, p2Card) {
  const isHelperTvsCancer =
    (p1Card === "Helper T세포" && p2Card === "암세포") ||
    (p2Card === "Helper T세포" && p1Card === "암세포");

  if (isHelperTvsCancer) {
    // Helper T세포만 제거
    if (p1Card === "Helper T세포") removeCardFromArray(myCards, p1Card);
    if (p2Card === "Helper T세포") removeCardFromArray(opponentCards, p2Card);
    // 암세포는 유지됨
  } else {
    // 일반 무승부: 양측 카드 제거
    removeCardFromArray(myCards, p1Card);
    removeCardFromArray(opponentCards, p2Card);
  }
}

function removePlayedCards(myCard, opponentCard, result) {
  const isHelperTvsCancer =
    (myCard === "Helper T세포" && opponentCard === "암세포") ||
    (myCard === "암세포" && opponentCard === "Helper T세포");

  // 예외 무승부 처리: Helper T세포만 제거
  if (result === "무승부" && isHelperTvsCancer) {
    if (myCard === "Helper T세포") removeCardFromArray(myCards, myCard);
    if (opponentCard === "Helper T세포") removeCardFromArray(opponentCards, opponentCard);
  } else {
      removeCardFromArray(myCards, myCard);
      removeCardFromArray(opponentCards, opponentCard);
  }
}

function removeCardFromArray(array, cardName) {
  const index = array.indexOf(cardName);
  if (index !== -1) array.splice(index, 1);
}

function updateCardDisplay() {
  const myArea = document.getElementById("myCards");
  const opponentArea = document.getElementById("opponentCards");
  myArea.innerHTML = "";
  opponentArea.innerHTML = "";

  myCards.forEach(name => createCard(myArea, name));
  opponentCards.forEach(name => createCard(opponentArea, name));
  enableCardDrag();
}

function startNextRound() {
  gamePhase = "waiting";
  selectedCard = null;

  // 카드가 모두 사라졌는지 확인 후 게임 종료 처리
  if (myCards.length === 0 || opponentCards.length === 0) {
    setTimeout(() => {
      resultText.textContent = myCards.length === 0
        ? "게임 종료! 내 카드가 모두 소진되었습니다."
        : "게임 종료! 상대 카드가 모두 소진되었습니다.";
      restartButton.style.display = "block";
      resultModal.classList.add("show");
    }, 1000);
  } else {
    readyButton.disabled = false;
  }
}

function removePlayedCards(myCard, opponentCard, result) {
  const isHelperTvsCancer =
    (myCard === "Helper T세포" && opponentCard === "암세포") ||
    (myCard === "암세포" && opponentCard === "Helper T세포");

  if (result === "무승부" && isHelperTvsCancer) {
    if (myCard === "Helper T세포") removeCardFromArray(myCards, myCard);
    if (opponentCard === "Helper T세포") removeCardFromArray(opponentCards, opponentCard);
  } else {
    if (result === "승리") {
      removeCardFromArray(opponentCards, opponentCard);
      removeCardFromArray(myCards, myCard);
    } else if (result === "패배") {
      removeCardFromArray(myCards, myCard);
      removeCardFromArray(opponentCards, opponentCard);
    } else {
      // 일반 무승부 처리
      removeCardFromArray(myCards, myCard);
      removeCardFromArray(opponentCards, opponentCard);
    }
  }
}

// 셔플 함수
function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
}