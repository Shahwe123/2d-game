/*

    index.js: starting point
        - creates necessary variables
        - function animate loops

*/
import "./main.css"
import { Player } from './Classes/Player'
import { levels } from './levels'
import MenuSrc from './assets/Map/Menu.png'
import objectivesPng from "./assets/Map/objectives.png"
import heartPng from "./assets/Map/heart.png"
import SingleBtnPng from "./assets/Map/SingleButton.png"
import deathPng from "./assets/Map/dead.png"
import { noEnemiesDead } from "./utils"
const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

// const image = document.getElementById('menuImg')
// image.src = MenuSrc

canvas.width = 960
canvas.height = 640
// canvas.style.display = "none"

const keys = {
    a: {
        pressed: false
    },
    d: {
        pressed: false
    },
    s: {
        pressed: false
    },
    w: {
        pressed: false
    },
    z:{
        pressed: false
    }
}

let level = 1
const player = new Player({position: {x:10,y:400}})
let map
let currentMapCollisions
let enemies = []
let enemyKillCount = 0
let enemyKillTarget
let collectibles = []
let objectivesCompleted = false
let lives = 3
let isRunning = true
let bossHealth = 0
let bossTotalHealth = 0
let bossGameInterface = false
let trapLaid = false


function animate() {
    window.requestAnimationFrame(animate)

    map.update({canvasContext})

    // currentMapCollisions.forEach(element => {
    //     element.draw({canvasContext})
    // });

    // Calls update for all enemies in the current map and checks and updates the no.of enemies killed
    enemies.forEach(enemy => {
        if (enemy.currentMapKey === map.key) {
            enemy.update({canvasContext, currentMapCollisions, player, collectibles})

            // Updates the current objectives
            if (!objectivesCompleted) {
                enemyKillCount = noEnemiesDead(enemies)
                document.getElementById("enemiesDead").textContent =  "Targets Eliminated: "+ enemyKillCount + " / " + enemyKillTarget
                if (enemyKillCount === enemyKillTarget) {
                    objectivesCompleted = true
                }
            }

            // Removes three collision blocks
            if (objectivesCompleted && !trapLaid) {
                if (map.key === "startMap") {
                    // removea collision blocks with position x 544 576 608
                    currentMapCollisions.splice(41, 3)
                    console.log(currentMapCollisions);
                    trapLaid = true
                }
            }

            // Updates the bosses health bar content
            if (map.key === "bossMap") {
                bossHealth = enemy.currentHealth
                bossTotalHealth = enemy.health
            }
        }
    })

    // if the player has entered the boss battle creates and appends the
    // the health bar the game interface
    if (map.key === "bossMap" && !bossGameInterface) {
        document.getElementById("objectives").style.display = "none"
        bossHealthBar.style.width = "400px"
        bossHealthBar.style.height = "20px"
        bossHealthBar.style.backgroundColor = "red"
        bossHealthBar.style.position = "relative"
        bossHealthBar.style.left = "-28%"
        bossHealthBar.style.textAlign = "center"
        bossHealthBar.style.padding = "5px"
        bossHealthBar.textContent = bossHealth + " / " + bossTotalHealth

        document.getElementById("gameInterface").appendChild(bossHealthBar)
        bossGameInterface = true
    }

    // condition in place to update bosses health count when necessary
    if (bossGameInterface) {
        bossHealthBar.textContent = bossHealth + " / " + bossTotalHealth
    }

    player.update({canvas, canvasContext, currentMapCollisions, enemies, collectibles, currentMapKey:map.key})

    // conditions below checks if player has no more lives, if so, death screen pops up
    // if player still has remaining lives, removes one
    if (lives === 0) {
        document.getElementById("death").style.display = "block"
        //TODO: maybe instead of a small block, a screen fades covering the canvas with a retry button
    }
    if (player.isDead === true && lives > 0) {
        lives -= 1
        heartsDiv.removeChild(heartsDiv.firstChild)
    }
    if (lives > 0 && player.isDead === true ) {
        player.currentHealth = player.health
        player.stamina = player.maxStamina
        player.isDead = false
        player.position = {
            x: player.position.x,
            y: 100
        }
    }

    // draws a collectible if dropped for the current map and is not picked up
    collectibles.forEach(collectible => {
        if (collectible.mapKey === map.key && !collectible.isPickedUp) {
            collectible.draw({canvasContext})
        }
    });


    if (!player.isDead) {
        player.velocity.x = 0

        // if the player's position goes out to the left side of the canvas
        // changes map to the left
        if (player.hitbox.position.x + player.hitbox.width < 0) {
            let changeMapResults = levels[level].changeMap({direction: "left", currentMapKey: map.key, currentPlayerPosition: player.position})
            currentMapCollisions = changeMapResults['collisions']
            map = changeMapResults['newMap']
            map.update({canvasContext})
            player.position.x = changeMapResults['newPlayerPosition'].x
            player.position.y = changeMapResults['newPlayerPosition'].y
            player.update({canvas, canvasContext, currentMapCollisions, enemies, collectibles})
        }
        // if the player's positions goes out of the canvas' right side
        else if (player.hitbox.position.x >= canvas.width) {
            let changeMapResults = levels[level].changeMap({direction: "right", currentMapKey: map.key, currentPlayerPosition: player.position})
            currentMapCollisions = changeMapResults['collisions']
            map = changeMapResults['newMap']
            map.update({canvasContext})
            player.position.x = changeMapResults['newPlayerPosition'].x
            player.position.y = changeMapResults['newPlayerPosition'].y
            player.update({canvas, canvasContext, currentMapCollisions, enemies, collectibles})
        }
        // if the player's positions goes below the bottom of the canvas
        else if (player.hitbox.position.y >= canvas.height) {
            let changeMapResults = levels[level].changeMap({direction: "bottom", currentMapKey: map.key, currentPlayerPosition: player.position})
            currentMapCollisions = changeMapResults['collisions']
            map = changeMapResults['newMap']
            map.update({canvasContext})
            player.position.x = changeMapResults['newPlayerPosition'].x
            player.position.y = changeMapResults['newPlayerPosition'].y
            player.update({canvas, canvasContext, currentMapCollisions, enemies, collectibles})
        }
        // if the player's positions goes above the top of the canvas
        else if (player.hitbox.position.y <= 0) {
            let changeMapResults = levels[level].changeMap({direction: "top", currentMapKey: map.key, currentPlayerPosition: player.position})
            currentMapCollisions = changeMapResults['collisions']
            map = changeMapResults['newMap']
            map.update({canvasContext})
            player.position.x = changeMapResults['newPlayerPosition'].x
            player.position.y = changeMapResults['newPlayerPosition'].y
            player.update({canvas, canvasContext, currentMapCollisions, enemies, collectibles})
        }

        // z represents if the player is attacking
        if (keys.z.pressed) player.isAttacking = true

        // player's positions to the right and switches to a run animation
        if (keys.d.pressed ) {
            // player.velocity.x = 5
            (player.cooldown) ? player.velocity.x = 2: player.velocity.x = 5
            if (player.currentSpriteKey !== "runRight") player.switchSprite('runRight')
            player.lastDirection = 'right'
        }
        // player's positions to the left and switches to a run animation
        else if (keys.a.pressed) {
            // player.velocity.x = -5
            (player.cooldown) ? player.velocity.x = -2: player.velocity.x = -5
            if (player.currentSpriteKey !== "runLeft") player.switchSprite('runLeft')
            player.lastDirection = 'left'

        }
        // if the player is not falling or attacking, animations switch to an idle
        // animation based on which direction they faced last
        else if (player.velocity.y === 0 && player.isAttacking === false){
            if (player.lastDirection === 'right'){
                if (player.currentSpriteKey !== "idleRight") player.switchSprite("idleRight")
            } else {
                if (player.currentSpriteKey !== "idleLeft") player.switchSprite("idleLeft")
            }
        }

        // handles player jumping with the animation to the left or right
        if (player.velocity.y < 0 ) {
            if (player.lastDirection === 'right'){
                if (player.currentSpriteKey !== "jump") player.switchSprite("jump")
            } else {
                if (player.currentSpriteKey !== "jumpLeft") player.switchSprite("jumpLeft")
            }
        }
        // handles player falling
        else if (player.velocity.y > 0) {
            if (player.lastDirection === 'right'){
                if (player.currentSpriteKey !== "fall") player.switchSprite("fall")
            } else {
                if (player.currentSpriteKey !== "fallLeft") player.switchSprite("fallLeft")
            }
        }
    }
}
// initialises the map, enemies and collisions based on the current level , currently used for debugging
let levelInitResults = levels[level].init()
map = levelInitResults['map']
currentMapCollisions = levelInitResults['collisions']
enemies = levelInitResults['enemies']

