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

// choice game mode
const elements = document.querySelectorAll(".main__choice-mode");
elements.forEach((el) => {
  el.addEventListener("click", function () {
    document.querySelector(".main__choice-game").style.display = "none";
    document.querySelector("#main__player-names").style.display = "flex";
    completeGameModeName = this.innerText.trim();
    gameModeSize = Array.from(this.innerText.trim())[0];
  });
});

// get profil image
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

// btn ready
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

  // image
  // document.querySelector(
  //   ".main__playerOne-img-container img"
  // ).src = `${variable}`;
  // document.querySelector(
  //   ".main__playerTwo-img-container img"
  // ).src = `${variable}`;

  createGrid(gameModeSize);
});

function createGrid(size) {
  const container = document.querySelector(".game-container__grid");

  container.style.gridTemplateColumns = `repeat(${size}, 1fr)`;
  container.style.gridTemplateRows = `repeat(${size}, 1fr)`;

  for (let i = 0; i < size * size; i++) {
    const divEl = document.createElement("div");
    divEl.classList.add("game-container__grid-square");

    container.appendChild(divEl);
  }
}
