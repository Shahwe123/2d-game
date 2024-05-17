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
const player = new Player({position: {x:0,y:400}})
let map
let currentMapCollisions
let enemies = []
let enemyKillCount = 0
let enemyKillTarget
let collectibles = []
let lives = 3
let isRunning = true

function animate() {
    window.requestAnimationFrame(animate)


    map.update({canvasContext})
    enemies.forEach(enemy => {
        if (enemy.currentMapKey === map.key) {
            enemy.update({canvasContext, currentMapCollisions, player, collectibles})
            // TODO: only run if enemy dies
            enemyKillCount = noEnemiesDead(enemies)
            document.getElementById("enemiesDead").textContent =  "Targets Eliminated: "+ enemyKillCount + " / " + enemyKillTarget
        }
    })

    player.update({canvas, canvasContext, currentMapCollisions, enemies, collectibles, currentMapKey:map.key})

    if (lives === 0) {
        document.getElementById("death").style.display = "block"
    }
    if (player.isDead === true && lives > 0) {
        lives -= 1
        heartsDiv.removeChild(heartsDiv.firstChild)
    }
    if (lives > 0 && player.isDead === true ) {
        player.currentHealth = player.health
        player.isDead = false
        player.position = {
            x: player.position.x,
            y: 100
        }
    }

    collectibles.forEach(collectible => {
        if (collectible.mapKey === map.key && !collectible.isPickedUp) {
            collectible.draw({canvasContext})
        }
    });
    if (!player.isDead) {
        player.velocity.x = 0

        if (player.hitbox.position.x + player.hitbox.width < 0) {
            let changeMapResults = levels[level].changeMap({direction: "left", currentMapKey: map.key, currentPlayerPosition: player.position})
            currentMapCollisions = changeMapResults['collisions']
            map = changeMapResults['newMap']
            map.update({canvasContext})
            player.position.x = changeMapResults['newPlayerPosition'].x
            player.position.y = changeMapResults['newPlayerPosition'].y
            player.update({canvas, canvasContext, currentMapCollisions, enemies, collectibles})
        } else if (player.hitbox.position.x >= canvas.width) {
            let changeMapResults = levels[level].changeMap({direction: "right", currentMapKey: map.key, currentPlayerPosition: player.position})
            currentMapCollisions = changeMapResults['collisions']
            map = changeMapResults['newMap']
            map.update({canvasContext})
            player.position.x = changeMapResults['newPlayerPosition'].x
            player.position.y = changeMapResults['newPlayerPosition'].y
            player.update({canvas, canvasContext, currentMapCollisions, enemies, collectibles})
        } else if (player.hitbox.position.y >= canvas.height) {
            let changeMapResults = levels[level].changeMap({direction: "bottom", currentMapKey: map.key, currentPlayerPosition: player.position})
            currentMapCollisions = changeMapResults['collisions']
            map = changeMapResults['newMap']
            map.update({canvasContext})
            player.position.x = changeMapResults['newPlayerPosition'].x
            player.position.y = changeMapResults['newPlayerPosition'].y
            player.update({canvas, canvasContext, currentMapCollisions, enemies, collectibles})
        } else if (player.hitbox.position.y <= 0) {
            let changeMapResults = levels[level].changeMap({direction: "top", currentMapKey: map.key, currentPlayerPosition: player.position})
            currentMapCollisions = changeMapResults['collisions']
            map = changeMapResults['newMap']
            map.update({canvasContext})
            player.position.x = changeMapResults['newPlayerPosition'].x
            player.position.y = changeMapResults['newPlayerPosition'].y
            player.update({canvas, canvasContext, currentMapCollisions, enemies, collectibles})
        }

        if (keys.z.pressed) {
            player.isAttacking = true}

        if (keys.d.pressed ) {
            player.velocity.x = 5
            if (player.currentSpriteKey !== "runRight") player.switchSprite('runRight')
            player.lastDirection = 'right'
        } else if (keys.a.pressed) {
            player.velocity.x = -5
            if (player.currentSpriteKey !== "runLeft") player.switchSprite('runLeft')
            player.lastDirection = 'left'

        }  else if (player.velocity.y === 0 && player.isAttacking === false){
            if (player.lastDirection === 'right'){
                if (player.currentSpriteKey !== "idleRight") player.switchSprite("idleRight")
            } else {
                if (player.currentSpriteKey !== "idleLeft") player.switchSprite("idleLeft")
            }
        }

        if (player.velocity.y < 0 ) {
            if (player.lastDirection === 'right'){
                if (player.currentSpriteKey !== "jump") player.switchSprite("jump")
            } else {
                if (player.currentSpriteKey !== "jumpLeft") player.switchSprite("jumpLeft")
            }
        } else if (player.velocity.y > 0) {
            if (player.lastDirection === 'right'){
                if (player.currentSpriteKey !== "fall") player.switchSprite("fall")
            } else {
                if (player.currentSpriteKey !== "fallLeft") player.switchSprite("fallLeft")
            }
        }
    }
}
let levelInitResults = levels[level].init()
map = levelInitResults['map']
currentMapCollisions = levelInitResults['collisions']
enemies = levelInitResults['enemies']

const heartsDiv = document.getElementById("hearts")
for (let i = 0; i < lives; i++) {

    const heart = document.createElement("img")
    heart.className = "heart"
    heart.src = heartPng
    heartsDiv.appendChild(heart)
}

const dropdownObjectiveList = document.createElement("ul")
// dropdownObjectiveList.style.display = "none"
dropdownObjectiveList.style.position = "absolute"
dropdownObjectiveList.style.top = "45px"
dropdownObjectiveList.style.left = "20px"


let currentLevelObjectivesList = levels[level].objectives
currentLevelObjectivesList.forEach(objective => {
    const li = document.createElement("li")
    li.id = "enemiesDead"
    enemyKillTarget = objective["eliminateTargets"]
    li.style.listStyle = "none"
    li.textContent = "Targets Eliminated: "+ enemyKillCount + " / " + enemyKillTarget
    dropdownObjectiveList.appendChild(li)
});

const gameInterface = document.getElementById("gameInterface")
gameInterface.appendChild(dropdownObjectiveList)

// let objectivesMenuOpen = false
const objectivesBackgroundImg = document.createElement("img")
objectivesBackgroundImg.src = objectivesPng
objectivesBackgroundImg.id = "objectivesImg"

// let objectivesBtn = document.getElementById("objectivesBtn")
document.getElementById("objectives").appendChild(objectivesBackgroundImg)
document.getElementById("objectives").appendChild(dropdownObjectiveList)

const deathAlert = document.createElement('img')
deathAlert.src = deathPng
document.getElementById("death").appendChild(deathAlert)



// objectivesBtn.addEventListener('click', (e) => {
//     if (objectivesMenuOpen === false) {
//         objectivesMenuOpen = true
//         objectivesBackgroundImg.style.display = "block"
//         dropdownObjectiveList.style.display = "block"

//     } else {
//         objectivesMenuOpen = false
//         objectivesBackgroundImg.style.display = "none"
//         dropdownObjectiveList.style.display = "none"
//     }
// })
animate()


// const singleBtn = document.createElement("img")
// singleBtn.src = SingleBtnPng
// singleBtn.id = "single"
// document.getElementById("menu-btns").appendChild(singleBtn)

// singleBtn.addEventListener('click', (e) => {
//     document.getElementById("menu-btns").style.display = "none"
//     document.getElementById("levels").style.display = "flex"

// })

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
//         // document.getElementById("objectivesBtn").style.display = "block"
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
            player.switchSprite('attack2')
            break;
        case "s":
            break;

    }
})