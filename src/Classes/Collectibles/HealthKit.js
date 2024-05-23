import { Collectible } from "./Collectible";
import healthBoxSrc from "../../assets/Collectibles/health.png"

export class HealthKit extends Collectible {
    constructor({position, mapKey, id}) {
        super({position, imageSrc: healthBoxSrc, id})
        this.healingCapacity = 100
        this.type = "healthKit"
        this.width = 32
        this.height = 32
        this.mapKey = mapKey
    }

    update({player}) {
        player.currentHealth += 100
        if (player.currentHealth > player.health) {
            player.currentHealth = player.health
        }
    }
}