/**
 * Collision Block class - prevents any entity from falling out of bounds
 *
 * @param position - object with x and y
 */
export class CollisonBlock {
    constructor({position, pixelSize}) {
        this.position = position
        this.width = pixelSize
        this.height = pixelSize
    }

    /**
     * Draw collision block onto canvas
     *
     * @param canvasContext
     */
    draw({canvasContext}) {
        canvasContext.fillStyle = "rgba(255,0,0,0.4)"
        canvasContext.fillRect(this.position.x, this.position.y, this.width, this.height)
    }
}