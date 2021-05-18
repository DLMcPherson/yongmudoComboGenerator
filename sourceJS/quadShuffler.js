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
        if(thisQuadMove.hasOwnProperty("note")){
          stepNickname[ii].text = thisQuadMove.note
        } else {
          stepNickname[ii].text = ''
        }
      }
    }
  }

  // Randomize the exercise suggestion
  let suggestedExercise = sampleUnif(
    [
      "Focus on turning power from the hips. Repeat twelve times, \n then switch left/right and repeat twelve more times",
      "Focus on getting off the line. Work your way around a point three times, \n then switch left/right and work your way around the other way three times",
      "Focus on moving with the strikes. Work your way across the room, \n then switch left/right and work your way back",
    ]
  )
  exerciseSuggestion.text = suggestedExercise

}

function sampleUnif(arr) {
  let randomIndex = Math.floor(Math.random() * arr.length);
  return arr[randomIndex]
}
