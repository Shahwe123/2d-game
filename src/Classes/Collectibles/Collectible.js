/**
 *
 * Collectibles - Represents anything that can be pick u[]
 *
 * @param position - an object with x and y
 */

export class Collectible {
    constructor({position, imageSrc, id}) {
        this.position = position
        this.id = id
        this.isPickedUp = false
        this.image = new Image()
        this.image.onload = () => {
            this.height = this.image.height
            this.width = this.image.width
            this.loaded = true
        }
        this.image.src = imageSrc
    }

    draw({canvasContext}) {
        canvasContext.drawImage(this.image, this.position.x, this.position.y)
    }
}