const canvas = document.getElementById("game");
const context = canvas.getContext("2d");

const ROWS = 20;
const COLS = 10;
const BLOCK_SIZE = 30;

canvas.width = COLS * BLOCK_SIZE;
canvas.height = ROWS * BLOCK_SIZE;

function drawGrid() {
    context.strokeStyle = "#333";

    for (let row = 0; row < ROWS; row++){
        for (let col = 0; col < COLS; col++){
            context.strokeRect(
                col * BLOCK_SIZE,
                row * BLOCK_SIZE,
                BLOCK_SIZE,
                BLOCK_SIZE
            );
        }
    }
}
drawGrid();

let position = { x: 4, y: 0 };

function drawBlock(x, y, color = "red") {
  context.fillStyle = color;
  context.fillRect(
    x * BLOCK_SIZE,
    y * BLOCK_SIZE,
    BLOCK_SIZE,
    BLOCK_SIZE
  );
}

function update() {
  context.clearRect(0, 0, canvas.width, canvas.height);
  drawGrid();
  drawBlock(position.x, position.y);

  position.y++;
}

setInterval(update, 500);