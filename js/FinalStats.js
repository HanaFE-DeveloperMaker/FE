document.querySelectorAll(".donut-chart").forEach((chart) => {
  let percent = chart.getAttribute("data-percent");
  let circle = chart.querySelector(".circle");
  let text = chart.querySelector(".percentage");
  let overlay = chart.querySelector(".overlay");

  let profileImg = chart.querySelector(".profile-img");

  profileImg.setAttribute("href", "../assets/profile_success.png");

  circle.style.strokeDasharray = `${percent}, 100`;
  text.textContent = `${percent}%`;
  let currentPercent = 0;
  let interval = setInterval(() => {
    if (currentPercent >= percent) {
      clearInterval(interval);
      setTimeout(() => {
        overlay.classList.add("hide-overlay");
        text.classList.add("hide-overlay");
      }, 3000);
    } else {
      currentPercent++;
      circle.style.strokeDasharray = `${currentPercent}, 100`;
      text.textContent = `${currentPercent}%`;
    }
  }, 15);
  chart.addEventListener("mouseenter", () => {
    overlay.classList.remove("hide-overlay");
    text.classList.remove("hide-overlay");
  });

  chart.addEventListener("mouseleave", () => {
    if (currentPercent >= percent) {
      overlay.classList.add("hide-overlay");
      text.classList.add("hide-overlay");
    }
  });
});

document.addEventListener("DOMContentLoaded", function () {
  const scoreItems = document.querySelectorAll('[id^="scoreitem"]');

  scoreItems.forEach((item) => {
    const score = item.getAttribute("data-score");
    setTimeout(() => {
      item.style.width = `${score}%`;
    }, 100);
  });
});

const remindBtn = document.querySelector("#remind-btn");
const modalOverlay = document.querySelector(".modal-overlay");
remindBtn.addEventListener("click", () => {
  modalOverlay.classList.remove("display-none");
});
modalOverlay.addEventListener("click", () => {
  modalOverlay.classList.add("display-none");
});

document.addEventListener("DOMContentLoaded", () => {
  const track = document.querySelector(".carousel-track");
  const slides = document.querySelectorAll(".carousel-slide");

  let currentIndex = 0;
  const totalSlides = slides.length;

  function moveToNextSlide() {
    currentIndex++;
    if (currentIndex >= totalSlides) {
      currentIndex = 0;
    }
    track.style.transform = `translateY(-${currentIndex * 100}%)`;
  }

  // 일정 시간마다 자동 스크롤
  let autoScroll = setInterval(moveToNextSlide, 3000);

  // 마우스 오버 시 스크롤 멈춤
  document.querySelector("#reminder").addEventListener("mouseenter", () => {
    clearInterval(autoScroll);
  });

  // 마우스 벗어나면 다시 재생
  document.querySelector("#reminder").addEventListener("mouseleave", () => {
    autoScroll = setInterval(moveToNextSlide, 3000);
  });

  // 영화 크레딧 같은 계속 흐르는 애니메이션 (옵션)
  track.classList.add("auto-scroll");
});
