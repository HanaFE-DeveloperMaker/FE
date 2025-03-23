const nickname = localStorage.getItem("nickname");
document.getElementById("nickname").textContent = `안녕하세요, ${nickname}님.`;
setTimeout(() => {
    window.location.href = "Base.html";
}, 3000);