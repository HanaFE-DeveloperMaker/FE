// 상수 정의
const CLOTHES_TYPES = {
  HAIR: "hair",
  SHIRT: "shirt",
  PANTS: "pants",
  ACCESSARY: "accessary",
  SHOES: "shoes",
};

const STORAGE_KEYS = {
  HAIR: "hair",
  SHIRT: "shirt",
  PANTS: "pants",
  ACCESSARY: "accessary",
  SHOES: "shoes",
};

// 로컬 스토리지에서 면접 대사 값 가져오기
const getInterviewValue = () => {
  const hair = localStorage.getItem("hair");
  const shirt = localStorage.getItem("shirt");
  const pants = localStorage.getItem("pants");
  const shoes = localStorage.getItem("shoes");

  // 카테고리별 그룹화
  const hairGroup1 = ["hair2", "hair3"]; // 장발/단발
  const hairGroup2 = ["hair0", "hair1"]; // 탈모/대머리
  const shirtGroup1 = ["shirt3", "shirt4"]; // 목폴라/와이셔츠
  const shirtGroup2 = ["shirt1", "shirt2"]; // 반팔/후드티
  const pantsGroup1 = ["pants3", "pants4"]; // 청바지/슬랙스
  const pantsGroup2 = ["pants1", "pants2"]; // 반바지/추리닝
  const shoesGroup1 = ["shoes3-1", "shoes4-1"]; // 운동화/구두
  const shoesGroup2 = ["shoes1-1", "shoes2-1"]; // 양말/슬리퍼

  // 이스터에그 체크
  if (shirt === "shirt0" || pants === "pants0" || shoes === "shoes0") {
    return 0; // 대중교통에서 쫓겨남
  } else {
    let value = 0;
    if (hairGroup1.includes(hair)) value += 0;
    if (hairGroup2.includes(hair)) value += 8;
    if (shirtGroup1.includes(shirt)) value += 0;
    if (shirtGroup2.includes(shirt)) value += 4;
    if (pantsGroup1.includes(pants)) value += 0;
    if (pantsGroup2.includes(pants)) value += 2;
    if (shoesGroup1.includes(shoes)) value += 0;
    if (shoesGroup2.includes(shoes)) value += 1;
    return value + 1;
  }
};

// DOM 요소
const elements = {
  clothesItems: document.querySelectorAll(".clothes"),
  container: document.querySelector(".container"),
  resetButton: document.getElementById("resetButton"),
  completeButton: document.getElementById("completeButton"),
  modal: document.getElementById("confirmModal"),
  modalConfirm: document.getElementById("modalConfirm"),
  modalCancel: document.getElementById("modalCancel"),
  loadingContainer: document.querySelector(".loading-container"),
};

// 의상 관리 클래스
class ClothesManager {
  constructor() {
    this.container = elements.container;
  }

  // 의상 제거
  removeClothes(selector) {
    const clothes = this.container.querySelectorAll(selector);
    clothes.forEach((item) => item.remove());
  }

  // 의상 추가
  addClothes(src, classes) {
    const newClothes = document.createElement("img");
    newClothes.src = src;
    newClothes.classList.add("clothes", "dropped", ...classes);
    this.container.appendChild(newClothes);
  }

  // 신발 쌍 추가
  addShoesPair(shoesNumber) {
    this.removeClothes('[class*="shoes"]');

    // 왼쪽 신발
    this.addClothes(`../assets/cloth/shoes${shoesNumber}-1.png`, [
      `shoes${shoesNumber}-1`,
    ]);

    // 오른쪽 신발
    this.addClothes(`../assets/cloth/shoes${shoesNumber}-2.png`, [
      `shoes${shoesNumber}-2`,
    ]);
  }

  // 저장된 의상 불러오기
  async loadSavedClothes() {
    const loadPromises = [];

    Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
      const savedValue = localStorage.getItem(storageKey);
      if (savedValue && savedValue !== `${key.toLowerCase()}0`) {
        const loadPromise = new Promise((resolve) => {
          if (key === "SHOES") {
            const shoesNumber = savedValue.match(/shoes(\d)/)[1];
            this.addShoesPair(shoesNumber);
            resolve();
          } else {
            const img = new Image();
            img.onload = () => {
              this.addClothes(`../assets/cloth/${savedValue}.png`, [
                savedValue,
              ]);
              resolve();
            };
            img.onerror = resolve; // 에러가 발생해도 다음 단계로 진행
            img.src = `../assets/cloth/${savedValue}.png`;
          }
        });
        loadPromises.push(loadPromise);
      }
    });

    // 모든 의상이 로드될 때까지 대기
    await Promise.all(loadPromises);
  }
}

