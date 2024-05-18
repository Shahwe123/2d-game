import attack1LeftSpriteSrc from "./attack1Left.png"
import attack1RightSpriteSrc from "./attack1Right.png"
import attack2LeftSpriteSrc from "./attack2Left.png"
import attack2RightSpriteSrc from "./attack2Right.png"
import deathLeftSpriteSrc from "./deathLeft.png"
import deathRightSpriteSrc from "./deathRight.png"
import flyLeftSpriteSrc from "./flyLeft.png"
import flyRightSpriteSrc from "./flyRight.png"
import hurtLeftSpriteSrc from "./hurtLeft.png"
import hurtRightSpriteSrc from "./hurtRight.png"
import idleLeftSpriteSrc from "./idleLeft.png"
import idleRightSpriteSrc from "./idleRight.png"
import walkLeftSpriteSrc from "./walkLeft.png"
import walkRightSpriteSrc from "./walkRight.png"

export const cthuluAnimations = {
    walkRight: {
        src:walkRightSpriteSrc,
        frameRate:12,
        frameBuffer: 5,
    },
    walkLeft: {
        src: walkLeftSpriteSrc,
        frameRate:12,
        frameBuffer: 5,
    },
    idleRight: {
        src: idleRightSpriteSrc,
        frameRate:15,
        frameBuffer: 5,
    },
    idleLeft: {
        src: idleLeftSpriteSrc,
        frameRate:15,
        frameBuffer: 5,
    },
    hurt: {
        src:hurtRightSpriteSrc,
        frameRate:5,
        frameBuffer: 5,
    },
    hurtLeft: {
        src: hurtLeftSpriteSrc,
        frameRate:5,
        frameBuffer: 5,
    },
    dead: {
        src:deathRightSpriteSrc,
        frameRate:11,
        frameBuffer: 5,
    },
    deadLeft: {
        src:deathLeftSpriteSrc,
        frameRate:11,
        frameBuffer: 5,
    },
    attack1: {
        src:attack1RightSpriteSrc,
        frameRate: 7,
        frameBuffer: 10,
    },
    attack1Left: {
        src:attack1LeftSpriteSrc,
        frameRate: 7,
        frameBuffer: 10,
    },
    attack2: {
        src:attack2RightSpriteSrc,
        frameRate: 9,
        frameBuffer: 7,
    },
    attack2Left: {
        src:attack2LeftSpriteSrc,
        frameRate: 9,
        frameBuffer: 7,
    },
    fly: {
        src:flyRightSpriteSrc,
        frameRate: 6,
        frameBuffer: 5,
    },
    flyLeft: {
        src:flyLeftSpriteSrc,
        frameRate: 6,
        frameBuffer: 5,
    },
}