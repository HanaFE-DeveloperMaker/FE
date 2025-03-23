window.onload = function () {
  const loadingContainer = document.getElementById("loadingContainer");
  const alarmSound = document.getElementById("alarmSound");
  const alarmClock = document.getElementById("alarmClock");
  let isAudioEnabled = localStorage.getItem("audioEnabled") !== "false"; // 기본값: ON
  const fadeOutOverlay = document.querySelector(".fade-out-overlay");

  setTimeout(() => {
    fadeOutOverlay.style.opacity = "0";
    setTimeout(() => {
      fadeOutOverlay.remove();
    }, 500);
  }, 2000);

  alarmClock.addEventListener("click", function () {
    const message = document.querySelector(".message");
    message.textContent = "진짜 시계를 찾았다!";

    alarmClock.classList.add("active-effect");
    setTimeout(() => {
      alarmClock.classList.remove("active-effect");
    }, 2000);

    if (isAudioEnabled) {
      alarmSound
        .play()
        .then(() => {
          setTimeout(() => {
            alarmSound.currentTime = 0;
            loadingContainer.style.display = "flex";
            loadingContainer.classList.remove("fade-out");

            setTimeout(() => {
              window.location.href = "Base.html";
            }, 800);
          }, 2000);
        })
        .catch((e) => {
          console.warn("알람 재생 실패", e);
        });
    } else {
      setTimeout(() => {
        loadingContainer.style.display = "flex";
        loadingContainer.classList.remove("fade-out");

        setTimeout(() => {
          window.location.href = "Base.html";
        }, 800);
      }, 2000);
    }
  });

  document.querySelectorAll(".fake-clock").forEach((fakeClock) => {
    fakeClock.addEventListener("click", () => {
      fakeClock.classList.add("active-effect");
      setTimeout(() => {
        fakeClock.classList.remove("active-effect");
      }, 1000);
      if (isAudioEnabled) {
        wrongSound.currentTime = 0;
        wrongSound.play();
      }
    });
  });
};
