
let vocabulary = [...WORDS];
let currentIndex = 0;
let meaningVisible = true;

const wordEl = document.getElementById("word");
const meaningEl = document.getElementById("meaning");
const counterEl = document.getElementById("counter");
const progressEl = document.getElementById("progress-bar");

const prevBtn = document.getElementById("prev-btn");
const nextBtn = document.getElementById("next-btn");
const soundBtn = document.getElementById("sound-btn");
const meaningBtn = document.getElementById("meaning-btn");
const shuffleBtn = document.getElementById("shuffle-btn");

function showWord() {
  if (vocabulary.length === 0) {
    wordEl.textContent = "단어가 없습니다";
    meaningEl.textContent = "words.js에 단어를 추가하세요";
    counterEl.textContent = "0 / 0";
    progressEl.style.width = "0%";
    prevBtn.disabled = true;
    nextBtn.disabled = true;
    soundBtn.disabled = true;
    meaningBtn.disabled = true;
    shuffleBtn.disabled = true;
    return;
  }

  const current = vocabulary[currentIndex];

  wordEl.textContent = current.word;
  meaningEl.textContent = meaningVisible
    ? current.meaning
    : "••••••";

  counterEl.textContent =
    `${currentIndex + 1} / ${vocabulary.length}`;

  progressEl.style.width =
    `${((currentIndex + 1) / vocabulary.length) * 100}%`;

  prevBtn.disabled = currentIndex === 0;
  nextBtn.disabled =
    currentIndex === vocabulary.length - 1;

  meaningBtn.textContent = meaningVisible
    ? "뜻 가리기"
    : "뜻 보기";
}

function changeWord(direction) {
  const nextIndex = currentIndex + direction;

  if (nextIndex < 0 ||
      nextIndex >= vocabulary.length) {
    return;
  }

  currentIndex = nextIndex;
  showWord();
}

function toggleMeaning() {
  meaningVisible = !meaningVisible;
  showWord();
}

function playSound() {
  if (!("speechSynthesis" in window)) {
    alert("이 브라우저는 발음 기능을 지원하지 않습니다.");
    return;
  }

  speechSynthesis.cancel();

  const speech = new SpeechSynthesisUtterance(
    vocabulary[currentIndex].word
  );

  speech.lang = "en-US";
  speech.rate = 0.85;

  speechSynthesis.speak(speech);
}

function shuffleWords() {
  for (let i = vocabulary.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));

    [vocabulary[i], vocabulary[j]] =
      [vocabulary[j], vocabulary[i]];
  }

  currentIndex = 0;
  showWord();
}

prevBtn.addEventListener("click", () => {
  changeWord(-1);
});

nextBtn.addEventListener("click", () => {
  changeWord(1);
});

meaningBtn.addEventListener("click", toggleMeaning);
soundBtn.addEventListener("click", playSound);
shuffleBtn.addEventListener("click", shuffleWords);

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft") {
    changeWord(-1);
  }

  if (event.key === "ArrowRight") {
    changeWord(1);
  }
});

showWord();
