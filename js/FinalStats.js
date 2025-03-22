const scores = JSON.parse(localStorage.getItem("scores"));
const usernameDiv = document.getElementById("username");
let totalScore = 0;
for (let key in scores) {
  totalScore += Number(scores[key]);
}

const username = localStorage.getItem("nickname");
usernameDiv.innerText = `${username}님`;
document.querySelectorAll(".donut-chart").forEach((chart) => {
  let percent = (totalScore / 150) * 100;
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
  const scoreItems = document.getElementById("score-list");
  const divElements = Array.from(scoreItems.children).filter(
    (el) => el.tagName === "DIV"
  );
  divElements.forEach((item, index) => {
    const label = item.querySelector("label");
    const integrity = item.querySelector(".integrity-modal");
    const scoreNum = item.querySelector("span");
    scoreNum.textContent = `${scores[label.textContent]}/30`;
    scoreNum.style.left = `${(scores[label.textContent] * 100) / 30 - 16}%`;
    const chart = document.getElementById(`scoreitem-${index + 1}`);
    label.addEventListener("mouseover", () => {
      integrity.classList.remove("display-none");
    });
    label.addEventListener("mouseout", () => {
      integrity.classList.add("display-none");
    });
    chart.addEventListener("mouseover", () => {
      scoreNum.classList.remove("display-none");
    });
    chart.addEventListener("mouseout", () => {
      scoreNum.classList.add("display-none");
    });
    setTimeout(() => {
      chart.style.width = `${(Number(scores[label.textContent]) * 100) / 30}%`;
    }, 100);
  });
});

const remindBtn = document.querySelector("#remind-btn");
const modalOverlay = document.querySelector(".modal-overlay");
const reminder = document.querySelector("#reminder");
const track = document.querySelector("#carousel-track");
remindBtn.addEventListener("click", () => {
  modalOverlay.classList.remove("display-none");
  reminder.classList.remove("display-none");
  let scrollInterval;
  track.scrollLeft = 0;
  console.log(track.scrollLeft, track.scrollWidth, track.clientWidth);
  scrollInterval = setInterval(() => {
    if (track.scrollLeft < track.scrollWidth - track.clientWidth) {
      track.scrollBy(2, 0); // 2px씩 오른쪽으로 스크롤
      // console.log(track.scrollLeft);
    } else {
      clearInterval(scrollInterval); // 끝까지 가면 멈춤
    }
  }, 20);
});
modalOverlay.addEventListener("click", () => {
  modalOverlay.classList.add("display-none");
  reminder.classList.add("display-none");
});

// document.addEventListener("DOMContentLoaded", () => {
//   const track = document.querySelector(".carousel-track");
//   const slides = Array.from(document.querySelectorAll(".carousel-slide")); // 슬라이드를 배열로 변환

//   let currentIndex = 0;
//   const totalSlides = slides.length;
//   let autoScroll;

//   // 슬라이드 높이를 동적으로 설정
//   function updateSlideHeight() {
//     if (window.getComputedStyle(reminder).display === "none") {
//       return; // reminder가 보이지 않으면 높이 설정 안 함
//     }
//     const reminderHeight = reminder.clientHeight;

//     slides.forEach((slide) => {
//       slide.style.height = `${reminderHeight}px`;
//     });

//     // track의 높이를 슬라이드 개수만큼 설정
//     track.style.height = `${reminderHeight * totalSlides}px`;
//   }

//   function moveToNextSlide() {
//     console.log(`currentIndex: ${currentIndex}, totalSlides: ${totalSlides}`);

//     if (currentIndex < totalSlides - 1) {
//       currentIndex++;
//       const translateYValue = -currentIndex * reminder.clientHeight; // 부모 높이를 기준으로 이동
//       track.style.transform = `translateY(${translateYValue}px)`;
//       track.style.transition = "transform 1.5s ease-in-out"; // 부드러운 애니메이션 적용
//       console.log(`Transform: ${track.style.transform}`);
//     } else {
//       clearInterval(autoScroll); // 마지막 슬라이드에서 멈춤
//       console.log("Carousel Stopped.");
//     }
//   }

//   let prevDisplay = window.getComputedStyle(reminder).display;

//   setInterval(() => {
//     const currentDisplay = window.getComputedStyle(reminder).display;

//     // reminder가 보이기 시작하면 슬라이드 높이 업데이트
//     if (currentDisplay !== prevDisplay) {
//       prevDisplay = currentDisplay;
//       if (currentDisplay !== "none") {
//         updateSlideHeight();
//       }
//     }
//   }, 100);

//   window.addEventListener("resize", updateSlideHeight);
//   updateSlideHeight();

//   autoScroll = setInterval(moveToNextSlide, 5000);

//   track.classList.add("auto-scroll");
// });
