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

// DOM 요소
const elements = {
  clothesItems: document.querySelectorAll(".clothes"),
  container: document.querySelector(".container"),
  resetButton: document.getElementById("resetButton"),
  completeButton: document.getElementById("completeButton"),
  modal: document.getElementById("confirmModal"),
  modalConfirm: document.getElementById("modalConfirm"),
  modalCancel: document.getElementById("modalCancel"),
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
  loadSavedClothes() {
    Object.entries(STORAGE_KEYS).forEach(([key, storageKey]) => {
      const savedValue = localStorage.getItem(storageKey);
      if (savedValue && savedValue !== `${key.toLowerCase()}0`) {
        if (key === "SHOES") {
          const shoesNumber = savedValue.match(/shoes(\d)/)[1];
          this.addShoesPair(shoesNumber);
        } else {
          this.addClothes(`../assets/cloth/${savedValue}.png`, [savedValue]);
        }
      }
    });
  }
}

// 로컬 스토리지 관리 클래스
class StorageManager {
  static saveClothes(clothesType, value) {
    localStorage.setItem(clothesType, value || `${clothesType}0`);
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
  }

  setupEventListeners() {
    // 드래그 이벤트
    elements.clothesItems.forEach((clothes) => {
      clothes.addEventListener("dragstart", () =>
        clothes.classList.add("dragging")
      );
      clothes.addEventListener("dragend", () =>
        clothes.classList.remove("dragging")
      );
    });

    // 드롭 이벤트
    elements.container.addEventListener("dragover", (e) => e.preventDefault());
    elements.container.addEventListener("drop", this.handleDrop.bind(this));

    // 버튼 이벤트
    elements.resetButton.addEventListener("click", this.handleReset.bind(this));
    elements.completeButton.addEventListener(
      "click",
      () => (elements.modal.style.display = "flex")
    );
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

    // 페이지 로드 시 저장된 의상 불러오기
    window.addEventListener("load", () =>
      this.clothesManager.loadSavedClothes()
    );
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
      ".dropped.shirt1, .dropped.shirt2, .dropped.shirt3"
    );
    this.clothesManager.addClothes(draggedClothes.src, [`shirt${shirtNumber}`]);
  }

  handlePantsDrop(draggedClothes) {
    const pantsNumber = draggedClothes.src.match(/pants(\d)/)[1];
    this.clothesManager.removeClothes(
      ".dropped.pants1, .dropped.pants2, .dropped.pants3"
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
    location.href = "transport.html";
  }
}

// 초기화
const clothesManager = new ClothesManager();
new EventHandlers(clothesManager);
