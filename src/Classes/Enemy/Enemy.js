import { collison } from "../../utils";
import { HealthKit } from "../Collectibles/HealthKit";
import { Powerup } from "../Collectibles/Powerup";
import { Entity } from "../Entity";

export class Enemy extends Entity {
    constructor({position, animations}) {
        super({position, animations})
        this.startPosition = position.x
        // this.isOnPlatform
        // if variable false enemy  not restricted, if has an object, or x positoin , entity cannot go past that
    }

    /**
     *
     * Used for enemy entities, if an enemy is hit by the player, health is removed based
     * on the player' power level, if the enemy reaches 0 health dies and drops a collectible
     *
     * @param {player} param0
     * @param {collectibles} param1
     * @returns
     */
    takeHit({player, collectibles}){
        if (!player.isAttacking) {
            return
        }

        if (this.lastDirection === "left") {

            if (this.currentSpriteKey !== "hurtLeft") this.switchSprite("hurtLeft")
        } else {
            if (this.currentSpriteKey !== "hurt") this.switchSprite("hurt")

        }
        let newWidth = (this.healthBar.width / this.health) * (this.health - player.attackPower)
        this.healthBar.width = newWidth
        this.currentHealth -= player.attackPower
        if (this.currentHealth <= 0) {
            this.currentHealth = 0
            this.isDead = true
            if (this.lastDirection === "left" ) {
                if (this.currentSpriteKey !== "deadLeft") this.switchSprite("deadLeft")
            } else {
                if (this.currentSpriteKey !== "dead") this.switchSprite("dead")
            }
            let id = (collectibles.length === 0 ? collectibles.length: collectibles.length + 1)

            // health repeated to have a higher drop chance
            let differentCollectibles = ['health', "powerup", "health", 'health']
            const randomCollectible = differentCollectibles[Math.floor(Math.random() * differentCollectibles.length)]

            if (randomCollectible === "health") {
                collectibles.push(new HealthKit({position: this.hitbox.position, mapKey: this.currentMapKey, id}))
            } else if (randomCollectible === "powerup") {
                collectibles.push(new Powerup({position: this.hitbox.position, mapKey: this.currentMapKey, id}))
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
        this.updateAttackBox()
        this.updateHealthBarPosition()
        this.updateDetectionArea()

        canvasContext.fillStyle = "red"
        // Boss entities have a larger healthbar
        if (!this.boss) canvasContext.fillRect(this.healthBar.position.x, this.healthBar.position.y, this.healthBar.width, this.healthBar.height)

        // if (this.type !== "Player") {
        this.checkForPlayerDetection({player})
        // }

        // If an entity (enemy) is not alerted, allows for roaming.
        // if (this.alerted === false && this.type !== "Player") {
        if (this.alerted === false) {
            this.roaming()
            this.attackBox = (this.roamDirection === "left"? this.attackBoxLeft: this.attackBoxRight)
        }

        // canvasContext.fillStyle = "rgba(0,255,0,0.4)"
        // canvasContext.fillRect(this.detectionArea.position.x, this.detectionArea.position.y, this.detectionArea.width, this.detectionArea.height)

        this.draw({canvasContext})
        this.position.x += this.velocity.x
        this.updateHitbox()
        this.updateAttackBox()
        this.updateHealthBarPosition()
        this.checkForHorizontalCollisions(currentMapCollisions)
        this.applyGravity()
        this.updateHitbox()
        this.updateAttackBox()
        this.updateHealthBarPosition()
        this.checkForVerticalCollisions(currentMapCollisions)
    }

    /**
     * Function causes entity to walk to and back from their roaming positions
     * /TODO: Upon reaching their roaming position x and y, idle for a second than continue patrol
     */
    roaming() {
        if (!this.roamingPosition) return
        if (this.hitbox.position.x >= this.roamingPosition.rightX) {
            // this.velocity.x = 0
            // this.switchSprite("idleRight")
            // this.isTimeOutOn = true
            // setTimeout(() => {
                this.roamDirection = "left"
                this.currentAvatarPosition = this.avatarPositionLeft
            //     this.isTimeOutOn = false
            //     this.switchSprite("walkLeft")
            // }, 500);
        } else if (this.hitbox.position.x <= this.roamingPosition.leftX) {
            // this.velocity.x = 0
            // this.switchSprite("idleLeft")
            // this.isTimeOutOn = true
            // setTimeout(() => {
                this.roamDirection = "right"
                this.currentAvatarPosition = this.avatarPositionRight
            //     this.isTimeOutOn = false
            //     this.switchSprite("walkRight")
            // }, 500);
        }
        if (this.roamDirection  === "left") {
            // this.switchSprite("walkLeft")
            if ("walkLeft" in this.animations){
                if (this.currentSpriteKey !== "walkLeft") this.switchSprite("walkLeft")
                this.velocity.x = -0.25
            } else {
                if (this.currentSpriteKey !== "runLeft") this.switchSprite("runLeft")
                this.velocity.x = -1.5
            }

        } else if (this.roamDirection === "right") {
            if ("walkRight" in this.animations){
                if (this.currentSpriteKey !== "walkRight") this.switchSprite("walkRight")
                this.velocity.x = 0.25
            } else {
                if (this.currentSpriteKey !== "runRight") this.switchSprite("runRight")
                this.velocity.x = 1.5
            }
        }

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

                if ("flightLeft" in this.animations){
                    if (this.currentSpriteKey !== "flightLeft") this.switchSprite('flightLeft')
                } else {
                    if (this.currentSpriteKey !== "idleLeft") this.switchSprite("idleLeft")
                }

            } else {
                if ("flight" in this.animations){
                    if (this.currentSpriteKey !== "flight") this.switchSprite('flight')
                } else {
                    if (this.currentSpriteKey !== "idleRight") this.switchSprite("idleRight")
                }
            }
            return
        }


        // Tests if player collides with the enemies detectionarea, if true, the enemy runs towards the player
        if (!this.isHit && collison({entity: this.detectionArea, block: player})) {
            this.alerted = true

            // Tests if the enemies's position is to the right of the player
            if (this.position.x > player.position.x) {
                this.lastDirection = "left"
                // if the enemy reaches the player's hitbox area, it stops and attacks, otherwise keeps running
                if (collison({entity: this.attackBox, block: player.hitbox})){
                    this.velocity.x = 0


                    // random attack animations dont start until the function runs at least once
                    if (this.attackAnimationKeysLeft.length > 1) {

                        // Randomises the attack animation
                        if (this.nextAttackAnimation) {
                            if (this.currentSpriteKey !== this.nextAttackAnimation) this.switchSprite(this.nextAttackAnimation)
                        } else {
                            if (this.currentSpriteKey != this.attackAnimationKeysLeft[0]) this.switchSprite(this.attackAnimationKeysLeft[0])
                        }
                    } else {
                        if (this.currentSpriteKey !== this.attackAnimationKeysLeft[0]) this.switchSprite(this.attackAnimationKeysLeft[0])
                    }

                    // if the enemies attack animation is completed, it counts as a hit
                    if ((this.currentFrame + 1) === this.frameRate){
                        if (player.currentSpriteKey !== "hit") player.switchSprite("hit")

                        // newWidth represents the players healthbar equal to how much life they currently have
                        let newWidth = (player.healthBar.width / player.health) * (player.health - this.attackPower)
                        player.healthBar.width = newWidth
                        player.currentHealth -= this.attackPower

                        // currentframe resets stops the current entity's attack from registering multiple times because of the framebuffer
                        this.currentFrame = 0
                        if (this.attackAnimationKeysLeft.length > 1) {
                            this.nextAttackAnimation = this.selectRandomAttackAnimation(this.attackAnimationKeysLeft)
                        }

                        if (player.currentHealth <= 0 ){
                            player.isDead = true
                            return
                        }
                    }
                    //TODO: Player Block
                } else {
                    // Checks if the Entity has either run or walk animations
                    if ("flightLeft" in this.animations){
                        if (this.currentSpriteKey !== "flightLeft") this.switchSprite('flightLeft')
                    }else if ("runLeft" in this.animations){
                        if (this.currentSpriteKey !== "runLeft") this.switchSprite('runLeft')
                    } else {
                        if (this.currentSpriteKey !== "walkLeft") this.switchSprite('walkLeft')
                    }
                    // this.lastDirection = "left"
                    this.attackBox = this.attackBoxLeft
                    if (this.type === "Skeleton") {
                        this.velocity.x = -0.25
                    } else if (this.type === "WhiteWerewolf") {
                        this.velocity.x = -5
                    } else {
                        this.velocity.x = -3
                    }
                }
            }
            // Tests if the enemies's position is to the left of the player
            else if (this.position.x < player.position.x) {
                this.lastDirection = "right"
                // if the enemy reaches the player's hitbox area, it stops and attacks, otherwise keeps running
                if (collison({entity: this.attackBox, block: player.hitbox})){
                    this.velocity.x = 0

                    // random attack animations dont start until the function runs at least once
                    if (this.attackAnimationKeys.length > 1) {
                        // Randomises the attack animation
                        if (this.nextAttackAnimation) {
                            if (this.currentSpriteKey !== this.nextAttackAnimation) this.switchSprite(this.nextAttackAnimation)
                        } else {
                            if (this.currentSpriteKey != this.attackAnimationKeys[0]) this.switchSprite(this.attackAnimationKeys[0])
                        }
                    } else {
                        if (this.currentSpriteKey !== this.attackAnimationKeys[0]) this.switchSprite(this.attackAnimationKeys[0])
                    }

                     // if the enemies attack animation is completed, it counts as a hit
                    if ((this.currentFrame + 1) === this.frameRate){
                        if (player.currentSpriteKey !== "hit") player.switchSprite("hit")

                        // newWidth represents the players healthbar equal to how much life they currently have
                        let newWidth = (player.healthBar.width / player.health) * (player.health - this.attackPower)
                        player.healthBar.width = newWidth
                        player.currentHealth -= this.attackPower

                        // currentframe resets stops the current entity's attack from registering multiple times because of the framebuffer
                        this.currentFrame = 0
                        if (this.attackAnimationKeys.length > 1) {
                            this.nextAttackAnimation = this.selectRandomAttackAnimation(this.attackAnimationKeys)
                        }
                        if (player.currentHealth <= 0 ){
                            player.isDead = true
                            return
                        }
                        // player.position.x += 50 //TODO: for werewolf
                    }
                } else {
                    // Checks if the Entity has either run or walk animations
                    if ("flight" in this.animations){
                        if (this.currentSpriteKey !== "flight") this.switchSprite('flight')
                    } else if ("runRight" in this.animations){
                        if (this.currentSpriteKey !== "runRight") this.switchSprite('runRight')
                    } else {
                        if (this.currentSpriteKey !== "walkRight") this.switchSprite('walkRight')
                    }
                    // this.lastDirection = "right"
                    this.attackBox = this.attackBoxRight
                    if (this.type === "Skeleton") {
                        this.velocity.x = 0.25
                    } else if (this.type === "WhiteWerewolf") {
                        this.velocity.x = 5
                    }else {
                        this.velocity.x = 3
                    }
                }
            }
        } else {
            this.alerted = false

            // if current enemy does not roam
            if (this.roamingPosition === false) {

                // if enemy position is greater than initial position, walks or runs towards old position
                if (this.position.x > this.startPosition) {
                    this.velocity.x = -1
                    if ("flightLeft" in this.animations){
                        if (this.currentSpriteKey !== "flightLeft") this.switchSprite('flightLeft')
                    } else if ("walkLeft" in this.animations){
                        if (this.currentSpriteKey !== "walkLeft") this.switchSprite("walkLeft")
                        this.velocity.x = -0.25
                    } else {
                        if (this.currentSpriteKey !== "runLeft") this.switchSprite("runLeft")
                        this.velocity.x = -1.5
                    }
                }
                // if enemy position is less than initial position, walks or runs towards old position
                else if (this.position.x < this.startPosition) {
                    this.velocity.x = 1
                    if ("flight" in this.animations){
                        if (this.currentSpriteKey !== "flight") this.switchSprite('flight')
                    } else if ("walkRight" in this.animations){
                        if (this.currentSpriteKey !== "walkRight") this.switchSprite("walkRight")
                        this.velocity.x = 0.25
                    } else {
                        if (this.currentSpriteKey !== "runRight") this.switchSprite("runRight")
                        this.velocity.x = 1.5
                    }
                }
                // if enemy returns to old position, returns to idle position
                else {
                    this.velocity.x = 0
                    if (this.lastDirection === "left") {
                        if ("flightLeft" in this.animations){
                            if (this.currentSpriteKey !== "flightLeft") this.switchSprite('flightLeft')
                        } else {
                            if (this.currentSpriteKey !== "idleLeft") this.switchSprite("idleLeft")
                        }
                    } else {
                        if ("flight" in this.animations){
                            if (this.currentSpriteKey !== "flight") this.switchSprite('flight')
                        } else {
                            if (this.currentSpriteKey !== "idleRight") this.switchSprite("idleRight")
                        }
                    }
                }
            }
        }
    }
}