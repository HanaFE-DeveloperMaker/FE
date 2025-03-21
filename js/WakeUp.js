import { initializeScene } from "./script.js";

const texts = [
  "하아아아아암...",
  "7시에 일어났더니 피곤하네. 면접까지는 좀 시간이 남았는데 10분만 더 잘까?",
];

const endings = {
  sleep: {
    text: "으악! 10분만 잔다는 게 그만... 늦었다! 얼른 일어나서 씻어야지!!",
    background: "url('../assets/late.png')",
    score: { 열정: -10 },
  },
  wash: {
    text: "부지런히 준비하니 여유롭고 좋아~ ♩♪♬",
    background: "url('../assets/breakfast.png')",
    score: { 열정: 10 },
  },
};

initializeScene(texts, endings, "Dress.html");
