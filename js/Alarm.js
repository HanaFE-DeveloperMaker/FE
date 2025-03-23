window.onload = function () {
    const loadingContainer = document.getElementById("loadingContainer");
    const alarmSound = document.getElementById("alarmSound");
    const alarmClock = document.getElementById("alarmClock");

    setTimeout(() => {
      loadingContainer.classList.add("fade-out");
      setTimeout(() => {
        loadingContainer.style.display = "none";
      }, 500);
    }, 1000); 

    alarmClock.addEventListener("click", function () {
      alarmSound.play().then(() => {
        setTimeout(() => {
          alarmSound.currentTime = 0;

          loadingContainer.style.display = "flex";
          loadingContainer.classList.remove("fade-out");

          setTimeout(() => {
            window.location.href = "Base.html";
          }, 800);
        }, 2000);
      }).catch((e) => {
        console.warn("알람 재생 실패", e);
      });
    });
  };