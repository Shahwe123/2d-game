/**
 * Collision Block class - prevents any entity from falling out of bounds
 *
 * @param position - object with x and y
 */
export class CollisonBlock {
    constructor({position}) {
        this.position = position
        this.width = 32
        this.height = 32
    }
}