import AttackSpriteSrc from "./Attack.png"
import AttackLeftSpriteSrc from "./AttackLeft.png"
import DeathSpriteSrc from "./Death.png"
import DeathLeftSpriteSrc from "./DeathLeft.png"
import IdleSpriteSrc from "./Idle.png"
import IdleLeftSpriteSrc from "./IdleLeft.png"
import RunSpriteSrc from "./Run.png"
import RunLeftSpriteSrc from "./RunLeft.png"
import TakeHitSpriteSrc from "./Take Hit.png"
import TakeHitLeftSpriteSrc from "./TakeHitLeft.png"

export const goblinAnimations = {
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
        frameBuffer:2,
    },
    attackLeft:{
        src:AttackLeftSpriteSrc,
        frameRate:8,
        frameBuffer:2,
    },
}