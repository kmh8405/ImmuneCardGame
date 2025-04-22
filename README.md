# 🧬 면역 카드 대전 - 웹 게임

---

## 🧭 프로젝트 소개

**"면역 시스템의 상호관계를 카드 게임으로 배워보자!"**

이 프로젝트는 HTML5, CSS, JavaScript를 이용해 개발된 **간단한 웹 기반 카드 게임**입니다.

플레이어는 병원체(공격) 진영 또는 면역세포(방어) 진영을 선택해 전략적인 카드 배틀을 진행합니다.

---

## 💡 제작 동기

면역학을 보다 친근하게 접할 수 있는 방법을 고민하던 중,

평소 즐겨보던 유튜브 크리에이터의 한 게임 콘텐츠에서 영감을 받아 개발을 시작하게 되었습니다.

콘텐츠 속의 카드 게임 형식을 차용하되, 생물학 전공을 살려

**세포 간 상호작용을 재미있게 학습**할 수 있도록 구성하였습니다.

---

## 🔗 관련 링크

- 🔗 Website:  [ImmuneCardGame](https://kmh8405.github.io/ImmuneCardGame/)

---

## 📦 프로젝트 폴더 구조
```
IMMUNE-CARD-GAME/
├── index.html                    # 대기실 페이지
├── sologame.html                 # 싱글플레이 게임 화면
├── package.json                 # ⚠️ 미사용 - 향후 멀티플레이 서버용
├── package-lock.json            # ⚠️ 미사용 - 자동 생성된 패키지 잠금 파일
├── server.js                    # ⚠️ 미사용 - 멀티플레이 서버 코드
│
├── public/
│   ├── css/
│   │   └── style.css            # 전체 UI 및 반응형 스타일 시트
│   │
│   ├── image/                   # 카드 및 배경 이미지
│   │   ├── antibody.jpg         # 항체 카드 이미지
│   │   ├── bacteria.jpg         # 세균 카드 이미지
│   │   ├── cancer.jpg           # 암세포 카드 이미지
│   │   ├── HelperTcell.jpg      # Helper T세포 이미지
│   │   ├── Tcell.jpg            # T세포 이미지
│   │   ├── card-back.jpg        # 카드 뒷면 이미지
│   │   ├── game-background.jpg  # 게임 배경 이미지
│   │   └── lobby-background.jpg # 대기실 배경 이미지
│   │
│   ├── js/
│   │   ├── index.js             # 대기실 로직
│   │   ├── sologame.js          # 게임 플레이 로직
│   │   └── socket.js            # ⚠️ 미사용 - 소켓용 멀티플레이용 스크립트
│
├── socket.io/                   # ⚠️ 미사용 - 서버 소켓 자동 경로
│
├── screenshots/                 # README 용 스크린샷 모음
│   ├── drag.png
│   ├── ingame.png
│   ├── lobby.png
│   ├── result.png
│   └── rule.png
```
---

## 🗓️ 제작 기간

- **2025.04.15 ~ 2025.04.22 (총 8일)**

---

## 🧑 제작 인원

- 개인 프로젝트 (1인 개발)

---

## 🕹️ 기능 소개

- **🔹 대기실 (index.html)**
    - 게임 룰 미리보기 모달창
    - 매칭 시작 (현재 개발중 표시)
    - 싱글 플레이 모드
    - 카드 종류 (hover 시 카드 이름 확인)
- **🔹 게임 화면 (sologame.html)**
    - 랜덤 진영 선택 or 수동 선택
    - 카드 배분, 드래그 앤 드롭 제출
    - 매 라운드 결과 모달 (승/패/무승부)
    - 무승부 시 계속 이어서 플레이
    - 승패 로직 구현
    - 반응형 디자인

---

## 🧠 카드 종류 및 규칙

| 공격 진영 카드 | 방어 진영 카드 | 결과 |
| --- | --- | --- |
| 암세포 | T세포 | 방어 승 |
| 암세포 | 항체 | 공격 승 |
| 암세포 | Helper T세포 | 무승부 (Helper만 제거) |
| 세균 | T세포 | 공격 승 |
| 세균 | 항체 | 무승부 (양쪽 제거) |
| 세균 | Helper T세포 | 무승부 (양쪽 제거) |
- 공격 진영 카드 : 암세포 x 1 , 세균 x 4 ⇒ 총 5장
- 방어 진영 카드 : T세포 x 1 , 항체 x 4 , Helper T세포 ⇒ 총 6장

---

## 🖥 주요 코드 설명

- 카드 드래그 (드래그 앤 드롭)

![drag.png](/screenshots/drag.png)

- 규칙 로직

![rule.png](/screenshots/rule.png)

## 💻 사용 기술 스택

- **HTML5**
    - 드래그 앤 드롭 API
- **CSS3**
- **JavaScript**

---

## 🧪 TODO (향후 기능 계획)

### 🔄 기능 개선

- [ ]  카드 제출 시 flip 애니메이션 추가

### 🌐 멀티플레이 (예정)

- [ ]  Socket.io 기반 실시간 매칭 (1 vs 1)
- [ ]  베팅 시스템 + 인게임 재화
- [ ]  실시간 랭킹 보드 (보유 토큰 수 기반)

### 📱 UX 개선

- [ ]  사운드 효과 (승/패/무승부 등)

---

## 📷 캡쳐 화면(일부)

### 🎮 대기실 화면

![lobby.png](/screenshots/lobby.png)

### 🧬 게임 진행 화면

![ingame.png](/screenshots/ingame.png)

### 🧾 결과 모달창

![result.png](/screenshots/result.png)
