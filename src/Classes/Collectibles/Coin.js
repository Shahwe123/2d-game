import { Collectible } from "./Collectible";
import coinSpriteSrc from '../../assets/Collectibles/coin1.png'

export class Coin extends Collectible {
    constructor({position, mapKey, id}) {
        super({position, imageSrc: coinSpriteSrc, id})
        this.frameRate = 4
        this.sprite = new Image()
        this.sprite.src = coinSpriteSrc
        this.sprite.onload = () => {
            this.height = this.sprite.height
            this.width = this.sprite.width / this.frameRate
            this.loaded = true
        }
        this.type = "coin"
        this.frameBuffer = 8
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.mapKey = mapKey
        this.isPickedUp = false

        this.avatarDimensions = {
            position: {
                x:this.position.x + 11,
                y:this.position.y + 6
            },
            width:30,
            height:38
        }
    }

    update({player}) {
        // this.draw({canvasContext})
        // this.updateFrames()

    }

    /**
     * Draws onto the canvas the current image using a cropbox that moves across the image file to simulate animation
     *
     */
    draw({canvasContext}) {
        if (!this.sprite || this.isPickedUp) return
        let cropbox = {}
        cropbox = {
            position: {
                x:this.currentFrame * (this.sprite.width / this.frameRate),
                y:0,
            },
            width:this.sprite.width / this.frameRate,
            height:this.sprite.height
        }
        if (this.width === 200) {
            this.width = 50
        }
        // canvasContext.fillStyle = "rgba(255,0,0,0.4)"
        // canvasContext.fillRect(this.position.x, this.position.y, this.width , this.height )
        // canvasContext.fillStyle = "rgba(0,255,0,0.4)"
        // canvasContext.fillRect(this.avatarDimensions.position.x, this.avatarDimensions.position.y, this.avatarDimensions.width , this.avatarDimensions.height )

        canvasContext.drawImage(
            this.sprite,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width,
            this.height
        )
        this.updateFrames()
    }

    /**
     * Updates the current frame based on the framebuffer to slow down the animation.
     */
    updateFrames() {
        this.elapsedFrames++
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.frameRate - 1) {
                this.currentFrame++
            } else this.currentFrame = 0
        }
    }
}