import { evilwizardAnimations } from "../../assets/Enemies/EvilWizard/wizardImageExports";
import { collison } from "../../utils";
import { Entity } from "../Entity";
import { Enemy } from "./Enemy";

export class EvilWizard extends Enemy {
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


        this.health = 400
        this.currentHealth = 400
        this.attackPower = 75
        this.attackAnimationKeys = ["attack1", "attack2"]
        this.attackAnimationKeysLeft = ["attack1Left", "attack2Left"]
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