//
// Michael Rogers
//
// When the window loads, start writing
window.onload = function() {
  // Write onto the snake canvas
  window.canv = document.getElementById("snakeLayne");
  // Set the context of the snake canvas to 2d
  window.ctx = canv.getContext("2d");
  // Listen for keypresses
  document.addEventListener("keydown", keyPush);
  // Call game 20 times per second
  setInterval(snake, 1000 / 15);
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
let xp = 5, // X position
  yp = 12, // Y position
  xv = 1, // X velocity
  yv = 0, // Y velocity
  xf = 18, // X food position
  yf = 12, // Y food position
  grids = 24, // Grid size in pixels
  gridx = 24, // Number of x grids
  gridy = 24, // Number of y grids
  tail = [], // Store tail
  gamePaused = false,
  tailLen = 5,
  lenAdd = 2;

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
    // Make food 3 times for layne
    ctx.fillStyle = purple;
    ctx.fillRect(xf * grids, yf * grids, grids - 3, grids - 3);
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
    // For each of the tail x and y, draw the tail piece (square of size grids-3)
    ctx.fillRect(tail[i].x * grids, tail[i].y * grids, grids - 3, grids - 3);
    // If the new snake head is on any of the tail pieces
    if (tail[i].x === tail[0].x && tail[i].y === tail[0].y && i !== 0) {
      gameOver();
    }
  }
}
function gameOver() {
  alert("GOOD JOB LAYNE\nScore: " + ((tailLen - 5) / lenAdd) * 3);

  // Reset game to initial state
  xp = 5; // X position
  yp = 12; // Y position
  xv = 1; // X velocity
  yv = 0; // Y velocity
  xf = 18; // X food position
  yf = 12; // Y food position
  tailLen = 5;
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