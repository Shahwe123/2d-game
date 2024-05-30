import { collison } from "../../utils"
import { Enemy } from "./Enemy";
import { enemyDetails } from "./EnemyDetails";

export class ElementalIce extends Enemy {
    constructor({position, currentMapKey, roamingPosition}) {
        super({position, enemyDetails:enemyDetails.ElementalIce})
        this.currentMapKey = currentMapKey
        this.type = "ElementalIce"
        this.boss = true
        this.roamingPosition = roamingPosition
        this.velocity = {
            x:0,
            y:1
        }
        this.avatarHeight = enemyDetails.ElementalIce.avatarHeight
        this.avatarWidth = enemyDetails.ElementalIce.avatarWidth
        this.avatarPositionRight = enemyDetails.ElementalIce.avatarPositionRight
        this.avatarPositionLeft = enemyDetails.ElementalIce.avatarPositionLeft
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

        this.health = enemyDetails.ElementalIce.health
        this.currentHealth = this.health
        this.attackPower = enemyDetails.ElementalIce.attackPower
        this.specialAttackPower = 20
        this.log = 0
        this.attackBox ={
             position: {
                x:this.hitbox.position.x - 60 ,
                y:this.hitbox.position.y + 65
            },
            width:this.hitbox.width ,
            height:25
        }
    }

    draw({canvasContext}) {
        if (!this.sprite) return
        let cropbox = {}
        // canvasContext.fillStyle = "rgba(0,255,0,0.4)"
        // canvasContext.fillRect(this.hitbox.position.x, this.hitbox.position.y, this.hitbox.width, this.hitbox.height)


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
            this.width * 3,
            this.height* 3
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
            // Displays the death animation depending on the enemies last direction it faced
            if (this.lastDirection === "left") {
                if (this.currentSpriteKey !== "deadLeft") this.switchSprite("deadLeft")
            } else {

                if (this.currentSpriteKey !== "dead") this.switchSprite("dead")
            }
            this.velocity.x = 0
            return
        }

        // If the player is dead, shows death animation and entity goes idle facing last direction
        if (player.currentHealth <= 0 ) {
            if (player.currentSpriteKey !== "death") player.switchSprite("death")
            if (this.lastDirection === "left") {
                if (this.currentSpriteKey !== "idleLeft") this.switchSprite("idleLeft")
            } else {
                if (this.currentSpriteKey !== "idleRight") this.switchSprite("idleRight")
            }
            player.isDead = true
            return
        }



