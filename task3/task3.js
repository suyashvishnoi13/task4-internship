/* ---------- Quiz Logic ---------- */
const quizData = [
  {
    question: "What does CSS stand for?",
    options: ["Cascading Style Sheets", "Computer Style System", "Colorful Style Sheet"],
    answer: "Cascading Style Sheets"
  },
  {
    question: "Which tag is used for JavaScript?",
    options: ["<script>", "<js>", "<code>"],
    answer: "<script>"
  },
  {
    question: "Which property is used to change text color in CSS?",
    options: ["text-style", "font-color", "color"],
    answer: "color"
  }
];

let current = 0;
const questionEl = document.getElementById("question");
const optionsEl = document.getElementById("options");
const nextBtn = document.getElementById("next-btn");

function loadQuestion() {
  const q = quizData[current];
  questionEl.textContent = q.question;
  optionsEl.innerHTML = "";
  q.options.forEach(opt => {
    const btn = document.createElement("button");
    btn.textContent = opt;
    btn.className = "quiz-option";
    btn.onclick = () => selectOption(opt, q.answer);
    optionsEl.appendChild(btn);
  });
  nextBtn.style.display = "none";
}

function selectOption(selected, correct) {
  Array.from(optionsEl.children).forEach(btn => {
    btn.disabled = true;
    if (btn.textContent === correct) btn.style.background = "#86efac";
    else if (btn.textContent === selected) btn.style.background = "#fca5a5";
  });
  nextBtn.style.display = "block";
}

nextBtn.addEventListener("click", () => {
  current++;
  if (current < quizData.length) loadQuestion();
  else {
    questionEl.textContent = "Quiz Completed 🎉";
    optionsEl.innerHTML = "";
    nextBtn.style.display = "none";
  }
});

loadQuestion();

/* ---------- Image Carousel Logic ---------- */
const images = [
  { url: "https://picsum.photos/id/1015/600/400", caption: "Beautiful Landscape" },
  { url: "https://picsum.photos/id/1025/600/400", caption: "Friendly Dog" },
  { url: "https://picsum.photos/id/1035/600/400", caption: "Mountain Adventure" },
  { url: "https://picsum.photos/id/1045/600/400", caption: "Peaceful Lake" }
];

let currentImage = 0;
const carouselImage = document.getElementById("carousel-image");
const carouselCaption = document.getElementById("carousel-caption");
const prevBtn = document.querySelector(".prev");
const nextBtnCarousel = document.querySelector(".next");

function updateCarousel() {
  carouselImage.style.opacity = 0;
  setTimeout(() => {
    carouselImage.src = images[currentImage].url;
    carouselCaption.textContent = images[currentImage].caption;
    carouselImage.style.opacity = 1;
  }, 300);
}

prevBtn.addEventListener("click", () => {
  currentImage = (currentImage - 1 + images.length) % images.length;
  updateCarousel();
});

nextBtnCarousel.addEventListener("click", () => {
  currentImage = (currentImage + 1) % images.length;
  updateCarousel();
});

updateCarousel();

/* ---------- Fetch API Logic ---------- */
const jokeBtn = document.getElementById("fetch-joke");
const jokeText = document.getElementById("joke-text");

jokeBtn.addEventListener("click", async () => {
  jokeText.textContent = "Fetching a hilarious joke...";
  try {
    const response = await fetch("https://v2.jokeapi.dev/joke/Programming?type=single");
    const data = await response.json();
    jokeText.textContent = data.joke;
  } catch (error) {
    jokeText.textContent = "Failed to fetch a joke 😞";
  }
});
