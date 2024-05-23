import { Entity } from "../Entity"
import { skeletonAnimations } from "../../assets/Enemies/Skeleton/imageExports"
import { collison } from "../../utils"
import { HealthKit } from "../Collectibles/HealthKit"
import { Enemy } from "./Enemy"
/**
 *
 *  Skeleton - represents an enemy entity
 *
 * @param position - an object of x and y
 * @param currentMapKey - which map the enemy is located in
 * @param roamingPosition - x and y object of where the enemy loops between
 *
 */

export class Skeleton extends Enemy {
    constructor({position, currentMapKey, roamingPosition}) {
        super({position: position, animations: skeletonAnimations})
        this.currentMapKey = currentMapKey
        this.type = "Skeleton"
        this.roamingPosition = roamingPosition
        this.velocity = {
            x:0,
            y:1
        }
        this.avatarHeight = 50
        this.avatarWidth = 48
        this.avatarPositionRight = {
            x:57,
            y: 50
        }
        this.avatarPositionLeft = {
            x:45,
            y: 50
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
        this.attackPower = 45
        this.attackAnimationKeys = ['attack']
        this.attackAnimationKeysLeft = ['attackLeft']
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
                y:this.hitbox.position.y
            },
            width:45,
            height:25
        }
        this.attackBoxRight = {
            position: {
                x:this.hitbox.position.x + this.hitbox.width,
                y:this.hitbox.position.y
            },
            width:56,
            height:25
        }
    }
}