        // Tests if player collides with the enemies detectionarea, if true, the enemy runs towards the player
        if (!this.isHit && collison({entity: this.detectionArea, block: player.hitbox})) {
            this.alerted = true


            // Tests if the enemies's position is to the right of the player
            if (this.hitbox.position.x > player.position.x) {
                if ( this.hitbox.position.y > player.hitbox.position.y) {
                    // console.log(this.hitbox.position.x);
                    // console.log(player.position.x);
                    if ((player.hitbox.position.x) > this.hitbox.position.x && player.hitbox.position.x <= (this.hitbox.position.x + this.hitbox.width)) {
                        // this.position.y -= 60
                        // this.position.x += 60
                        // player.position.x -= 250
                    }
                }
                else {

                    if (this.lastDirection === "right" || !this.attackBox) {
                        this.nextAttackAnimation = this.selectRandomAttackAnimation(this.attackAnimationKeysLeft)
                        this.attackBox = this.handleAttackBoxChange(this.nextAttackAnimation)
                    }
                    this.lastDirection = "left"


                    // if the enemy reaches the player's hitbox area, it stops and attacks, otherwise keeps running
                    if (collison({entity: this.attackBox, block: player.hitbox})){
                        this.velocity.x = 0
                        if (this.currentSpriteKey !== this.nextAttackAnimation) this.switchSprite(this.nextAttackAnimation)



                        if (this.currentSpriteKey === "specialAttackLeft" && (this.currentFrame === 9 || this.currentFrame === 10 || this.currentFrame === 11 || this.currentFrame === 12 )) {
                            this.currentFrame += 1
                            if (player.currentSpriteKey !== "hit") player.switchSprite("hit")
                            let newWidth = (player.healthBar.width / player.health) * (player.health - this.attackPower)
                            player.healthBar.width = newWidth
                            player.currentHealth -= this.specialAttackPower
                            player.knockback = true
                            player.velocity.x = -75
                            if (player.velocity.y === 0 ) {
                                player.velocity.y = -5
                            }
                        }
                            // if the enemies attack animation is completed, it counts as a hit
                        else if ((this.currentFrame + 1) === this.frameRate){
                            if (player.currentSpriteKey !== "hit") player.switchSprite("hit")
                            // newWidth represents the players healthbar equal to how much life they currently have
                            let newWidth = (player.healthBar.width / player.health) * (player.health - this.attackPower)
                            player.healthBar.width = newWidth
                            player.currentHealth -= this.attackPower
                            // if ()
                            // currentframe resets stops the current entity's attack from registering multiple times because of the framebuffer
                            this.currentFrame = 0
                            this.nextAttackAnimation = this.selectRandomAttackAnimation(this.attackAnimationKeysLeft)
                            this.attackBox = this.handleAttackBoxChange(this.nextAttackAnimation)

                        }
                        if (player.currentHealth <= 0 ){
                            player.isDead = true
                            return
                        }
                        console.log(player.currentHealth);

                    } else {
                        // Checks if the Entity has either run or walk animations

                        if (this.currentSpriteKey !== "runLeft") this.switchSprite('runLeft')

                        // this.lastDirection = "left"
                        this.attackBox = this.handleAttackBoxChange(this.nextAttackAnimation)
                        this.velocity.x = -3
                    }
                }
            }
            // Tests if the enemies's position is to the left of the player
            else if (this.hitbox.position.x < player.position.x) {

                if (this.lastDirection === "left" || !this.attackBox) {
                    this.nextAttackAnimation = this.selectRandomAttackAnimation(this.attackAnimationKeys)
                    this.attackBox = this.handleAttackBoxChange(this.nextAttackAnimation)
                }
                this.lastDirection = "right"


                // if the enemy reaches the player's hitbox area, it stops and attacks, otherwise keeps running
                if (collison({entity: this.attackBox, block: player.hitbox})){
                    this.velocity.x = 0
                    if (this.currentSpriteKey !== this.nextAttackAnimation) this.switchSprite(this.nextAttackAnimation)

                    if (this.currentSpriteKey === "specialAttack" && ( this.currentFrame === 9 || this.currentFrame === 10 || this.currentFrame === 11 || this.currentFrame === 12 )) {
                        this.currentFrame += 1
                        if (player.currentSpriteKey !== "hit") player.switchSprite("hit")
                        let newWidth = (player.healthBar.width / player.health) * (player.health - this.attackPower)
                        player.healthBar.width = newWidth
                        player.currentHealth -= this.specialAttackPower
                    }
                    //  if the enemies attack animation is completed, it counts as a hit
                    else if ((this.currentFrame + 1) === this.frameRate){
                        if (player.currentSpriteKey !== "hit") player.switchSprite("hit")
                        // newWidth represents the players healthbar equal to how much life they currently have
                        let newWidth = (player.healthBar.width / player.health) * (player.health - this.attackPower)
                        player.healthBar.width = newWidth
                        player.currentHealth -= this.attackPower

                        // currentframe resets stops the current entity's attack from registering multiple times because of the framebuffer
                        this.currentFrame = 0
                        this.nextAttackAnimation = this.selectRandomAttackAnimation(this.attackAnimationKeys)
                        this.attackBox = this.handleAttackBoxChange(this.nextAttackAnimation)
                    }
                    if (player.currentHealth <= 0 ){
                        player.isDead = true
                        return
                    }
                } else {
                    // Checks if the Entity has either run or walk animations
                    if (this.currentSpriteKey !== "runRight") this.switchSprite('runRight')
                    // this.lastDirection = "right"
                    this.attackBox = this.handleAttackBoxChange(this.nextAttackAnimation)
                    this.velocity.x = 3
                }
            }
        } else {
            this.alerted = false

            // if current enemy does not roam
            if (this.roamingPosition === false) {

                // if enemy position is greater than initial position, walks or runs towards old position
                if (this.position.x > this.startPosition) {
                    this.velocity.x = -1
                    if (this.currentSpriteKey !== "runLeft") this.switchSprite("runLeft")
                    this.velocity.x = -1.5
                }
                // if enemy position is less than initial position, walks or runs towards old position
                else if (this.position.x < this.startPosition) {
                    this.velocity.x = 1
                    if (this.currentSpriteKey !== "runRight") this.switchSprite("runRight")
                    this.velocity.x = 1.5
                }
                // if enemy returns to old position, returns to idle position
                else {
                    this.velocity.x = 0
                    if (this.lastDirection === "left") {
                        if (this.currentSpriteKey !== "idleLeft") this.switchSprite("idleLeft")
                    } else {

                        if (this.currentSpriteKey !== "idleRight") this.switchSprite("idleRight")
                    }
                }
            }
        }
    }

    /**
     *
     * Calls all update function related to each entity
     *
     * @param  canvasContext - canvas context
     * @param  currentMapCollisions - the current maps collision blocks array
     * @param  player - player entity used for entity detection
     *
     */
    update({canvasContext, currentMapCollisions, player, collectibles}) {
        this.updateFrames()
        this.updateHitbox()
        this.updateAttackBox(this.type)
        this.updateHealthBarPosition()
        this.updateDetectionArea(this.type)

        canvasContext.fillStyle = "red"
        // Boss entities have a larger healthbar
        if (!this.boss) canvasContext.fillRect(this.healthBar.position.x, this.healthBar.position.y, this.healthBar.width, this.healthBar.height)
            canvasContext.fillStyle = "red"
        // Boss entities have a larger healthbar
         canvasContext.fillRect(this.healthBar.position.x, this.healthBar.position.y, this.healthBar.width, this.healthBar.height)

        // if (this.type !== "Player") {
        this.checkForPlayerDetection({player})
        // }

        // If an entity (enemy) is not alerted, allows for roaming.
        // if (this.alerted === false && this.type !== "Player") {
        // if (this.alerted === false) {
        //     this.roaming()
        //     this.attackBox = (this.roamDirection === "left"? this.attackBoxLeft: this.attackBoxRight)
        // }

        // canvasContext.fillStyle = "rgba(0,255,0,0.4)"
        // canvasContext.fillRect(this.detectionArea.position.x, this.detectionArea.position.y, this.detectionArea.width, this.detectionArea.height)
        this.draw({canvasContext})

        this.position.x += this.velocity.x
        this.updateHitbox()
        this.updateAttackBox(this.type)
        this.updateHealthBarPosition()
        this.checkForHorizontalCollisions(currentMapCollisions)
        this.applyGravity()
        this.updateHitbox()
        this.updateAttackBox(this.type)
        this.updateHealthBarPosition()
        this.checkForVerticalCollisions(currentMapCollisions)
    }


    /**
     * As the entity moves, its detection area also updates.
     */
    updateDetectionArea() {
        this.detectionArea = {
            position:{
                x:this.hitbox.position.x - 500,
                y:this.hitbox.position.y /2
            },
            width:1200,
            height:this.avatarHeight *3
        }
    }

    /**
     * As the entity moves, its attackbox both left and right updates
     */
    updateAttackBox() {
        this.attackVariables = {
            attack1BoxLeft : {
                position: {
                    x:this.hitbox.position.x - 60 ,
                    y:this.hitbox.position.y
                },
                width:this.hitbox.width ,
                height:this.avatarHeight
            },
            attack1BoxRight : {
                position: {
                    x:this.hitbox.position.x  +55,
                    y:this.hitbox.position.y
                },
                width:this.hitbox.width ,
                height:this.avatarHeight
            },
            attack2BoxLeft : {
                position: {
                    x:this.hitbox.position.x - 20 ,
                    y:this.hitbox.position.y
                },
                width:this.hitbox.width / 2,
                height:this.avatarHeight
            },
            attack2BoxRight : {
                position: {
                    x:this.hitbox.position.x  +80,
                    y:this.hitbox.position.y
                },
                width:this.hitbox.width / 2,
                height:this.avatarHeight
            },
            attack3BoxLeft : {
                position: {
                    x:this.hitbox.position.x - 265 ,
                    y:this.hitbox.position.y+ (this.avatarHeight / 2)
                },
                width:this.hitbox.width *2.5,
                height:this.avatarHeight / 2
            },
            attack3BoxRight : {
                position: {
                    x:this.hitbox.position.x  +80,
                    y:this.hitbox.position.y + (this.avatarHeight / 2)
                },
                width:this.hitbox.width * 2.5,
                height:this.avatarHeight / 2
            },
            specialAttackLeft : {
                position: {
                    x:this.hitbox.position.x - 265 ,
                    y:this.hitbox.position.y
                },
                width:this.hitbox.width *2.5,
                height:this.avatarHeight
            },
            specialAttackRight : {
                position: {
                    x:this.hitbox.position.x  +80,
                    y:this.hitbox.position.y
                },
                width:this.hitbox.width * 2.5,
                height:this.avatarHeight
            },
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

    handleAttackBoxChange(nextAttackAnimation) {
        // console.log(nextAttackAnimation);
        let attackBox
        switch (nextAttackAnimation) {
            case "attack1":
                attackBox = this.attackVariables.attack1BoxRight
                break;
            case "attack1Left":
                attackBox = this.attackVariables.attack1BoxLeft
                break;
            case "attack2":
                attackBox = this.attackVariables.attack2BoxRight
                break;
            case "attack2Left":
                attackBox = this.attackVariables.attack2BoxLeft
                break;
            case "attack3":
                attackBox = this.attackVariables.attack3BoxRight
                break;
            case "attack3Left":
                attackBox = this.attackVariables.attack3BoxLeft
                break;
            case "specialAttackLeft":
                attackBox = this.attackVariables.specialAttackLeft
                break;
            case "specialAttack":
                attackBox = this.attackVariables.specialAttackRight
                break;

        }
        return attackBox
    }
}