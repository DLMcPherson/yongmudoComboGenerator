function flipNewCard() {

  if(randomQuads){ // Purely Random Quads

    var keys = Object.keys(techniqueDictionary);
    for(var ii = 0; ii<4 ; ii++){
      let thisMove = techniqueDictionary[keys[ keys.length * Math.random() << 0]];
      stepTitle[ii].text = thisMove.name
      //stepSide[ii].text = sampleUnif(thisMove.sides).toUpperCase()
      //stepSide[ii].text = sampleUnif(["Left","Right"]).toUpperCase()
      stepSide[ii].text = sampleUnif(["Left","Right"]).toUpperCase() + ", " + sampleUnif(thisMove.sides).toUpperCase()
      stepTarget[ii].text = "to "+sampleUnif(thisMove.targets).toUpperCase()
      stepTarget[ii].x = stepTitle[ii].x + stepTitle[ii].width+30
      stepNickname[ii].text = ''
    }

  } else { // Shuffled Canonical Quads

    // Randomly pick a canon quad
    let thisQuad = sampleUnif(canonQuads)
    // Randomly decide left/right
    let thisChirality = []
    if(Math.random() > 0.5){
      thisChirality = ["Left","Right"]
    } else {
      thisChirality = ["Right","Left"]
    }
    for(var ii = 0; ii<4 ; ii++){
      // Pull out the numbered move from the canon quad
      let thisQuadMove = thisQuad[ii]
      let thisMove = thisQuadMove.move
      // Mask the randomization by the quad's specification
      if(thisQuadMove.sideOverride){
        thisMovesSide = sampleUnif(thisQuadMove.sideOverride)
      } else {
        thisMovesSide = sampleUnif(thisMove.sides)
      }
      if(thisQuadMove.hasOwnProperty("quadChirality")){
        thisMovesChirality = thisChirality[thisQuadMove.quadChirality]
      } else {
        thisMovesChirality = sampleUnif(["Left","Right"])
      }
      if(thisQuadMove.targetOverride){
        thisMovesTarget = sampleUnif(thisQuadMove.targetOverride)
      } else {
        thisMovesTarget = sampleUnif(thisMove.targets)
      }
      // Display the move
      stepTitle[ii].text = thisMove.name
      stepSide[ii].text = thisMovesChirality.toUpperCase() + ", " + thisMovesSide.toUpperCase()
      stepTarget[ii].text = "to "+thisMovesTarget.toUpperCase()
      stepTarget[ii].x = stepTitle[ii].x + stepTitle[ii].width+30
      if(thisQuadMove.hasOwnProperty("nickname")){
        stepNickname[ii].text = 'Also known as "'+thisQuadMove.nickname+'"'
      } else {
        stepNickname[ii].text = ''
      }
    }
  }

}

function sampleUnif(arr) {
  let randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex]
}
