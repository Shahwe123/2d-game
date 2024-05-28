import Attack1SpriteSrc from "./atk1.png"
import Attack1LeftSpriteSrc from "./atk1Left.png"
import Attack2SpriteSrc from "./atk2.png"
import Attack2LeftSpriteSrc from "./atk2Left.png"
import Attack3SpriteSrc from "./atk3.png"
import Attack3LeftSpriteSrc from "./atk3Left.png"
import BlockSpriteSrc from "./block.png"
import BlockLeftSpriteSrc from "./blockLeft.png"
import DeathSpriteSrc from "./death.png"
import DeathLeftSpriteSrc from "./deathLeft.png"
import RunSpriteSrc from "./run.png"
import RunLeftSpriteSrc from "./runLeft.png"
import SpecialAttackSpriteSrc from "./sp-atk.png"
import SpecialAttackLeftSpriteSrc from "./sp-atkLeft.png"
import TakeHitSpriteSrc from "./takehit.png"
import TakeHitLeftSpriteSrc from "./takehitLeft.png"
import IdleSpriteSrc from "./idle.png"
import IdleLeftSpriteSrc from "./idleLeft.png"
import RollSpriteSrc from './roll.png'
import RollLeftSpriteSrc from './rollLeft.png'
import AirAtkSpriteSrc from './airattack.png'
import AirAtkLeftLeftSpriteSrc from './airattackLeft.png'
import JumpLeftSpriteSrc from './jumpLeft.png'
import JumpSpriteSrc from './jump.png'
import fallLeftSpriteSrc from './fallLeft.png'
import fallSpriteSrc from './fall.png'


export const elementalIceAnimations = {
    runRight: {
        src:RunSpriteSrc,
        frameRate:8,
        frameBuffer: 5,
    },
    runLeft: {
        src: RunLeftSpriteSrc,
        frameRate:8,
        frameBuffer: 5,
    },
    idleRight: {
        src: IdleSpriteSrc,
        frameRate:8,
        frameBuffer: 5,
    },
    idleLeft: {
        src: IdleLeftSpriteSrc,
        frameRate:8,
        frameBuffer: 5,
    },
    hurt: {
        src:TakeHitSpriteSrc,
        frameRate:6,
        frameBuffer: 5,
    },
    hurtLeft: {
        src: TakeHitLeftSpriteSrc,
        frameRate:6,
        frameBuffer: 5,
    },
    dead: {
        src:DeathSpriteSrc,
        frameRate:15,
        frameBuffer: 5,
    },
    deadLeft: {
        src:DeathLeftSpriteSrc,
        frameRate:15,
        frameBuffer: 5,
    },
    attack1: {
        src:Attack1SpriteSrc,
        frameRate: 7,
        frameBuffer: 3,
    },
    attack1Left: {
        src:Attack1LeftSpriteSrc,
        frameRate: 7,
        frameBuffer: 3,
    },
    attack2Left: {
        src:Attack2LeftSpriteSrc,
        frameRate: 7,
        frameBuffer: 3,
    },
    attack2: {
        src:Attack2SpriteSrc,
        frameRate: 7,
        frameBuffer: 3,
    },
    attack3Left: {
        src:Attack3LeftSpriteSrc,
        frameRate: 17,
        frameBuffer: 3,
    },
    attack3: {
        src:Attack3SpriteSrc,
        frameRate: 17,
        frameBuffer: 3,
    },
    blockLeft: {
        src:BlockLeftSpriteSrc,
        frameRate: 9,
        frameBuffer: 6,
    },
    block: {
        src:BlockSpriteSrc,
        frameRate: 9,
        frameBuffer: 6,
    },
    specialAttackLeft: {
        src:SpecialAttackLeftSpriteSrc,
        frameRate: 15,
        frameBuffer: 5,
    },
    specialAttack: {
        src:SpecialAttackSpriteSrc,
        frameRate: 15,
        frameBuffer: 5,
    },
    rollLeft: {
        src:RollLeftSpriteSrc,
        frameRate: 8,
        frameBuffer: 6,
    },
    roll: {
        src:RollSpriteSrc,
        frameRate: 8,
        frameBuffer: 6,
    },
    fallLeft: {
        src:fallLeftSpriteSrc,
        frameRate: 3,
        frameBuffer: 6,
    },
    fall: {
        src:fallSpriteSrc,
        frameRate: 3,
        frameBuffer: 6,
    },
    jumpLeft: {
        src:JumpLeftSpriteSrc,
        frameRate: 3,
        frameBuffer: 6,
    },
    jump: {
        src:JumpSpriteSrc,
        frameRate: 3,
        frameBuffer: 6,
    },
    airAttackLeft: {
        src:AirAtkLeftLeftSpriteSrc,
        frameRate: 8,
        frameBuffer: 6,
    },
    airAttack: {
        src:AirAtkSpriteSrc,
        frameRate: 8,
        frameBuffer: 6,
    },
}