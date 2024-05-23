import { Entity } from "../Entity";
import { cthuluAnimations } from "../../assets/Enemies/cthulu/imageExports";
import icon from '../../assets/Enemies/cthulu/Icon.png'
import { collison } from "../../utils"
import { HealthKit } from "../Collectibles/HealthKit"

export class Cthulu extends Entity {
    constructor({position, currentMapKey, roamingPosition}) {
        super({position: position, animations: cthuluAnimations})
        this.currentMapKey = currentMapKey
        this.type = "Cthulu"
        this.boss = true
        this.roamingPosition = roamingPosition
        this.velocity = {
            x:0,
            y:1
        }
        this.avatarHeight = 65 * 2
        this.avatarWidth = 61 * 2
        this.avatarPositionRight = {
            x:135,
            y: 62
        }
        this.avatarPositionLeft = {
            x:135,
            y: 62
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

        this.health = 500
        this.currentHealth = 500
        this.attackPower = 50
        this.log = 0
    }

    draw({canvasContext}) {
        if (!this.sprite) return
        let cropbox = {}
        canvasContext.fillStyle = "rgba(0,255,0,0.4)"
        canvasContext.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)
        canvasContext.fillStyle = "rgba(0,0,255,0.4)"
        canvasContext.fillRect(this.attackBox.x, this.attackBox.y, this.attackBox.width * 2, this.attackBox.height * 2)

        // used for animations that have been inverted
        if (this.currentSpriteKey.includes("Left") ) {
            cropbox = {
               position: {
                   x:(this.animations[this.currentSpriteKey].frameRate - 1 - this.currentFrame) * (this.sprite.width / this.animations[this.currentSpriteKey].frameRate),
                   y:0,
               },
               width:this.sprite.width / this.animations[this.currentSpriteKey].frameRate,
               height:this.sprite.height
            }
        } else {
            cropbox = {
               position: {
                   x:this.currentFrame * (this.sprite.width / this.animations[this.currentSpriteKey].frameRate),
                   y:0,
               },
               width:this.sprite.width / this.animations[this.currentSpriteKey].frameRate,
               height:this.sprite.height
            }
        }
        canvasContext.drawImage(
            this.sprite,
            cropbox.position.x,
            cropbox.position.y,
            cropbox.width,
            cropbox.height,
            this.position.x,
            this.position.y,
            this.width *2,
            this.height*2
        )
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
        if (player.currentHealth <= 0  ) {
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
        if (collison({entity: this.detectionArea, block: player})) {
        // if (!this.isHit && collison({entity: this.detectionArea, block: player})) {
            this.alerted = true
            // // if player is the to left
            if (this.position.x > player.position.x) {

                // if the enemy reaches the player's hitbox area, it attacks, otherwise keeps running
                if (collison({entity: this.attackBox, block: player.hitbox})){

                    this.velocity.x = 0
                    if (this.currentSpriteKey !== "attack1Left") this.switchSprite("attack1Left")
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
                        this.currentFrame = 0
                        // player.position.x -= 80
                        // player.position.y -= 25
                    }
                } else {
                    if (this.currentSpriteKey !== "walkLeft") this.switchSprite('walkLeft')
                    this.lastDirection = "left"
                    this.attackBox = this.attackBoxLeft
                    this.velocity.x = -0.25
                }
            // // if player is to the rigth
            } else if (this.position.x < player.position.x) {


                if (collison({entity: this.attackBox, block: player.hitbox})){
                    this.velocity.x = 0
                    if (this.currentSpriteKey !== "attack1") this.switchSprite("attack1")
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
                        this.currentFrame = 0
                        // player.position.x += 80
                        // player.position.y -= 15
                    }
                } else {
                    if (this.currentSpriteKey !== "walkRight") this.switchSprite('walkRight')
                    this.lastDirection = "right"
                    this.attackBox = this.attackBoxRight
                    this.velocity.x = 0.25
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
                x:this.hitbox.position.x - 200,
                y:this.hitbox.position.y
            },
            width:600,
            height:this.avatarHeight
        }
    }

    /**
     * As the entity moves, its attackbox both left and right updates
     */
    updateAttackBox() {
        this.attackBoxLeft = {
            position: {
                x:this.hitbox.position.x - this.hitbox.width ,
                y:this.hitbox.position.y + 65
            },
            width:this.hitbox.width * 2 -75,
            height:25
        }
        this.attackBoxRight = {
            position: {
                x:this.hitbox.position.x  +70,
                y:this.hitbox.position.y + 65
            },
            width:this.hitbox.width +36,
            height:25
        }
    }

    // Current Boss does not need roaming
    roaming() {

    }

    /**
     *
     * Returns the health bar with styling
     *
     * @param {} healthBar
     * @returns
     */
    createBossHealthBar(healthBar) {
        healthBar.style.width = "400px"
        healthBar.style.height = "20px"
        healthBar.style.backgroundColor = "red"
        healthBar.style.position = "relative"
        healthBar.style.left = "-28%"
        healthBar.style.textAlign = "center"
        healthBar.style.padding = "5px"
        healthBar.textContent = bossHealth + " / " + bossTotalHealth
        return healthBar
    }
}