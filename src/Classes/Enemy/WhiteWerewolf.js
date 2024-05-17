import { werewolfAnimations } from "../../assets/Enemies/White Werewolf/werewolfImageExports";
import { collison } from "../../utils";
import { HealthKit } from "../Collectibles/HealthKit";
import { Entity } from "../Entity";

/**
 *
 *  WhiteWerewolf - represents an enemy entity
 *
 * @param position - an object of x and y
 * @param currentMapKey - which map the enemy is located in
 * @param roamingPosition - x and y object of where the enemy loops between
 *
 */

export class WhiteWerewolf extends Entity {
    constructor({position, currentMapKey, roamingPosition}) {
        super({position: position, animations: werewolfAnimations})
        this.currentMapKey = currentMapKey
        this.type = "WhiteWerewolf"
        this.roamingPosition = roamingPosition
        this.velocity = {
            x:0,
            y:1
        }
        this.avatarHeight = 72
        this.avatarWidth = 82
        this.avatarPositionRight = {
            x:20,
            y: 55
        }
        this.avatarPositionLeft = {
            x:20,
            y: 55
        }
        this.currentAvatarPosition = this.avatarPositionLeft
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.frameBuffer = this.animations[this.currentSpriteKey].frameBuffer
        this.frameRate = this.animations[this.currentSpriteKey].frameRate

        // combat code
        this.alerted = false
        this.roamDirection = "right"
        this.attackBox = {
            position: {
                x:0,
                y:0
            },
            width:70,
            height:25
        }


        this.health = 150
        this.currentHealth = 150
        this.attackPower = 20
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

            // if player is the to left
            if (this.position.x > player.position.x) {

                this.switchSprite('runLeft')
                this.lastDirection = "left"
                this.attackBox = this.attackBoxLeft
                this.velocity.x = -3

                // if the enemy reaches the player's hitbox area, it attacks, otherwise keeps running

                if (collison({entity: this.attackBox, block: player.hitbox})){

                    this.velocity.x = 0
                    this.switchSprite("attack3Left")
                    // if the enemies attack animation is completed, it counts as a hit
                    if ((this.currentFrame + 1) === this.frameRate){

                        player.switchSprite("hit")
                        let newWidth = (player.healthBar.width / player.health) * (player.health - this.attackPower)
                        player.healthBar.width = newWidth
                        player.currentHealth -= this.attackPower
                        if (player.currentHealth === 0 ){
                            player.isDead = true
                            return
                        }
                        player.position.x += -50

                    }
                    //TODO: player blokc
                }
            // if player is to the rigth
            } else if (this.position.x < player.position.x) {
                this.switchSprite('runRight')
                this.lastDirection = "right"
                this.attackBox = this.attackBoxRight
                this.velocity.x = 3

                if (collison({entity: this.attackBox, block: player.hitbox})){
                    this.velocity.x = 0
                    this.switchSprite("attack3")
                    if ((this.currentFrame + 1) === this.frameRate){
                        // player.switchSprite("hit")
                        let newWidth = (player.healthBar.width / player.health) * (player.health - this.attackPower)
                        player.healthBar.width = newWidth
                        player.currentHealth -= this.attackPower
                        if (player.currentHealth === 0 ){
                            player.isDead = true
                            return
                        }
                        player.position.x += 50
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
                x:this.hitbox.position.x - 250,
                y:this.hitbox.position.y
            },
            width:575,
            height:this.avatarHeight
        }
    }


    updateAttackBox() {
        this.attackBoxLeft = {
            position: {
                x:this.hitbox.position.x - 2,
                y:this.hitbox.position.y + 25
            },
            width:2,
            height:25
        }
        this.attackBoxRight = {
            position: {
                x:this.hitbox.position.x + this.hitbox.width,
                y:this.hitbox.position.y + 25
            },
            width:2,
            height:25
        }
    }
}