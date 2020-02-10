//
// Michael Rogers
//
// When the window loads, start writing 
window.onload=function() {
	// Write onto the snake canvas
	window.canv = document.getElementById('2048');
	// Set the context of the snake canvas to 2d
	window.ctx = canv.getContext('2d');
	// Listen for keypresses
	document.addEventListener("keydown",keyPush);
	twenty();
}
// Ignore arrow key scroll on the page with this script
window.onkeydown = function (e) {
	if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
			e.view.event.preventDefault();
	}
}
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
let grids = 140, // Grid size in pixels
		score = 0,
		addBlock = true;
let grid = [
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0],
			[0, 0, 0, 0]
		];

const colors = 
['#21252b', // 0
'#493442', // 2
'#6a3b4a', // 4
'#9c4655', // 8
'#bd4e5d', // 16
'#ce5161', // 32
'#de5564', // 64
'#89ca78', // 128
'#61afef', // 256
'#e5c06a', // 512
'#ef5968', // 1024
'#d058d9']; // 2048

function twenty() {
	// Blank the canvas
	ctx.fillStyle = gray;
	ctx.fillRect(0,0,canv.width,canv.height);

	if(addBlock)
		addTwo();
	fillGrid();
}
function fillGrid() {
	// For each row and column, fill the appropriately colored box
	for(let i = 0; i < 4; i++) {
		for(let j = 0; j < 4; j++) {
			fill(colors[Math.log2(grid[i][j] !== 0 ? grid[i][j] : 1)], i, j, grid[i][j]) // This is the neatest line of this script
		}
	}
}
function fill(color, i, j, number) {
	ctx.fillStyle = color;
	ctx.fillRect(i*grids+16, j*grids+16, grids-16, grids-16);
	ctx.fillStyle = lightGray;
	ctx.textAlign = 'center';
	fontSize = 42;
	ctx.font = 'normal normal normal ' + fontSize + 'px ubuntu';
	ctx.fillText(number === 0 ? '' : number, i*grids+74, j*grids+90)
}
function gameOver() {
	alert("GAME OVER\nScore: " + score );
	// Reset the game board
	score = 0;
	grid = [
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0],
		[0, 0, 0, 0]
	];
	fillGrid();
}
function addTwo() {
	let zeros = [];
	for(let i = 0; i < 4; i++) {
		for(let j = 0; j < 4; j ++) {
			if(grid[i][j] === 0)
				zeros.push({x:i, y:j});
		}
	}
	if (zeros.length === 0){
		gameOver();
	}
	else {
		let spot = Math.floor(Math.random()*zeros.length);
		let val = Math.ceil(Math.random()*2)*2;
		grid[zeros[spot].x][zeros[spot].y] = val;
	}
}
function slideLeft() {
	for(let i = 0; i < 4; i++) {
		for(let j = 3; i <= 0; i++) {
			
			// If right-block equals block and block isn't zero, delete right-block and double block
			
			// If block is zero and right block is not, block becomes right-block and delete right-block 
		}
	}
}
function keyPush(key) {
	addBlock = false;
	switch(key.keyCode) {
		case 73:
		case 37: // Left
			slideLeft();
			twenty();
			break;
		case 75:
		case 38: // Up
			slideUp();
			twenty();
			break;
		case 76:
		case 39: // Right
			slideRight();
			twenty();
			break;
		case 74:
		case 40: // Down
			slideDown();
			twenty();
			break;
		default:
			break;
	}
}