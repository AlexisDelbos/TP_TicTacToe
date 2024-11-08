// Liste des images de profil
const arr_profilImages = [
  "./assets/images/profil/1.png",
  "./assets/images/profil/2.png",
  "./assets/images/profil/3.png",
  "./assets/images/profil/4.png",
  "./assets/images/profil/5.png",
  "./assets/images/profil/6.png",
  "./assets/images/profil/7.png",
  "./assets/images/profil/8.png",
];

let completeGameModeName;

// Taille de la grille
let gameModeSize;

document
  .querySelector("#header__btn_play")
  .addEventListener("click", function () {
    setTimeout(() => {
      this.style.display = "none";

      document.querySelector("#header").classList.add("header--shrink");
      document
        .querySelector("#header__title")
        .classList.add("header__title--fz25");
    }, "250");

    document.querySelector("#main").style.display = "flex";
  });

const elements = document.querySelectorAll(".main__choice-mode");
elements.forEach((el) => {
  el.addEventListener("click", function () {
    document.querySelector(".main__choice-game").style.display = "none";
    document.querySelector("#main__player-names").style.display = "flex";
    completeGameModeName = this.innerText.trim();
    gameModeSize = parseInt(completeGameModeName);
  });
});

const btn_imgPlayerOne = document.querySelectorAll(
  ".main__player-names-playerOne .main__images-list-item"
);
const btn_imgPlayerTwo = document.querySelectorAll(
  ".main__player-names-playerTwo .main__images-list-item"
);

if (
  btn_imgPlayerOne.length === arr_profilImages.length &&
  btn_imgPlayerTwo.length === arr_profilImages.length
) {
  arr_profilImages.forEach((imgSrc, index) => {
    const imgTagOne = document.createElement("img");
    imgTagOne.src = imgSrc;
    imgTagOne.alt = `Profil image ${index + 1}`;
    imgTagOne.classList.add("main__images-list-item-img");

    btn_imgPlayerOne[index].appendChild(imgTagOne);

    const imgTagTwo = document.createElement("img");
    imgTagTwo.src = imgSrc;
    imgTagTwo.alt = `Profil image ${index + 1}`;
    imgTagTwo.classList.add("main__images-list-item-img");

    btn_imgPlayerTwo[index].appendChild(imgTagTwo);
  });
} else {
  console.log("The number of <li> is not equal to the profil images !");
}

btn_imgPlayerOne.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const avatar = document.querySelector(".main__playerOne-img-container img");

    avatar.src = `${e.target.src}`;
    avatar.alt = `${e.target.alt}`;
  });
});

btn_imgPlayerTwo.forEach((btn) => {
  btn.addEventListener("click", function (e) {
    const avatar = document.querySelector(".main__playerTwo-img-container img");

    avatar.src = `${e.target.src}`;
    avatar.alt = `${e.target.alt}`;
  });
});

// Bouton prêt pour démarrer la partie
const btn_ready = document.querySelector(".main__btn_ready");

btn_ready.addEventListener("click", function () {
  const playerOneInput = document.querySelector("#playerOne");
  const playerTwoInput = document.querySelector("#playerTwo");

  let playerOneName = playerOneInput.value;
  let playerTwoName = playerTwoInput.value;

  if (!playerOneName) {
    playerOneName = "Player One";
  }

  if (!playerTwoName) {
    playerTwoName = "Player Two";
  }

  const imageList = document.querySelectorAll(".main__images-list");
  imageList.forEach((list) => (list.style.display = "none"));
  btn_ready.style.display = "none";

  const playerOneContainer = document.querySelector(
    ".main__player-names-playerOne"
  );
  const playerTwoContainer = document.querySelector(
    ".main__player-names-playerTwo"
  );

  playerOneContainer.classList.add("move-left");
  playerTwoContainer.classList.add("move-right");

  setTimeout(() => {
    document.querySelector("#main__player-names").style.display = "none";
    document.querySelector("#game-container").style.display = "flex";
  }, 800);

  document.querySelector(
    ".main__game-mode-title"
  ).innerText = `${completeGameModeName}`;

  document.querySelector(
    ".main__game-playerOne h3"
  ).innerText = `${playerOneName}`;
  document.querySelector(
    ".main__game-playerTwo h3"
  ).innerText = `${playerTwoName}`;

  createGrid(gameModeSize);
});
function createGrid(size) {
  const container = document.querySelector(".game-container__grid");

  container.innerHTML = '';

  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const divEl = document.createElement("div");
    divEl.classList.add("game-container__grid-square");
    divEl.setAttribute("data-index", i);
    container.appendChild(divEl);
  }

  squares = document.querySelectorAll('.game-container__grid-square');
  squares.forEach(square => {
    square.textContent = '';
  });

  gameEnded = false;
  currentPlayer = 'X';
  // updateEndMessage();
}



