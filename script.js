const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;

canvas.width = COLS * BLOCK_SIZE;
canvas.height = ROWS * BLOCK_SIZE;

// ==============================
// 🔥 BOARD
// ==============================

const board = Array.from({ length: ROWS }, () =>
  Array(COLS).fill(0)
);

// ==============================
// 🔥 TETROMINOS CLÁSSICOS
// ==============================

const TETROMINOS = [
  {
    shape: [[1, 1, 1, 1]], // I
    color: "cyan"
  },
  {
    shape: [
      [1, 1],
      [1, 1]
    ], // O
    color: "yellow"
  },
  {
    shape: [
      [0, 1, 0],
      [1, 1, 1]
    ], // T
    color: "purple"
  },
  {
    shape: [
      [1, 0, 0],
      [1, 1, 1]
    ], // L
    color: "orange"
  },
  {
    shape: [
      [0, 0, 1],
      [1, 1, 1]
    ], // J
    color: "blue"
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1]
    ], // S
    color: "green"
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0]
    ], // Z
    color: "red"
  }
];

// ==============================
// 🔥 GERAR PEÇA ALEATÓRIA
// ==============================

function getRandomPiece() {
  const random = Math.floor(Math.random() * TETROMINOS.length);
  const tetromino = TETROMINOS[random];

  return {
    shape: tetromino.shape,
    color: tetromino.color,
    x: Math.floor(COLS / 2) - 1,
    y: 0
  };
}

let currentPiece = getRandomPiece();

// ==============================
// 🔹 DESENHAR GRID
// ==============================

function drawGrid() {
  context.strokeStyle = "#333";

  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      context.strokeRect(
        col * BLOCK_SIZE,
        row * BLOCK_SIZE,
        BLOCK_SIZE,
        BLOCK_SIZE
      );
    }
  }
}

// ==============================
// 🔹 DESENHAR BOARD FIXO
// ==============================

function drawBoard() {
  for (let row = 0; row < ROWS; row++) {
    for (let col = 0; col < COLS; col++) {
      if (board[row][col] !== 0) {
        drawBlock(col, row, board[row][col]);
      }
    }
  }
}

// ==============================
// 🔹 DESENHAR BLOCO
// ==============================

function drawBlock(x, y, color) {
  context.fillStyle = color;
  context.fillRect(
    x * BLOCK_SIZE,
    y * BLOCK_SIZE,
    BLOCK_SIZE,
    BLOCK_SIZE
  );
}

// ==============================
// 🔥 DESENHAR PEÇA ATUAL
// ==============================

function drawPiece() {
  currentPiece.shape.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === 1) {
        drawBlock(
          currentPiece.x + colIndex,
          currentPiece.y + rowIndex,
          currentPiece.color
        );
      }
    });
  });
}

// ==============================
// 🔥 COLISÃO
// ==============================

function collision(offsetX = 0, offsetY = 0) {
  return currentPiece.shape.some((row, rowIndex) =>
    row.some((value, colIndex) => {
      if (!value) return false;

      const newX = currentPiece.x + colIndex + offsetX;
      const newY = currentPiece.y + rowIndex + offsetY;

      return (
        newX < 0 ||
        newX >= COLS ||
        newY >= ROWS ||
        board[newY]?.[newX] !== 0
      );
    })
  );
}

// ==============================
// 🔥 TRAVAR PEÇA
// ==============================

function lockPiece() {
  currentPiece.shape.forEach((row, rowIndex) => {
    row.forEach((value, colIndex) => {
      if (value === 1) {
        board[currentPiece.y + rowIndex][currentPiece.x + colIndex] =
          currentPiece.color;
      }
    });
  });

  currentPiece = getRandomPiece();

  if (collision()) {
    alert("Game Over!");
    clearInterval(gameInterval);
  }
}

// ==============================
// 🔹 CONTROLES
// ==============================

document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowLeft" && !collision(-1, 0)) {
    currentPiece.x--;
  }

  if (event.key === "ArrowRight" && !collision(1, 0)) {
    currentPiece.x++;
  }

  if (event.key === "ArrowDown" && !collision(0, 1)) {
    currentPiece.y++;
  }
});

// ==============================
// 🔥 LOOP DO JOGO
// ==============================

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);

  drawGrid();
  drawBoard();
  drawPiece();

  if (!collision(0, 1)) {
    currentPiece.y++;
  } else {
    lockPiece();
  }
}

const gameInterval = setInterval(update, 500);