// DiaplayUI
import { createBoard } from "./minesweeper.js";

const BOARD_SIZE = 2;
const NUMBER_OF_MINES = 2;

const board = createBoard(BOARD_SIZE, NUMBER_OF_MINES);
console.log("🚀 ~ file: script.js ~ line 8 ~ board", board);
const boardElement = document.querySelector(".board");

board.forEach((row) => {
  row.forEach((tile) => {
    boardElement.append(tile.element);
  });
});

boardElement.style.setProperty("--size", BOARD_SIZE);
// createBoard (rows, cols, mines)
// getNeighbors (board, row, col)
// calculateMines (board, row, col)
// handleClick (board, row, col)
// handleRightClick (board, row, col)
// traverse (board, row, col, visited)
// isGameOver ()
