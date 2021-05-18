"use strict"

const FRAME_WIDTH = 1600;
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

// Header

//let optionText = new PIXI.Text('0',{fontFamily: 'Gill Sans', fontSize:50, fontWeight:500,fill : 0x000000})
//optionText.x = 100
//optionText.y = 520
//optionText.text = 'Primary techniques first';
//optionText.style.fill = 0xCCCCCC
//stage.addChild(optionText);

// Layout the Quad Display
let styleSerif = {fontFamily: 'Georgia', fontSize:96, fontWeight:500,fill : 0x115533}
var stepTitle = [
  new PIXI.Text('PUNCH',styleSerif),
  new PIXI.Text('PUNCH',styleSerif),
  new PIXI.Text('PUNCH',styleSerif),
  new PIXI.Text('PUNCH',styleSerif)
]
var styleSans = {fontFamily: 'Gill Sans', fontSize:84, fontWeight:100,fill : 0x007733}
var stepSide = [
  new PIXI.Text('LEAD',styleSans),
  new PIXI.Text('LEAD',styleSans),
  new PIXI.Text('LEAD',styleSans),
  new PIXI.Text('LEAD',styleSans)
]
var stepTarget = [
  new PIXI.Text('to GUTS',styleSans),
  new PIXI.Text('to GUTS',styleSans),
  new PIXI.Text('to GUTS',styleSans),
  new PIXI.Text('to GUTS',styleSans)
]
let color = '0x115533'
let numberText = []
var stepNickname = []
const READOUT_X = 370
const READOUT_Y = 0
const LEADLENGTH = 150
for(var ii = 0; ii < 4; ii++) {
  // Place the side display
  numberText[ii] = new PIXI.Text(ii+1+". ",styleSerif)
  numberText[ii].x = READOUT_X - 120
  numberText[ii].y = READOUT_Y+45+LEADLENGTH*ii
  stage.addChild(numberText[ii]);
  stepSide[ii].x = 0 + READOUT_X
  stepSide[ii].y = READOUT_Y+60+LEADLENGTH*ii
  stage.addChild(stepSide[ii]);
  // Place the technique display
  stepTitle[ii].x = 500 + READOUT_X
  stepTitle[ii].y = READOUT_Y+50+LEADLENGTH*ii
  stepTitle[ii].text = 'Rear roundhouse kick';
  stage.addChild(stepTitle[ii]);
  // Place the hidden nickname display
  stepNickname[ii] = new PIXI.Text("Jab",styleSerif)
  stepNickname[ii].x = 400 + READOUT_X
  stepNickname[ii].y = READOUT_Y+20+LEADLENGTH*ii
  stepNickname[ii].style.fontSize = 36
  stepNickname[ii].text = '';
  stage.addChild(stepNickname[ii]);
  // Place the target display
  stepTarget[ii].x = 1680 + READOUT_X
  stepTarget[ii].y = READOUT_Y+60+LEADLENGTH*ii
  stage.addChild(stepTarget[ii]);
}
let exerciseSuggestionLead = new PIXI.Text("EXERCISE SUGGESTION: ",styleSans)
exerciseSuggestionLead.x = 100
exerciseSuggestionLead.y = READOUT_Y+20+LEADLENGTH*4.5
exerciseSuggestionLead.style.fontSize = 48
stage.addChild(exerciseSuggestionLead)
let exerciseSuggestion = new PIXI.Text("Repeat",styleSerif)
exerciseSuggestion.x = 650
exerciseSuggestion.y = READOUT_Y+20+LEADLENGTH*4.5
exerciseSuggestion.text = "Repeat ten times, then switch left/right and repeat ten more times";
exerciseSuggestion.style.fontSize = 48
stage.addChild(exerciseSuggestion)

// Add the clickable generation options
var optionText = []
let options = ["PURE RANDOM QUADS","CANON QUADS"]
for(let ii of [0,1]){
  optionText[ii] = new PIXI.Text('0',styleSans)
  optionText[ii].x = 100+2000*ii
  optionText[ii].y = READOUT_Y+LEADLENGTH*5.5
  optionText[ii].text = options[ii]
  optionText[ii].style.fill = 0xCCCCCC
  optionText[ii].style.fontSize = 48
  stage.addChild(optionText[ii]);
  optionText[ii].interactive = true
}
onDown_randomQuad()
var randomQuads = true
optionText[0].on('mousedown', onDown_randomQuad);
optionText[0].on('touchstart', onDown_randomQuad);
function onDown_randomQuad(eventData){
  randomQuads = true
  optionText[0].style.fill = 0x220000
  optionText[1].style.fill = 0xCCCCCC
}
optionText[1].on('mousedown', onDown_canonQuad);
optionText[1].on('touchstart', onDown_canonQuad);
function onDown_canonQuad(eventData){
  randomQuads = false
  optionText[0].style.fill = 0xCCCCCC
  optionText[1].style.fill = 0x220000
}

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
document.addEventListener("touchstart",function(event) {
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
  /*
  if(scale > newHeight/FRAME_HEIGHT)
    scale = newHeight/FRAME_HEIGHT
    console.log("height constrained scale")
  */
  if(scale > 1) scale = 1;
  scale *= 0.6

  console.log(scale)

  stage.scale.x = scale
  stage.scale.y = scale
  map1.bx /= scale
  map1.by /= scale

}
