import AttackLeftSpriteSrc from "./AttackLeft.png"
import AttackSpriteSrc from "./Attack.png"
import DeathLeftSpriteSrc from "./DeathLeft.png"
import DeathSpriteSrc from "./Death.png"
import IdleLeftSpriteSrc from "./IdleLeft.png"
import IdleSpriteSrc from "./Idle.png"
import RunLeftSpriteSrc from "./RunLeft.png"
import RunSpriteSrc from "./Run.png"
import TakeHitLeftSpriteSrc from "./TakeHitLeft.png"
import TakeHitSpriteSrc from "./Take Hit.png"

export const mushroomAnimations = {
    runLeft:{
        src:RunLeftSpriteSrc,
        frameRate:8,
        frameBuffer:5,
    },
    runRight:{
        src:RunSpriteSrc,
        frameRate:8,
        frameBuffer:5,
    },
    idleRight:{
        src:IdleSpriteSrc,
        frameRate:4,
        frameBuffer:5,
    },
    idleLeft:{
        src:IdleLeftSpriteSrc,
        frameRate:4,
        frameBuffer:5,
    },
    hurt:{
        src:TakeHitSpriteSrc,
        frameRate:4,
        frameBuffer:5,
    },
    hurtLeft:{
        src:TakeHitLeftSpriteSrc,
        frameRate:4,
        frameBuffer:5,
    },
    dead:{
        src:DeathSpriteSrc,
        frameRate:4,
        frameBuffer:5,
    },
    deadLeft:{
        src:DeathLeftSpriteSrc,
        frameRate:4,
        frameBuffer:5,
    },
    attack:{
        src:AttackSpriteSrc,
        frameRate:8,
        frameBuffer:3,
    },
    attackLeft:{
        src:AttackLeftSpriteSrc,
        frameRate:8,
        frameBuffer:3,
    },
}