let isVsAI = false;  
const gameGrid = document.querySelector(".game-container__grid");
const gameMessage = document.querySelector("#game-message");
let currentPlayer = "X";
let squares = [];
let gameEnded = false;

gameGrid.addEventListener("click", (e) => {
  if (gameEnded) return; 

  if (e.target && e.target.classList.contains("game-container__grid-square") && e.target.textContent === '') {
    e.target.textContent = currentPlayer; 
    checkWinner(currentPlayer); 
    togglePlayer();
    if (currentPlayer === "O" && isVsAI && !gameEnded) {
      setTimeout(aiMove, 500);
    }
  }
});


function togglePlayer() {
  if (currentPlayer === "X") {
    currentPlayer = "O"; 
  } else {
    currentPlayer = "X";  
  }
}

function updateEndMessage() {
  if (gameEnded) {
    gameMessage.textContent = `${currentPlayer} wins!`;
    showVictory();
  } else {
    gameMessage.textContent = `${currentPlayer}'s turn!`;
    showDefeat();
  }
}


const winning_combinations = {
  3: [
    // Lignes horizontales
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    // Colonnes verticales
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    // Diagonales
    [0, 4, 8], [2, 4, 6]
  ],
  4: [
    // Lignes horizontales
    [0, 1, 2], [1, 2, 3], [4, 5, 6], [5, 6, 7], [8, 9, 10], [9, 10, 11], [12, 13, 14], [13, 14, 15],
    // Colonnes verticales
    [0, 4, 8], [1, 5, 9], [2, 6, 10], [3, 7, 11], [4, 8, 12], [5, 9, 13], [6, 10, 14], [7, 11, 15],
    // Diagonales descendantes
    [0, 5, 10], [1, 6, 11], [2, 7, 12], [3, 8, 13],
    // Diagonales montantes
    [3, 6, 9], [2, 5, 8], [1, 4, 7], [0, 3, 6]
  ],
  5: [
    // Lignes horizontales
    [0, 1, 2], [1, 2, 3], [2, 3, 4],
    [5, 6, 7], [6, 7, 8], [7, 8, 9], [10, 11, 12], [11, 12, 13], [12, 13, 14],
    [15, 16, 17], [16, 17, 18], [17, 18, 19], [20, 21, 22], [21, 22, 23], [22, 23, 24],
    // Colonnes verticales
    [0, 5, 10], [1, 6, 11], [2, 7, 12], [3, 8, 13], [4, 9, 14],
    [5, 10, 15], [6, 11, 16], [7, 12, 17], [8, 13, 18], [9, 14, 19],
    // Diagonales descendantes
    [0, 6, 12], [1, 7, 13], [2, 8, 14], [3, 9, 15], [4, 10, 16],
    // Diagonales montantes
    [4, 8, 12], [3, 7, 11], [2, 6, 10], [1, 5, 9], [0, 4, 8]
  ],
  6: [
    // Lignes horizontales
    [0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5],
    [6, 7, 8], [7, 8, 9], [8, 9, 10], [9, 10, 11],
    [12, 13, 14], [13, 14, 15], [14, 15, 16], [15, 16, 17],
    [18, 19, 20], [19, 20, 21], [20, 21, 22], [21, 22, 23],
    [24, 25, 26], [25, 26, 27], [26, 27, 28], [27, 28, 29],
    [30, 31, 32], [31, 32, 33], [32, 33, 34], [33, 34, 35],
    // Colonnes verticales
    [0, 6, 12], [1, 7, 13], [2, 8, 14], [3, 9, 15], [4, 10, 16],
    [5, 11, 17], [6, 12, 18], [7, 13, 19], [8, 14, 20], [9, 15, 21],
    [10, 16, 22], [11, 17, 23], [12, 18, 24], [13, 19, 25],
    [14, 20, 26], [15, 21, 27], [16, 22, 28], [17, 23, 29],
    // Diagonales descendantes
    [0, 7, 14], [1, 8, 15], [2, 9, 16], [3, 10, 17], [4, 11, 18],
    [5, 12, 19], [6, 13, 20], [7, 14, 21], [8, 15, 22],
    // Diagonales montantes
    [5, 10, 15], [6, 11, 16], [7, 12, 17], [8, 13, 18],
    [9, 14, 19], [10, 15, 20], [11, 16, 21], [12, 17, 22]
  ],
  7: [
    // Lignes horizontales (pour chaque ligne, 5 possibilités d'aligner 3 cases)
    [0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6],
    [7, 8, 9], [8, 9, 10], [9, 10, 11], [10, 11, 12], [11, 12, 13],
    [14, 15, 16], [15, 16, 17], [16, 17, 18], [17, 18, 19], [18, 19, 20],
    [21, 22, 23], [22, 23, 24], [23, 24, 25], [24, 25, 26], [25, 26, 27],
    [28, 29, 30], [29, 30, 31], [30, 31, 32], [31, 32, 33], [32, 33, 34],
    [35, 36, 37], [36, 37, 38], [37, 38, 39], [38, 39, 40], [39, 40, 41],
    [42, 43, 44], [43, 44, 45], [44, 45, 46], [45, 46, 47], [46, 47, 48],

    // Colonnes verticales (pour chaque colonne, 5 possibilités d'aligner 3 cases)
    [0, 7, 14], [1, 8, 15], [2, 9, 16], [3, 10, 17], [4, 11, 18],
    [5, 12, 19], [6, 13, 20], [7, 14, 21], [8, 15, 22], [9, 16, 23],
    [10, 17, 24], [11, 18, 25], [12, 19, 26], [13, 20, 27], [14, 21, 28],
    [15, 22, 29], [16, 23, 30], [17, 24, 31], [18, 25, 32], [19, 26, 33],
    [20, 27, 34], [21, 28, 35], [22, 29, 36], [23, 30, 37], [24, 31, 38],
    [25, 32, 39], [26, 33, 40], [27, 34, 41], [28, 35, 42], [29, 36, 43],
    [30, 37, 44], [31, 38, 45], [32, 39, 46], [33, 40, 47], [34, 41, 48],
    [35, 42, 49],

    // Diagonales descendantes
    [0, 8, 16], [1, 9, 17], [2, 10, 18], [3, 11, 19], [4, 12, 20],
    [7, 15, 23], [8, 16, 24], [9, 17, 25], [10, 18, 26], [11, 19, 27],
    [14, 22, 30], [15, 23, 31], [16, 24, 32], [17, 25, 33], [18, 26, 34],
    [21, 29, 37], [22, 30, 38], [23, 31, 39], [24, 32, 40], [25, 33, 41],
    [28, 36, 44], [29, 37, 45], [30, 38, 46], [31, 39, 47], [32, 40, 48],

    // Diagonales montantes
    [6, 12, 18], [5, 11, 17], [4, 10, 16], [3, 9, 15], [2, 8, 14],
    [13, 19, 25], [12, 18, 24], [11, 17, 23], [10, 16, 22], [9, 15, 21],
    [20, 26, 32], [19, 25, 31], [18, 24, 30], [17, 23, 29], [16, 22, 28],
    [27, 33, 39], [26, 32, 38], [25, 31, 37], [24, 30, 36], [23, 29, 35],
    [34, 40, 46], [33, 39, 45], [32, 38, 44], [31, 37, 43], [30, 36, 42]
  ],
  8: [
    // Lignes horizontales
    [0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7],
    [8, 9, 10], [9, 10, 11], [10, 11, 12], [11, 12, 13], [12, 13, 14], [13, 14, 15],
    [16, 17, 18], [17, 18, 19], [18, 19, 20], [19, 20, 21], [20, 21, 22], [21, 22, 23],
    [24, 25, 26], [25, 26, 27], [26, 27, 28], [27, 28, 29], [28, 29, 30], [29, 30, 31],
    [32, 33, 34], [33, 34, 35], [34, 35, 36], [35, 36, 37], [36, 37, 38], [37, 38, 39],
    [40, 41, 42], [41, 42, 43], [42, 43, 44], [43, 44, 45], [44, 45, 46], [45, 46, 47],
    [48, 49, 50], [49, 50, 51], [50, 51, 52], [51, 52, 53], [52, 53, 54], [53, 54, 55],
    // Colonnes verticales
    [0, 8, 16], [1, 9, 17], [2, 10, 18], [3, 11, 19], [4, 12, 20], [5, 13, 21], [6, 14, 22],
    [7, 15, 23], [8, 16, 24], [9, 17, 25], [10, 18, 26], [11, 19, 27], [12, 20, 28], [13, 21, 29],
    [14, 22, 30], [15, 23, 31], [16, 24, 32], [17, 25, 33], [18, 26, 34], [19, 27, 35],
    [20, 28, 36], [21, 29, 37], [22, 30, 38], [23, 31, 39], [24, 32, 40], [25, 33, 41],
    [26, 34, 42], [27, 35, 43], [28, 36, 44], [29, 37, 45], [30, 38, 46], [31, 39, 47],
    [32, 40, 48], [33, 41, 49], [34, 42, 50], [35, 43, 51], [36, 44, 52], [37, 45, 53],
    [38, 46, 54], [39, 47, 55], [40, 48, 56], [41, 49, 57], [42, 50, 58],
    // Diagonales descendantes
    [0, 9, 18], [1, 10, 19], [2, 11, 20], [3, 12, 21], [4, 13, 22],
    [8, 17, 26], [9, 18, 27], [10, 19, 28], [11, 20, 29], [12, 21, 30],
    [16, 25, 34], [17, 26, 35], [18, 27, 36], [19, 28, 37], [20, 29, 38],
    [24, 33, 42], [25, 34, 43], [26, 35, 44], [27, 36, 45], [28, 37, 46],
    [32, 41, 50], [33, 42, 51], [34, 43, 52], [35, 44, 53], [36, 45, 54],
    // Diagonales montantes
    [6, 14, 22], [5, 13, 21], [4, 12, 20], [3, 11, 19], [2, 10, 18],
    [15, 23, 31], [14, 22, 30], [13, 21, 29], [12, 20, 28], [11, 19, 27],
    [24, 32, 40], [23, 31, 39], [22, 30, 38], [21, 29, 37], [20, 28, 36],
    [33, 41, 49], [32, 40, 48], [31, 39, 47], [30, 38, 46], [29, 37, 45],
    [42, 50, 58], [41, 49, 57], [40, 48, 56], [39, 47, 55], [38, 46, 54]
  ],
  9: [
    // Lignes horizontales
    [0, 1, 2], [1, 2, 3], [2, 3, 4], [3, 4, 5], [4, 5, 6], [5, 6, 7], [6, 7, 8],
    [9, 10, 11], [10, 11, 12], [11, 12, 13], [12, 13, 14], [13, 14, 15],
    [16, 17, 18], [17, 18, 19], [18, 19, 20], [19, 20, 21], [20, 21, 22],
    [21, 22, 23], [22, 23, 24], [23, 24, 25], [24, 25, 26], [25, 26, 27],
    [27, 28, 29], [28, 29, 30], [29, 30, 31], [30, 31, 32], [31, 32, 33],
    [34, 35, 36], [35, 36, 37], [36, 37, 38], [37, 38, 39], [38, 39, 40],
    [41, 42, 43], [42, 43, 44], [43, 44, 45], [44, 45, 46], [45, 46, 47],
    [48, 49, 50], [49, 50, 51], [50, 51, 52], [51, 52, 53], [52, 53, 54],
    [55, 56, 57], [56, 57, 58], [57, 58, 59], [58, 59, 60], [59, 60, 61],
    [62, 63, 64], [63, 64, 65], [64, 65, 66], [65, 66, 67], [66, 67, 68],
    [69, 70, 71], [70, 71, 72], [71, 72, 73], [72, 73, 74], [73, 74, 75],
    [76, 77, 78], [77, 78, 79], [78, 79, 80],

    // Colonnes verticales
    [0, 9, 18], [1, 10, 19], [2, 11, 20], [3, 12, 21], [4, 13, 22],
    [5, 14, 23], [6, 15, 24], [7, 16, 25], [8, 17, 26], [9, 18, 27],
    [10, 19, 28], [11, 20, 29], [12, 21, 30], [13, 22, 31], [14, 23, 32],
    [15, 24, 33], [16, 25, 34], [17, 26, 35], [18, 27, 36], [19, 28, 37],
    [20, 29, 38], [21, 30, 39], [22, 31, 40], [23, 32, 41], [24, 33, 42],
    [25, 34, 43], [26, 35, 44], [27, 36, 45], [28, 37, 46], [29, 38, 47],
    [30, 39, 48], [31, 40, 49], [32, 41, 50], [33, 42, 51], [34, 43, 52],
    [35, 44, 53], [36, 45, 54], [37, 46, 55], [38, 47, 56], [39, 48, 57],
    [40, 49, 58], [41, 50, 59], [42, 51, 60], [43, 52, 61], [44, 53, 62],
    [45, 54, 63], [46, 55, 64], [47, 56, 65], [48, 57, 66], [49, 58, 67],
    [50, 59, 68], [51, 60, 69], [52, 61, 70], [53, 62, 71], [54, 63, 72],
    [55, 64, 73], [56, 65, 74], [57, 66, 75], [58, 67, 76], [59, 68, 77],
    [60, 69, 78], [61, 70, 79], [62, 71, 80],

    // Diagonales descendantes
    [0, 10, 20], [1, 11, 21], [2, 12, 22], [3, 13, 23], [4, 14, 24],
    [9, 19, 29], [10, 20, 30], [11, 21, 31], [12, 22, 32], [13, 23, 33],
    [18, 28, 38], [19, 29, 39], [20, 30, 40], [21, 31, 41], [22, 32, 42],
    [27, 37, 47], [28, 38, 48], [29, 39, 49], [30, 40, 50], [31, 41, 51],
    [36, 46, 56], [37, 47, 57], [38, 48, 58], [39, 49, 59], [40, 50, 60],
    [45, 55, 65], [46, 56, 66], [47, 57, 67], [48, 58, 68], [49, 59, 69],
    [54, 64, 74], [55, 65, 75], [56, 66, 76], [57, 67, 77], [58, 68, 78],

    // Diagonales montantes
    [6, 14, 22], [5, 13, 21], [4, 12, 20], [3, 11, 19], [2, 10, 18],
    [15, 23, 31], [14, 22, 30], [13, 21, 29], [12, 20, 28], [11, 19, 27],
    [24, 32, 40], [23, 31, 39], [22, 30, 38], [21, 29, 37], [20, 28, 36],
    [33, 41, 49], [32, 40, 48], [31, 39, 47], [30, 38, 46], [29, 37, 45],
    [42, 50, 58], [41, 49, 57], [40, 48, 56], [39, 47, 55], [38, 46, 54]
  ]
};

