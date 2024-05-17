import { collisions } from "./CollisionData"
import { Background } from "./Classes/Background"

import lvl1StartMapSrc from './assets/Map/LevelOne/Lvl1MainMap.png'
import lvl1LeftMapSrc from './assets/Map/LevelOne/Lvl1LeftMap.png'
import lvl1RightMapSrc from './assets/Map/LevelOne/Lvl1RightMap.png'
import lvl1BottomMapSrc from './assets/Map/LevelOne/Lvl1BottomMap.png'
import { WhiteWerewolf } from "./Classes/Enemy/WhiteWerewolf"
import { Skeleton } from "./Classes/Enemy/Skeleton"
import { Goblin } from "./Classes/Enemy/Goblin"

const levelOneMapStructure = {
    startMap:{
        src: lvl1StartMapSrc,
        left: "leftMap",
        right: "rightMap",
        bottom: "bottomMap",
        top:"",
        collisionBlocksArray: collisions.lvl1StartMapCollisions,
        newPlayerPositionRight: {
            x:700,
            y:440
        },
        newPlayerPositionLeft: {
            x:10,
            y:400
        },
        enemies: [
            {
                type: "Skeleton",
                position: {
                    x:775,
                    y:180
                },
                roamingPosition: {
                    leftX: 688,
                    rightX: 878,
                }
            },
            {
                type: "Skeleton",
                position: {
                    x:100,
                    y:350
                },
                roamingPosition: {
                    leftX: 60,
                    rightX: 238,
                }
            },
        ]

    },
    leftMap:{
        src: lvl1LeftMapSrc,
        left: "",
        right: "startMap",
        bottom:"bottomLeftMap",
        top:"",
        collisionBlocksArray: collisions.lvl1LeftMapCollisions,
        newPlayerPositionRight: {
            x:800,
            y:400
        },
        newPlayerPositionLeft: {
            x:0,
            y:0
        },
        enemies: [
        {
            type: "Goblin",
            position: {
                x:200,
                y:500
            },
            roamingPosition: {
                leftX: 100,
                rightX: 400,
            }
        },
        {
            type: "Goblin",
            position: {
                x:300,
                y:500
            },
            roamingPosition: {
                leftX: 100,
                rightX: 400,
            }
        },
    ]

    },
    rightMap:{
        src:lvl1RightMapSrc,
        left: "startMap",
        right: "",
        bottom:"bottomRightMap",
        top:"",
        collisionBlocksArray: collisions.lvl1RightMapCollisions,
        newPlayerPositionRight: {
            x:0,
            y:0
        },
        newPlayerPositionLeft: {
            x:10,
            y:440
        },
        enemies: [
            {
                type: "WhiteWerewolf",
                position: {
                    x:690,
                    y:440
                },
                roamingPosition: {
                    leftX: 600.99,
                    rightX: 700.99,
                }
            }
        ]
    },
    bottomMap:{
        src:lvl1BottomMapSrc,
        left: "bottomLeftMap",
        right: "bottomRightMap",
        bottom:"" ,
        top:"startMap",
        collisionBlocksArray: collisions.lvl1BottomMapCollisions,
        newPlayerPositionRight: {
            x:0,
            y:0
        },
        newPlayerPositionLeft: {
            x:0,
            y:0
        },
        enemies: []
    },
    bottomRightMap:{
        src:"",
        left: "bottomMap",
        right: "",
        bottom:"" ,
        top:"rightMap",
        collisionBlocksArray: collisions.lvl1LeftMapCollisions,
        newPlayerPositionRight: {
            x:0,
            y:0
        },
        newPlayerPositionLeft: {
            x:0,
            y:0
        },
        enemies: []
    },
    bottomLeftMap:{
        src:"",
        left: "",
        right: "bottomMap",
        bottom:"" ,
        top:"leftMap",
        collisionBlocksArray: collisions.lvl1LeftMapCollisions,
        newPlayerPositionRight: {
            x:0,
            y:0
        },
        newPlayerPositionLeft: {
            x:0,
            y:0
        },
        enemies: []
    }

}

export let levels = {
    1:{
        init: () => {

            // Create a background
            const background = new Background({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: levelOneMapStructure.startMap.src,
                key:"startMap",
            })

            let enemies = createEnemies({levelStructure: levelOneMapStructure})

            return {
                collisions: levelOneMapStructure.startMap.collisionBlocksArray,
                map: background,
                enemies
            }
        },
        changeMap: ({direction, currentMapKey, currentPlayerPosition}) => {
            let newKey
            let newPlayerPosition = {
                x:0,
                y:currentPlayerPosition.y
            }
            if (direction === "left"){
                newKey = levelOneMapStructure[currentMapKey].left
                newPlayerPosition.x = levelOneMapStructure[newKey].newPlayerPositionRight.x
            } else if (direction === "right"){
                newKey = levelOneMapStructure[currentMapKey].right
                newPlayerPosition.x = levelOneMapStructure[newKey].newPlayerPositionLeft.x
            } else if (direction === "bottom"){
                newKey = levelOneMapStructure[currentMapKey].bottom
                newPlayerPosition.x = levelOneMapStructure[newKey].newPlayerPositionLeft.x
                newPlayerPosition.y = 0
            } else if (direction === "top"){
                newKey = levelOneMapStructure[currentMapKey].top
                newPlayerPosition.x = levelOneMapStructure[newKey].newPlayerPositionLeft.x
                newPlayerPosition.y = levelOneMapStructure[newKey].newPlayerPositionLeft.y
            }
            const newMap = new Background({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: levelOneMapStructure[newKey].src,
                key:newKey,
            })

            return {
                collisions: levelOneMapStructure[newKey].collisionBlocksArray,
                newMap,
                newPlayerPosition,
            }
        },
        locked: false,
        objectives:[{
            eliminateTargets: 5,
            achieved: false
        }]
    }
}

/**
 * Creates an array of enemy instances
 *
 * @param   levelStructure - contains background data (collisions, enemies)
 * @returns enemies - array of enemies for that whole level
 */
function createEnemies({levelStructure}) {
    let enemies = []
    for (const key in levelStructure) {
        levelStructure[key].enemies.forEach(enemy => {
            if (enemy.type === 'WhiteWerewolf') {
                enemies.push(new WhiteWerewolf({position: enemy.position, currentMapKey: key, roamingPosition: enemy.roamingPosition}))
            }  else if (enemy.type === "Skeleton") {
                enemies.push(new Skeleton({position: enemy.position, currentMapKey: key, roamingPosition: enemy.roamingPosition}))
            } else if (enemy.type === "Goblin") {
                enemies.push(new Goblin({position: enemy.position, currentMapKey: key, roamingPosition: enemy.roamingPosition}))
            }
        });
    }
    return enemies
}
