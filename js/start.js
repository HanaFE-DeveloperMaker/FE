document.addEventListener("DOMContentLoaded", function () {
  const startButton = document.getElementById("startButton");
  const nickname = document.querySelector("input");

  startButton.addEventListener("click", function () {
    if (nickname.value.length == 0) {
      alert('닉네임을 입력해주세요 !');
      return ;
    }

    localStorage.setItem("nickname", nickname.value);

    window.location.href = "study.html";
  });
});
