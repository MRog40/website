//
// Michael Rogers
//
// When the window loads, start writing
window.onload = function() {
  // Write onto the snake canvas
  window.canv = document.getElementById("snakeExtreme");
  // Set the context of the snake canvas to 2d
  window.ctx = canv.getContext("2d");
  // Listen for keypresses
  document.addEventListener("keydown", keyPush);
  // Add Obstacles
  //addObstacles();
  // Call game 30 times per second
  setInterval(snake, 1000 / 30);
};
// Ignore arrow key scroll on the page with this script
window.onkeydown = function(e) {
  if (e.key === "ArrowUp" || e.key === "ArrowDown" || e.key.keyCode === 80) {
    e.view.event.preventDefault();
  }
};
// Colors
let darkGray = '#21252b', /* rgb(33, 37, 43)  */
	gray = '#282c34', /* rgb(40, 44, 52)  */
	commentColor = '#7f848e', /* rgb(127, 132, 142)  */
	lightGray = '#abb2bf', /* rgb(171, 178, 191)  */
	offWhite = '#f8fafd', /* rgb(248, 250, 253)  */
	pink = '#ef596f', /* rgb(239, 89, 111)  */
	purple = '#d058d9', /* rgb(208, 88, 217)  */
	blue = '#61afef', /* rgb(97, 175, 239)  */
	green = '#89ca78', /* rgb(137, 202, 120)  */
	orange = '#e5c07b', /* rgb(229, 192, 123)  */
	red = '#c24038'; /* rgb(194, 64, 56)  */

// Variables for the game itself
let xp = 10, // X position
  yp = 25, // Y position
  xv = 1, // X velocity
  yv = 0, // Y velocity
  xf = 30, // X food position
  yf = 25, // Y food position
  grids = 8, // Grid size in pixels
  gridx = 144, // Number of x grids
  gridy = 72, // Number of y grids
  tail = [], // Store tail
  tailLen = 10,
  gamePaused = false,
  lenAdd = 5;

function snake() {
  if (!gamePaused) {
    // Blank the canvas
    ctx.fillStyle = gray;
    ctx.fillRect(0, 0, canv.width, canv.height);

    moveSnake();
    drawSnake();

    // If head is on food, grow snake and make new food
    if (xf == xp && yf == yp) {
      tailLen += lenAdd;
      xf = Math.floor(Math.random() * gridx);
      yf = Math.floor(Math.random() * gridy);
    }
    // Have to make food every time because the canvas gets blanked
    ctx.fillStyle = purple;
    ctx.fillRect(xf * grids, yf * grids, grids - 1, grids - 1);
  }
}
function moveSnake() {
  // Advance the position by the velocity
  xp += xv;
  yp += yv;
  // Wrap the boundaries of the grid if off the edge
  // For Andrew: condition ? true : false
  xp = xp < 0 ? gridx - 1 : xp > gridx - 1 ? 0 : xp;
  yp = yp < 0 ? gridy - 1 : yp > gridy - 1 ? 0 : yp;
}
function drawSnake() {
  tail.push({ x: xp, y: yp }); // Add the new x and new y position to the tail
  while (tail.length > tailLen) {
    tail.shift(); // Removes the last tail piece (over and over in case you lost)
  }
  ctx.fillStyle = pink;
  for (let i = 0; i < tail.length; i++) {
    // For each of the tail x and y, draw the tail piece (square of size grids-1)
    ctx.fillRect(tail[i].x * grids, tail[i].y * grids, grids - 1, grids - 1);
    // If the new snake head is on any of the tail pieces
    if (tail[i].x === tail[0].x && tail[i].y === tail[0].y && i !== 0) {
      gameOver();
    }
  }
}
function gameOver() {
  alert("GAME OVER\nScore: " + (tailLen - 10) / lenAdd);
  // Reset game to initial state
  xp = 10; // X position
  yp = 25; // Y position
  xv = 1; // X velocity
  yv = 0; // Y velocity
  xf = 30; // X food position
  yf = 25; // Y food position
  tailLen = 10;
}
function keyPush(key) {
  if (key.keyCode === 80 || gamePaused) {
    if (gamePaused && key.keyCode === 80) gamePaused = false;
    else gamePaused = true;
  } else {
    switch (key.keyCode) {
			case 72:
      case 37: // Left
        if (xv !== 1) {
          xv = -1;
          yv = 0;
        }
				break;
			case 75:
      case 38: // Up
        if (yv !== 1) {
          xv = 0;
          yv = -1;
        }
				break;
			case 76:
      case 39: // Right
        if (xv !== -1) {
          xv = 1;
          yv = 0;
        }
				break;
			case 74:
      case 40: // Down
        if (yv !== -1) {
          xv = 0;
          yv = 1;
        }
        break;
      default:
        break;
    }
  }
}