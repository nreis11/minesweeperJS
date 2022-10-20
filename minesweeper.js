// Logic

const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

function getMinePositions(boardSize, numberOfMines) {
  const minePositions = new Set();
  while (minePositions.size < numberOfMines) {
    const row = Math.floor(Math.random() * boardSize);
    const col = Math.floor(Math.random() * boardSize);
    const key = `${row},${col}`;
    if (minePositions.has(key)) {
      continue;
    }
    minePositions.add(key);
  }
  return Array.from(minePositions);
}

export function createBoard(boardSize, numberOfMines) {
  const minePositions = getMinePositions(boardSize, numberOfMines);
  console.log(
    "🚀 ~ file: minesweeper.js ~ line 26 ~ createBoard ~ minePositions",
    minePositions
  );
  const board = [];
  for (let i = 0; i < boardSize; i++) {
    const row = [];
    for (let j = 0; j < boardSize; j++) {
      const element = document.createElement("div");
      element.dataset.status = TILE_STATUSES.HIDDEN;
      const tile = {
        row: i,
        col: j,
        element,
        get status() {
          return this.element.dataset.status;
        },
        set status(value) {
          this.element.dataset.status = value;
        },
      };
      row.push(tile);
    }
    board.push(row);
  }
  return board;
}
