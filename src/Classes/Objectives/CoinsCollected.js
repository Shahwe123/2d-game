import { noCollectedCoins } from "../../utils"
import { Objective } from "./Objective"

export class CoinsCollected extends Objective {
    constructor({noCoinsToCollect}) {
        super()
        this.type = "coinsCollected"
        this.goal = noCoinsToCollect
        this.currentProgress = 0
        this.goalAchieved = false
    }

    checkProgess(collectibles) {

        this.currentProgress = noCollectedCoins(collectibles)
        if (this.currentProgress === this.goal) this.goalAchieved = true
        return "Coins Collected: " + this.currentProgress + " / " + this.goal
    }
}