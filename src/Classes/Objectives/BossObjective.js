import { Objective } from "./Objective"

export class BossObjective extends Objective {
    constructor() {
        super()
        this.type = "boss"
        this.goalAchieved = false
        this.objectiveActivated = false
    }

    checkProgess(boss) {
        if (boss.currentHealth <= 0) {
            this.goalAchieved = true
        }
    }

    // intialise(objectives) {
    //     objectives.push(new BossObjective())
    // }
}