const nickname = localStorage.getItem("nickname");
const fadeOutOverlay = document.querySelector(".fade-out-overlay");
document.getElementById("nickname").textContent = `안녕하세요, ${nickname}님.`;
setTimeout(() => {
  fadeOutOverlay.style.opacity = "0";

  setTimeout(() => {
    fadeOutOverlay.style.display = "none";
  }, 500);
}, 500);

setTimeout(() => {
  window.location.href = "Base.html";
}, 3000);
