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

        let nextAttackAnimation
        this.health = 350
        this.currentHealth = 350
        this.attackPower = 50
        this.attackAnimationKeys = ["attack1", "attack2", "attack3", "runAttackRight"]
        this.attackAnimationKeysLeft = ["attack1Left", "attack2Left", "attack3Left", "runAttackLeft"]
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
            if (this.lastDirection === "left") {
                if (this.currentSpriteKey !== "deadLeft") this.switchSprite("deadLeft")
            } else {

                if (this.currentSpriteKey !== "dead") this.switchSprite("dead")
            }
            this.velocity.x = 0
            return
        }

        // If the player is dead,, shows death animation and entity goes idle
        if (player.currentHealth <= 0 ) {
            if (player.currentSpriteKey !== "death") player.switchSprite("death")
            if (this.lastDirection === "left") {
                if (this.currentSpriteKey !== "idleLeft") this.switchSprite("idleLeft")
            } else {

                if (this.currentSpriteKey !== "idleRight") this.switchSprite("idleRight")
            }
            return
        }
        // Collision with detection checks if the player is within the enemies detection area
        // the entity runs toward the player if detection occurs
        if (!this.isHit && collison({entity: this.detectionArea, block: player})) {
            this.alerted = true

            // if player is the to left
            if (this.position.x > player.position.x) {

                // if the enemy reaches the player's hitbox area, it stops and attacks, otherwise keeps running
                if (collison({entity: this.attackBox, block: player.hitbox})){
                    this.velocity.x = 0

                    // Randomises the attack animation
                    if (this.nextAttackAnimation) {
                        if (this.currentSpriteKey !== this.nextAttackAnimation) this.switchSprite(this.nextAttackAnimation)
                    } else {
                        if (this.currentSpriteKey != "attack2Left") this.switchSprite("attack2Left")
                    }
                    // if the enemies attack animation is completed, it counts as a hit
                    if ((this.currentFrame + 1) === this.frameRate){

                        if (player.currentSpriteKey !== "hit") player.switchSprite("hit")
                        let newWidth = (player.healthBar.width / player.health) * (player.health - this.attackPower)
                        player.healthBar.width = newWidth
                        player.currentHealth -= this.attackPower
                        this.currentFrame = 0
                        this.nextAttackAnimation = this.selectRandomAttackAnimation(["attack1Left", "attack2Left", "attack3Left", "runAttackLeft"])
                        if (player.currentHealth <= 0 ){
                            player.isDead = true
                            return
                        }
                        player.position.x += -50

                    }
                    //TODO: player block
                } else {
                    if (this.currentSpriteKey !== "runLeft") this.switchSprite('runLeft')
                        this.lastDirection = "left"
                        this.attackBox = this.attackBoxLeft
                        this.velocity.x = -3
                }
            // if player is to the rigth
            } else if (this.position.x < player.position.x) {


                if (collison({entity: this.attackBox, block: player.hitbox})){
                    this.velocity.x = 0
                    if (this.nextAttackAnimation) {
                        if (this.currentSpriteKey !== this.nextAttackAnimation) this.switchSprite(this.nextAttackAnimation)
                    } else {
                        if (this.currentSpriteKey != "attack2") this.switchSprite("attack2")
                    }
                    if ((this.currentFrame + 1) === this.frameRate){
                        if (player.currentSpriteKey !== "hit") player.switchSprite("hit")
                        let newWidth = (player.healthBar.width / player.health) * (player.health - this.attackPower)
                        player.healthBar.width = newWidth
                        player.currentHealth -= this.attackPower
                        this.currentFrame = 0
                        this.nextAttackAnimation = this.selectRandomAttackAnimation(["attack1", "attack2", "attack3", "runAttackRight"])
                        if (player.currentHealth <= 0 ){
                            player.isDead = true
                            return
                        }
                        player.position.x += 50
                    }
                } else {
                    if (this.currentSpriteKey !== "runRight") this.switchSprite('runRight')
                        this.lastDirection = "right"
                        this.attackBox = this.attackBoxRight
                        this.velocity.x = 3
                }

            }
        } else {
            this.alerted = false
        }
    }

    /**
     * As the entity moves, its detection area also updates.
     */
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

    /**
     * As the entity moves, its attackbox both left and right updates
     */
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