import AttackSpriteSrc from './Attack.png'
import AttackLeftSpriteSrc from './AttackLeft.png'
import DeathSpriteSrc from './Death.png'
import DeathLeftSpriteSrc from './DeathLeft.png'
import FlightSpriteSrc from './Flight.png'
import FlightLeftSpriteSrc from './FlightLeft.png'
import TakeHitSpriteSrc from './Take Hit.png'
import TakeHitLeftSpriteSrc from './TakeHitLeft.png'

export const flyingEyeAnimations = {
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
    flight:{
        src:FlightSpriteSrc,
        frameRate:8,
        frameBuffer:5,
    },
    flightLeft:{
        src:FlightLeftSpriteSrc,
        frameRate:8,
        frameBuffer:5,
    },
    idleLeft:{
        src:FlightLeftSpriteSrc,
        frameRate:8,
        frameBuffer:5,
    },
}