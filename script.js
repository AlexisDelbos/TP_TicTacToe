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

    stopAnimations();

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
    
    showDefeat();
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

      const victoryClip = document.querySelector(".fireworks");
      const victoryGif = victoryClip.getElementsByTagName("img")[0];

      showVictory();
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




// implementation victoire/défaite
const victoryClip = document.getElementById('Victory');
const defeatClip = document.getElementById('Defeat');
const victoryGif = victoryClip.querySelector('img');
const defeatGif = defeatClip.querySelector('img');
let isAnimating = false;

function showVictory() {
      
    victoryClip.style.position = 'fixed',
    victoryClip.style.left = '35rem';
    victoryClip.style.top = '10rem';
    victoryClip.style.display = 'block';
    victoryClip.style.opacity = '1';
    victoryClip.style.zIndex = '1000';
  
    setTimeout(() => {
        victoryClip.style.display = 'none';
    }, 15000);
}

function showDefeat() {
    defeatClip.style.position = 'fixed',
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
function stopAnimations() {
    // Cacher les animations de victoire et de défaite
    victoryClip.style.display = 'none';
    victoryClip.style.opacity = '0';
    defeatClip.style.display = 'none';
    defeatClip.style.opacity = '0';
    isAnimating = false;
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

    