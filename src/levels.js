import { collisions } from "./CollisionData"
import { Background } from "./Classes/Background"

import lvl1StartMapSrc from './assets/Map/LevelOne/Lvl1MainMap.png'
import lvl1LeftMapSrc from './assets/Map/LevelOne/Lvl1LeftMap.png'
import lvl1RightMapSrc from './assets/Map/LevelOne/Lvl1RightMap.png'
import lvl1BossMapSrc from './assets/Map/LevelOne/Lvl1BottomMap.png'

import Lvl2StartMapSrc from './assets/Map/LevelTwo/Lvl2StartMap.png'
import Lvl2StartBottomMapSrc from './assets/Map/LevelTwo/Lvl2StartBottomMap.png'
import Lvl2LeftMapSrc from './assets/Map/LevelTwo/Lvl2LeftMap.png'
import Lvl2RightMapSrc from './assets/Map/LevelTwo/Lvl2RightMap.png'
import Lvl2StartTopMapSrc from './assets/Map/LevelTwo/Lvl2StartTopMap.png'
import Lvl2LeftTopMapSrc from './assets/Map/LevelTwo/Lvl2LeftTopMap.png'
import Lvl2LeftBottomMapSrc from './assets/Map/LevelTwo/Lvl2LeftBottomMap.png'
import Lvl2RightBottomMapSrc from './assets/Map/LevelTwo/Lvl2RightBottomMap.png'
import Lvl2RightTopMapSrc from './assets/Map/LevelTwo/Lvl2RightTopMap.png'

import { WhiteWerewolf } from "./Classes/Enemy/WhiteWerewolf"
import { Skeleton } from "./Classes/Enemy/Skeleton"
import { Goblin } from "./Classes/Enemy/Goblin"
import { Cthulu } from "./Classes/Enemy/Cthulu"
import { EvilWizard } from "./Classes/Enemy/EvilWizard"
import { ItemsCollected } from "./Classes/Objectives/ItemsCollected"
import { EnemiesKilled } from "./Classes/Objectives/EnemiesKilled"
import { Mushroom } from "./Classes/Enemy/Mushroom"

/**
 * Defines a levels map structures.
 *  - Which map should be displayed if the player reaches the far left, right,top, or bottom of a map
 *  - Collision Blocks preventing player from going out of bounds
 *  - Enemies for each map
 */
