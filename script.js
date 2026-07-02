const masterItems = [
  "Girl in 5 inch heels",
  "Old guy young girl",
  "Guy with huge camera",
  "Kid with giant earmuffs",
  "Someone wearing warbird shirt",
  "Person asking dumb airplane question",
  "Tube top",
  "Sunburned tourist",
  "Guy with too many patches",
  "Person carrying folding chair",
  "Someone blocking the walkway",
  "Matching family shirts",
  "Guy explaining airplane wrong",
  "Someone filming with iPad",
  "Person with umbrella",
  "Kid crying",
  "Someone wearing flight suit",
  "Overpriced food complaint",
  "Lost person staring at map",
  "Guy with binoculars",
  "Someone says Top Gun",
  "Person taking selfie with plane",
  "Someone asks what time Blue Angels fly",
  "Old pilot story",
  "Someone wearing cowboy hat",
  "Person with giant backpack",
  "Someone eating ice cream",
  "Person wearing sandals",
  "Someone asking where bathrooms are",
  "Guy with aviation tattoo",
  "Person standing in wrong line",
  "Someone with radio scanner",
  "Kid on shoulders",
  "Person wearing American flag shirt",
  "Someone says how loud it is",
  "Person with sun hat",
  "Guy wearing cargo shorts",
  "Someone carrying poster",
  "Person looking for shade",
  "Someone drinking giant lemonade",
  "Person with camera lens bigger than arm",
  "Guy talking about owning a plane",
  "Someone wearing old airshow shirt",
  "Person complaining about parking",
  "Someone clapping after flyby",
  "Person with stroller",
  "Someone asking if aircraft is experimental",
  "Person buying airplane toy",
  "Someone wearing aviator sunglasses",
  "Guy telling wife aircraft facts"
];

const board = document.getElementById("bingoBoard");
const message = document.getElementById("message");
const newCardBtn = document.getElementById("newCardBtn");
const resetBtn = document.getElementById("resetBtn");

let currentCard = [];

function shuffle(array) {
  const copy = [...array];

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }

  return copy;
}

function createNewCard() {
  const shuffled = shuffle(masterItems);
  currentCard = shuffled.slice(0, 24);
  currentCard.splice(12, 0, "FREE");

  renderBoard();
  message.textContent = "New card generated. Tap squares as you spot them.";
}

function renderBoard() {
  board.innerHTML = "";

  currentCard.forEach((item, index) => {
    const square = document.createElement("button");
    square.type = "button";
    square.className = "bingo-square";
    square.textContent = item;
    square.dataset.index = index;

    if (item === "FREE") {
      square.classList.add("free", "marked");
    }

    square.addEventListener("click", () => {
      square.classList.toggle("marked");
      checkForBingo();
    });

    board.appendChild(square);
  });
}

function resetMarks() {
  const squares = document.querySelectorAll(".bingo-square");

  squares.forEach((square, index) => {
    square.classList.remove("marked", "winning");

    if (index === 12) {
      square.classList.add("marked", "free");
    }
  });

  message.textContent = "Marks reset.";
}

function checkForBingo() {
  const squares = Array.from(document.querySelectorAll(".bingo-square"));

  squares.forEach(square => square.classList.remove("winning"));

  const winningLines = [
    [0, 1, 2, 3, 4],
    [5, 6, 7, 8, 9],
    [10, 11, 12, 13, 14],
    [15, 16, 17, 18, 19],
    [20, 21, 22, 23, 24],
    [0, 5, 10, 15, 20],
    [1, 6, 11, 16, 21],
    [2, 7, 12, 17, 22],
    [3, 8, 13, 18, 23],
    [4, 9, 14, 19, 24],
    [0, 6, 12, 18, 24],
    [4, 8, 12, 16, 20]
  ];

  for (const line of winningLines) {
    const isWinner = line.every(index => squares[index].classList.contains("marked"));

    if (isWinner) {
      line.forEach(index => squares[index].classList.add("winning"));
      message.textContent = "BINGO!";
      return;
    }
  }

  message.textContent = "Keep looking.";
}

newCardBtn.addEventListener("click", createNewCard);
resetBtn.addEventListener("click", resetMarks);

createNewCard();
