export function initializeScene(texts, endings, nextPage) {
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

  const bellSound = new Audio("../assets/sound/bell.mp3"); // 벨소리
  const alarmSound = new Audio("../assets/sound/alarm.mp3"); // 알람소리

  const fadeInOverlay = document.querySelector(".fade-in-overlay");
  const fadeOutOverlay = document.querySelector(".fade-out-overlay");

  window.onload = function () {
    // 검정 오버레이를 서서히 사라지게 함
    setTimeout(() => {
      fadeInOverlay.style.opacity = "0"; // 오버레이 점점 투명해짐
      setTimeout(() => fadeInOverlay.style.display = "none", 550); // 애니메이션 후 요소 삭제
    }, 100);
  };

  function playSoundForText(index) {
    if (texts[index] === "(따르르릉)") {
      bellSound.play();
      setTimeout(() => {
        bellSound.pause(); // 4초 후 정지
        bellSound.currentTime = 0; // 다시 처음부터 재생 가능하도록 초기화
      }, 2000);
    } else if (texts[index] === "하아아아아암...") {
      alarmSound.play();
    }
  }

  function typeWriter() {
    isTyping = true; // 현재 문장 출력 중

    if (i < texts[index].length) {
      textElement.innerHTML += texts[index].charAt(i).replace(/\n/g, "<br>");
      i++;
      playSoundForText(index);
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
    let scenes = JSON.parse(localStorage.getItem("scenes")) || [];
    let scoreList = JSON.parse(localStorage.getItem("scoreList")) || [];

    if (endings[selectedEnding]) {
      body.style.backgroundImage = endings[selectedEnding].background;
      scenes.push(endings[selectedEnding].background);
      console.log(scenes);
      scoreList.push(endings[selectedEnding].score);
      localStorage.setItem("scenes", JSON.stringify(scenes));
      localStorage.setItem("scoreList", JSON.stringify(scoreList));

      choices.style.display = "none";

      textElement.style.display = "block"; // 다시 텍스트를 보이게
      textElement.innerHTML = endings[selectedEnding].text; // 엔딩 텍스트 표시

      // 기존 점수를 가져오거나 초기화
      let scores = JSON.parse(localStorage.getItem("scores")) || {
        열정: 0,
        열린마음: 0,
        손님우선: 0,
        전문성: 0,
        존중과배려: 0,
      };

      const selectedScore = endings[selectedEnding].score;
      Object.keys(selectedScore).forEach((key) => {
        scores[key] += selectedScore[key];
      });

      // 업데이트된 점수를 localStorage에 저장
      localStorage.setItem("scores", JSON.stringify(scores));

      // 🔹 0.5초(500ms) 후에 삼각형 보이기
      setTimeout(() => {
        next.style.display = "block";
        next.classList.add("blink");

        function goToNextPage() {
          fadeOutOverlay.style.display = "block";
          setTimeout(() => {
            fadeOutOverlay.style.opacity = "1";
          }, 50);
          setTimeout(() => {
            window.location.href = nextPage;
          }, 550);
        }

        next.addEventListener("click", goToNextPage, { once: true });
        dialog.addEventListener("click", goToNextPage, { once: true });

        document.addEventListener(
          "keydown",
          function keyHandler(event) {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              goToNextPage();
              document.removeEventListener("keydown", keyHandler);
            }
          },
          { once: true }
        );
      }, 500); // ⏳ 0.5초 대기 후 실행
    } else {
      // ending 없으면 dressup 장면으로 이동
      window.location.href = "DressUp.html";
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
}
