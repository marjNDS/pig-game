'use strict';

// UTILS
function updateEl(el, textValue){
  if(el){
    el.textContent = textValue;
  } else{
    console.log(`Element [el] not found.`);
  }
}

// CLASSes

class Player {
  constructor(idx) {
    this.current = 0;
    this.score = 0;
    this.index = idx;


    this.currentEl = document.getElementById(`current--${this.index}`);
    if (!this.currentEl) {
      console.error(`Element #current--${this.index} not found`);
    }

    this.scoreEl = document.getElementById(`score--${this.index}`);
    if (!this.scoreEl) {
      console.error(`Element #score--${this.index} not found`);
    }

    this.playerEl = document.querySelector(`.player--${this.index}`);
    if(!this.playerEl){
      console.error(`Player el not found`);
    }

  }



  addToCurrent(add) {
    this.current += add;
    updateEl(this.currentEl, this.current);
  }

  resetCurrent() {
    this.current = 0;
    updateEl(this.currentEl, this.current);
  }

  resetAll(){
    this.resetCurrent();
    this.score = 0;
    updateEl(this.scoreEl, this.score);
  }

  addToScore(){
    this.score += this.current;
    if(this.scoreEl){
      updateEl(this.scoreEl, this.score);
    }
  }

  checkWin(){
    if(this.score < 100){
      return false;
    }
    return true;
  }
}

class Pig {
  constructor() {
    this.players = [new Player(0), new Player(1)];
    this.turnPlayer;
    this.hasEnded = false;

    this.dice = new Dice();
    //console.log(this.dice); //DEBUG
    this.btnRoll = document.querySelector('.btn--roll');
    if (!this.btnRoll) {
      console.error('Button .btn--roll not found');
    }

    this.btnHold = document.querySelector('.btn--hold');
    if(!this.btnHold){
      console.error('.btn--hold not found');
    }

    this.btnNewGame = document.querySelector('.btn--new');
    if(!this.btnNewGame){
      console.error('.btn--new not found');
    }

    this.init();
    this.initEventListeners();
  }

  init() {
    this.turnPlayer = 0;
    this.hasEnded = false;
    this.dice.hide();
    this.players[0].resetAll();
    this.players[1].resetAll();
  }

  initEventListeners() {
    if (this.btnRoll) {
      this.btnRoll.addEventListener('click', this.rollDice.bind(this));
    } else {
      console.error('Button .btn--roll not found');
    }

    if(this.btnHold){
      this.btnHold.addEventListener('click', this.hold.bind(this));
    }

    if(this.btnNewGame){
      this.btnNewGame.addEventListener('click', this.resetGame.bind(this));
    }
  }

  toggleButtons(){
    if(this.btnRoll){
      this.btnRoll.disabled == true? false : true;
    }

    if(this.btnHold){
      this.btnHold.disabled == true ? false : true;
    }

  }

  finishGame() {

    this.players[this.turnPlayer].playerEl.classList.remove('player--active');
    this.players[this.turnPlayer].playerEl.classList.add('player--winner');

    this.toggleButtons();

  }

  resetGame(){
    this.players[this.turnPlayer].playerEl.classList.remove('player--winner');
    
    this.init();
    this.toggleButtons; 

  }
  

  turnChange() {
    const activeClass = 'player--active';
    this.players[this.turnPlayer].playerEl.classList.remove(activeClass);
    this.turnPlayer = this.turnPlayer === 0 ? 1 : 0;
    this.players[this.turnPlayer].playerEl.classList.add(activeClass);
  }

  rollDice() {
    this.dice.roll();
    this.dice.show();

    if (this.dice.currentRoll === 1) {
      //console.log('turn change'); // DEBUG
      this.players[this.turnPlayer].resetCurrent();
      this.turnChange();
      return;
    }

    this.players[this.turnPlayer].addToCurrent(this.dice.currentRoll);
  }


  hold(){
    this.players[this.turnPlayer].addToScore();
    this.players[this.turnPlayer].resetCurrent();

    this.hasEnded = this.players[this.turnPlayer].checkWin();
    if(this.hasEnded){
      this.finishGame();
      
    } else{
    this.turnChange();

    }


  }

}

class Dice {
  constructor() {
    this.currentRoll = 0;

    this.diceEl = document.querySelector('.dice');
    if (!this.diceEl) {
      console.error('Element .dice not found');
    }

  }

  roll() {
    this.currentRoll = Math.trunc(Math.random() * 6) + 1;
    // console.log(this.currentRoll); // DEBUG
    return this.currentRoll;
  }

  hide() {
    if (this.diceEl) {
      this.diceEl.classList.add('hidden');
    }
  }

  show() {
    if (this.diceEl) {
      this.diceEl.classList.remove('hidden');
      this.diceEl.src = `dice-${this.currentRoll}.png`;
    }
  }
}

// Inicializando o jogo
document.addEventListener('DOMContentLoaded', () => {
  const pig = new Pig();
});
