import { Collectible } from "./Collectible";

export class HealthKit extends Collectible {
    constructor({position}) {
        super({position})
        this.healingCapacity = 100
        this.width = 32
        this.height = 32
    }
}