// 로컬 스토리지 관리 클래스
class StorageManager {
  static saveClothes(clothesType, value) {
    localStorage.setItem(clothesType, value || `${clothesType}0`);
    localStorage.setItem("interview-dialog", getInterviewValue());
  }

  static clearAll() {
    Object.values(STORAGE_KEYS).forEach((key) => localStorage.removeItem(key));
  }
}

// 이벤트 핸들러 클래스
class EventHandlers {
  constructor(clothesManager) {
    this.clothesManager = clothesManager;
    this.setupEventListeners();
    this.handlePageLoad();
  }

  setupEventListeners() {
    // 드래그 이벤트
    elements.clothesItems.forEach((clothes) => {
      clothes.addEventListener("dragstart", () => {
        clothes.classList.add("dragging");
      });
      clothes.addEventListener("dragend", () => {
        clothes.classList.remove("dragging");
        document.body.style.cursor =
          "url('../assets/global/cursor.png') 50 5, auto";
      });
    });

    // 드롭 이벤트
    elements.container.addEventListener("dragover", (e) => {
      e.preventDefault();
    });
    elements.container.addEventListener("dragleave", () => {
      document.body.style.cursor =
        "url('../assets/global/cursor.png') 50 5, auto";
    });
    elements.container.addEventListener("drop", (e) => {
      document.body.style.cursor =
        "url('../assets/global/cursor.png') 50 5, auto";
      this.handleDrop(e);
    });

    // 드롭된 옷 클릭 이벤트 추가
    elements.container.addEventListener("click", (e) => {
      if (
        e.target.classList.contains("clothes") &&
        e.target.classList.contains("dropped")
      ) {
        e.target.remove(); // 클릭한 옷 제거
      }
    });

    // 버튼 이벤트
    elements.resetButton.addEventListener("click", this.handleReset.bind(this));
    elements.completeButton.addEventListener(
      "click",
      () => (elements.modal.style.display = "flex")
    );

    // 모달 확인 버튼 이벤트 추가
    elements.modalConfirm.addEventListener(
      "click",
      this.handleComplete.bind(this)
    );

    elements.modalCancel.addEventListener(
      "click",
      () => (elements.modal.style.display = "none")
    );
    elements.modal.addEventListener("click", (e) => {
      if (e.target === elements.modal) elements.modal.style.display = "none";
    });

    // 잘라내기 버튼 이벤트 추가
    document
      .getElementById("cropButton")
      .addEventListener("click", this.handleCrop.bind(this));
  }

  async handlePageLoad() {
    try {
      // 모든 이미지가 로드될 때까지 대기
      await this.waitForImages();

      // 저장된 의상 불러오기
      await this.clothesManager.loadSavedClothes();

      // 5초 대기 (로딩 스피너 확인용)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      // 로딩 스피너 페이드 아웃
      elements.loadingContainer.classList.add("fade-out");

      // 로딩 스피너 제거
      setTimeout(() => {
        elements.loadingContainer.style.display = "none";
      }, 500);
    } catch (error) {
      console.error("페이지 로드 중 오류 발생:", error);
      // 오류 발생 시에도 로딩 스피너 제거
      elements.loadingContainer.style.display = "none";
    }
  }

  waitForImages() {
    return new Promise((resolve) => {
      const images = document.querySelectorAll("img");
      let loadedImages = 0;

      const imageLoadPromises = Array.from(images).map((img) => {
        if (img.complete) {
          loadedImages++;
          return Promise.resolve();
        }
        return new Promise((resolve) => {
          img.onload = () => {
            loadedImages++;
            resolve();
          };
          img.onerror = () => {
            loadedImages++;
            resolve();
          };
        });
      });

      Promise.all(imageLoadPromises).then(resolve);
    });
  }

  handleDrop(e) {
    e.preventDefault();
    const rect = elements.container.getBoundingClientRect();
    if (!this.isDropInContainer(e, rect)) return;

    const draggedClothes = document.querySelector(".dragging");
    if (!draggedClothes) return;

    this.processDroppedClothes(draggedClothes);
  }