// displays the players lives based on the lives variable
const heartsDiv = document.getElementById("hearts")
for (let i = 0; i < lives; i++) {

    const heart = document.createElement("img")
    heart.className = "heart"
    heart.src = heartPng
    heartsDiv.appendChild(heart)
}

// stores the objectives the player must fulfill
const dropdownObjectiveList = document.createElement("ul")
// dropdownObjectiveList.style.display = "none"
dropdownObjectiveList.style.position = "absolute"
dropdownObjectiveList.style.top = "45px"
dropdownObjectiveList.style.left = "20px"


// loops the the current levels objective and creates an li and appends the objectslist
// TODO: put into a util fuction to use whne changing levels.
let currentLevelObjectivesList = levels[level].objectives
currentLevelObjectivesList.forEach(objective => {
    const li = document.createElement("li")
    li.id = "enemiesDead"
    enemyKillTarget = objective["eliminateTargets"]
    li.style.listStyle = "none"
    li.textContent = "Targets Eliminated: "+ enemyKillCount + " / " + enemyKillTarget
    dropdownObjectiveList.appendChild(li)
});

// the background image for objectives
const objectivesBackgroundImg = document.createElement("img")
objectivesBackgroundImg.src = objectivesPng
objectivesBackgroundImg.id = "objectivesImg"

