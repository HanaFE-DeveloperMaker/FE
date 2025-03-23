import { scenes } from "./Scenes.js";
import { interviewQuestions } from "./InterviewQuestions.js";

document.addEventListener("DOMContentLoaded", function () {
  let currentScene = localStorage.getItem("scene") || "study0";
  let isTyping = false;
  let typingIndex = 0;
  let typingInterval;
  let scores = JSON.parse(localStorage.getItem("scores")) || {
    열정: 0,
    열린마음: 0,
    손님우선: 0,
    전문성: 0,
    존중과배려: 0,
  };

  let currentAudio = "fail";

  const interviewResult = localStorage.getItem("interview-dialog");

  const dialog = document.getElementById("dialog");
  const textElement = document.getElementById("text");
  const next = document.getElementById("next");
  const choices = document.getElementById("choices");
  const body = document.body;

  const fadeInOverlay = document.createElement("div");
  fadeInOverlay.classList.add("fade-in-overlay");
  document.body.appendChild(fadeInOverlay);

  function playSound(soundSrc) {
    if (soundSrc === null) {
      if (currentAudio instanceof Audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
      }
      return;
    }

    if (
      soundSrc &&
      (!(currentAudio instanceof Audio) || currentAudio.src !== soundSrc)
    ) {
      if (currentAudio instanceof Audio) {
        currentAudio.pause();
      }
      currentAudio = new Audio(soundSrc);
      currentAudio.loop = false;
      currentAudio.play();
    }
  }

  function showScene(sceneKey) {
    if (sceneKey === "mail3") {
      let totalScore = Object.values(scores).reduce((acc, val) => acc + val, 0);
      localStorage.setItem("scores", JSON.stringify(scores));
      localStorage.getItem("totalscores" + totalScore);
      localStorage.getItem("scores" + scores);
      sceneKey = totalScore >= 100 ? "success1" : "fail1";
      localStorage.setItem("result", totalScore >= 100 ? "SUCCESS" : "FAIL");
    }

    if (sceneKey === "nude") {
      let totalScore = Object.values(scores).reduce((acc, val) => acc + val, 0);
      localStorage.setItem("scores", JSON.stringify(scores));
      localStorage.getItem("totalscores" + totalScore);
      localStorage.getItem("scores" + scores);
      localStorage.setItem("result", totalScore >= 100 ? "SUCCESS" : "FAIL");
    }

    const scene = scenes[sceneKey];
    currentScene = sceneKey;

    let sceneList = JSON.parse(localStorage.getItem("scenes")) || [];
    const lastScene =
      sceneList.length > 0 ? sceneList[sceneList.length - 1] : null;

    const newScene = scene?.background;
    if (newScene) {
      if (
        !lastScene ||
        JSON.stringify(lastScene) !== JSON.stringify(newScene)
      ) {
        sceneList.push(scene?.background);
        localStorage.setItem("scenes", JSON.stringify(sceneList));
      }
    }

    if (sceneKey === "interview0") {
      const nickname = localStorage.getItem("nickname");
      scene.text = nickname + "님 들어와주세요 !";
    }

    if (sceneKey === "interview2") {
      const result = parseInt(localStorage.getItem("interview-dialog") || "0");
      const question =
        interviewQuestions[result] ||
        "회사에서도 자유로운 분위기를 선호하시나요?";
      scene.text = "면접관: " + question;
    }

    if (sceneKey === "study0") {
      setTimeout(() => {
        fadeInOverlay.style.opacity = "0";
        setTimeout(() => fadeInOverlay.remove(), 600);
      }, 500);
    }

    if (sceneKey === "start") {
      fadeInOverlay.style.opacity = "0";
      fadeInOverlay.style.display = "none";
    }

    if (sceneKey === "wakeUp0") {
      fadeInOverlay.style.opacity = "0";
      fadeInOverlay.style.display = "none";
    }

    if (sceneKey === "Alarm") {
      localStorage.setItem("scene", "wakeUp0");
      window.location.href = "Alarm.html";
    }

    if (sceneKey === "dressUp") {
      localStorage.setItem("scene", "start");
      window.location.href = "DressUp.html";
    }

    if (scene.background) {
      const img = new Image();
      const imageUrl = scene.background.match(/url\(['"]?(.*?)['"]?\)/)[1];

      img.src = imageUrl;

      img.onload = function () {
        body.style.backgroundImage = scene.background;
      };
    }

    playSound(scene.sound);

    if (scene.type === "text") {
      textElement.innerHTML = "";
      textElement.style.display = "block";
      choices.style.display = "none";
      next.style.display = "none";

      if (
        sceneKey === "success1" ||
        sceneKey === "fail1" ||
        sceneKey === "fail_nude"
      ) {
        dialog.style.display = "none";
        setTimeout(() => {
          showScene(scene.next);
          dialog.style.display = "block";
        }, 3000);
      } else if (
        sceneKey === "success3" ||
        sceneKey === "fail4" ||
        sceneKey === "fail_nude4"
      ) {
        dialog.style.display = "none";
        fadeInOverlay.style.display = "block";
        setTimeout(() => {
          fadeInOverlay.style.opacity = "1";
        }, 10);

        setTimeout(() => {
          window.location.href = "FinalStats.html";
        }, 1000);
      } else if (
        sceneKey === "subway" ||
        sceneKey === "bus" ||
        sceneKey === "bus_good" ||
        sceneKey === "bus_bad" ||
        sceneKey === "interview_good" ||
        sceneKey === "interview_bad" ||
        sceneKey === "bus_good2" ||
        sceneKey === "bus_bad2"
      ) {
        dialog.style.display = "none";
        setTimeout(() => {
          showScene(scene.next);
          dialog.style.display = "block";
        }, 10);
      } else {
        dialog.style.display = "block";
        startTypingEffect(scene.text, () => {
          next.style.display = scene.next ? "block" : "none";
          next.classList.add("blink");
        });
      }
    } else if (scene.type === "choice") {
      textElement.style.display = "none";
      next.style.display = "none";
      choices.style.display = "flex";
      let scoreList = JSON.parse(localStorage.getItem("scoreList")) || [];

      choices.innerHTML = "";
      scene.choices.forEach((choice) => {
        const button = document.createElement("div");
        button.classList.add("choice");
        button.textContent = choice.text;
        button.dataset.nextScene = choice.next;
        button.addEventListener("click", () => {
          scoreList.push(choice.score);
          localStorage.setItem("scoreList", JSON.stringify(scoreList));
          Object.keys(choice.score).forEach((key) => {
            scores[key] += choice.score[key];
          });
          console.log(currentScene, interviewResult);
          if (currentScene === "start_choice" && interviewResult === "0") {
            showScene("nude");
            return;
          } else {
            showScene(choice.next);
          }
        });
        choices.appendChild(button);
      });
    }
  }

  function startTypingEffect(text, callback) {
    isTyping = true;
    typingIndex = 0;
    textElement.innerHTML = "";

    function type() {
      if (typingIndex < text.length) {
        textElement.innerHTML = text
          .substring(0, typingIndex + 1)
          .replace(/\n/g, "<br>");
        typingIndex++;
        typingInterval = setTimeout(type, 100);
      } else {
        isTyping = false;
        if (callback) callback();
      }
    }

    type();
  }

  function skipTyping() {
    clearTimeout(typingInterval);
    const scene = scenes[currentScene];
    textElement.innerHTML = scene.text.replace(/\n/g, "<br>");
    isTyping = false;
    next.style.display = scene.next ? "block" : "none";
    next.classList.add("blink");
  }

  dialog.addEventListener("click", function () {
    if (isTyping) {
      skipTyping();
    } else {
      const nextScene = scenes[currentScene].next;
      if (nextScene) {
        showScene(nextScene);
      }
    }
  });

  document.addEventListener("keydown", function (event) {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      if (isTyping) {
        skipTyping();
      } else {
        const nextScene = scenes[currentScene].next;
        if (nextScene) {
          showScene(nextScene);
        }
      }
    }
  });

  showScene(currentScene);
});
