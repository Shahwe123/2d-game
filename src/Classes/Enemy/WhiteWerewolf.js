import { werewolfAnimations } from "../../assets/Enemies/White Werewolf/werewolfImageExports";
import { collison } from "../../utils";
import { HealthKit } from "../Collectibles/HealthKit";
import { Entity } from "../Entity";
import { Enemy } from "./Enemy";

/**
 *
 *  WhiteWerewolf - represents an enemy entity
 *
 * @param position - an object of x and y
 * @param currentMapKey - which map the enemy is located in
 * @param roamingPosition - x and y object of where the enemy loops between
 *
 */

export class WhiteWerewolf extends Enemy {
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
     * As the entity moves, its detection area also updates.
     */
    updateDetectionArea() {
        this.detectionArea = {
            position:{
                x:this.hitbox.position.x  -85,
                y:this.hitbox.position.y
            },
            width:250,
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