const levelOneMapStructure = {
    startMap:{
        src: lvl1StartMapSrc,
        left: "leftMap",
        right: "rightMap",
        bottom: "bossMap",
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
                    x:650,
                    y:440
                },
                roamingPosition: {
                    leftX: 600.99,
                    rightX: 700.99,
                }
            }
        ]
    },
    bossMap:{
        src:lvl1BossMapSrc,
        left: "bottomLeftMap",
        right: "bottomRightMap",
        bottom:"" ,
        top:"startMap",
        collisionBlocksArray: collisions.lvl1BossMapCollisions,
        newPlayerPositionRight: {
            x:40,
            y:40
        },
        newPlayerPositionLeft: {
            x:40,
            y:40
        },
        enemies: [{
            type: "Cthulu",
            position: {
                x:280,
                y:340
            },
            roamingPosition: {
                leftX: 600.99,
                rightX: 700.99,
            }
        }]
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

const levelTwoMapStructure = {
    startMap : {
        src: Lvl2StartMapSrc,
        left: "leftMap",
        right: "rightMap",
        bottom: "startBottomMap",
        top:"StartTopMap",
        collisionBlocksArray: collisions.lvl2StartMapCollision,
        newPlayerPositionRight: {
            x:860,
            y:310
        },
        newPlayerPositionLeft: {
            x:10,
            y:400
        },
        enemies: [
            {
                type: "Mushroom",
                position: {
                    x:411,
                    y:135
                },
                roamingPosition: {
                    leftX: 251,
                    rightX: 581,
                }
            }
        ]

    },
    rightMap : {
        src: Lvl2RightMapSrc,
        left: "startMap",
        right: "0",
        bottom: "rightBottomMap",
        top:"rightTopMap",
        collisionBlocksArray: collisions.lvl2RightMapCollisions,
        newPlayerPositionRight: {
            x:0,
            y:0
        },
        newPlayerPositionLeft: {
            x:10,
            y:310
        },
        enemies: [
            {
                type: "Skeleton",
                position: {
                    x:8,
                    y:486
                },
                roamingPosition: false
            },
            {
                type: "EvilWizard",
                position: {
                    x:536,
                    y:39
                },
                roamingPosition: false
            },
    ]

    },
    leftMap:{
        src: Lvl2LeftMapSrc,
        left: "",
        right: "startMap",
        bottom:"leftBottomMap",
        top:"leftTopMap",
        collisionBlocksArray: collisions.lvl2LeftMapCollisions,
        newPlayerPositionRight: {
            x:800,
            y:400
        },
        newPlayerPositionLeft: {
            x:0,
            y:0
        },
        enemies: []
    },
    StartTopMap:{
        src: Lvl2StartTopMapSrc,
        left: "leftTopMap",
        right: "rightTopMap",
        bottom:"startMap",
        top:"",
        collisionBlocksArray: collisions.lvl2StartTopMapCollisions,
        newPlayerPositionRight: {
            x:800,
            y:400
        },
        newPlayerPositionLeft: {
            x:1,
            y:450
        },
        enemies: []
    },
    leftTopMap:{
        src: Lvl2LeftTopMapSrc,
        left: "",
        right: "StartTopMap",
        bottom:"leftMap",
        top:"",
        collisionBlocksArray: collisions.lvl2LeftTopMapCollisions,
        newPlayerPositionRight: {
            x:800,
            y:400
        },
        newPlayerPositionLeft: {
            x:0,
            y:0
        },
        enemies: []
    },
    leftBottomMap:{
        src: Lvl2LeftBottomMapSrc,
        left: "",
        right: "startBottomMap",
        bottom:"",
        top:"leftMap",
        collisionBlocksArray: collisions.lvl2LeftBottomMapCollisions,
        newPlayerPositionRight: {
            x:800,
            y:400
        },
        newPlayerPositionLeft: {
            x:0,
            y:0
        },
        enemies: []
    },
    startBottomMap:{
        src: Lvl2StartBottomMapSrc,
        left: "leftBottomMap",
        right: "rightBottomMap",
        bottom:"",
        top:"startMap",
        collisionBlocksArray: collisions.lvl2StartBottomMapCollisions,
        newPlayerPositionRight: {
            x:800,
            y:400
        },
        newPlayerPositionLeft: {
            x:0,
            y:0
        },
        enemies: []
    },
    rightBottomMap:{
        src: Lvl2RightBottomMapSrc,
        left: "startBottomMap",
        right: "",
        bottom:"",
        top:"rightMap",
        collisionBlocksArray: collisions.lvl2RightBottomMapCollisions,
        newPlayerPositionRight: {
            x:800,
            y:400
        },
        newPlayerPositionLeft: {
            x:0,
            y:0
        },
        enemies: []
    },
    rightTopMap:{
        src: Lvl2RightTopMapSrc,
        left: "StartTopMap",
        right: "",
        bottom:"rightMap",
        top:"",
        collisionBlocksArray: collisions.lvl2RightTopMapCollisions,
        newPlayerPositionRight: {
            x:800,
            y:400
        },
        newPlayerPositionLeft: {
            x:0,
            y:0
        },
        enemies: []
    },
}


/**
 * Contains the relevant data for each level
 */
export let levels = {
    1:{
        /**
         * Returns data on the first level
         *
         * @returns returns an object {collisions, map, enemies}
         */
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

            let objectives = createObjectives({"enemiesKilled": {count: 5}})

            return {
                collisions: levelOneMapStructure.startMap.collisionBlocksArray,
                map: background,
                enemies,
                objectives,
                startPosition: {x:10, y:400}
            }
        },
        /**
         *
         * Changes the map instance depending on direction
         *
         * @param {direction} param0 - changes the map based on this direction
         * @param {currentMapKey} param1 - the new map is decided based on the left,right,top,bottom of the current map
         * @param {currentPlayerPosition} param2 - used to maintain the player's y position if jumping or falling
         * @returns returns an object {collisions, newMap, newPlayerPosition}
         */
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
                newPlayerPosition.x = currentPlayerPosition.x
                newPlayerPosition.y = 0
            } else if (direction === "top"){
                newKey = levelOneMapStructure[currentMapKey].top
                newPlayerPosition.x = currentPlayerPosition.x
                newPlayerPosition.y = 640
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
    },
    2:{
        /**
         * Returns data on the first level
         *
         * @returns returns an object {collisions, map, enemies}
         */
        init: () => {

            // Create a background
            const background = new Background({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: levelTwoMapStructure.startMap.src,
                key:"startMap",
            })

            let enemies = createEnemies({levelStructure: levelTwoMapStructure})

            let objectives = createObjectives({"enemiesKilled": {count: 5}})

            return {
                collisions: levelTwoMapStructure.startMap.collisionBlocksArray,
                map: background,
                enemies,
                objectives,
                startPosition: {x:15, y:400}
            }
        },
        /**
         *
         * Changes the map instance depending on direction
         *
         * @param {direction} param0 - changes the map based on this direction
         * @param {currentMapKey} param1 - the new map is decided based on the left,right,top,bottom of the current map
         * @param {currentPlayerPosition} param2 - used to maintain the player's y position if jumping or falling
         * @returns returns an object {collisions, newMap, newPlayerPosition}
         */
        changeMap: ({direction, currentMapKey, currentPlayerPosition}) => {
            let newKey
            let newPlayerPosition = {
                x:0,
                y:currentPlayerPosition.y
            }
            if (direction === "left"){
                newKey = levelTwoMapStructure[currentMapKey].left
                newPlayerPosition.x = levelTwoMapStructure[newKey].newPlayerPositionRight.x
            } else if (direction === "right"){
                newKey = levelTwoMapStructure[currentMapKey].right
                newPlayerPosition.x = levelTwoMapStructure[newKey].newPlayerPositionLeft.x
            } else if (direction === "bottom"){
                newKey = levelTwoMapStructure[currentMapKey].bottom
                newPlayerPosition.x = currentPlayerPosition.x
                newPlayerPosition.y = 0
            } else if (direction === "top"){
                newKey = levelTwoMapStructure[currentMapKey].top
                newPlayerPosition.x = currentPlayerPosition.x
                newPlayerPosition.y = 560
            }
            const newMap = new Background({
                position: {
                    x: 0,
                    y: 0
                },
                imageSrc: levelTwoMapStructure[newKey].src,
                key:newKey,
            })

            return {
                collisions: levelTwoMapStructure[newKey].collisionBlocksArray,
                newMap,
                newPlayerPosition,
            }
        },
        locked: false,
        objectives:[{
            eliminateTargets: 5,
            achieved: false
        }]
    },
}

/**
 * Creates an array of enemy instances for the current level
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
            } else if (enemy.type === "Cthulu") {
                enemies.push(new Cthulu({position: enemy.position, currentMapKey: key, roamingPosition: enemy.roamingPosition}))
            } else if (enemy.type === "EvilWizard") {
                enemies.push(new EvilWizard({position: enemy.position, currentMapKey: key, roamingPosition: enemy.roamingPosition}))
            } else if (enemy.type === "Mushroom") {
                enemies.push(new Mushroom({position: enemy.position, currentMapKey: key, roamingPosition: enemy.roamingPosition}))
            }
        });
    }
    return enemies
}

function createObjectives(objectivesTypes) {
    let objectives = []
    for (const key in objectivesTypes) {
        if (key === "enemiesKilled") {
            objectives.push(new EnemiesKilled({noEnemiesToKill: objectivesTypes[key].count}))
        } else if (key === "itemsCollected") {
            objectives.push(new ItemsCollected({noItemsToCollect: objectivesTypes[key].count}))
        }
    }
    return objectives
}
