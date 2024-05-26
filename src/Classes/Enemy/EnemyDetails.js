import { evilwizardAnimations } from "../../assets/Enemies/EvilWizard/wizardImageExports";
import { goblinAnimations } from "../../assets/Enemies/Goblin/imageExports";
import { mushroomAnimations } from "../../assets/Enemies/Mushroom/imageExports";
import { skeletonAnimations } from "../../assets/Enemies/Skeleton/imageExports";
import { werewolfAnimations } from "../../assets/Enemies/White Werewolf/werewolfImageExports";

export const enemyDetails = {
    EvilWizard: {
        type: "EvilWizard",
        avatarHeight:95,
        avatarWidth:48,
        avatarPositionRight:{
            x:110,
            y: 70
        },
        avatarPositionLeft:{
            x:110,
            y: 70
        },
        health:300,
        attackPower:35,
        attackAnimationKeys: ["attack1", "attack2"],
        attackAnimationKeysLeft:["attack1Left", "attack2Left"],
        animations:evilwizardAnimations,
    },
    Goblin: {
        type: "Goblin",
        avatarHeight:40,
        avatarWidth:35,
        avatarPositionRight:{
            x:57,
            y: 60
        },
        avatarPositionLeft:{
            x:57,
            y: 60
        },
        health:50,
        attackPower:15,
        attackAnimationKeys: ['attack'],
        attackAnimationKeysLeft:['attackLeft'],
        animations:goblinAnimations,
    },
    Mushroom: {
        type: "Mushroom",
        avatarHeight:40,
        avatarWidth:35,
        avatarPositionRight:{
            x:57,
            y: 60
        },
        avatarPositionLeft:{
            x:57,
            y: 60
        },
        health:100,
        attackPower:35,
        attackAnimationKeys: ['attack'],
        attackAnimationKeysLeft:['attackLeft'],
        animations:mushroomAnimations,
    },
    Skeleton: {
        type: "Skeleton",
        avatarHeight:50,
        avatarWidth:48,
        avatarPositionRight:{
            x:57,
            y: 50
        },
        avatarPositionLeft:{
            x:45,
            y: 50
        },
        health:50,
        attackPower:45,
        attackAnimationKeys: ['attack'],
        attackAnimationKeysLeft:['attackLeft'],
        animations:skeletonAnimations,
    },
    WhiteWerewolf: {
        type: "WhiteWerewolf",
        avatarHeight:72,
        avatarWidth:82,
        avatarPositionRight:{
            x:20,
            y: 55
        },
        avatarPositionLeft:{
            x:20,
            y: 55
        },
        health:350,
        attackPower:50,
        attackAnimationKeys: ["attack1", "attack2", "attack3", "runAttackRight"],
        attackAnimationKeysLeft:["attack1Left", "attack2Left", "attack3Left", "runAttackLeft"],
        animations:werewolfAnimations,
    }
}