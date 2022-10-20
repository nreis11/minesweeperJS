// Logic

export const TILE_STATUSES = {
  HIDDEN: "hidden",
  MINE: "mine",
  NUMBER: "number",
  MARKED: "marked",
};

function nearbyTiles(board, tile) {
  const adjTiles = [];
  for (let row_delta = -1; row_delta <= 1; row_delta++) {
    for (let col_delta = -1; col_delta <= 1; col_delta++) {
      if (row_delta === 0 && col_delta === 0) {
        continue;
      }
      const newRow = tile.row + row_delta;
      const newCol = tile.col + col_delta;
      const rowInBounds = newRow >= 0 && newRow < board.length;
      const colInBounds = newCol >= 0 && newCol < board[tile.row].length;
      if (rowInBounds && colInBounds) {
        adjTiles.push(board[newRow][newCol]);
      }
    }
  }
  return adjTiles;
}

function getMinePositions(boardSize, numberOfMines) {
  const minePositions = new Set();
  while (minePositions.size < numberOfMines) {
    const row = Math.floor(Math.random() * boardSize);
    const col = Math.floor(Math.random() * boardSize);
    const key = `${row},${col}`;
    if (!minePositions.has(key)) {
      minePositions.add(key);
    }
  }
  return minePositions;
}

export function revealTile(board, tile) {
  if (tile.status !== TILE_STATUSES.HIDDEN) {
    return;
  }

  if (tile.mine) {
    tile.status = TILE_STATUSES.MINE;
    return;
  }

  tile.status = TILE_STATUSES.NUMBER;
  const adjacentTiles = nearbyTiles(board, tile);
  console.log(
    "🚀 ~ file: minesweeper.js ~ line 54 ~ revealTile ~ adjacentTiles",
    adjacentTiles
  );
  const mines = adjacentTiles.filter((tile) => tile.mine);
  if (mines.length === 0) {
    adjacentTiles.forEach(revealTile.bind(null, board));
  } else {
    tile.element.textContent = mines.length;
  }
}

export function markTile(tile) {
  if (
    tile.status !== TILE_STATUSES.HIDDEN &&
    tile.status !== TILE_STATUSES.MARKED
  ) {
    return;
  }
  if (tile.status === TILE_STATUSES.HIDDEN) {
    tile.status = TILE_STATUSES.MARKED;
  } else {
    tile.status = TILE_STATUSES.HIDDEN;
  }
}

export function createBoard(boardSize, numberOfMines) {
  const minePositions = getMinePositions(boardSize, numberOfMines);
  const board = [];
  for (let row = 0; row < boardSize; row++) {
    const currRow = [];
    for (let col = 0; col < boardSize; col++) {
      const element = document.createElement("div");
      element.dataset.status = TILE_STATUSES.HIDDEN;
      const tile = {
        row,
        col,
        element,
        mine: minePositions.has(`${row},${col}`),
        get status() {
          return this.element.dataset.status;
        },
        set status(value) {
          this.element.dataset.status = value;
        },
      };
      currRow.push(tile);
    }
    board.push(currRow);
  }
  return board;
}

export function checkWin(board, numMines) {
  const hiddenTiles = board.reduce((count, row) => {
    return (
      count +
      row.filter(
        (tile) =>
          tile.status === TILE_STATUSES.HIDDEN ||
          tile.status === TILE_STATUSES.MARKED
      ).length
    );
  }, 0);
  return numMines === hiddenTiles;
}

export function checkLose(board) {
  return board.some((row) => {
    return row.some((tile) => {
      return tile.status === TILE_STATUSES.MINE;
    });
  });
}
