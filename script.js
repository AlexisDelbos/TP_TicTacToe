const gameGrid = document.querySelector("#game-grid");
const squares = document.querySelectorAll(".game-grid__square");
const players = ['X', 'O'];
let currentPlayer = players[0];
const endMessage = document.createElement('h2');
endMessage.textContent = `X's turn!`;
endMessage.style.marginTop = '30px';
endMessage.style.textAlign = 'center';
gameGrid.after(endMessage);
let someoneWon = false;
const winning_combinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6]
];

// Check win
function checkWin(currentPlayer) {
  for (let i = 0; i < winning_combinations.length; i++) {
    const [a, b, c] = winning_combinations[i];
    if (squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer) {
      return true;
    }
  }
  return false;
}

// Check nul
function checkTie() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === '') {
      return false;
    }
  }
  return true;
}

// Bouton restart
function restartButton() {
  someoneWon = false;
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = '';
  }
  endMessage.textContent = `X's turn!`;
  currentPlayer = players[0];
}

// Fonction pour vérifier si une case est vide
function isCellEmpty(index) {
  return squares[index].textContent === '';
}

// Fonction pour l'IA (choix aléatoire parmi les cases vides)
function aiMove() {

  const emptyCells = [];
  for (let i = 0; i < squares.length; i++) {
    if (isCellEmpty(i)) {
      emptyCells.push(i);
    }
  }

  // Randomise le choix de l'IA
  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const selectedCell = emptyCells[randomIndex];

  // Place O sur la case random choisi
  squares[selectedCell].textContent = 'O';

  // Vérifier si l'IA a gagné
  if (checkWin('O')) {
    someoneWon = true;
    endMessage.textContent = `Game over! O wins!`;
    return;
  }

  // Vérifier si c'est un match nul
  if (checkTie()) {
    someoneWon = true;
    endMessage.textContent = `Game is tied!`;
    return;
  }

  // Passer au joueur suivant ("X")
  currentPlayer = 'X';
  endMessage.textContent = `X's turn!`;
}

for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', () => {
    if (someoneWon) return;
    if (squares[i].textContent !== '') return;

    squares[i].textContent = 'X';
    if (checkWin('X')) {
      someoneWon = true;
      endMessage.textContent = `Game over! X wins!`;
      return;
    }
    if (checkTie()) {
      someoneWon = true;
      endMessage.textContent = `Game is tied!`;
      return;
    }
    currentPlayer = 'O';
    endMessage.textContent = `O's turn!`;

    aiMove(); 
  });
}