console.log(gameModeSize);
function checkWinner(player) {
  const currentPlayer = player;
  const combinations = winning_combinations[gameModeSize];
  let winnerFound = false;
  
  for (let combo of combinations) {
    const [a, b, c] = combo;
    if (squares[a].textContent === player && squares[b].textContent === player && squares[c].textContent === player) {
      gameEnded = true;
      // gameMessage.textContent = `${player} wins!`;
      showVictory();
      if (winnerFound) {
        gameEnded = true;
        if (currentPlayer === "X") {
          showDefeat();
        } else {
        }
    } else {
      if (checkTie()) {
        gameMessage.textContent = "It's a tie!";
        gameEnded = true;
      }
    }
  }
}
}




function checkTie() {
  return [...squares].every(square => square.textContent !== '');
}
function aiMove() {
  if (gameEnded) return;

  const emptySquares = Array.from(squares).filter(square => square.textContent === '');

  const randomSquare = emptySquares[Math.floor(Math.random() * emptySquares.length)];

  randomSquare.textContent = "O";
  
  checkWinner("O");

  togglePlayer();
}


function restartGame() {
  squares.forEach(square => square.textContent = '');
  gameEnded = false;
  currentPlayer = 'X';
  updateEndMessage();
}

function initializeGame(size) {
  gameGrid.innerHTML = '';
  squares = [];
  for (let i = 0; i < size * size; i++) {
    const square = document.createElement('div');
    square.classList.add('game-container__grid-square');
    square.setAttribute('data-index', i);
    gameGrid.appendChild(square);
    squares.push(square);
  }
  gameEnded = false;
  updateEndMessage();
}


