import { evilwizardAnimations } from "../../assets/Enemies/EvilWizard/wizardImageExports";
import { collison } from "../../utils";
import { Entity } from "../Entity";

export class EvilWizard extends Entity {
    constructor({position, currentMapKey, roamingPosition}) {
        super({position: position, animations: evilwizardAnimations})
        this.currentMapKey = currentMapKey
        this.type = "EvilWizard"
        this.roamingPosition = roamingPosition
        this.velocity = {
            x:0,
            y:1
        }
        this.avatarHeight = 95
        this.avatarWidth = 48
        this.avatarPositionRight = {
            x:110,
            y: 70
        }
        this.avatarPositionLeft = {
            x:110,
            y: 70
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


        this.health = 300
        this.currentHealth = 300
        this.attackPower = 35
        this.attackAnimationKeys = ["attack1", "attack2"]
        this.attackAnimationKeysLeft = ["attack1Left", "attack2Left"]
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
        if (plaplayer.currentHealth <= 0  ) {
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
                        this.nextAttackAnimation = this.selectRandomAttackAnimation(["attack1Left", "attack2Left"])
                        if (player.currentHealth <= 0 ){
                            player.isDead = true
                            return
                        }
                    }
                } else {
                    if (this.currentSpriteKey !== "runLeft") this.switchSprite('runLeft')
                    this.lastDirection = "left"
                    this.attackBox = this.attackBoxLeft
                }
            // // if player is to the rigth
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
                        this.nextAttackAnimation = this.selectRandomAttackAnimation(["attack1", "attack2"])
                        if (player.currentHealth <= 0 ){
                            player.isDead = true
                            return
                        }
                    }
                } else {
                    if (this.currentSpriteKey !== "runRight") this.switchSprite('runRight')
                    this.lastDirection = "right"
                    this.attackBox = this.attackBoxRight
                    this.velocity.x = 0.25
                }
            }
        } else {
            // this.velocity.x = 0
            // if (this.currentSpriteKey !== "idleRight") this.switchSprite("idleRight")
            this.alerted = false
        }
    }

    /**
     * As the entity moves, its detection area also updates.
     */
    updateDetectionArea() {
        this.detectionArea = {
            position:{
                x:this.hitbox.position.x -20,
                y:this.hitbox.position.y
            },
            width:100,
            height:this.avatarHeight
        }
    }

    /**
     * As the entity moves, its attackbox both left and right updates
     */
    updateAttackBox() {
        this.attackBoxLeft = {
            position: {
                x:this.hitbox.position.x - 45,
                y:this.hitbox.position.y +40
            },
            width:45,
            height:25
        }
        this.attackBoxRight = {
            position: {
                x:this.hitbox.position.x + this.hitbox.width,
                y:this.hitbox.position.y +40
            },
            width:56,
            height:25
        }
    }
}