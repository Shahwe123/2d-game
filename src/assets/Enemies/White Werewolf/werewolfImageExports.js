import Attack1SpriteSrc from "./Attack_1.png"
import Attack1LeftSpriteSrc from "./Attack_1Left.png"
import Attack2SpriteSrc from "./Attack_2.png"
import Attack2LeftSpriteSrc from "./Attack_2Left.png"
import Attack3SpriteSrc from "./Attack_3.png"
import Attack3LeftSpriteSrc from "./Attack_3Left.png"
import DeadSpriteSrc from "./Dead.png"
import DeadLeftSpriteSrc from "./DeadLeft.png"
import HurtSpriteSrc from "./Hurt.png"
import HurtLeftSpriteSrc from "./HurtLeft.png"
import IdleSpriteSrc from "./Idle.png"
import IdleLeftSpriteSrc from "./IdleLeft.png"
import JumpSpriteSrc from "./Jump.png"
import JumpLeftSpriteSrc from "./JumpLeft.png"
import RunSpriteSrc from "./Run.png"
import RunLeftSpriteSrc from "./RunLeft.png"
import RunAttackSpriteSrc from "./Run+Attack.png"
import RunAttackLeftSpriteSrc from "./Run+AttackLeft.png"
import WalkSpriteSrc from "./Walk.png"
import WalkLeftSpriteSrc from "./WalkLeft.png"

export const werewolfAnimations = {
    walkRight: {
        src: WalkSpriteSrc,
        frameRate: 11,
        frameBuffer : 5
    },
    walkLeft: {
        src: WalkLeftSpriteSrc,
        frameRate: 11,
        frameBuffer : 5
    },
    runLeft: {
        src: RunLeftSpriteSrc,
        frameRate: 9,
        frameBuffer : 5
    },
    runRight: {
        src: RunSpriteSrc,
        frameRate: 9,
        frameBuffer : 5
    },
    idleRight: {
        src: IdleSpriteSrc,
        frameRate: 8,
        frameBuffer : 8
    },
    idleLeft: {
        src: IdleLeftSpriteSrc,
        frameRate: 8,
        frameBuffer : 8
    },
    runAttackRight: {
        src: RunAttackSpriteSrc,
        frameRate: 7,
        frameBuffer : 3
    },
    runAttackLeft: {
        src: RunAttackLeftSpriteSrc,
        frameRate: 7,
        frameBuffer : 3
    },
    jump: {
        src: JumpSpriteSrc,
        frameRate: 11,
        frameBuffer : 3
    },
    jumpLeft: {
        src: JumpLeftSpriteSrc,
        frameRate: 11,
        frameBuffer : 3
    },
    hurt: {
        src: HurtSpriteSrc,
        frameRate: 2,
        frameBuffer : 8
    },
    hurtLeft: {
        src: HurtLeftSpriteSrc,
        frameRate: 2,
        frameBuffer : 8
    },
    dead: {
        src: DeadSpriteSrc,
        frameRate: 2,
        frameBuffer : 8
    },
    deadLeft: {
        src: DeadLeftSpriteSrc,
        frameRate: 2,
        frameBuffer : 8
    },
    attack1: {
        src: Attack1SpriteSrc,
        frameRate: 6,
        frameBuffer : 8
    },
    attack1Left: {
        src: Attack1LeftSpriteSrc,
        frameRate: 6,
        frameBuffer : 8
    },
    attack2: {
        src: Attack2SpriteSrc,
        frameRate: 4,
        frameBuffer : 8
    },
    attack2Left: {
        src: Attack2LeftSpriteSrc,
        frameRate: 4,
        frameBuffer : 8
    },
    attack3: {
        src: Attack3SpriteSrc,
        frameRate: 5,
        frameBuffer : 8
    },
    attack3Left: {
        src: Attack3LeftSpriteSrc,
        frameRate: 5,
        frameBuffer : 8
    },
}