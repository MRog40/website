//
// Michael Rogers
//
// When the window loads, start writing
window.onload = function() {
  // Write onto the snake canvas
  window.canv = document.getElementById('minesweeper'); // canvas of <canvas id="minesweeper" width="1152" height="576"></canvas>
  // Set the context of the snake canvas to 2d
	window.ctx = canv.getContext('2d');
	// Perm settings for ctx
	ctx.textAlign = 'center';
	let fontSize = 24;
	ctx.font = 'normal normal normal ' + fontSize + 'px ubuntu';
  // Listen for clicks
	document.addEventListener('click', function (e) { getClickPosition(canv, e);}, false);
	document.addEventListener('contextmenu', function (e) { getRightClickPosition(canv, e);}, false);
	document.oncontextmenu = function() {return false;}
  // Set up game and display it
	initialize();
  drawBoard();
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

// Variables for the game
let grids = 32, // Grid size in pixels
  gridx = 36, // Number of x grids
  gridy = 18, // Number of y grids
	mines = [], // Store mines here
	flags = [], // Store mines here
	numMines = 100, // Number of mines
	score = 0,
	extra = 4,
	colors = [orange, pink, blue, purple,
		green, red, red, red, red];

function initialize() {
	mines = Array(gridx).fill().map(() => Array(gridy).fill(-1));
	flags = Array(gridx).fill().map(() => Array(gridy).fill(0));
	score = 0;
	for(let i = 0; i < numMines; i++) {
    xp = Math.floor(Math.random() * gridx);
		yp = Math.floor(Math.random() * gridy);
		mines[xp][yp] = -2; // -2 is mine
	}
}
function drawBoard(x=0, y=0, loss=false) {
	// Blank the canvas
	ctx.fillStyle = darkGray;
	ctx.fillRect(0, 0, canv.width, canv.height);
	// Draw over each block depending on it's type
	for(let i = 0; i < gridx; i++) {
		for(let j = 0; j < gridy; j++) {
			if(flags[i][j] && !loss)
				drawSpot(gray, '\u26cc', i, j, orange);
			else {
				if(mines[i][j] >= 0) // If clicked w/ hint
					drawSpot(darkGray, mines[i][j] !== 0 ? mines[i][j].toString() : ' ',i, j, colors[mines[i][j]]);
				else if(mines[i][j] === -2 && loss) // If mine and game lost
					drawSpot(darkGray, '\u2622', i, j, flags[i][j] ? commentColor:pink);
				else if(loss && flags[i][j] && mines[i][j] !== -2)
					drawSpot(gray, '\u26cc', i, j, red);
				else									 // If not clicked
					drawSpot(gray, ' ', i, j);
			}
		}
	}
	if(mines[x][y] === -2 && loss) // If mine
		drawSpot(darkGray, '\u2622', x, y, red); // You lost
	else if(!mines.some(row => row.includes(-1)))
		setTimeout(function() {gameOver(true);}, 200);
}
function drawSpot(color, char, x, y,  textcolor=lightGray) {
	ctx.fillStyle = color;
	ctx.fillRect(x*grids+extra/2, y*grids+extra/2, grids - extra, grids - extra);
	ctx.fillStyle = textcolor;
	ctx.fillText(char, x*grids+Math.round(grids/2), y*grids+Math.round(grids/4*3));
}
function updateBoard(x, y) {
	if(mines[x][y] === -2 && !flags[x][y]) { // Clicked mine
		drawBoard(x, y, true);
		setTimeout(function() {gameOver();}, 200);
		return false;
	}
	else if(mines[x][y] === -1 && !flags[x][y]) { // Clicked unclicked square
		mines[x][y] = findNumber(x, y); 
		if(mines[x][y] === 0)
			clearZeros(x, y);
		score++;
		return true;
	}
}
function neighbors(i, j) { // Return neighbors of spot if neighbor within bounds of board
	return [
		{x:i-1, y:j-1}, // Top left
		{x:i, y:j-1}, // Top 
		{x:i+1, y:j-1}, // Top right 
		{x:i+1, y:j}, // Right
		{x:i+1, y:j+1}, // Bottom Right
		{x:i, y:j+1}, // Bottom
		{x:i-1, y:j+1}, // Bottom left
		{x:i-1, y:j}  // Left
	].filter(value => value.x>=0 && value.x<gridx && value.y>=0 && value.y<gridy && mines[value.x][value.y] < 0); // Filter invalid spots
}
function findNumber(x, y) {
	let number = 0;
	console.log('FindNumber of: ' + x + ', ' + y);
	for (let nbor of neighbors(x, y)) {
		if(mines[nbor.x][nbor.y] === -2)
			number++;
	}
	return number;
}
function clearZeros(x, y) {
	console.log('Clear Zeros of: ' + x + ', ' + y);
	let nbors = neighbors(x, y);
	for (let nbor of nbors) {
		if(mines[nbor.x][nbor.y] === -1) {
			mines[nbor.x][nbor.y] = findNumber(nbor.x, nbor.y);
			console.log('Value of: ' + nbor.x + ', ' + nbor.y + ' is: ' + mines[nbor.x][nbor.y]);
			if(mines[nbor.x][nbor.y] === 0)
				clearZeros(nbor.x, nbor.y);
		}
	}
}
function placeFlag(x, y) {
	if(mines[x][y] < 0 && !flags[x][y])	
		flags[x][y] = 1;
	else
		flags[x][y] = 0;
}
function gameOver(win=false) {
	if(win)
		alert('YOU WON!\nScore: ' + score);
	else
		alert('Close, try again!\nScore: ' + score);
	initialize();
	drawBoard();
}
function getClickPosition(canvas, e) {
	let rect = canvas.getBoundingClientRect();
	let x = e.clientX - rect.left;
	let y = e.clientY - rect.top;
	if(x > 0 && x < gridx*grids && y > 0 && y < gridx*grids) {
		xg = Math.floor(x/grids);
		yg = Math.floor(y/grids);
		if(updateBoard(xg, yg)) 
			drawBoard();
	}
}
function getRightClickPosition(canvas, e) {
	let rect = canvas.getBoundingClientRect();
	let x = e.clientX - rect.left;
	let y = e.clientY - rect.top;
	if(x > 0 && x < gridx*grids && y > 0 && y < gridx*grids) {
		xg = Math.floor(x/grids);
		yg = Math.floor(y/grids);
		placeFlag(xg, yg);
		drawBoard();
	}
}