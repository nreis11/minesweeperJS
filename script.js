// DiaplayUI
import {
  createBoard,
  markTile,
  revealTile,
  TILE_STATUSES,
  checkWin,
  checkLose,
} from "./minesweeper.js";

const BOARD_SIZE = 8;
const NUMBER_OF_MINES = 8;

const minesLeftText = document.createElement("span");
const boardElement = document.querySelector(".board");
const messageText = document.querySelector(".subtext");
const newGameBtn = document.querySelector("#new-game-btn");

function createGame(boardElement) {
  boardElement.innerHTML = "";
  boardElement.removeEventListener("click", stopProp, { capture: true });
  boardElement.removeEventListener("contextmenu", stopProp, { capture: true });
  const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
  board.forEach((row) => {
    row.forEach((tile) => {
      boardElement.append(tile.element);
      tile.element.addEventListener("click", () => {
        revealTile(board, tile);
        checkGameEnd(board);
      });
      tile.element.addEventListener("contextmenu", (e) => {
        e.preventDefault();
        markTile(tile);
        listMinesLeft(board);
      });
    });
  });

  messageText.innerText = "Mines Left: ";
  minesLeftText.textContent = NUMBER_OF_MINES;
  messageText.appendChild(minesLeftText);
  boardElement.style.setProperty("--size", BOARD_SIZE);
}

function listMinesLeft(board) {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    );
  }, 0);
  minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
}

function checkGameEnd(board) {
  const win = checkWin(board, NUMBER_OF_MINES);
  const lose = checkLose(board);

  if (win || lose) {
    boardElement.addEventListener("click", stopProp, { capture: true });
    boardElement.addEventListener("contextmenu", stopProp, { capture: true });
  }

  if (win) {
    messageText.textContent = "You won!";
  }
  if (lose) {
    messageText.textContent = "You lose. Game Over.";
    board.forEach((row) => {
      row.forEach((tile) => {
        if (tile.status === TILE_STATUSES.MARKED) markTile(tile);
        if (tile.mine) revealTile(board, tile);
      });
    });
  }
}

function stopProp(e) {
  e.stopImmediatePropagation();
}

newGameBtn.addEventListener("click", () => {
  createGame(boardElement);
});

createGame(boardElement);
