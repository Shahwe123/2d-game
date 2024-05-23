import { collison } from "../../utils"
import { Entity } from "../Entity"
import { mushroomAnimations } from "../../assets/Enemies/Mushroom/imageExports"

export class Mushroom extends Entity {
    constructor({position, currentMapKey, roamingPosition}) {
        super({position: position, animations: mushroomAnimations})
        this.currentMapKey = currentMapKey
        this.type = "Mushroom"
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


        this.health = 100
        this.currentHealth = 100
        this.attackPower = 35
        this.attackAnimationKeys = ['attack']
        this.attackAnimationKeysLeft = ['attackLeft']
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
        console.log(player);
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
        // if so runs toward the player
        if (!this.isHit && collison({entity: this.detectionArea, block: player})) {
            this.alerted = true
            // // if player is the to left
            if (this.position.x > player.position.x) {
                // if the enemy reaches the player's hitbox area, it attacks, otherwise keeps running

                if (collison({entity: this.attackBox, block: player.hitbox})){

                    this.velocity.x = 0
                    if (this.currentSpriteKey !== "attackLeft") this.switchSprite("attackLeft")
                // if the enemies attack animation is completed, it counts as a hit
                    if ((this.currentFrame + 1) === this.frameRate){
                        if (player.currentSpriteKey !== "hit") player.switchSprite("hit")
                        let newWidth = (player.healthBar.width / player.health) * (player.health - this.attackPower)
                        player.healthBar.width = newWidth
                        player.currentHealth -= this.attackPower
                        this.currentFrame = 0
                        if (player.currentHealth <= 0 ){
                            player.isDead = true
                            return
                        }

                    }
                //TODO: player blokc
                } else {
                    if (this.currentSpriteKey !== "runLeft") this.switchSprite('runLeft')
                        this.lastDirection = "left"
                        this.attackBox = this.attackBoxLeft
                        this.velocity.x = -3.5
                }

                // if player is to the rigth
            } else if (this.position.x < player.position.x) {


                if (collison({entity: this.attackBox, block: player.hitbox})){
                    this.velocity.x = 0
                    if (this.currentSpriteKey !== "attack") this.switchSprite("attack")
                    if ((this.currentFrame + 1) === this.frameRate){
                         if (player.currentSpriteKey !== "hit") player.switchSprite("hit")
                        let newWidth = (player.healthBar.width / player.health) * (player.health - this.attackPower)
                        player.healthBar.width = newWidth
                        player.currentHealth -= this.attackPower
                        this.currentFrame = 0
                        if (player.currentHealth <= 0 ){
                            player.isDead = true
                            return
                        }
                    }
                } else {
                    if (this.currentSpriteKey !== "runRight") this.switchSprite('runRight')
                        this.lastDirection = "right"
                        this.attackBox = this.attackBoxRight
                        this.velocity.x = 3.5
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
                x:this.hitbox.position.x - 125,
                y:this.hitbox.position.y
            },
            width: 300,
            height:this.avatarHeight
        }
    }
    /**
     * As the entity moves, its attackbox both left and right updates
     */
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