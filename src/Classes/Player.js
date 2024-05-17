import { Entity } from "./Entity"
import { mainPlayerAnimationsKing } from "../assets/Character/Adventurer/imageExports"
import { collison } from "../utils"

/**
 * Represents the player instance
 *
 * @param position - initial position
 */
export class Player extends Entity {
    constructor({position}) {
        super({position, animations: mainPlayerAnimationsKing})
        this.velocity = {
            x:0,
            y:1
        }
        this.type = "Player"
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.frameBuffer = this.animations[this.currentSpriteKey].frameBuffer
        this.avatarHeight = 50
        this.avatarWidth = 30
        this.avatarPositionRight = {
            x:68,
            y: 55
        }
        this.avatarPositionLeft = {
            x:60,
            y: 55
        }
        this.currentAvatarPosition = this.avatarPositionLeft
        this.attackBox = {
            position: {
                x:0,
                y:0
            },
            width:70,
            height:25
        }
        this.health = 300
        this.currentHealth = 300
        this.isDead = false
        this.isAttacking = false
        this.attackPower = 10
    }


    /**
     *
     *  Calls all update functions related to the player
     *
     * @param canvasContext
     * @param currentMapCollisions - array of collision blocks for the current map
     * @param enemies - array of all the enemies in the level
     *
     */
    update({canvasContext, currentMapCollisions, enemies, collectibles, currentMapKey}) {

        this.attack({enemies, collectibles, currentMapKey})
        this.updateFrames()
        this.draw({canvasContext})
        this.updateHitbox()
        this.updateHealthBarPosition()
        this.didCollectCollectables({collectibles})
        canvasContext.fillStyle = "red"
        canvasContext.fillRect(this.healthBar.position.x, this.healthBar.position.y, this.healthBar.width, this.healthBar.height)
        canvasContext.fillStyle = "rgba(0,255,0,0.4)"
        canvasContext.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)
        this.draw({canvasContext})
        if (!this.isDead) this.position.x += this.velocity.x
        this.updateHitbox()
        this.updateAttackBox()
        this.updateHealthBarPosition()
        this.didCollectCollectables({collectibles})
        this.checkForHorizontalCollisions(currentMapCollisions)

        this.applyGravity()
        this.updateHitbox()
        this.updateAttackBox()
        this.updateHealthBarPosition()
        this.didCollectCollectables({collectibles})
        this.checkForVerticalCollisions(currentMapCollisions)
    }


    /**
     *
     *  Player attacks enemy if there is a collision between the player and an enemy
     *
     * @param enemies - array of enemies in the current level
     *
     */
    attack({enemies, collectibles, currentMapKey}) {
        if (this.isDead) {
            return
        }
        enemies.forEach(enemy => {
            if (enemy.isDead) {
                return
            }
            //TODO: tryt to doing if ucrretnfame === check before and if true do collison check
            if (enemy.currentMapKey === currentMapKey && this.isAttacking && this.currentFrame === this.animations['attack2'].frameRate - 1 &&  collison({entity: this.attackBox, block: enemy.hitbox}) ){
                enemy.isHit = true
                enemy.takeHit({player:this, collectibles})
                this.currentFrame = 0
                enemy.isHit = false
            }

        });
    }

    /**
     *
     *  Updates the players attack range based on the position and facing direction
     *
     */
    updateAttackBox() {
        if (this.currentAvatarPosition == this.avatarPositionLeft) {
            this.attackBox = {
                position: {
                    x:this.hitbox.position.x - 60,
                    y:this.hitbox.position.y
                },
                width:70,
                height:25
            }
        } else {
            this.attackBox = {
                position: {
                    x:this.hitbox.position.x + this.hitbox.width,
                    y:this.hitbox.position.y
                },
                width:70,
                height:25
            }
        }
    }

    didCollectCollectables({collectibles}) {
        collectibles.forEach(collectible => {
            if (collison({entity: this.hitbox, block: collectible}) && collectible.isPickedUp === false) {
                collectible.isPickedUp = true
                collectible.update({player:this})
            }
        });

    }
}