const btn_playVsAI = document.querySelector("#header__btn_play_ia");
btn_playVsAI.addEventListener("click", function () {
  isVsAI = true; 
  document.querySelector("#main__player-names").style.display = "none";
  document.querySelector("#game-container").style.display = "flex";
  
  startGameVsAI();
});

function startGameVsAI() {
  currentPlayer = "X"; 
  gameEnded = false;
  
  const playerOneName = document.querySelector("#playerOne").value || "Player One";
  const playerTwoName = "LE SHERMINATOR"; 

  document.querySelector(".main__game-playerOne h3").textContent = playerOneName;
  document.querySelector(".main__game-playerTwo h3").textContent = playerTwoName;

  createGrid(gameModeSize);  

  updateEndMessage();
   
// implementation victoire/défaite
// const defeatClip = document.getElementById('Defeat');
// const defeatGif = defeatClip.querySelector('img');


function showVictory() {
 
  const victoryClip = document.createElement('div');
  victoryClip.style.position = 'fixed';
  victoryClip.style.left = '35rem';
  victoryClip.style.top = '10rem';
  victoryClip.style.display = 'block';
  victoryClip.style.opacity = '1';
  victoryClip.style.zIndex = '1000';
 
  document.body.appendChild(victoryClip);
  const victoryGif = document.createElement('img');
  victoryClip.appendChild(victoryGif);
 
  setTimeout(() => {
      victoryClip.style.display = 'none';
  }, 15000);
}

function showDefeat() {
    defeatGif.src = "assets/explosion-large.gif";

    defeatClip.style.position = 'fixed';
    defeatClip.style.left = '35rem';
    defeatClip.style.top = '10rem';
    defeatClip.style.display = 'block';
    defeatClip.style.opacity = '1';
    defeatClip.style.zIndex = '1000';

    setTimeout(() => {
        defeatClip.style.display = 'none';
        defeatClip.style.opacity = '0';
    }, 8500); 
}

  const resetButton = document.getElementById('resetScore');

    resetButton.style.backgroundColor = 'pink';
    resetButton.style.color = 'black';
    resetButton.style.borderRadius = '0.5rem';
    resetButton.style.height = '3rem';

    resetButton.addEventListener('mouseenter', function() {
//ajoute le hover
        resetButton.style.backgroundColor = 'lightcoral';
        resetButton.style.color = 'white';
        resetButton.style.transform = 'scale(1.1)';
        resetButton.style.boxShadow = '0 4px 12px rgba(0, 0, 0, 0.2)';
        resetButton.style.cursor = 'pointer';
    });

// Enlever l'effet hover
    resetButton.addEventListener('mouseleave', function() {
        resetButton.style.backgroundColor = 'pink';
        resetButton.style.color = 'black';
        resetButton.style.transform = 'scale(1)';
        resetButton.style.boxShadow = 'none';
    });
}


