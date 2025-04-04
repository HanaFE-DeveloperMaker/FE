function isFullScreen() {
  return (
    (window.innerHeight === screen.height &&
      window.innerWidth === screen.width) ||
    (window.outerHeight === screen.height &&
      window.outerWidth === screen.width) ||
    document.fullscreenElement !== null
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const nickname = document.querySelector("input");

  localStorage.clear();

  const startSound = new Audio("./assets/sound/start.wav");

  const fadeOverlay = document.createElement("div");
  fadeOverlay.classList.add("fade-overlay");
  document.body.appendChild(fadeOverlay);

  const audioToggle = document.body.querySelector(".audio-btn");
  let isAudioEnabled = localStorage.getItem("audioEnabled") !== "false"; // 기본값: ON

  function updateAudioButton() {
    audioToggle.src = isAudioEnabled
      ? "./assets/sound_on.png"
      : "./assets/sound_off.png";
    audioToggle.alt = isAudioEnabled ? "소리 켜기" : "소리 끄기";
  }

  audioToggle.addEventListener("click", function () {
    isAudioEnabled = !isAudioEnabled;
    localStorage.setItem("audioEnabled", isAudioEnabled);
    updateAudioButton();
  });

  // 초기 버튼 상태 설정
  updateAudioButton();

  if (!isFullScreen()) {
    Swal.fire({
      title: "화면 설정",
      html: "게임 시작 전, F11을 눌러 <br /> 전체화면으로 즐겨 주세요!",
      icon: "info",
      confirmButtonText: "확인",
    });
  }

  startButton.addEventListener("click", function () {
    if (!isFullScreen()) {
      Swal.fire({
        title: "화면 설정",
        html: "게임 시작 전, F11을 눌러 <br /> 전체화면으로 즐겨 주세요!",
        icon: "info",
        confirmButtonText: "확인",
      });
      return;
    }
    if (nickname.value.length == 0) {
      Swal.fire({
        title: "닉네임 설정 필요",
        text: "시작 전 닉네임을 설정해 주세요!",
        icon: "error",
        confirmButtonText: "확인",
      });
      return;
    }

    localStorage.setItem("nickname", nickname.value);

    if (isAudioEnabled) {
      startSound.play();
    }

    fadeOverlay.style.opacity = "1";

    setTimeout(() => {
      window.location.href = "./html/Base.html";
    }, 1400);
  });

  const walkerContainer = document.getElementById("walker-container");
  const gifSrc = "./assets/walking.gif";

  function spawnWalker(direction) {
    const walker = document.createElement("img");
    walker.src = gifSrc;
    walker.alt = "걷는 캐릭터";
    walker.classList.add("walker");

    if (direction === "right") {
      walker.classList.add("walk-right");
    } else {
      walker.classList.add("walk-left");
    }

    walkerContainer.appendChild(walker);

    walker.addEventListener("animationend", () => {
      walker.remove();
      setTimeout(() => {
        spawnWalker(direction === "right" ? "left" : "right");
      }, 300);
    });
  }

  window.addEventListener("DOMContentLoaded", () => {
    spawnWalker("right");
  });
});
