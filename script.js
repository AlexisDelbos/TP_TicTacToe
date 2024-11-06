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
    scorePlayer2++;
    localStorage.setItem("scorePlayer2", scorePlayer2);
    score2.textContent = scorePlayer2;
    return;
  }
 
  // Vérifier si c'est un match nul
  if (checkTie()) {
    someoneWon = true;
    endMessage.textContent = `Game is tied!`;
    scoreDraw++;
    localStorage.setItem("scoreDraw", scoreDraw);
    scoreDrawPrint.textContent = scoreDraw;
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
      scorePlayer1++;
      localStorage.setItem("scorePlayer1", scorePlayer1);
      score1.textContent = scorePlayer1;
      return;
    }
    if (checkTie()) {
      someoneWon = true;
      endMessage.textContent = `Game is tied!`;
      scoreDraw++;
      localStorage.setItem("scoreDraw", scoreDraw);
      scoreDrawPrint.textContent = scoreDraw;
      return;
    }
    currentPlayer = 'O';
    endMessage.textContent = `O's turn!`;
 
    aiMove();
  });
}






// Initialise les scores et le compteur d'égalités à zéro lors de la première partie :
if (!localStorage.getItem("scorePlayer1")) {
    localStorage.setItem("scorePlayer1", 0);
}
if (!localStorage.getItem("scorePlayer2")) {
    localStorage.setItem("scorePlayer2", 0);
}
if (!localStorage.getItem("scoreDraw")) {
    localStorage.setItem("scoreDraw", 0);
}

 // Récupère les scores des joueurs depuis le localStorage à chaque nouvelle partie
 let scorePlayer1 = parseInt(localStorage.getItem("scorePlayer1"));
 let scorePlayer2 = parseInt(localStorage.getItem("scorePlayer2"));
 let scoreDraw = parseInt(localStorage.getItem("scoreDraw"));

 // Variable du score pour l'affichage du score (span HTML) 
 let score1 = document.querySelector("#score1 span");
 let score2 = document.querySelector("#score2 span");
 let scoreDrawPrint = document.querySelector("#scoreDraw span");

 //Mise à jour affichage du score
 score1.textContent = scorePlayer1;
 score2.textContent = scorePlayer2;
 scoreDrawPrint.textContent = scoreDraw;

 //Fonctions score
 function resetScore() {
    localStorage.removeItem("scorePlayer1"); // Permet de supprimer seulement l'item passé en paramètre
    localStorage.removeItem("scorePlayer2");
    localStorage.removeItem("scoreDraw");

    scorePlayer1 = 0;
    scorePlayer2 = 0;
    scoreDraw = 0;
    score1.textContent = scorePlayer1;
    score2.textContent = scorePlayer2;
    scoreDraw.textContent = scoreDraw;
}

//bouton reset score
let buttonScore = document.querySelector("#score");
buttonScore.addEventListener("click", resetScore);

//reset score function
function resetScore() {
    localStorage.setItem("scorePlayer1", 0);
    localStorage.setItem("scorePlayer2", 0);
    localStorage.setItem("scoreDraw", 0);
  
    scorePlayer1 = 0;
    scorePlayer2 = 0;
    scoreDraw = 0;
  
    score1.textContent = scorePlayer1;
    score2.textContent = scorePlayer2;
    scoreDrawPrint.textContent = scoreDraw;
  }