/*  // Vérifier si l'IA a gagné
  if (checkWin('O')) {
    someoneWon = true;
    endMessage.textContent = `Game over! O wins!`;

    scorePlayer2++;
    localStorage.setItem("scorePlayer2", scorePlayer2);
    score2.textContent = scorePlayer2;
          
    const defeatClip = document.querySelector(".explosion");
    const defeatImg = defeatClip.getElementsByTagName("img")[0];

    defeatImg.src = "assets/explosion-large.gif";
    defeatClip.style.display = "block";
    defeatClip.style.width = "20vw";
    defeatClip.style.opacity = "1";
    defeatClip.style.zIndex = "1";
    
    showDefeat();
    return;
  }*/

    /*    squares[i].textContent = 'X';
    if (checkWin('X')) {
      someoneWon = true;
      endMessage.textContent = `Game over! X wins!`;

      scorePlayer1++;
      localStorage.setItem("scorePlayer1", scorePlayer1);
      score1.textContent = scorePlayer1;

      const victoryClip = document.querySelector(".fireworks");
      const victoryImg = victoryClip.getElementsByTagName("img")[0];
      
      victoryImg.src = "assets/colorful-explosion.gif";
      victoryClip.style.display = "block";
      victoryClip.style.width = "20vw";
      victoryClip.style.opacity = "1";
      victoryClip.style.zIndex = "1";

      showVictory();
      return;
    }*/

