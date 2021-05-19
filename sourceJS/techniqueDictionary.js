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
  let name = "Backturned "+tech
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
for(var tech of ["Chop", "Hammerfist", "Back-knuckle"]){
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
let Headhigh = "High"
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
{
  let name = "Tentblock"
  let move = new Move(name)
  move.targets = [Headhigh]
  move.distance = ARMSLENGTH
  move.class = "Blocks"
  techniqueDictionary[name] = move
}

// Compile the axe kicks
for(var tech of ["Knife-edge Axe","Heel down Axe"]){
  let name = tech+"-kick"
  let move = new Move(name)
  move.targets = [Collarbone]
  move.distance = LEGSLENGTH
  move.class = "Axe Kicks"
  techniqueDictionary[name] = move
}
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
// Compile the kneeup
{
  let name = "Kneeup"
  let move = new Move(name)
  move.targets = [Face, Guts, Groin, Knees]
  move.distance = ARMSLENGTH
  move.class = "Linear Kicks"
  techniqueDictionary[name] = move
}
// Compile the scoop kick
{
  let name = "Scoop-kick"
  let move = new Move(name)
  move.targets = [Knees, "Shin", "Ankle"]
  move.distance = ARMSLENGTH
  move.class = "Linear Kicks"
  techniqueDictionary[name] = move
}
// Compile the scissors kicks
{
  let name = "Scissors Front Thrust-kick"
  let move = new Move(name)
  move.targets = [Head, Guts, Floatingribs, Groin, Legs]
  move.distance = FLYLENGTH
  move.class = "Jump-Scissors Kicks"
  techniqueDictionary[name] = move
}
{
  //let name = "'Naraebang' Scissors Jump-Turning Roundhouse-kick"
  // Question: on https://lhallock.github.io/ymd-ext/techniques/kicks.html is the Naraebang the Jump-Spinning Round or the Scissors Round?
  // And how come there isn't a "Scissors Front"? Is it just called "Jump Front" here or is it excluded altogether?
  // Also, what the heck is a cover kick?
  // TODO: figure out the formal name for the Naraebang
  let name = "Naraebang Roundhouse-kick"
  let move = new Move(name)
  move.targets = [Head, Guts, Floatingribs, Groin, Knees]
  move.distance = LEGSLENGTH
  move.class = "Jump-Scissors Kicks"
  techniqueDictionary[name] = move
}
{
  //let name = "'Naraebang Ax-kick' Scissors Jump-Turning Knife-edge Ax-kick"
  //let name = "'Naraebang Ax-kick' Scissors Jump-Turning Heeldown Ax-kick"
  let name = "Naraebang Ax-kick"
  let move = new Move(name)
  move.targets = [Collarbone]
  move.distance = LEGSLENGTH
  move.class = "Jump-Scissors Kicks"
  techniqueDictionary[name] = move
}

// TODO: consider adding slap kicks and cover kicks
// TODO: find the name for that weird reverse roundhouse shot to the groin that Master Commins likes

// Print to console for debugging
console.log(techniqueDictionary)
