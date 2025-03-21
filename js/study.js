import { initializeScene } from "./script.js";

const texts = [
  "내일 드디어 하나금융TI 최종 면접이다! 면접 준비를 더 할까, 쉴까?",
  "(따르르릉)",
  "누구지? 이 시간에 전화 올 사람이 없는데.... (딸각)",
  "???: 나 고민이 있는데 혹시 들어줄 수 있어...?",
  "면접까지 12시간 남은 시각<br>가장 친한 친구가 고민을 들어달라 한다... 어떻게 할까?",
];

const endings = {
  study: {
    text: "좀 정리가 되는 것 같아",
    background: "url('../assets/study_more.png')",
  },
  friend: {
    text: "친구: 아니 글쎄 여자친구가 .... ....",
    background: "url('../assets/friend.png')",
  },
  rest: {
    text: "잠도 안오는데 유튜브나 봐야겠다 ~",
    background: "url('../assets/rest.png')",
  },
};

initializeScene(texts, endings, "wake-up.html");
