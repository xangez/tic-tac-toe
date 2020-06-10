
const gameBoard = (() => {

  const squares = document.querySelectorAll('.square');
  squares.forEach(square => square.addEventListener('click', updateBoard));

  const player = document.querySelectorAll('.player');
  
  const reset = document.querySelector('#reset');
  reset.addEventListener('click', resetGame);

  let board = ['','','','','','','','',''];
  let marker = 'X';
  let gameFinished = false;
  let round = 0;


  function updateBoard(e) {
    if (!gameFinished){
      let id = e.target.id;

      for (let i=0; i < 9; i++){
        if (i == id && board[i] == '') {
          board[i] = marker;
          round ++;

          renderBoard(i);
        }
      }
    }
  }


  function renderBoard(i) {

    squares[i].textContent = marker;
    
    winCheck();

    if (!gameFinished) {
      changePlayer();
      changeMarker();
    }
  }

  function changePlayer() {
    player.forEach(p => p.classList.contains('on') ? p.classList.remove('on') : p.classList.add('on'));
    
  }

  function changeMarker() {
    marker = marker == 'O' ? 'X' : 'O'
  }


  let winCombos = [[0,1,2],[3,4,5],[6,7,8],
                [0,3,6], [1,4,7],[2,5,8],
                [0,4,8], [2,4,6]];

  
  function winCheck() {
    for (let i=0; i<8; i++) {
      let array = winCombos[i].map(index => board[index]);
      if (array[0] == '' ||  array[1] == '' ||  array[2] == '') {
        continue;
      }
      else if (array[0] == array[1] && array[1] == array[2]){
        displayWin(array[0]);
        break;
      }
      else if (round < 9){
        continue;
      }
      else if (round == 9) {
        displayWin('draw')
      }
    }
  }

    
  function displayWin(type) {
    const draw = document.querySelector('#draw');

    if (type == 'X') {
      player[0].textContent = menu.getNames()[0] + ' won!'
    }
    else if (type == 'O') {
      player[1].textContent = menu.getNames()[1] + ' won!'
    }
    else if (type == 'draw') {
      draw.textContent = '~Draw~';
      draw.classList.add('on');
      player.forEach(p => p.classList.remove('on'));
    }
    gameFinished = true;
  }

  function resetGame() {
    board = ['','','','','','','','',''];

    player[0].textContent = menu.getNames()[0];
    player[1].textContent = menu.getNames()[1];
    draw.textContent = '';

    player[0].classList.add('on');
    player[1].classList.remove('on');
    draw.classList.remove('on');

    squares.forEach(square => square.textContent = '');
    gameFinished = false;
    marker = 'X';
    round = 0;
  }

})();

const menu = (() => {

  const player = document.querySelectorAll('.player');

  const modal = document.querySelector('#modal');

  const settings = document.querySelector('#settings');
  settings.addEventListener('click', openMenu);

  const cancel = document.querySelector('#cancel');
  cancel.addEventListener('click', closeMenu);

  const input = document.querySelectorAll("input");
  const save = document.querySelector('#save');
  save.addEventListener('click', playerNames);
  

  function closeMenu() {
    modal.style.display = 'none';
  }

  function openMenu() {
    modal.style.display = 'block';
  }

  let playerX = 'Player X';
  let playerO = 'Player O';

  function playerNames() {

    playerX = input[0].value !== '' ? input[0].value + ' X': 'Player X';
    playerO = input[1].value !== '' ? input[1].value + ' O': 'Player O';

    player[0].textContent = playerX;
    player[1].textContent = playerO;

    closeMenu();
  }

  function getNames() {
    return [playerX, playerO]
  }


  return {
    getNames,
  }

})();




