// Sélectionne la grille de jeu et les cases individuelles du jeu
const gameGrid = document.querySelector("#game-grid");
const squares = document.querySelectorAll(".game-grid__square");

// Déclare les joueurs et initialise le joueur actuel (X commence)
const players = ['X', 'O'];
let currentPlayer = players[0];

// Crée un message pour afficher le statut du jeu (qui joue actuellement)
const endMessage = document.createElement('h2');
endMessage.textContent = `X's turn!`;
endMessage.style.marginTop = '30px';
endMessage.style.textAlign = 'center';
gameGrid.after(endMessage);

// Variable pour savoir si quelqu'un a gagné ou si le jeu est terminé
let someoneWon = false;

// Variable pour savoir si on joue contre l'IA ou à 2 joueurs
let isAI = false;

// Combinaisons gagnantes possibles pour le morpion (lignes, colonnes et diagonales)
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

// Fonction qui vérifie si un joueur a gagné
function checkWin(currentPlayer) {
  for (let i = 0; i < winning_combinations.length; i++) {
    const [a, b, c] = winning_combinations[i];
    if (squares[a].textContent === currentPlayer && squares[b].textContent === currentPlayer && squares[c].textContent === currentPlayer) {
      return true;
    }
  }
  return false;
}

// Fonction qui vérifie si le jeu est un match nul
function checkTie() {
  for (let i = 0; i < squares.length; i++) {
    if (squares[i].textContent === '') {
      return false;  
    }
  }
  return true;  
}

// Fonction qui réinitialise le jeu après une victoire, une défaite ou un match nul
function restartButton() {
  someoneWon = false;  
  for (let i = 0; i < squares.length; i++) {
    squares[i].textContent = ''; 
  }
  endMessage.textContent = `X's turn!`;  
  currentPlayer = players[0]; 

// Fonction pour vérifier si une case est vide
function isCellEmpty(index) {
  return squares[index].textContent === '';  // Retourne true si la case est vide
}

// Fonction qui gère le mouvement de l'IA (choix aléatoire d'une case vide pour l'IA)
function aiMove() {
  const emptyCells = [];
  for (let i = 0; i < squares.length; i++) {
    if (isCellEmpty(i)) {
      emptyCells.push(i);
    }
  }

  const randomIndex = Math.floor(Math.random() * emptyCells.length);
  const selectedCell = emptyCells[randomIndex];

  squares[selectedCell].textContent = 'O';  

  if (checkWin('O')) {
    someoneWon = true;
    endMessage.textContent = `Game over! O wins!`;
    return;
  }

  if (checkTie()) {
    someoneWon = true;
    endMessage.textContent = `Game is tied!`;
    return;
  }

  currentPlayer = 'X';
  endMessage.textContent = `X's turn!`;
}

// Fonction pour commencer une partie à 2 joueurs
function startTwoPlayers() {
  isAI = false;  
  document.querySelector("#gameModeSelection").style.display = 'none';  
  gameGrid.style.display = 'grid';  
  endMessage.textContent = `X's turn!`; 
}

// Fonction pour commencer une partie contre l'IA
function startVsAI() {
  isAI = true; 
  document.querySelector("#gameModeSelection").style.display = 'none';  
  gameGrid.style.display = 'grid';  
  endMessage.textContent = `X's turn!`;  
}

// Ajoute des écouteurs d'événements sur chaque case du jeu
for (let i = 0; i < squares.length; i++) {
  squares[i].addEventListener('click', () => {
    if (someoneWon) return;  
    if (squares[i].textContent !== '') return;  

    squares[i].textContent = currentPlayer;  

    if (checkWin(currentPlayer)) {
      someoneWon = true;
      endMessage.textContent = `Game over! ${currentPlayer} wins!`;
      return;
    }

    if (checkTie()) {
      someoneWon = true;
      endMessage.textContent = `Game is tied!`;
      return;
    }

    if (isAI && currentPlayer === 'X') {
      currentPlayer = 'O'; 
      endMessage.textContent = `O's turn!`;
      aiMove();  
    } else {
      currentPlayer = currentPlayer === 'X' ? 'O' : 'X';  
      endMessage.textContent = `${currentPlayer}'s turn!`; 
    }
  });
}
