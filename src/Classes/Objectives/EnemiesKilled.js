import { Objective } from "./Objective"
import { noEnemiesDead } from "../../utils"

export class EnemiesKilled extends Objective {
    constructor({noEnemiesToKill}) {
        super()
        this.type = "enemiesKilled"
        this.goal = noEnemiesToKill
        this.currentProgress = 0
        this.goalAchieved = false
    }

    checkProgess(enemies) {
        this.currentProgress = noEnemiesDead(enemies)
        if (this.currentProgress === this.goal) this.goalAchieved = true
        return "Targets Eliminated: "+ this.currentProgress + " / " + this.goal
    }
}