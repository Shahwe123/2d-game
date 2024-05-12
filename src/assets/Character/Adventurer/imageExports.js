import idleSpriteSrc from './Idle.png'
import idleLeftSpriteSrc from './IdleLeft.png'
import runSpriteSrc from './Run.png'
import runLeftSpriteSrc from './RunLeft.png'
import jumpSpriteSrc from './Jump.png'
import jumpLeftSpriteSrc from './JumpLeft.png'
import hitSpriteSrc from './Take Hit - white silhouette.png'
import fallSpriteSrc from './Fall.png'
import fallLeftSpriteSrc from './FallLeft.png'
import deathSpriteSrc from './Death.png'
import attack1SpriteSrc from './Attack1.png'
import attack2SpriteSrc from './Attack2.png'
import attack3SpriteSrc from './Attack3.png'

export const mainPlayerAnimationsKing = {
    idleRight: {
        src: idleSpriteSrc,
        frameRate: 8,
        frameBuffer : 5
    },
    idleLeft: {
        src: idleLeftSpriteSrc,
        frameRate: 8,
        frameBuffer : 5
    },
    runRight: {
        src: runSpriteSrc,
        frameRate: 8,
        frameBuffer : 3
    },
    runLeft: {
        src: runLeftSpriteSrc,
        frameRate: 8,
        frameBuffer : 3
    },
    jump: {
        src: jumpSpriteSrc,
        frameRate: 2,
        frameBuffer : 3
    },
    jumpLeft: {
        src: jumpLeftSpriteSrc,
        frameRate: 2,
        frameBuffer : 3
    },
    hit: {
        src: hitSpriteSrc,
        frameRate: 4,
        frameBuffer : 8
    },
    fall: {
        src: fallSpriteSrc,
        frameRate: 2,
        frameBuffer : 2
    },
    fallLeft: {
        src: fallLeftSpriteSrc,
        frameRate: 2,
        frameBuffer : 2
    },
    death: {
        src: deathSpriteSrc,
        frameRate: 6,
        frameBuffer : 10
    },
    attack1: {
        src: attack1SpriteSrc,
        frameRate: 4,
        frameBuffer : 4
    },
    attack2: {
        src: attack2SpriteSrc,
        frameRate: 4,
        frameBuffer : 4
    },
    attack3: {
        src: attack3SpriteSrc,
        frameRate: 4,
        frameBuffer : 4
    },
}