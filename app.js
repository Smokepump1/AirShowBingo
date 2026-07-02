const MASTER_ITEMS = [
  "Old man / young wife-girlfriend",
  "Plaid pants / striped shirt",
  "Tiger tail on butt",
  "Sandals with white socks",
  "Sandals with black socks",
  "Hat with air sock or flag",
  "T-shirt too small",
  "Augmented breast",
  "Young man / older wife-girlfriend",
  "Impatient wife",
  "400 lbs plus",
  "Sleeveless shirt",
  "Full-arm tattoo",
  "Neck or face tattoo",
  "Facial piercings",
  "Gauged ears",
  "Man boobs — C cup or better",
  "3-wheel scooter",
  "4-wheel scooter",
  "Sun 'n Fun shirt 10+ years old",
  "Oshkosh shirt 10+ years old",
  "Beard to chest",
  "See-through shirt — female",
  "Overalls",
  "Hat pins",
  "Wife beater",
  "Tank top — no bra",
  "Underwear showing",
  "T-shirt too small / belly showing",
  "Fanny pack",
  "Camo pants",
  "Aviation sex shirt — Remove Before Flight",
  "Radio Flyer wagon",
  "Fisherman's vest",
  "Tube top",
  "Man capri pants / knickers",
  "Man in pink shirt",
  "Butt cheeks out of shorts/skirt",
  "3-inch heels or higher",
  "Mennonites",
  "Fishing flap hat",
  "Farmer's tan",
  "Family with 6 kids",
  "Mohawk",
  "Sweat band"
];

const grid = document.getElementById("bingoGrid");
const statusBox = document.getElementById("status");
const itemList = document.getElementById("itemList");
const newCardBtn = document.getElementById("newCardBtn");
const resetMarksBtn = document.getElementById("resetMarksBtn");

let currentCard = [];

function shuffle(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function generateCard() {
  const needed = 24;
  if (MASTER_ITEMS.length < needed) {
    statusBox.textContent = `Need at least ${needed} items. Add more items in app.js.`;
    return;
  }

  const picks = shuffle(MASTER_ITEMS).slice(0, needed);
  currentCard = [];
  let pickIndex = 0;

  for (let i = 0; i < 25; i++) {
    if (i === 12) {
      currentCard.push({ text: "FREE", marked: true, free: true });
    } else {
      currentCard.push({ text: picks[pickIndex++], marked: false, free: false });
    }
  }

  renderCard();
  setStatus("New card generated. Tap squares as you spot them.");
}

function renderCard(winLine = []) {
  grid.innerHTML = "";
  currentCard.forEach((cell, index) => {
    const square = document.createElement("button");
    square.className = "square";
    if (cell.marked) square.classList.add("marked");
    if (cell.free) square.classList.add("free");
    if (winLine.includes(index)) square.classList.add("win-square");
    square.textContent = cell.text;
    square.addEventListener("click", () => toggleSquare(index));
    grid.appendChild(square);
  });
}

function toggleSquare(index) {
  if (!currentCard.length) return;
  if (currentCard[index].free) return;
  currentCard[index].marked = !currentCard[index].marked;
  const winLine = checkBingo();
  renderCard(winLine || []);
  if (winLine) {
    setStatus("BINGO! You got a full row, column, or diagonal.", true);
  } else {
    const markedCount = currentCard.filter(c => c.marked).length;
    setStatus(`${markedCount} squares marked. Keep looking.`);
  }
}

function checkBingo() {
  const lines = [];
  for (let r = 0; r < 5; r++) lines.push([r*5, r*5+1, r*5+2, r*5+3, r*5+4]);
  for (let c = 0; c < 5; c++) lines.push([c, c+5, c+10, c+15, c+20]);
  lines.push([0, 6, 12, 18, 24]);
  lines.push([4, 8, 12, 16, 20]);
  return lines.find(line => line.every(index => currentCard[index].marked));
}

function resetMarks() {
  currentCard = currentCard.map((cell, index) => ({
    ...cell,
    marked: index === 12
  }));
  renderCard();
  setStatus("Marks reset. Same card, clean board.");
}

function setStatus(message, win = false) {
  statusBox.textContent = message;
  statusBox.classList.toggle("win", win);
}

function renderItemList() {
  itemList.innerHTML = "";
  MASTER_ITEMS.forEach(item => {
    const li = document.createElement("li");
    li.textContent = item;
    itemList.appendChild(li);
  });
}

newCardBtn.addEventListener("click", generateCard);
resetMarksBtn.addEventListener("click", resetMarks);

renderItemList();
generateCard();
