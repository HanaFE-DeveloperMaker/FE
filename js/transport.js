document.addEventListener("DOMContentLoaded", function () {
  const scenes = {
    start: {
      type: "text",
      text: "... ... ... ... ...",
      background: "url('../assets/img_transport.png')",
      next: "start1"
    },
    start0: {
      type: "text",
      text: "",
      background: "url('../assets/img_transport.png')",
      next: "start1",
      sound: "../assets/sound/transport.wav"
    },
    start1: {
      type: "text",
      text: "면접장까지 1시간 반... 이번에 새로 생긴 버스가 빠르다고 한다.<br>새롭게 도전해볼까?",
      background: "url('../assets/img_transport.png')",
      next: "choice1",
      sound: "../assets/sound/transport.wav"
    },
    choice1: {
      type: "choice",
      choices: [
        { text: "검증되지 않은 노선은 좀.. 안전하게 지하철 타고 가기", next: "subway0", score: { 전문성: 5, 존중과배려:10 } },
        { text: "30분이나 빠르다고?! 새로 생긴 버스 타고 가기", next: "bus0", score: { 열린마음: 15 } }
      ]
    },
    subway0: {
      type: "text",
      text: "",
      background: "url('../assets/img_subway.png')",
      next: "subway"
    },
    subway: {
      type: "text",
      text: "",
      background: "url('../assets/img_subway.png')",
      next: "subway1",
      sound: "../assets/sound/subway.mp3"
    },
    subway1: {
      type: "text",
      text: "안내 방송 : 아- 아.... 현재 차량 고장으로 인해.. 열차가 지연 운행 되고 있습니다....",
      background: "url('../assets/img_subway.png')",
      next: "subway2"
    },
    subway2: {
      type: "text",
      text: "뭐라고?! 큰일 났다.... 빨리 버스를 타러 가야해 !!",
      background: "url('../assets/img_subway.png')",
      next: "bus"
    },
    bus0: {
      type: "text",
      text: "",
      background: "url('../assets/img_bus.png')",
      next: "bus"
    },
    bus: {
      type: "text",
      text: "",
      background: "url('../assets/img_bus.png')",
      next: "bus1",
      sound: null
    },
    bus1: {
      type: "text",
      text: "새로 생겼다더니 좌석도 너무 편안하고 빨라서 좋다 ~~",
      background: "url('../assets/img_bus.png')",
      next: "bus2"
    },
    nude: {
      type: "text",
      text: "???: 예끼 이놈아! 공공장소에 누가 그런 차림으로 다녀?! 당장 나가!!",
      background: "url('../assets/img_nude.png')",
      next: "fail_nude",
      sound:null
    },
    bus2: {
      type: "text",
      text: "버스를 타고 가는데, 할머니 한 분이 큰 짐을 들고 타셨다....",
      background: "url('../assets/img_bus_grandmother.png')",
      next: "bus3",
      sound: "../assets/sound/bus.wav"
    },
    bus3: {
      type: "text",
      text: "어제 잠을 많이 못자서 피곤하긴 한데...<br>자리를 양보해 드릴까?",
      background: "url('../assets/img_bus_grandmother.png')",
      next: "bus4",
      sound: null
    },
    bus4: {
      type: "choice",
      choices: [
        { text: "마음이 안좋아.. 자리를 양보한다.", next: "bus_good0", score: { 열린마음:5, 존중과배려: 15, 손님우선: 15 } },
        { text: "좋은 컨디션으로 면접 봐야지.. 모르는 척 한다.", next: "bus_bad0", score: { 존중과배려: 1 } }
      ]
    },
    bus_good0: {
      type: "text",
      text: "",
      background: "url('../assets/img_bus_good.png')",
      next: "bus_good"
    },
    bus_good: {
      type: "text",
      text: "",
      background: "url('../assets/img_bus_good.png')",
      next: "bus_good1"
    },
    bus_good1: {
      type: "text",
      text: "큰 짐을 든 할머니: 아이고 정말 고마워요 ...! 복 받을 거야 !!",
      background: "url('../assets/img_bus_good.png')",
      next: "bus_good2"
    },
    bus_good2: {
      type: "text",
      text: "",
      background: "url('../assets/img_bus_good.png')",
      next: "hana"
    },
    bus_bad0: {
      type: "text",
      text: "",
      background: "url('../assets/img_bus_good.png')",
      next: "bus_bad"
    },
    bus_bad: {
      type: "text",
      text: "",
      background: "url('../assets/img_bus_good.png')",
      next: "bus_bad1"
    },
    bus_bad1: {
      type: "text",
      text: "Zzzzz....",
      background: "url('../assets/img_bus_bad.png')",
      next: "bus_bad2",
      sound:"../assets/sound/sleep.wav",
    },
    bus_bad2: {
      type: "text",
      text: "",
      background: "url('../assets/img_bus_bad.png')",
      next: "hana",
      sound:null
    },
    hana: {
      type: "text",
      text: "... ... ... ... ...",
      background: "url('../assets/img_hana.png')",
      next: "hana1"
    },
    hana1: {
      type: "text",
      text: "휴 드디어 도착했다.<br>건물이 너무 멋지잖아?! 꼭 합격하고 말거야 !!",
      background: "url('../assets/img_hana.png')",
      next: "interview1"
    },
    interview1: {
      type: "text",
      text: "면접관: 안녕하세요. 하나 금융 티아이 최종 면접 시작하겠습니다.",
      background: "url('../assets/img_interview.png')",
      next: "interview2"
    },
    interview2: {
      type: "text",
      text: "면접관: (면접 복장에 따른 질문) 굉장히 편한 복장이네요. 회사에서도 자유로운 분위기를 선호하시는 편인가요?",
      background: "url('../assets/img_interview.png')",
      next: "interview3"
    },
    interview3: {
      type: "text",
      text: "..... ..... ..... ..... ..... .....",
      background: "url('../assets/img_interview.png')",
      next: "interview4"
    },
    interview4: {
      type: "text",
      text: "면접관: 네, 이상으로 면접 모두 마치겠습니다. 혹시 마지막으로 하시고 싶은 말씀 있으실까요?",
      background: "url('../assets/img_interview.png')",
      next: "interview5"
    },
    interview5: {
      type: "choice",
      choices: [
        { text: "아까 미쳐 제대로 답변하지 못한 질문에 대한 보완을 하자!", next: "interview_good0", score: { 열정: 10, 전문성: 10 } },
        { text: "면접도 망한 것 같은데, 빨리 끝내고 싶어... 최종 인사로 마무리 하자.", next: "interview_bad0", score: { 전문성: 0 } }
      ]
    },
    interview_good0: {
      type: "text",
      text: "",
      background: "url('../assets/img_interview.png')",
      next: "interview_good"
    },
    interview_good: {
      type: "text",
      text: "",
      background: "url('../assets/img_interview.png')",
      next: "interview_good1"
    },
    interview_good1: {
      type: "text",
      text: "아까 제가 했던 답변을 추가 보완해도 괜찮을 까요?<br>... ... ...",
      background: "url('../assets/img_interview.png')",
      next: "mail1"
    },
    interview_bad0: {
      type: "text",
      text: "",
      background: "url('../assets/img_interview.png')",
      next: "interview_bad"
    },
    interview_bad: {
      type: "text",
      text: "",
      background: "url('../assets/img_interview.png')",
      next: "interview_bad1"
    },
    interview_bad1: {
      type: "text",
      text: "뽑아주시면 열심히 하겠습니다 !",
      background: "url('../assets/img_interview.png')",
      next: "mail1"
    },
    mail1: {
      type: "text",
      text: "띠리링 -",
      background: "url('../assets/img_mail.png')",
      next: "mail2",
      sound:"../assets/sound/mail.mp3"
    },
    mail2: {
      type: "text",
      text: "헉 결과 메일이잖아? 얼른 확인해야지",
      background: "url('../assets/img_mail.png')",
      next: "mail3",
      sound: null
    },
    mail3: {
      type: "text",
      text: "헉 결과 메일이잖아? 얼른 확인해야지",
      background: "url('../assets/img_mail.png')",
      next: null
    },
    success1: {
      type: "text",
      text: "",
      background: "url('../assets/img_mail_success.png')",
      next: "success2"
    },
    success2: {
      type: "text",
      text: "야호 최종 합격이다!!!!!!!!!!!!!!!",
      background: "url('../assets/img_happy.png')",
      next: "success3"
    },
    success3: {
      type: "text",
      text: "",
      background: "url('../assets/img_happy.png')",
      next: null
    },
    fail1: {
      type: "text",
      text: "",
      background: "url('../assets/img_mail_fail.png')",
      next: "fail2"
    },
    fail2: {
      type: "text",
      text: ".... .... ....",
      background: "url('../assets/img_sad.png')",
      next: "fail3"
    },
    fail3: {
      type: "text",
      text: "또 떨어졌잖아 .... ....",
      background: "url('../assets/img_sad.png')",
      next: "fail4"
    },
    fail4: {
      type: "text",
      text: "",
      background: "url('../assets/img_sad.png')",
      next: null
    },
    fail_nude: {
      type: "text",
      text: "",
      background: "url('../assets/img_mail_fail.png')",
      next: "fail_nude2"
    },
    fail_nude2: {
      type: "text",
      text: ".... .... ....",
      background: "url('../assets/img_sad.png')",
      next: "fail_nude3"
    },
    fail_nude3: {
      type: "text",
      text: "옷차림 때문에 지각해서 면접 응시를 못하다니....",
      background: "url('../assets/img_sad.png')",
      next: "fail_nude4"
    },
    fail_nude4: {
      type: "text",
      text: "",
      background: "url('../assets/img_sad.png')",
      next: null
    },
  };

  const interviewQuestions = {
    1: "면접 복장을 보니 상당히 프로페셔널한 인상을 주네요. 혹시 이전에도 여러 기업에서 개발자로 일하셨나요?",
    2: "실내에서는 편한 신발을 선호하시는 것 같은데, 사무실에서도 이런 복장을 유지하실 생각이신가요?",
    3: "상의와 하의의 조합이 독특하네요. 혹시 특정한 이유가 있나요?",
    4: "보통 개발자들이 편한 복장을 선호하긴 하지만, 여기까지 자유롭게 오신 건 처음 보네요. 혹시 이런 스타일이 업무 효율에 영향을 주나요?",
    5: "스타트업에서 일해본 경험이 많을 것 같은데, 맞나요?",
    6: "굉장히 편한 복장이네요. 회사에서도 자유로운 분위기를 선호하시는 편인가요?",
    7: "복장의 조합이 개발자다운 스타일인데, 본인의 개발 철학을 한 마디로 표현한다면?",
    8: "혹시 해커톤 같은 행사에 자주 참여하시나요? 이 복장이 해커톤 참가자들에게서 많이 보이더라고요.",
    9: "굉장히 신뢰감 있는 인상이네요. 혹시 팀을 리딩해 본 경험이 있나요?",
    10: "회사에서는 어느 정도의 드레스 코드를 기대하는데, 본인의 스타일을 유지하면서도 이를 조화롭게 맞출 수 있을까요?",
    11:"복장이 특이하네요. 혹시 본인만의 독특한 개발 방식이 있나요?",
    12:"정말 자유로운 스타일이시네요. 개발하면서 가장 중요하게 생각하는 요소는 무엇인가요?",
    13:"혹시 CTO 경험이 있으신가요? 리더십 있는 개발자로 보입니다.",
    14:"이 복장은 거의 창업자의 느낌인데, 혹시 창업 경험이 있나요?",
    15:"신발이 눈에 띄네요. 혹시 어제 사신 건가요?",
    16:"이 복장으로 면접 오신 건 처음 봅니다. 이 스타일이 본인에게 주는 장점이 있나요?"
  };
  
  let currentScene = "start"; 
  let isTyping = false; 
  let typingIndex = 0; 
  let typingInterval; 
  let scores = JSON.parse(localStorage.getItem("scores")) || { 열정: 0, 열린마음: 0, 손님우선: 0, 전문성: 0, 존중과배려: 0 };

  let currentAudio = "fail";

  const interviewResult = localStorage.getItem("interview-dialog");

  const dialog = document.getElementById("dialog");
  const textElement = document.getElementById("text");
  const next = document.getElementById("next");
  const choices = document.getElementById("choices");
  const body = document.body;

  function playSound(soundSrc) {
    if (soundSrc === null) {
      if (currentAudio instanceof Audio) {
        currentAudio.pause();
        currentAudio.currentTime = 0;
        currentAudio = null;
      }
      return;
    }
  
    if (soundSrc && (!(currentAudio instanceof Audio) || currentAudio.src !== soundSrc)) {
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
      localStorage.getItem("totalscores"+totalScore)
      localStorage.getItem("scores"+scores)
      sceneKey = totalScore >= 100 ? "success1" : "fail1";
    }

    const scene = scenes[sceneKey];
    currentScene = sceneKey;

    if (sceneKey === "interview2") {
      const result = parseInt(localStorage.getItem("interview-dialog") || "0");
      const question = interviewQuestions[result] || "회사에서도 자유로운 분위기를 선호하시나요?";
      scene.text = "면접관: " + question;
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

      if (sceneKey === "success1" || sceneKey === "fail1" || sceneKey === "fail_nude") {
        dialog.style.display = "none"; 
        setTimeout(() => {
            showScene(scene.next); 
            dialog.style.display = "block";
        }, 3000);
      } else if (sceneKey === "success3" || sceneKey === "fail4" || sceneKey === "fail_nude4") {
        setTimeout(() => {
            window.location.href = "FinalStats.html"; 
        }, 1000);
      } else if (sceneKey === "subway" || sceneKey === "bus" || sceneKey === "bus_good" || sceneKey === "bus_bad" || sceneKey === "interview_good" || sceneKey === "interview_bad" ||  sceneKey === "bus_good2" ||  sceneKey === "bus_bad2") {
        dialog.style.display = "none"; 
        setTimeout(() => {
            showScene(scene.next); 
            dialog.style.display = "block";
        }, 10);
      } else {
        dialog.style.display = "block"; 
        startTypingEffect(scene.text, () => {
          next.style.display = scene.next ? "block" : "none";
        });
      }
      

    } else if (scene.type === "choice") {

      textElement.style.display = "none";
      next.style.display = "none";
      choices.style.display = "flex";

      choices.innerHTML = "";
      scene.choices.forEach((choice) => {
        const button = document.createElement("div");
        button.classList.add("choice");
        button.textContent = choice.text;
        button.dataset.nextScene = choice.next;
        button.addEventListener("click", () => {
          Object.keys(choice.score).forEach(key => {
            scores[key] += choice.score[key];
          });
          if (currentScene === "choice1" && interviewResult === "0") {
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
        textElement.innerHTML = text.substring(0, typingIndex + 1);
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
    textElement.innerHTML = scene.text; 
    isTyping = false;
    next.style.display = scene.next ? "block" : "none"; 
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
