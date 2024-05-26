import Attack1LeftSpriteSrc from "./Attack1Left.png"
import Attack1SpriteSrc from "./Attack1.png"
import Attack2LeftSpriteSrc from "./Attack2Left.png"
import Attack2SpriteSrc from "./Attack2.png"
import DeathLeftSpriteSrc from "./DeathLeft.png"
import DeathSpriteSrc from "./Death.png"
import FallLeftSpriteSrc from "./FallLeft.png"
import FallSpriteSrc from "./Fall.png"
import IdleLeftSpriteSrc from "./IdleLeft.png"
import IdleSpriteSrc from "./Idle.png"
import RunLeftSpriteSrc from "./RunLeft.png"
import RunSpriteSrc from "./Run.png"
import TakehitLeftSpriteSrc from "./TakehitLeft.png"
import TakehitSpriteSrc from "./Take hit.png"

export const evilwizardAnimations = {
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
        frameRate:8,
        frameBuffer:5,
    },
    idleLeft:{
        src:IdleLeftSpriteSrc,
        frameRate:8,
        frameBuffer:5,
    },
    hurt:{
        src:TakehitSpriteSrc,
        frameRate:3,
        frameBuffer:5,
    },
    hurtLeft:{
        src:TakehitLeftSpriteSrc,
        frameRate:3,
        frameBuffer:5,
    },
    dead:{
        src:DeathSpriteSrc,
        frameRate:7,
        frameBuffer:5,
    },
    deadLeft:{
        src:DeathLeftSpriteSrc,
        frameRate:7,
        frameBuffer:5,
    },
    attack1:{
        src:Attack1SpriteSrc,
        frameRate:8,
        frameBuffer:5,
    },
    attack1Left:{
        src:Attack1LeftSpriteSrc,
        frameRate:8,
        frameBuffer:5,
    },
    attack2:{
        src:Attack2SpriteSrc,
        frameRate:8,
        frameBuffer:5,
    },
    attack2Left:{
        src:Attack2LeftSpriteSrc,
        frameRate:8,
        frameBuffer:5,
    },
    fallLeft:{
        src:FallLeftSpriteSrc,
        frameRate:2,
        frameBuffer:2,
    },
    fallRight:{
        src:FallSpriteSrc,
        frameRate:2,
        frameBuffer:2,
    },
}