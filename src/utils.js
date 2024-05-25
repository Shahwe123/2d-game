import { CollisonBlock } from "./Classes/CollisionBlock"

/**
 * Converts an array into a 2d array
 *
 * @param   array
 * @returns newArray - returns the array as a 2d array
 */
function arrayMapper(array, numOfPixels) {
    const newArray = []
    for (let i = 0; i < array.length; i += numOfPixels) {
        newArray.push(array.slice(i, i + numOfPixels))
    }
    return newArray
}

/**
 * Creates a Collision block instance for all collision blocks in the array
 *
 * @param   array
 * @param   collision reference - the number that represents a collision block
 * @returns collisionBlockArray - an array of Collision Blocks
 */
export function extractCollisions(array, collisionRefernce, pixelSize, numOfPixels) {
    const array2D = arrayMapper(array, numOfPixels)
    const collisionBlockArray = []

    array2D.forEach((row, indexRow) => {
        row.forEach((symbol, indexCol) => {
            if (symbol === collisionRefernce) {
                collisionBlockArray.push(new CollisonBlock({
                    position:{
                        x: indexCol * pixelSize,
                        y: indexRow * pixelSize
                    },
                    pixelSize
                }))
            }
        });
    });
    return collisionBlockArray
}

/**
 * Detects if there is a collision between param1 (the current entity) and param2 (the block the entity is colliding with)
 *
 * @param   entity
 * @param   block
 * @returns true or false
 */
export function collison({entity, block}){

    return (entity.position.y + entity.height >= block.position.y &&
        entity.position.y <= block.position.y + block.height &&
        entity.position.x <= block.position.x + block.width &&
        entity.position.x + entity.width >= block.position.x)
}
/**
 * Returns the number of dead enemies
 *
 * @param  enemies - array of enemies
 * @returns deadCount - number of dead enemies
 */
export function noEnemiesDead(enemies) {
    let deadCount = 0
    enemies.forEach(enemy => {
        if (enemy.isDead) {
            deadCount++
        }
    });
    return deadCount
}
/**
 * Returns the number of collected coins
 *
 * @param  enemies - array of coin
 * @returns deadCount - number of dead enemies
 */
export function noCollectedCoins(collectibles) {
    let coinsCollected = 0
    collectibles.forEach(collectible => {
        if (collectible.type === "coin" && collectible.isPickedUp) {
            coinsCollected++
        }
    });
    return coinsCollected
}

export const handleNextLevelBtn = (level) => {
    return 2
}