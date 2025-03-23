const remindBtn = document.querySelector("#remind-btn");
const modalOverlay = document.querySelector(".modal-overlay");
const reminder = document.querySelector("#reminder");
const track = document.querySelector("#carousel-track");
const scenes = JSON.parse(localStorage.getItem("scenes")) || [];
const scores = JSON.parse(localStorage.getItem("scores"));
// const usernameDiv = document.getElementById("username");
const process = document.getElementById("process");
const processHeader = document.getElementById("process-header");
// const imgCreator = document.createElement("img");
localStorage.setItem("scene", "study0");

let totalScore = 0;
for (let key in scores) {
  totalScore += Number(scores[key]);
}

const username = localStorage.getItem("nickname");
// usernameDiv.innerText = `${username}님`;
processHeader.textContent = `${username}님의 선택 기록`;
const resultBtn = document.getElementById("result-button");
const result = localStorage.getItem("result");
resultBtn.innerText = result;
if (result === "SUCCESS") {
  resultBtn.classList.add("success-btn");
} else {
  resultBtn.classList.add("fail-btn");
}

resultBtn.addEventListener("click", () => {
  modalOverlay.classList.remove("display-none");
  process.classList.remove("display-none");

  const character = document.getElementById("character");
  const map = document.querySelector("#process-map");

  let scoreList = JSON.parse(localStorage.getItem("scoreList")) || [];

  if (scoreList[2]) {
    const score = scoreList[2];

    // "subway" 추가 조건: 열린마음이 15점
    if (score["열린마음"] === 15) {
      const subway = document.createElement("img");
      subway.src = "../assets/map/subway.png";
      subway.alt = "subway";
      subway.id = "subway";
      map.appendChild(subway);
    }

    // "bus" 추가 조건: 전문성 5점, 존중과배려 10점
    else if (score["전문성"] === 5 && score["존중과배려"] === 10) {
      const bus = document.createElement("img");
      bus.src = "../assets/map/bus.png";
      bus.alt = "bus";
      bus.id = "bus";
      map.appendChild(bus);
    }
  }

  // 캐릭터 초기 위치
  let x = 0;
  let y = 0;
  const step = 10; // 한 번에 이동하는 거리 (px)

  // 부모 영역 크기 가져오기
  const mapRect = map.getBoundingClientRect();
  const charRect = character.getBoundingClientRect();

  // 캐릭터 초기 위치 조정
  character.style.position = "absolute";
  character.style.left = `${x}px`;
  character.style.top = `${y}px`;

  document.addEventListener("keydown", (event) => {
    switch (event.key) {
      case "ArrowUp":
        if (y > 0) y -= step;
        break;
      case "ArrowDown":
        if (y + charRect.height < mapRect.height) y += step;
        break;
      case "ArrowLeft":
        if (x > 0) x -= step;
        character.style.transform = "scaleX(-1)";
        break;
      case "ArrowRight":
        if (x + charRect.width < mapRect.width) x += step;
        character.style.transform = "scaleX(1)";
        break;
    }

    // 캐릭터 위치 업데이트
    character.style.left = `${x}px`;
    character.style.top = `${y}px`;
  });
});

resultBtn.addEventListener("mouseover", (event) => {
  if (event.target.textContent === "SUCCESS") {
    event.target.classList.add("success-btn-hover");
  } else {
    event.target.classList.add("fail-btn-hover");
  }
});

resultBtn.addEventListener("mouseout", (event) => {
  if (event.target.textContent === "SUCCESS") {
    event.target.classList.remove("success-btn-hover");
  } else {
    event.target.classList.remove("fail-btn-hover");
  }
});

document.querySelectorAll(".donut-chart").forEach((chart) => {
  let percent = (totalScore / 120) * 100;
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

const downloadBtn = document.getElementById("img-download");
downloadBtn.addEventListener("click", () => {
  const imgUrl = localStorage.getItem("croppedImage");
  if (imgUrl) {
    downloadBtn.href = imgUrl;
    downloadBtn.setAttribute("download", `${username}-OOTD.png`);
    // downloadBtn.style.display = "inline-block"; // 버튼 보이기
  }
});

scenes.forEach((scene) => {
  const slide = document.createElement("div");
  slide.classList.add("carousel-slide");

  const innerDiv = document.createElement("div");
  innerDiv.style.backgroundImage = scene;
  // innerDiv.style.backgroundSize = "contain";
  // innerDiv.style.backgroundRepeat = "no-repeat";
  // innerDiv.style.backgroundPosition = "center";
  // innerDiv.style.width = "100%";
  // innerDiv.style.height = "100%";

  slide.appendChild(innerDiv);
  track.insertBefore(slide, track.lastElementChild);
});
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
  process.classList.add("display-none");
});

const retryBtn = document.getElementById("retry");
retryBtn.addEventListener("click", () => {
  Swal.fire({
    title: "다시 시작하기",
    html: "다시 시작하시면 기존 데이터는 사라집니다. <br>다시 시작할까요?",
    icon: "question",
    confirmButtonText: "확인",
  }).then((result) => {
    if (result.isConfirmed) {
      window.location.href = "../index.html";
    }
  });
});
