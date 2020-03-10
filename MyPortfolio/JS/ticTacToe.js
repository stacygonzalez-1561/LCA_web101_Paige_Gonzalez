let board = [["", "", ""], ["", "", ""], ["", "", ""]];
let player;
let computer;
let squaresLeft = 9;
let cpuRow;
let cpuColumn;
const xbuttonElement = document.getElementById("xbutton");
const obuttonElement = document.getElementById("obutton");


const chooseXorO = (symbol) => {
  if (symbol === "X") {
    player = "X";
    computer = "O";
    disableXO(symbol);
    enableBoard();
  } 
  else {
    player = "O";
    computer = "X";
    disableXO(symbol);
    enableBoard();
    computerMove();
  }
}


const disableXO = (symbol) => {
  if (symbol === "X") {
    xbuttonElement.disabled = true;
    xbuttonElement.style.color = "orange";
    obuttonElement.disabled = true;
    obuttonElement.style.color = "black";
    obuttonElement.style.border = "none";
  } 
  else {
    xbuttonElement.disabled = true;
    xbuttonElement.style.color = "black";
    xbuttonElement.style.border = "none";
    obuttonElement.disabled = true;
    obuttonElement.style.color = "orange";
  }
}


const enableBoard = () => {
  var boxes = document.getElementsByClassName("box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    boxes[i].setAttribute("onclick", "userMove(id)");
  }
}


const userMove = (id) => {
  document.getElementById(id).removeAttribute("onclick");
  document.getElementById(id).innerText = player;

  board[id[0]][id[1]] = player;
  squaresLeft--;
  if (testWin(player)) {
    return;
  }
  if(!testTie()) {
    setTimeout(function() {
      computerMove();
  }, 250);
  }
}


const computerMove = () => {
  do {
    generateRandomMove();
  } while (
    board[cpuRow][cpuColumn] === player ||
    board[cpuRow][cpuColumn] === computer
  );
  board[cpuRow][cpuColumn] = computer;
  document.getElementById(cpuRow + "" + cpuColumn).innerHTML = computer;
  document.getElementById(cpuRow + "" + cpuColumn).removeAttribute("onclick");
  squaresLeft--;
  if (testWin(computer)) {
    return;
  }
  testTie();
}


const testWin = (symbol) => {
  if (
    (board[0][0] === symbol &&
      board[0][1] === symbol &&
      board[0][2] === symbol) ||
    (board[1][0] === symbol &&
      board[1][1] === symbol &&
      board[1][2] === symbol) ||
    (board[2][0] === symbol &&
      board[2][1] === symbol &&
      board[2][2] === symbol) ||
    (board[0][0] === symbol &&
      board[1][0] === symbol &&
      board[2][0] === symbol) ||
    (board[0][1] === symbol &&
      board[1][1] === symbol &&
      board[2][1] === symbol) ||
    (board[0][2] === symbol &&
      board[1][2] === symbol &&
      board[2][2] === symbol) ||
    (board[0][0] === symbol &&
      board[1][1] === symbol &&
      board[2][2] === symbol) ||
    (board[0][2] === symbol && board[1][1] === symbol && board[2][0] === symbol)
  ) {
    alert(symbol + " wins!");
    disableBoard();
    setTimeout(function() {
    gameReset();
  }, 1000);
    return true;
  }
}

const generateRandomMove = () => {
  cpuRow = Math.floor(Math.random() * 3);
  cpuColumn = Math.floor(Math.random() * 3);
}


const disableBoard = () => {
  var boxes = document.getElementsByClassName("box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].removeAttribute("onclick");
  }
}


const testTie = () => {
  if (squaresLeft === 0) {
    alert("The game is a tie!");
    disableBoard();
    setTimeout(function() {
      gameReset();
    }, 1000);
    return true;
  }
}


const gameReset = () => {
  board = [["", "", ""], ["", "", ""], ["", "", ""]];
  squaresLeft = 9;
  xbuttonElement.disabled = false;
  xbuttonElement.style.color = "white";
  xbuttonElement.style.border = "1px solid white";
  obuttonElement.disabled = false;
  obuttonElement.style.color = "white";
  obuttonElement.style.border = "1px solid white";
  var boxes = document.getElementsByClassName("box");
  for (var i = 0; i < boxes.length; i++) {
    boxes[i].innerHTML = "";
    boxes[i].setAttribute("onclick", "userMove(id)");
    disableBoard();
  }
}