// appends the background img and objectives list to the div
document.getElementById("objectives").appendChild(objectivesBackgroundImg)
document.getElementById("objectives").appendChild(dropdownObjectiveList)

// Appends the death alert img
const deathAlert = document.createElement('img')
deathAlert.src = deathPng
document.getElementById("death").appendChild(deathAlert)

const bossHealthBar = document.createElement("div")


animate()

// Handles pressing the single btn in the game menu on click and changed to the levels available
// const singleBtn = document.createElement("img")
// singleBtn.src = SingleBtnPng
// singleBtn.id = "single"
// document.getElementById("menu-btns").appendChild(singleBtn)

// singleBtn.addEventListener('click', (e) => {
//     document.getElementById("menu-btns").style.display = "none"
//     document.getElementById("levels").style.display = "flex"

// })

// // // adds an event listener to each level and if unlocked initialises and draws on the canvas
// // // based on that level. and removes the game menu
// const levelsBtn = document.getElementsByClassName("levelBtn")
// Array.from(levelsBtn).forEach(function (element) {
//     element.addEventListener('click', (e) => {
//         /**
//          * if locked dont do anything
//          */
//         let levelInitResults = levels[e.target.id].init()
//         map = levelInitResults['map']
//         currentMapCollisions = levelInitResults['collisions']
//         enemies = levelInitResults['enemies']
//         animate()
//         document.getElementById("menu").style.display = "none"
//         canvas.style.display = "block"
//         document.getElementById("gameInterface").style.display = "flex"
//     })
// });


window.addEventListener('keydown', (event) => {
    if (event.repeat) return
    switch (event.key) {
        case "a":
            keys.a.pressed = true
            player.currentAvatarPosition = player.avatarPositionLeft
            break;
        case "w":
            if (event.repeat) return
            if (!player.isDead && player.velocity.y === 0) player.velocity.y = -15
            break;
        case "d":
            player.currentAvatarPosition = player.avatarPositionRight
            keys.d.pressed = true
            break;
        case "z":
            keys.a.pressed = false
            keys.d.pressed = false
            player.isAttacking = true
            player.attack({enemies, collectibles, currentMapKey:map.key})
            break;
        case "s":
            break;

    }
})
window.addEventListener('keyup', (event) => {
    switch (event.key) {
        case "a":
            keys.a.pressed = false
            break;
        case "d":
            keys.d.pressed = false
            break;
        case "z":
            keys.z.pressed = false
            player.isAttacking = false
            break;
        case "s":
            break;

    }
})