import { collison } from "../utils"
import { HealthKit } from "./Collectibles/HealthKit"
/**
 * Represents any moving character, player or enemy
 *
 * @param  position
 * @param   animations - animation object of character
 */
export class Entity {
    constructor({position, animations}) {
        this.position = position
        this.animations = animations
        this.lastDirection = 'left'
        this.currentSpriteKey = "idleLeft"
        this.sprite = new Image()
        this.sprite.onload = () => {
            this.height = this.sprite.height
            this.width = this.sprite.width / this.animations[this.currentSpriteKey].frameRate
            this.loaded = true
        }
        this.sprite.src = this.animations[this.currentSpriteKey].src
        for (let key in this.animations) {
            const image = new Image()
            image.src = this.animations[key].src
            this.animations[key].image = image
        }
        this.hitbox = {
            position: {
                x: this.position.x,
                y: this.position.y
            },
            width: 10,
            height:10
        }
        this.health = 0
        this.currentHealth = 0
        this.isDead = false
        this.isTimeOutOn = false
    }

    /**
     * Changes the sprite (image file) used for the characters animation
     *
     * @param  key - refers to the animation e.g idleRight
     */
    switchSprite(key){
        //TODO: if attackiong need to let animation finish before moving on
        if (this.currentSpriteKey === ('attack2') && this.currentFrame < this.animations['attack2'].frameRate - 1){
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
        console.log(this.currentHealth);
        if (this.currentHealth === 0) {
            this.isDead = true
            if (this.lastDirection === "left" ) {
                if (this.currentSpriteKey !== "deadLeft") this.switchSprite("deadLeft")
            } else {
                if (this.currentSpriteKey !== "dead") this.switchSprite("dead")
            }
            let id = (collectibles.length === 0 ? collectibles.length: collectibles.length + 1)
            collectibles.push(new HealthKit({position: this.hitbox.position, mapKey: this.currentMapKey, id}))
        }
        if (this.position.x > player.position.x) {
            this.position.x += 5
        } else {
            this.position.x += -5
        }
        this.isHit = false
    }

    /**
     * Updates the hitbox area as the character moves
     *
     */
    updateHitbox() {
        this.hitbox = {
            position: {
                x: this.position.x + this.currentAvatarPosition.x,
                y: this.position.y + this.currentAvatarPosition.y
            },
            width: this.avatarWidth,
            height: this.avatarHeight
        }
    }

    /**
     * Controls how fast the character falls down
     *
     */
    applyGravity() {
        this.velocity.y += 0.5 // -> gravity number
        this.position.y += this.velocity.y
    }

    /**
     * Updates the HealthBar position based on player movement so it remains above them and width based on the characters current health
     *
     */
    updateHealthBarPosition() {
        this.originalHealthBarWidth  = this.hitbox.width

        this.healthBar = {
            position: {
                x: this.hitbox.position.x,
                y: this.hitbox.position.y - 18
            },
            width: (this.originalHealthBarWidth / this.health) * this.currentHealth,
            height: 5
        }
    }

    /**
     * Draws onto the canvas the current character animation image using a cropbox that moves across the image file to simulate animation
     *
     */
    draw({canvasContext}) {
        if (!this.sprite) return
        let cropbox = {}

        // used for animations that have been inverted
        if (this.currentSpriteKey.includes("Left")&& (this.type === "WhiteWerewolf" || this.type === "Skeleton" || this.type === "Goblin" || this.type === "Player")) {
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
            this.width,
            this.height
        )
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
        canvasContext.fillRect(this.healthBar.position.x, this.healthBar.position.y, this.healthBar.width, this.healthBar.height)
        canvasContext.fillStyle = "red"
        canvasContext.fillRect(this.attackBox.position.x, this.attackBox.position.y, this.attackBox.width, this.attackBox.height)

        if (this.type !== "Player") {
            this.checkForPlayerDetection({player})
        }

        if (this.alerted === false && this.type !== "Player") {
            this.roaming()
            this.attackBox = (this.roamDirection === "left"? this.attackBoxLeft: this.attackBoxRight)
        }

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
     * Checks if the entity collides with a collision block and modifies its y velocity to prevent it from falling down
     *
     * @param currentMapCollisions - an array of collision blocks associated with the current map background
     */
    checkForVerticalCollisions(currentMapCollisions){
        for (let i = 0; i < currentMapCollisions.length; i++) {
            const collisionBlock = currentMapCollisions[i]

            if (collison({entity: this.hitbox, block: collisionBlock})) {
                if (this.velocity.y > 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y + this.hitbox.height
                    this.position.y = collisionBlock.position.y - offset - 0.01
                    break
                }
                if (this.velocity.y < 0) {
                    this.velocity.y = 0
                    const offset = this.hitbox.position.y - this.position.y
                    this.position.y = collisionBlock.position.y + collisionBlock.height - offset + 0.01
                    break
                }
            }
        }
    }

    /**
     * Checks if the entity collides with a collision block and modifies its x velocity to prevent it from falling down
     *
     * @param currentMapCollisions - an array of collision blocks associated with the current map background
     */
    checkForHorizontalCollisions(currentMapCollisions){
        for (let i = 0; i < currentMapCollisions.length; i++) {
            const collisionBlock = currentMapCollisions[i]

            if (collison({entity: this.hitbox, block: collisionBlock})) {
                if (this.velocity.x > 0) {
                    this.velocity.x = 0
                    const offset = this.hitbox.position.x - this.position.x + this.hitbox.width
                    this.position.x = collisionBlock.position.x - offset - 0.01
                    break
                }
                if (this.velocity.x < 0) {
                    this.velocity.x = 0
                    const offset = this.hitbox.position.x - this.position.x
                    this.position.x = collisionBlock.position.x + collisionBlock.width - offset + 0.01
                    break
                }
            }
        }
    }

    /**
     * Updates the current frame based on the framebuffer to slow down the animation.
     *
     *
     */
    updateFrames() {
        // prevents death animation from running more than once
        if (this.isDead && (this.currentFrame + 1) === this.frameRate) {
            return
        }
        this.elapsedFrames++
        if (this.elapsedFrames % this.frameBuffer === 0) {
            if (this.currentFrame < this.animations[this.currentSpriteKey].frameRate - 1) {
                this.currentFrame++
            } else this.currentFrame = 0
        }
    }

    /**
     * Function causes entity to walk to and back from their roaming positions
     * /TODO: Upon reaching their roaming position x and y, idle for a second than continue patrol
     */
    roaming() {

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
}