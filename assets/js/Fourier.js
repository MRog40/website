//
// Michael Rogers
//
// When the window loads
window.onload = function() {
  // Write onto the snake canvas
  window.canv = document.getElementById("fourier");
  // Set the context of the snake canvas to 2d
  window.ctx = canv.getContext("2d");
  // Listen for keypresses
  document.addEventListener("keydown", keyPush);
  // Call game 20 times per second
  setInterval(draw, 1000 / 20);
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

let time = 0;
let wave = [];

let slider;

function draw() {
  
	// Blank the canvas
	ctx.fillStyle = gray;
	ctx.fillRect(0, 0, canv.width, canv.height);

  let x = 0;
  let y = 0;

  for (let i = 0; i < slider.value(); i++) {
    let prevx = x;
    let prevy = y;

    let n = i * 2 + 1;
    let radius = 75 * (4 / (n * PI));
    x += radius * cos(n * time);
    y += radius * sin(n * time);

    stroke(255, 100);
    noFill();
    ellipse(prevx, prevy, radius * 2);

    stroke(255);
    line(prevx, prevy, x, y);
  }
  wave.unshift(y);

  translate(200, 0);
  line(x - 200, y, 0, wave[0]);
  beginShape();
  noFill();
  for (let i = 0; i < wave.length; i++) {
    vertex(i, wave[i]);
  }
  endShape();

  time += 0.05;

  if (wave.length > 400) {
    wave.pop();
  }
}