  isDropInContainer(e, rect) {
    return (
      e.clientX >= rect.left &&
      e.clientX <= rect.right &&
      e.clientY >= rect.top &&
      e.clientY <= rect.bottom
    );
  }

  processDroppedClothes(draggedClothes) {
    const src = draggedClothes.src;
    if (src.includes(CLOTHES_TYPES.HAIR)) {
      this.handleHairDrop(draggedClothes);
    } else if (src.includes(CLOTHES_TYPES.SHIRT)) {
      this.handleShirtDrop(draggedClothes);
    } else if (src.includes(CLOTHES_TYPES.PANTS)) {
      this.handlePantsDrop(draggedClothes);
    } else if (src.includes(CLOTHES_TYPES.ACCESSARY)) {
      this.handleAccessaryDrop(draggedClothes);
    } else if (src.includes(CLOTHES_TYPES.SHOES)) {
      this.handleShoesDrop(draggedClothes);
    }
  }

  handleHairDrop(draggedClothes) {
    const hairNumber = draggedClothes.src.match(/hair(\d)/)[1];
    this.clothesManager.removeClothes(
      ".dropped.hair1, .dropped.hair2, .dropped.hair3"
    );
    this.clothesManager.addClothes(draggedClothes.src, [`hair${hairNumber}`]);
  }

  handleShirtDrop(draggedClothes) {
    const shirtNumber = draggedClothes.src.match(/shirt(\d)/)[1];
    this.clothesManager.removeClothes(
      ".dropped.shirt0, .dropped.shirt1, .dropped.shirt2, .dropped.shirt3, .dropped.shirt4"
    );
    this.clothesManager.addClothes(draggedClothes.src, [`shirt${shirtNumber}`]);
  }

  handlePantsDrop(draggedClothes) {
    const pantsNumber = draggedClothes.src.match(/pants(\d)/)[1];
    this.clothesManager.removeClothes(
      ".dropped.pants0, .dropped.pants1, .dropped.pants2, .dropped.pants3, .dropped.pants4"
    );
    this.clothesManager.addClothes(draggedClothes.src, [`pants${pantsNumber}`]);
  }

  handleAccessaryDrop(draggedClothes) {
    const accessaryNumber = draggedClothes.src.match(/accessary(\d)/)[1];
    this.clothesManager.removeClothes(
      ".dropped.accessary1, .dropped.accessary2, .dropped.accessary3, .dropped.accessary4, .dropped.accessary5"
    );
    this.clothesManager.addClothes(draggedClothes.src, [
      `accessary${accessaryNumber}`,
    ]);
  }

  handleShoesDrop(draggedClothes) {
    const shoesNumber = draggedClothes.src.match(/shoes(\d)/)[1];
    this.clothesManager.addShoesPair(shoesNumber);
  }

  handleReset() {
    this.clothesManager.removeClothes(".dropped");
    StorageManager.clearAll();
  }

  handleComplete() {
    const currentClothes = {
      hair: elements.container.querySelector('.dropped[class*="hair"]'),
      shirt: elements.container.querySelector('.dropped[class*="shirt"]'),
      pants: elements.container.querySelector('.dropped[class*="pants"]'),
      accessary: elements.container.querySelector(
        '.dropped[class*="accessary"]'
      ),
      shoes: elements.container.querySelector('.dropped[class*="shoes"]'),
    };

    Object.entries(currentClothes).forEach(([type, element]) => {
      if (element) {
        const className = Array.from(element.classList).find((cls) =>
          cls.startsWith(type)
        );
        StorageManager.saveClothes(type, className);
      } else {
        StorageManager.saveClothes(type, `${type}0`);
      }
    });

    elements.modal.style.display = "none";
    location.href = "Transport.html";
  }

  handleCrop() {
    const container = document.querySelector(".container");

    // html2canvas를 사용하여 .container를 캡처
    html2canvas(container)
      .then((canvas) => {
        // 캡처된 이미지를 데이터 URL로 변환
        const croppedImageDataUrl = canvas.toDataURL();

        // 다음 페이지로 이동하면서 데이터 URL 전달
        localStorage.setItem("croppedImage", croppedImageDataUrl);
        location.href = "./nextPage.html"; // 다음 페이지로 이동
      })
      .catch((error) => {
        console.error("캡처 중 오류 발생:", error);
      });
  }
}

// 초기화
const clothesManager = new ClothesManager();
new EventHandlers(clothesManager);
