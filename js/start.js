function isFullScreen() {
  return (
    window.innerHeight === screen.height && window.innerWidth === screen.width
  );
}

document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const nickname = document.querySelector("input");

  const startSound = new Audio("../assets/sound/start.wav"); // 시작 버튼 효과음

  const fadeOverlay = document.createElement("div");
  fadeOverlay.classList.add("fade-overlay");
  document.body.appendChild(fadeOverlay);

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

    startSound.play();

    fadeOverlay.style.opacity = "1";

    setTimeout(() => {
      window.location.href = "Study.html";
    }, 1200);
  });
});
