import AttackSpriteSrc from "./Attack.png"
import AttackLeftSpriteSrc from "./AttackLeft.png"
import DeathSpriteSrc from "./Death.png"
import DeathLeftSpriteSrc from "./DeathLeft.png"
import IdleSpriteSrc from "./Idle.png"
import IdleLeftSpriteSrc from "./IdleLeft.png"
import TakeHitSpriteSrc from "./Take Hit.png"
import TakeHitLeftSpriteSrc from "./TakeHitLeft.png"
import WalkSpriteSrc from "./Walk.png"
import WalkLeftSpriteSrc from "./WalkLeft.png"

export const skeletonAnimations = {
    walkRight: {
        src:WalkSpriteSrc,
        frameRate:4,
        frameBuffer: 5,
    },
    walkLeft: {
        src: WalkLeftSpriteSrc,
        frameRate:4,
        frameBuffer: 5,
    },
    idleRight: {
        src: IdleSpriteSrc,
        frameRate:4,
        frameBuffer: 5,
    },
    idleLeft: {
        src: IdleLeftSpriteSrc,
        frameRate:4,
        frameBuffer: 5,
    },
    hurt: {
        src:TakeHitSpriteSrc,
        frameRate:4,
        frameBuffer: 5,
    },
    hurtLeft: {
        src: TakeHitLeftSpriteSrc,
        frameRate:4,
        frameBuffer: 5,
    },
    dead: {
        src:DeathSpriteSrc,
        frameRate:4,
        frameBuffer: 5,
    },
    deadLeft: {
        src:DeathLeftSpriteSrc,
        frameRate:4,
        frameBuffer: 5,
    },
    attack: {
        src:AttackSpriteSrc,
        frameRate: 8,
        frameBuffer: 6,
    },
    attackLeft: {
        src:AttackLeftSpriteSrc,
        frameRate: 8,
        frameBuffer: 6,
    },
}