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

        // animation variables
        this.currentFrame = 0
        this.elapsedFrames = 0
        this.frameBuffer = this.animations[this.currentSpriteKey].frameBuffer

        // hitbox variables
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


        // combat variables
        this.attackBox = {
            position: {
                x:0,
                y:0
            },
            width:70,
            height:25
        }
        this.lives = 3
        this.health = 500
        this.currentHealth = 500
        this.isDead = false
        this.isAttacking = false
        this.attackPower = 250
        this.stamina = 100
        this.maxStamina = 100
        this.attackStaminaCost = 20
        this.jumpStaminaCost = 20
        this.cooldown = false
        this.cooldownTime = 4500
        this.regenerationRate = 10
        this.nextAttackAnimation
        this.isPoweredUp = false // for any collectibles that can be stored
        this.powerupDuration = 0
        this.knockback = false
        this.knockbackx = 0
        this.isInCombat = false
        this.deathElement = document.getElementById("death")
        this.respawnBtnElement = document.getElementById("respawnBtn")
        this.heartsDiv = document.getElementById("hearts")
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
    update({canvasContext, currentMapCollisions, enemies, collectibles, currentMapKey, gameInstance}) {

        if (this.lastDirection === "left") {
            this.currentAvatarPosition = this.avatarPositionLeft
        } else {
            this.currentAvatarPosition = this.avatarPositionRight
        }
        this.updateFrames()
        this.draw({canvasContext})
        this.updateHitbox()
        this.updateHealthBarPosition()
        this.updateStaminaBar()
        this.didCollectCollectables({collectibles, currentMapKey})
        canvasContext.fillStyle = "red"
        canvasContext.fillRect(this.healthBar.position.x, this.healthBar.position.y, this.healthBar.width, this.healthBar.height)
        canvasContext.fillStyle = "rgba(0,0,230,0.7)"
        canvasContext.fillRect(this.staminaBar.position.x, this.staminaBar.position.y, this.staminaBar.width, this.staminaBar.height)

        this.regenerateStamina()

        this.draw({canvasContext})
        if (!this.isDead) this.position.x += this.velocity.x
        if (this.knockback) {
            if (this.velocity.y === 0) {
                this.velocity.x === 0
                this.knockback = false
            }
        }
        this.updateHitbox()
        this.updateAttackBox()
        this.updateHealthBarPosition()
        this.updateStaminaBar()
        this.didCollectCollectables({collectibles, currentMapKey})
        this.checkForHorizontalCollisions(currentMapCollisions)

        this.applyGravity()
        this.updateHitbox()
        this.updateAttackBox()
        this.updateHealthBarPosition()
        this.updateStaminaBar()
        this.didCollectCollectables({collectibles, currentMapKey})
        this.checkForVerticalCollisions(currentMapCollisions)


        if (this.lives === 0) {
            this.deathElement.className = "show"
            this.deathElement.style.display = "block"
            this.respawnBtnElement.addEventListener('click', gameInstance.handleRespawn)
        }
        if (this.isDead === true && this.lives > 0) {

            this.lives -= 1
            this.heartsDiv.removeChild(this.heartsDiv.firstChild)
        }
        if (this.lives > 0 && this.isDead === true ) {
            this.currentHealth = this.health
            this.stamina = this.maxStamina
            this.isDead = false
            this.position = {
                x: this.position.x,
                y: 100
            }
        }
    }

    /**
     * Changes the sprite (image file) used for the characters animation
     *
     * @param  key - refers to the animation e.g idleRight
     */
    switchSprite(key){

        if ((this.currentSpriteKey === ('attack2') && this.currentFrame < this.animations['attack2'].frameRate - 1) ||
        this.currentSpriteKey === ('hit') && this.currentFrame < this.animations['hit'].frameRate - 1 && this.type === "Player"){
            return
        }
        if (this.isTimeOutOn) {
            return
        }
        this.currentFrame = 0
        if (this.sprite === this.animations[key].image || !this.loaded) return
        if (this.lastDirection == 'right') {
            this.currentAvatarPosition = this.avatarPositionRight
        } else {
            this.currentAvatarPosition = this.avatarPositionLeft
        }
        this.sprite = this.animations[key].image
        this.currentSpriteKey = key
        this.frameBuffer  = this.animations[key].frameBuffer
        this.frameRate = this.animations[key].frameRate
    }

    /**
     *
     *  Player attacks enemy if there is a collision between the player and an enemy
     *
     * @param enemies - array of enemies in the current level
     * @param collectibles - used to update the collectibles array with new drops
     * @param currentMapKey - used to check if the enemy being attacked is in the current map
     *
     */
    attack({enemies, collectibles, currentMapKey}) {
        // Prevents player from attacking
        if (this.isDead || this.cooldown || this.stamina < this.attackStaminaCost) {
            return
        }

        this.stamina -= this.attackStaminaCost

        if (this.lastDirection === "left") {
            this.nextAttackAnimation = this.selectRandomAttackAnimation(["attack1Left", "attack2Left", "attack3Left"])
            this.switchSprite(this.nextAttackAnimation)
        } else {
            this.nextAttackAnimation = this.selectRandomAttackAnimation(["attack1", "attack2", "attack3"])
            this.switchSprite(this.nextAttackAnimation)
        }

        if (this.stamina <= 10) {
            this.startCooldown()
        }

        enemies.forEach(enemy => {
            if (enemy.isDead) {
                return
            }
            if (enemy.currentMapKey === currentMapKey && collison({entity: this.attackBox, block: enemy.hitbox}) ){
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

    /**
     *
     * Checks if there is a collision between the player and a collectible. If so,
     * it is removed from the map and its effect is applied on the player
     *
     * @param {collectibles} param0
     */
    didCollectCollectables({collectibles, currentMapKey}) {
        collectibles.forEach(collectible => {
            if (collectible.mapKey === currentMapKey && collison({entity: this.hitbox, block: collectible}) && collectible.isPickedUp === false) {
                collectible.isPickedUp = true
                collectible.update({player:this})
                if (collectible.type === "powerup") {
                    this.isPoweredUp = true
                }
            }
        });
        this.powerupDuration += 10 * (1/60)
        if (this.powerupDuration === 250) {
            this.attackPower -= 25

        }
    }

    /**
     * Updates the stamina bar ontop of the player, the width of the bar
     * is reduced or increased depending on the player's current stamina
     */
    updateStaminaBar() {
        this.originalStaminaBarWidth  = this.hitbox.width
        this.staminaBar = {
            position: {
                x: this.hitbox.position.x,
                y: this.hitbox.position.y - 18
            },
            width: (this.originalStaminaBarWidth / this.maxStamina) * this.stamina, // cuts the width based on the current stamina
            height: 5
        }
    }

    /**
     * Gradually regenerates the player's stamina when the player is not attacking
     */
    regenerateStamina() {
        if (!this.isAttacking && this.stamina <= this.maxStamina && !this.cooldown) {
            this.stamina += this.regenerationRate * (1/60)
            if (this.stamina > this.maxStamina) {
                this.stamina = this.maxStamina
            }
        }
    }

    /**
     * If the player's stamina reaches zero, starts a cool where player cannot attack until
     * cooldown is finished, unlikely to run due to constant regeneration
     */
    startCooldown() {
        this.cooldown = true
        setTimeout(() => {
            this.cooldown = false
            this.stamina = this.maxStamina
        }, this.cooldownTime);
    }
}