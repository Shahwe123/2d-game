import { CollisonBlock } from "./Classes/CollisionBlock"

/**
 * Converts an array into a 2d array
 *
 * @param   array
 * @returns newArray - returns the array as a 2d array
 */
function arrayMapper(array) {
    const newArray = []
    for (let i = 0; i < array.length; i += 30) {
        newArray.push(array.slice(i, i + 30))
    }
    return newArray
}

/**
 * Creates a Collision block instance for all collision blocks
 *
 * @param   array
 * @param   collision reference - the number that represents a collision block
 * @returns collisionBlockArray - an array of Collision Blocks
 */
export function extractCollisions(array, collisionRefernce) {
    const array2D = arrayMapper(array)
    const collisionBlockArray = []

    array2D.forEach((row, indexRow) => {
        row.forEach((symbol, indexCol) => {
            if (symbol === collisionRefernce) {
                collisionBlockArray.push(new CollisonBlock({
                    position:{
                        x: indexCol * 32,
                        y: indexRow * 32
                    }
                }))
            }
        });
    });
    return collisionBlockArray
}

/**
 * Detects if there is a collision between param1 and param2
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
