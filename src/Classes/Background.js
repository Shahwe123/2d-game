/**
 *
 *  Background Class - used for drawing the map onto the canvas
 *
 *  @param position - object with an x and y
 *  @param imageSrc - src for the map background
 *  @param key - a description of which map file it is
 *
 */

export class Background {
    constructor({position, imageSrc, key=""}) {
        this.position = position
        this.imageSrc = imageSrc
        this.map = new Image()
        this.map.src = this.imageSrc
        this.key = key
    }

    /**
     * Draws the background onto the canvas
     *
     * @param canvasContext
     */
    update({canvasContext}) {
        if (!this.map) return
        canvasContext.drawImage(this.map, this.position.x, this.position.y)
    }
}