const ELBOWSLENGTH = 0
const ARMSLENGTH = 1
const LEGSLENGTH = 2
const FLYLENGTH = 3

// Mapper class that scales state space to frame
class Move {
  constructor(name){
    this.name = name
    this.targets = []
    this.sides = ["Lead", "Rear"]
    this.distance = 0
    //this.order = "primary"
  }
  // Returns the valid targets of the technique
  listTargets(){
    return this.targets
  }
}
