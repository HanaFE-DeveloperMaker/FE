document.addEventListener("DOMContentLoaded", function () {
  const texts = [
    "내일 드디어 하나금융TI 최종 면접이다! 면접 준비를 더 할까, 쉴까?",
    "(따르르릉)",
    "누구지? 이 시간에 전화 올 사람이 없는데.... (딸각)",
    "???: 나 고민이 있는데 혹시 들어줄 수 있어...?",
    "면접까지 12시간 남은 시각<br>가장 친한 친구가 고민을 들어달라 한다... 어떻게 할까?",
  ];

  const endings = {
    study: {
      text: "좀 정리가 되는 것 같아",
      background: "url('../assets/study_more.png')",
    },
    friend: {
      text: "친구: 아니 글쎄 여자친구가 .... ....",
      background: "url('../assets/friend.png')",
    },
    rest: {
      text: "잠도 안오는데 유튜브나 봐야겠다 ~",
      background: "url('../assets/rest.png')",
    },
  };

  let index = 0; // 현재 문장 인덱스
  let i = 0; // 현재 문장에서 출력할 글자 위치
  let isTyping = false; // 글자 출력 중 여부
  let typingInterval; // 타이핑 애니메이션을 위한 setTimeout 저장 변수

  const dialog = document.getElementById("dialog");
  const textElement = document.getElementById("text");
  const next = document.getElementById("next");
  const choices = document.getElementById("choices");
  const choiceButtons = document.querySelectorAll(".choice");
  const body = document.body; // 배경 변경을 위해 body 가져오기

  function typeWriter() {
    isTyping = true; // 현재 문장 출력 중

    if (i < texts[index].length) {
      textElement.innerHTML += texts[index].charAt(i);
      i++;
      typingInterval = setTimeout(typeWriter, 50); // 0.05초마다 한 글자씩 출력
    } else {
      isTyping = false; // 출력 완료
      next.style.display = "block"; // 삼각형 보이기
      next.classList.add("blink");
    }
  }

  function showFullText() {
    // 현재 글자 출력 중이라면 즉시 전체 문장 출력
    clearTimeout(typingInterval); // typeWriter() 중단
    textElement.innerHTML = texts[index]; // 전체 문장 표시
    i = texts[index].length; // 인덱스를 끝까지 이동
    isTyping = false; // 출력 완료 상태
    next.style.display = "block"; // 삼각형 보이기
    next.classList.add("blink");
  }

  function nextToText() {
    // 🔹 마지막 문장이면 바로 선택지 표시
    if (index === texts.length - 1) {
      showChoices();
      return;
    }

    // 문장이 끝난 후 다음 문장으로 변경
    index++;

    i = 0;
    textElement.innerHTML = "";
    next.style.display = "none";

    // 삼각형 클릭 시 showFullText()가 바로 실행되는 문제 방지
    setTimeout(() => {
      isTyping = true; // 🔥 다음 이벤트 루프에서 확실히 적용되도록 함!
      typeWriter(); // 🔥 한 글자씩 출력 시작!
    }, 10); // 💡 아주 짧은 시간(10ms) 후에 실행!
  }

  function showChoices() {
    // 선택지가 한 번 선택되었으면 다시 안 보이게 예외처리
    if (choices.style.display !== "none") {
      next.style.display = "none";
      textElement.style.display = "none"; // 기존 텍스트 숨기기
      choices.style.display = "flex"; // 선택지 표시
    }
  }

  function showEnding(event) {
    const selectedEnding = event.target.dataset.ending;

    if (endings[selectedEnding]) {
      body.style.backgroundImage = endings[selectedEnding].background;

      choices.style.display = "none";

      textElement.style.display = "block"; // 다시 텍스트를 보이게
      textElement.innerHTML = endings[selectedEnding].text; // 엔딩 텍스트 표시
    } else {
      console.error("선택된 엔딩을 찾을 수 없음:", selectedEnding);
    }
  }

  function handleInput(event) {
    if (isTyping) {
      showFullText(); // 글자가 출력 중이면 전체 문장 출력
    } else {
      nextToText(); // 글자 출력이 완료되었으면 다음 문장으로 이동
    }
  }

  // 👉 삼각형 클릭 시 다음 문장 or 전체 문장 표시
  next.addEventListener("click", handleInput);

  // 👉 다이얼로그(`dialog`) 클릭 시 다음 문장 or 전체 문장 표시
  dialog.addEventListener("click", handleInput);

  // 👉 `Enter` 또는 `Space` 키 입력 시 다음 문장 or 전체 문장 표시
  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault(); // 스페이스바의 기본 동작(스크롤)을 막음
      handleInput();
    }
  });

  choiceButtons.forEach((button) => {
    button.addEventListener("click", showEnding);
  });

  typeWriter(); // 첫 문장 출력
});
