var techniqueDictionary = {}

const LINHANDS = ["Fist", "Palmheel", "Ridgehand", "Elbow", "Oxjaw"]
const ROTHANDS = ["Chop", "Hammerfist", "Backelbow", "Back-knuckle"]
let Head = "Head", Face = "Face", Nose = "Nose", Chin = "Chin"
let Neck = "Neck", Collarbone = "Collarbone"
let Guts = "Guts", Floatingribs = "Floating ribs"
let Groin = "Groin"
let Knees = "Knees", Legs = "Legs"

// Compile the rising handstrikes
for(var tech of LINHANDS){
  let name = "Rising "+tech
  let move = new Move(name)
  move.targets = [Chin, Guts, Groin]
  move.distance = ELBOWSLENGTH
  move.class = "Rising Hands"
  techniqueDictionary[name] = move
}
// Compile the falling handstrikes
for(var tech of ROTHANDS){
  let name = "Falling "+tech
  let move = new Move(name)
  move.targets = [Collarbone]
  move.distance = ARMSLENGTH
  move.class = "Falling Hands"
  techniqueDictionary[name] = move
}
// Compile the backturning handstrikes
for(var tech of ROTHANDS){
  let name = "Backturning "+tech
  let move = new Move(name)
  move.targets = [Guts, Floatingribs, Groin, Face, Collarbone]
  move.distance = ELBOWSLENGTH
  move.class = "Backturning Hands"
  techniqueDictionary[name] = move
}
// Compile the front-handstrikes
for(var tech of LINHANDS){
  let name = "Forward "+tech
  let move = new Move(name)
  move.targets = [Nose, Guts, Floatingribs, Groin]
  move.distance = ARMSLENGTH
  move.class = "Forward Hands"
  techniqueDictionary[name] = move
}
for(var tech of ROTHANDS){
  let name = "Forward "+tech
  let move = new Move(name)
  move.targets = [Face, Neck, Guts, Floatingribs, Groin]
  move.distance = ELBOWSLENGTH
  move.class = "Forward Hands"
  techniqueDictionary[name] = move
}

// Compile the blocks
let Low = "Low"
let High = "Midheight"
for(var direc of ["In-to-out","Out-to-in"]){
  for(var tech of ["Hardblock","Softblock"]){
    let name = direc+" "+tech
    let move = new Move(name)
    move.targets = [Low, High]
    move.distance = ARMSLENGTH
    move.class = "Blocks"
    techniqueDictionary[name] = move
  }
}
// Compile the tent blocks
 // TODO: add Tent blocks

// Compile the axe kicks
 // TODO: add the axe kicks
// Compile the rotational kicks
for(var tech of ["Shoot Roundhouse","Chop Roundhouse","Spin Heel"]){
  let name = tech+"-kick"
  let move = new Move(name)
  move.targets = [Face, Floatingribs, Knees]
  move.distance = LEGSLENGTH
  move.class = "Rotational Kicks"
  techniqueDictionary[name] = move
}
for(var tech of ["Roundhouse Kneeup", "Hook", "Spin Hook", "Shuttle"]){
  let name = tech+"-kick"
  let move = new Move(name)
  move.targets = [Guts, Floatingribs, Groin, Knees]
  move.distance = ARMSLENGTH
  move.class = "Rotational Kicks"
  techniqueDictionary[name] = move
}
// Compile the linear kicks
for(var tech of ["Front Spearing Push", "Front Spearing Thrust", "Front Knife-edge Push", "Front Knife-edge Thrust","Side", "Back", "Backturning Side"]){
  let name = tech+"-kick"
  let move = new Move(name)
  move.targets = [Head, Guts, Floatingribs, Groin, Legs]
  move.distance = LEGSLENGTH
  move.class = "Linear Kicks"
  techniqueDictionary[name] = move
}

// TODO: compile the classless kicks
// Compile the kneeup
// Compile the scoop kick
// Compile the scissors kicks

// Print to console for debugging
console.log(techniqueDictionary)

function flipNewCard() {
  //let thisTarget = deck[curCard][1];
  for(var ii = 0; ii<4 ; ii++){
    var keys = Object.keys(techniqueDictionary);
    let thisMove = techniqueDictionary[keys[ keys.length * Math.random() << 0]];
    stepTitle[ii].text = thisMove.name
    //stepSide[ii].text = sampleUnif(thisMove.sides).toUpperCase()
    stepSide[ii].text = sampleUnif(["Left","Right"]).toUpperCase()
    stepTarget[ii].text = "to "+sampleUnif(thisMove.targets).toUpperCase()
    stepTarget[ii].x = stepTitle[ii].x + stepTitle[ii].width+30
  }
}

function sampleUnif(arr) {
  let randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex]
}
