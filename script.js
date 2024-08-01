'use strict';

class Player {
  constructor() {
    this.current = 0;
    this.score = 0;
  }

  addToCurrent(add) {
    this.current += add;
  }

  resetCurrent() {
    this.current = 0;
  }
}

class Pig {
  constructor() {
    this.players = [];
    this.players.push(new Player());
    this.players.push(new Player());

    this.turnPlayer;

    this.dice = new Dice();
    console.log(this.dice);

  }

  init() {
    this.turnPlayer = 0;
    this.dice.hide();
  }

  turnChange() {
    if (this.turnPlayer === 0) {
      this.turnPlayer = 1;
    } else {
      this.turnPlayer = 0;
    }
  }

  rollDice() {
    this.dice.roll();
    this.dice.show();

    if (this.dice.currentRoll === 1) {
      console.log('turn change'); //DEBUG
      this.players[this.turnPlayer].resetCurrent();
      this.turnChange();
      return;
    }

    this.players[this.turnPlayer].addToCurrent(this.dice.currentRoll);


  }

}

class Dice {
  constructor() {
    this.currentRoll;

    this.diceEl = document.querySelector('.dice');
    this.btnRoll = document.querySelector('.btn--roll');

    this.player;
  }

  roll() {
    this.currentRoll = Math.trunc(Math.random() * 6) + 1;
    //console.log(this.currentRoll); //DEBUG
    return this.currentRoll;
  }

  hide() {
    this.diceEl.classList.add('hidden');
  }

  show() {
    this.diceEl.classList.remove('hidden');
    this.diceEl.src = `dice-${this.currentRoll}.png`;

  }


}


let pig = new Pig();
pig.init();


pig.dice.btnRoll.addEventListener('click', pig.rollDice);

