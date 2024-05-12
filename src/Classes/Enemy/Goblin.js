import { goblinAnimations } from "../../assets/Enemies/Goblin/imageExports"
import { collison } from "../../utils"
import { Entity } from "../Entity"
/**
 *
 *  Goblin - represents an enemy entity
 *
 * @param position - an object of x and y
 * @param currentMapKey - which map the enemy is located in
 * @param roamingPosition - x and y object of where the enemy loops between
 *
 */

export class Goblin extends Entity {
    constructor({position, currentMapKey, roamingPosition}) {
        super({position: position, animations: goblinAnimations})
        this.currentMapKey = currentMapKey
        this.type = "Goblin"
        this.roamingPosition = roamingPosition
        this.velocity = {
            x:0,
            y:1
        }
        this.avatarHeight = 40
        this.avatarWidth = 35
        this.avatarPositionRight = {
            x:57,
            y: 60
        }
        this.avatarPositionLeft = {
            x:57,
            y: 60
        }
        this.currentAvatarPosition = this.avatarPositionLeft
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.frameBuffer = this.animations[this.currentSpriteKey].frameBuffer

        // combat code
        this.alerted = false
        this.roamDirection = "left"
        this.attackBox = {
            position: {
                x:0,
                y:0
            },
            width:70,
            height:25
        }


        this.health = 50
        this.currentHealth = 50
        this.attackPower = 5
    }

    takeHit({player}){
        this.lastDirection === "left"? this.switchSprite("hurtLeft") : this.switchSprite("hurt")
        let newWidth = (this.healthBar.width / this.health) * (this.health - player.attackPower)
        this.healthBar.width = newWidth
        this.currentHealth -= player.attackPower
        if (this.currentHealth === 0) {
            this.isDead = true
            if (this.lastDirection === "left" ) {
                this.switchSprite("deadLeft")
            } else {
                this.switchSprite("dead")

            }
        }
        if (this.position.x > player.position.x) {
            this.position.x += 5
        } else {
            this.position.x += -5
        }
        this.isHit = false
    }

    /**
     *
     *  Checks for a collision between the enemies detection area and the player and attacks if close
     *
     * @param player - player instance
     *
     */
    checkForPlayerDetection({player}) {
        if (this.isDead) {
            this.velocity.x = 0
            return
        }
        if (player.currentHealth === 0 ) {
            player.switchSprite("death")
            this.lastDirection === "left" ? this.switchSprite("idleLeft"): this.switchSprite("idleRight")
            return
        }
        // Collision with detection checks if the player is within the enemies detection area
        // if so runs toward the player
        if (!this.isHit && collison({entity: this.detectionArea, block: player})) {
            this.alerted = true
            // // if player is the to left
            if (this.position.x > player.position.x) {

                this.switchSprite('runLeft')
                this.lastDirection = "left"
                this.attackBox = this.attackBoxLeft
                this.velocity.x = -1.5

            //     // if the enemy reaches the player's hitbox area, it attacks, otherwise keeps running

                if (collison({entity: this.attackBox, block: player.hitbox})){

                    this.velocity.x = 0
                    this.switchSprite("attackLeft")
            //         // if the enemies attack animation is completed, it counts as a hit
                    if ((this.currentFrame + 1) === this.frameRate){
                        player.switchSprite("hit")
                        let newWidth = (player.healthBar.width / player.health) * (player.health - this.attackPower)
                        player.healthBar.width = newWidth
                        player.currentHealth -= this.attackPower
                        if (player.currentHealth === 0 ){
                            player.isDead = true
                            return
                        }
            //             player.position.x += -50

                    }
            //         //TODO: player blokc
                }
            // // if player is to the rigth
            } else if (this.position.x < player.position.x) {
                this.switchSprite('runRight')
                this.lastDirection = "right"
                this.attackBox = this.attackBoxRight
                this.velocity.x = 1.5

                if (collison({entity: this.attackBox, block: player.hitbox})){
                    this.velocity.x = 0
                    this.switchSprite("attack")
                    if ((this.currentFrame + 1) === this.frameRate){
                        player.switchSprite("hit")
                        let newWidth = (player.healthBar.width / player.health) * (player.health - this.attackPower)
                        player.healthBar.width = newWidth
                        player.currentHealth -= this.attackPower
                        if (player.currentHealth === 0 ){
                            player.isDead = true
                            return
                        }
            //             player.position.x += 50
                    }
                }
            }
        } else {
            this.alerted = false
        }
    }

    updateDetectionArea() {
        this.detectionArea = {
            position:{
                x:this.hitbox.position.x - 125,
                y:this.hitbox.position.y
            },
            width: 300,
            height:this.avatarHeight
        }
    }

    updateAttackBox() {
        this.attackBoxLeft = {
            position: {
                x:this.hitbox.position.x - 25,
                y:this.hitbox.position.y
            },
            width:45,
            height:25
        }
        this.attackBoxRight = {
            position: {
                x:this.hitbox.position.x + 10,
                y:this.hitbox.position.y
            },
            width:56,
            height:25
        }
    }
}