class DiceGame {
  constructor(rollBtnId, resultDisplayId) {
    this.rollBtn = document.querySelector(`#${rollBtnId}`);
    this.resultDisplay = document.querySelector(`#${resultDisplayId}`);

    this.resultDisplay.textContent = "roll!";

    this.rollBtn.addEventListener("click", this.rollDice);
  }

  getRandomRoll() {
    return Math.ceil(Math.random() * 7);
  }

  checkWin(score) {
    return score === 6;
  }

  rollDice() {
    const RandomScore = this.getRandomRoll();

    if (this.checkWin(RandomScore)) {
      this.resultDisplay.textContent = "you wind";
    } else {
      this.resultDisplay.textContent = "try again";
    }
  }
}

new DiceGame("dice", "display");

/// 함수형으로 전환

const getRandomRoll = () => Math.ceil(Math.random() * 7);

const checkWin = (num) => num === 6;

const rollDice = (resultDisplay) => {
  const RandomScore = this.getRandomRoll();

  resultDisplay.textContent = checkWin(RandomScore) ? "you wind" : "try again";
};

const getNode = (id) => document.getElementById(id);

const updateText = (node, text) => (node.textContent = text);

const createDiceGame = (btnId, displayId) => {
  const btn = getNode(btnId);
  const display = getNode(displayId);
  updateText(display, "roll!");

  btn.addEventListener("click", rollDice.bind(this, display));
};

createDiceGame("btn", "result");
