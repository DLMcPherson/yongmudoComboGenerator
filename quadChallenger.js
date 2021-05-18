"use strict"

const FRAME_WIDTH = 1000;
const FRAME_HEIGHT = 1000;
const PLOT_X = 16;

/* ===================== SETUP ================== */

// Setup the PIXI renderer that handles interactive display and input inside the browser
let renderer = PIXI.autoDetectRenderer(FRAME_WIDTH, FRAME_HEIGHT);
renderer.backgroundColor = 0xFFFFFF;
renderer.autoResize = true;
renderer.roundPixels = true;

// Optionally connect to Firebase Cloud Database.
// IMPORTANT NOTE: Should only be used for internal test piloting
const saveToCloud = 0;
if(saveToCloud){
  let firebase = new Firebase("https://testpilotsuperss.firebaseio.com/");
}

// Standard Screen
let stage = new PIXI.Container();
  // Graphics object for lines and squares and such...
let graphics = new PIXI.Graphics();
//graphics.mapper = new ScreenXYMap(30,0,0,30,FRAME_WIDTH/4,FRAME_HEIGHT/2);
let map1 = new FrameXYMap(30,0,0,30,FRAME_WIDTH*1/4,FRAME_HEIGHT/2);
graphics.mapper = map1
stage.addChild(graphics);

let ArcadeScore = 0;
let textPosition = [];

let style = {fontFamily: 'Georgia', fontSize:100, fontWeight:500,fill : 0x007733}
let stepTitle = [
  new PIXI.Text('0',style),
  new PIXI.Text('0',style),
  new PIXI.Text('0',style),
  new PIXI.Text('0',style)
]
style = {fontFamily: 'Gill Sans', fontSize:80, fontWeight:100,fill : 0x007733}
let stepSide = [
  new PIXI.Text('LEAD',style),
  new PIXI.Text('LEAD',style),
  new PIXI.Text('LEAD',style),
  new PIXI.Text('LEAD',style)
]
let stepTarget = [
  new PIXI.Text('to GUTS',style),
  new PIXI.Text('to GUTS',style),
  new PIXI.Text('to GUTS',style),
  new PIXI.Text('to GUTS',style)
]
let color = '0x115533'
for(var ii = 0; ii < 4; ii++) {
  stepTitle[ii].x = 570
  stepTitle[ii].y = 50+100*ii
  stepTitle[ii].text = 'Rear roundhouse kick';
  stepTitle[ii].style.fill = color
  stage.addChild(stepTitle[ii]);
  stepSide[ii].x = 70
  stepSide[ii].y = 60+100*ii
  stage.addChild(stepSide[ii]);
  stepTarget[ii].x = 1750
  stepTarget[ii].y = 60+100*ii
  stage.addChild(stepTarget[ii]);
}

//let optionText = new PIXI.Text('0',{fontFamily: 'Gill Sans', fontSize:50, fontWeight:500,fill : 0x000000})
//optionText.x = 100
//optionText.y = 520
//optionText.text = 'Primary techniques first';
//optionText.style.fill = 0xCCCCCC
//stage.addChild(optionText);

// ===================== THE MAIN EVENT ================== //
flipNewCard()

// Main Loop
let clock =  0 ;
let now = Date.now();
window.setInterval(function() {
  /*
  // Rendering the stage
    // Clear the screen
  graphics.clear();
    // Draw the time axis
  graphics.lineStyle(2, 0x111111);
  var position = map1.mapStateToPosition(PLOT_X,0);
  graphics.moveTo(position[0],position[1])
  position = map1.mapStateToPosition(PLOT_X+50,0);
  graphics.lineTo(position[0],position[1])
    // Render the stage
  */
  renderer.render(stage);
},2)

// ====================== Mouse Listener Loop ========================= //
document.addEventListener("mousedown",function(event) {
  flipNewCard();
  // End
})

// === === HANDLE WINDOW RESIZING EVENT HANDLERS === === //

// Mount the renderer in the website
let mount = document.getElementById("mount");
mount.insertBefore(renderer.view, mount.firstChild);
resize()

// Listen for window resize events
window.addEventListener('resize', resize);
resize()

// Resize function window
function resize() {
  const parent = renderer.view.parentNode;
	// Resize the renderer
  //let newWidth = window.innerWidth
  //let newHeight = window.innerHeight
  let newWidth = parent.clientWidth
  let newHeight = parent.clientHeight

  renderer.resize(newWidth, newHeight);
  console.log(newWidth, newHeight)
  map1.bx = newWidth/4
  map1.by = newHeight/2

  let scale = newWidth/FRAME_WIDTH
  if(scale > newHeight/FRAME_HEIGHT)
    scale = newHeight/FRAME_HEIGHT

  stage.scale.x = scale
  stage.scale.y = scale
  map1.bx /= scale
  map1.by /= scale
}
