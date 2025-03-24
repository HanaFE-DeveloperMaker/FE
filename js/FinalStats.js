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
processHeader.textContent = `${username}님의 면접 여정`;
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

  // const house = document.getElementById("house");
  // const bed = document.getElementById("bed");
  // const closet = document.getElementById("closet");
  // const grandma = document.getElementById("grandma");
  // const man = document.getElementById("man");
  const targetIds = ["house", "bed", "closet", "grandma", "man"];

  const character = document.getElementById("character");

  let isColliding = Array(targetIds.length).fill(false);
  const map = document.querySelector("#process-map");

  let scoreList = JSON.parse(localStorage.getItem("scoreList")) || [];
  const score1 = document.getElementById("scoremodal-1");
  const score2 = document.getElementById("scoremodal-2");
  const score3 = document.getElementById("scoremodal-3");
  const score4 = document.getElementById("scoremodal-4");
  const score5 = document.getElementById("scoremodal-5");
  const score6 = document.getElementById("scoremodal-6");

  let dynamicTargets = [];

  if (scoreList[3]) {
    const score = scoreList[3];

    if (score["열린마음"] === 5) {
      const bus = document.createElement("img");
      bus.src = "../assets/map/bus.png";
      bus.alt = "bus";
      bus.id = "bus";
      map.appendChild(bus);
      targetIds.push("bus");
      dynamicTargets.push(bus);
    }

    if (score["손님우선"] === 5) {
      const subway = document.createElement("img");
      subway.src = "../assets/map/subway.png";
      subway.alt = "subway";
      subway.id = "subway";
      map.appendChild(subway);
      targetIds.push("subway");
      dynamicTargets.push(subway);
    }
  }
  function checkCollision() {
    const charRect = character.getBoundingClientRect();

    // targetIds 배열을 순회하며 각 target과 충돌 여부 체크
    targetIds.forEach((item, index) => {
      const targetElement = document.getElementById(item);
      const processModal = document.getElementById(`scoremodal-${index + 1}`); // 해당 모달

      if (targetElement && processModal) {
        const targetRect = targetElement.getBoundingClientRect();
        let collisionDetected =
          charRect.right > targetRect.left &&
          charRect.left < targetRect.right &&
          charRect.bottom > targetRect.top &&
          charRect.top < targetRect.bottom;

        if (collisionDetected) {
          if (!isColliding[index]) {
            processModal.classList.remove("display-none"); // 모달 열기
          }
          isColliding[index] = true;
        } else {
          if (isColliding[index]) {
            processModal.classList.add("display-none"); // 모달 닫기
          }
          isColliding[index] = false;
        }
      }
    });

    dynamicTargets.forEach((target) => {
      const targetRect = target.getBoundingClientRect();
      let collisionDetected =
        charRect.right > targetRect.left &&
        charRect.left < targetRect.right &&
        charRect.bottom > targetRect.top &&
        charRect.top < targetRect.bottom;

      if (collisionDetected) {
        score6.classList.remove("display-none");
        score6.innerHTML = `<strong>이동 수단 선택</strong>${Object.entries(
          scoreList[3]
        )
          .map(([key, value]) => `<p>${key} ${value}</p>`)
          .join("")}`;
      } else {
        score6.classList.add("display-none");
      }
    });
  }

  score1.innerHTML = `<strong>전날 밤</strong>${Object.entries(scoreList[0])
    .map(([key, value]) => `<p>${key} ${value}</p>`)
    .join("")}`;

  score2.innerHTML = `<strong>면접날 아침</strong>${Object.entries(scoreList[1])
    .map(([key, value]) => `<p>${key} ${value}</p>`)
    .join("")}`;

  score3.innerHTML = `<strong>OOTD</strong>${Object.entries(scoreList[2])
    .map(([key, value]) => `<p>${key} ${value}</p>`)
    .join("")}`;

  if (scoreList.length >= 5) {
    console.log(scoreList);
    score4.innerHTML = `<strong>할머니의 도움</strong>${Object.entries(
      scoreList[4]
    )
      .map(([key, value]) => `<p>${key} ${value}</p>`)
      .join("")}`;

    score5.innerHTML = `<strong>마지막 한마디</strong>${Object.entries(
      scoreList[5]
    )
      .map(([key, value]) => `<p>${key} ${value}</p>`)
      .join("")}`;
  } else {
    score4.innerHTML = `<strong>Secret!</strong><p>다시 진행해 보세요.</p>`;

    score5.innerHTML = `<strong>Secret!</strong><p>다시 진행해 보세요.</p>`;
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
    checkCollision();
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
