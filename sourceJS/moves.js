// Mapper class that scales state space to frame
class Move {
  constructor(name){
    this.name = name
    this.order = "primary"
  }
  // Returns the valid targets of the technique
  listTargets(){
    return ["head","groin","knee","floating ribs","gut","collarbone","kidney"]
  }
}
