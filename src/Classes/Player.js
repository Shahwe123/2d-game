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
        this.health = 100
        this.currentHealth = 100
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
    update({canvasContext, currentMapCollisions, enemies}) {
        this.updateAttackBox()
        this.attack({enemies})
        this.updateFrames()
        this.updateHitbox()
        this.updateHealthBarPosition()

        canvasContext.fillStyle = "red"
        canvasContext.fillRect(
            this.healthBar.position.x,
            this.healthBar.position.y,
            this.healthBar.width,
            this.healthBar.height)

        this.draw({canvasContext})
        if (!this.isDead) this.position.x += this.velocity.x
        this.updateHitbox()
        this.updateHealthBarPosition()
        this.checkForHorizontalCollisions(currentMapCollisions)
        this.applyGravity()
        this.updateHitbox()
        this.updateHealthBarPosition()
        this.checkForVerticalCollisions(currentMapCollisions)

    }


    /**
     *
     *  Player attacks enemy if there is a collision between the player and an enemy
     *
     * @param enemies - array of enemies in the current level
     *
     */
    attack({enemies}) {
        if (!this.isAttacking || this.isDead) {
            return
        }
        enemies.forEach(enemy => {
            if (enemy.isDead) {
                return
            }
            if (collison({entity: this.attackBox, block: enemy.hitbox})){
                if ((this.currentFrame + 1) === this.frameRate){
                    enemy.isHit = true
                    enemy.takeHit({player:this})
                    enemy.isHit = false
                }
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
                    x:this.hitbox.position.x - 40,
                    y:this.hitbox.position.y
                },
                width:70,
                height:25
            }
        } else {
            this.attackBox = {
                position: this.hitbox.position,
                width:70,
                height:25
            }
        }
    }
}