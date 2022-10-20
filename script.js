// DiaplayUI
import {
  createBoard,
  markTile,
  revealTile,
  TILE_STATUSES,
  checkWin,
  checkLose,
} from "./minesweeper.js";

const BOARD_SIZE = 5;
const NUMBER_OF_MINES = 1;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);

const minesLeftText = document.querySelector("[data-mine-count");
const boardElement = document.querySelector(".board");
const messageText = document.querySelector(".subtext");

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
    tile.element.addEventListener("click", () => {
      revealTile(board, tile);
      checkGameEnd();
    });
    tile.element.addEventListener("contextmenu", (e) => {
      e.preventDefault();
      markTile(tile);
      listMinesLeft();
    });
  });
});

function listMinesLeft() {
  const markedTilesCount = board.reduce((count, row) => {
    return (
      count + row.filter((tile) => tile.status === TILE_STATUSES.MARKED).length
    );
  }, 0);
  minesLeftText.textContent = NUMBER_OF_MINES - markedTilesCount;
}

function checkGameEnd() {
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
    messageText.textContent = "You lose!";
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

minesLeftText.textContent = NUMBER_OF_MINES;
boardElement.style.setProperty("--size", BOARD_SIZE);

// createBoard (rows, cols, mines)
// getNeighbors (board, row, col)
// calculateMines (board, row, col)
// handleClick (board, row, col)
// handleRightClick (board, row, col)
// traverse (board, row, col, visited)
// isGameOver ()
