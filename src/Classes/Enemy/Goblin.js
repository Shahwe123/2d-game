import { goblinAnimations } from "../../assets/Enemies/Goblin/imageExports"
import { collison } from "../../utils"
import { Entity } from "../Entity"
import { Enemy } from "./Enemy"
/**
 *
 *  Goblin - represents an enemy entity
 *
 * @param position - an object of x and y
 * @param currentMapKey - which map the enemy is located in
 * @param roamingPosition - x and y object of where the enemy loops between
 *
 */

export class Goblin extends Enemy {
    constructor({position, currentMapKey, roamingPosition}) {
        super({position: position, animations: goblinAnimations})
        this.currentMapKey = currentMapKey
        this.type = "Goblin"
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


        this.health = 50
        this.currentHealth = 50
        this.attackPower = 15
        this.attackAnimationKeys = ['attack']
        this.attackAnimationKeysLeft = ['attackLeft']
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