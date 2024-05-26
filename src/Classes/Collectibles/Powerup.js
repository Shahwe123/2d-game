import { Collectible } from "./Collectible";
import powerupSrc from '../../assets/Collectibles/powerup.png'

export class Powerup extends Collectible {

    constructor({position, mapKey, id}) {
        super({position, imageSrc: powerupSrc, id})

        this.type = "powerup"
        this.increaseCapacity = 25
        this.width = 32
        this.height = 32
        this.mapKey = mapKey
        this.duration = 250
        this.isActivated = false
    }
    //TODO: image too big
    // add too inventi

    draw({canvasContext}) {
        canvasContext.drawImage(this.image, this.position.x, this.position.y, this.width / 2, this.height / 2)
    }

    update({player}) {
        this.isActivated = true
        player.attackPower += this.increaseCapacity
    }
}