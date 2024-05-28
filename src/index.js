/*

    index.js: starting point
        - creates necessary variables
        - function animate loops

*/
import "./main.css"
import { Player } from './Classes/Player'
import { levels } from './levels'
import MenuSrc from './assets/Map/Menu.png'
import objectivesPng from "./assets/Map/objectives1.png"
import heartPng from "./assets/Map/heart.png"
import SingleBtnPng from "./assets/Map/SingleButton.png"
import deathPng from "./assets/Map/newDeathScreen.png"
import objectivesBtnPng from './assets/Map/objectivesBtn.png'
import winScreenImg from './assets/Map/winScreen.png'
import { BossObjective } from "./Classes/Objectives/BossObjective"
const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

const image = document.getElementById('menuImg')
image.src = MenuSrc

canvas.width = 960
canvas.height = 640
canvas.style.display = "none"

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

let level
const player = new Player({position: {x:0,y:0}})
let map
let currentMapCollisions
let enemies = []
let objectives
let noObjectives // number of objectives
let objectivesCompleted = 0
let enemyKillCount = 0
let enemyKillTarget
let collectibles = []
let coins
let startPosition
// let objectivesCompleted = false
let lives = 3
let isRunning = true
let bossNotification = false
let bossHealth = 0
let bossTotalHealth = 0
let bossGameInterface = false
let trapLaid = false
let objectivesLaid = false
let bossObjective = new BossObjective()

const enemiesDeadObjective = document.createElement("li")
const coinsCollectedObjective = document.createElement("li")
const objectivesElement = document.getElementById("objectives")
const objectivesDivElement = document.getElementById("objectivesDiv")
const gameInterfaceElement = document.getElementById("gameInterface")
const winScreenElement = document.getElementById("winScreen")
const deathElement = document.getElementById("death")
const gameElement = document.getElementById("game")
const respawnBtnElement = document.getElementById("respawnBtn")


function animate() {
    window.requestAnimationFrame(animate)

    map.update({canvasContext})

    // currentMapCollisions.forEach(element => {
        // element.draw({canvasContext})
    // });

    // Calls update for all enemies in the current map and checks and updates the no.of enemies killed
    enemies.forEach(enemy => {
        if (enemy.currentMapKey === map.key) {
            if (enemy.boss && bossObjective.objectiveActivated === false) {
                return
            }
            enemy.update({canvasContext, currentMapCollisions, player, collectibles})

            // Updates the bosses health bar content
            if (((level === "1" && map.key === "bossMap") || (level === "2" && map.key === "startBottomMap")) && bossObjective.objectiveActivated) {
                bossHealth = enemy.currentHealth
                bossTotalHealth = enemy.health

                if (bossHealth <= 0) {
                    winScreenElement.className = "show"
                    winScreenElement.style.display = "block"
                    nextLvlBtn.addEventListener('click', handleNextLevelClick)

                    if (level === "2" ) {
                        nextLvlBtn.disabled = true
                    }
                }
            }
        }
    })

    // Place all this in an handleobjectives function //TODO:
    if (!objectivesLaid) {
        objectives.forEach(objective => {
            if (objective.type === "enemiesKilled") {
                // put this code inside createobjectcontent
                // const li = document.createElement("li")
                enemiesDeadObjective.id = "enemiesDead"
                enemiesDeadObjective.style.listStyle = "none"
                enemiesDeadObjective.textContent = "Targets Eliminated: "+ enemyKillCount + " / " + objective.goal
                dropdownObjectiveList.appendChild(enemiesDeadObjective)
            } else if (objective.type === "coinsCollected") {
                // const li = document.createElement("li")
                coinsCollectedObjective.id = "coinsCollected"
                coinsCollectedObjective.style.listStyle = "none"
                coinsCollectedObjective.textContent = "Coins Collected: "+ enemyKillCount + " / " + objective.goal
                dropdownObjectiveList.appendChild(coinsCollectedObjective)

            }
        });
        objectivesLaid = true
    } else if (objectivesCompleted != noObjectives) {
        objectives.forEach(objective => {

            if (!objective.goalAchieved && objective.type === "enemiesKilled") {
                enemiesDeadObjective.textContent = objective.checkProgess(enemies)
                if (objective.goalAchieved) {
                    objectivesCompleted += 1
                }
            } else if (!objective.goalAchieved && objective.type === "coinsCollected"){
                coinsCollectedObjective.textContent = objective.checkProgess(collectibles)
                if (objective.goalAchieved) {
                    objectivesCompleted += 1
                }
            }
        });
    } else {
        // means all objectives have been achieved
        if (!trapLaid) {
            if (level === "1" && map.key === "startMap") {
                levels[level].layTrap({currentMapCollisions, currentMapKey: map.key, enemies})
                trapLaid = true
            }

            if (level === 2) {
            }

            if (!bossNotification) {
                const li = document.createElement("li")
                li.textContent = "Find the boss..."
                dropdownObjectiveList.appendChild(li)
                objectivesElement.style.display = "block"

                bossObjective = new BossObjective()
                bossObjective.objectiveActivated = true
                bossNotification = true
            }
        }
    }

    // if the player has entered the boss battle creates and appends the
    // the health bar the game interface
    if ((level === "1" && map.key === "bossMap" || level === "2" && map.key === "startBottomMap") && !bossGameInterface && bossObjective.objectiveActivated) {
        objectivesDivElement.style.display = "none"
        objectivesBtn.style.display = "none"
        bossHealthBar.textContent = bossHealth + " / " + bossTotalHealth

        gameInterfaceElement.appendChild(bossHealthBar)
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
        deathElement.className = "show"
        deathElement.style.display = "block"
        respawnBtnElement.addEventListener('click', handleRespawn)
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
        else if (player.hitbox.position.y > canvas.height) {
            let changeMapResults = levels[level].changeMap({direction: "bottom", currentMapKey: map.key, currentPlayerPosition: player.position})
            currentMapCollisions = changeMapResults['collisions']
            map = changeMapResults['newMap']
            map.update({canvasContext})
            player.position.x = changeMapResults['newPlayerPosition'].x
            player.position.y = changeMapResults['newPlayerPosition'].y
            player.update({canvas, canvasContext, currentMapCollisions, enemies, collectibles})
        }
        // if the player's positions goes above the top of the canvas
        else if (player.hitbox.position.y + player.hitbox.height < 0) {
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
// level = 2
// let levelInitResults = levels[level].init()
// map = levelInitResults['map']
// currentMapCollisions = levelInitResults['collisions']

// enemies = levelInitResults['enemies']
// objectives = levelInitResults['objectives']
// noObjectives = objectives.length;
// startPosition = levelInitResults['startPosition']
// player.position.x = startPosition.x
// player.position.y = startPosition.y
// collectibles = levelInitResults['coins']

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
dropdownObjectiveList.id = "objectivesLists"
dropdownObjectiveList.style.top = "25px"
dropdownObjectiveList.style.left = "20px"

// the background image for objectives
const objectivesBackgroundImg = document.createElement("img")
objectivesBackgroundImg.src = objectivesPng
objectivesBackgroundImg.id = "objectivesImg"

const objectivesBtn = document.createElement('img')
objectivesBtn.src = objectivesBtnPng
objectivesBtn.id = "objectivesBtn"
objectivesBtn.style.marginLeft = "15px"
objectivesBtn.addEventListener('click', (e) => {
    if (objectivesElement.style.display === "block") {

        objectivesElement.style.display = "none"
    } else {
        objectivesElement.style.display = "block"
    }
})

// appends the background img and objectives list to the div
objectivesElement.appendChild(objectivesBackgroundImg)
objectivesElement.appendChild(dropdownObjectiveList)
objectivesDivElement.insertBefore(
    objectivesBtn,
    objectivesElement
)
// Appends the death alert img
const deathAlert = document.createElement('img')
deathAlert.src = deathPng
deathElement.appendChild(deathAlert)

const bossHealthBar = document.createElement("div")
bossHealthBar.id = "bossHealthBar"

const winScreenBackground = document.createElement('img')
winScreenBackground.src = winScreenImg
const nextLvlBtn = document.getElementById('nextLvlBtn')
winScreenElement.insertBefore(winScreenBackground, nextLvlBtn)



// animate()

// Handles pressing the single btn in the game menu on click and changed to the levels available
const singleBtn = document.createElement("img")
singleBtn.src = SingleBtnPng
singleBtn.id = "single"
document.getElementById("menu-btns").appendChild(singleBtn)
singleBtn.addEventListener('click', (e) => {
    document.getElementById("menu-btns").style.display = "none"
    document.getElementById("levels").style.display = "flex"

})


const levelsBtn = document.getElementsByClassName("levelBtn")
Array.from(levelsBtn).forEach(function (element) {
    element.addEventListener('click', (e) => {
        level = e.target.id

        let levelInitResults = levels[e.target.id].init()
        map = levelInitResults['map']
        currentMapCollisions = levelInitResults['collisions']
        enemies = levelInitResults['enemies']
        objectives = levelInitResults['objectives']
        noObjectives = objectives.length;
        startPosition = levelInitResults['startPosition']
        player.position.x = startPosition.x
        player.position.y = startPosition.y
        collectibles = levelInitResults['coins']

        document.getElementById("objectivesImg").style.display = 'block'
        document.getElementById("menu").style.display = "none"
        canvas.style.display = "block"
        gameInterfaceElement.style.display = "flex"
        animate()
    })
});


window.addEventListener('keydown', (event) => {
    if (event.repeat) return
    switch (event.key) {
        case "a":
            keys.a.pressed = true
            player.currentAvatarPosition = player.avatarPositionLeft
            break;
        case "w":
            if (event.repeat) return
            if (!player.isDead && !player.cooldown && player.velocity.y === 0 && player.stamina >= player.jumpStaminaCost) {
                player.velocity.y = -15
                player.stamina -= player.jumpStaminaCost
            }
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


/**
 *
 * Function runs when player presses the next level button
 *
 */
const handleNextLevelClick = (e) => {

    // resets state variables
    gameElement.className = "hide"
    bossNotification = false
    bossGameInterface = false
    trapLaid = false
    objectivesLaid = false
    objectivesCompleted = 0

    // removes old objectives
    while (dropdownObjectiveList.firstChild) {
        dropdownObjectiveList.firstChild.remove()
    }

    // initialises next levels variables
    level += 1
    levelInitResults = levels[level].init()
    map = levelInitResults['map']
    currentMapCollisions = levelInitResults['collisions']
    enemies = levelInitResults['enemies']
    objectives = levelInitResults['objectives']
    noObjectives = objectives.length;
    startPosition = levelInitResults['startPosition']
    player.position.x = startPosition.x
    player.position.y = startPosition.y
    collectibles = levelInitResults['coins']
    bossObjective.goalAchieved = false
    bossObjective.objectiveActivated = false

    winScreenElement.className = "hide"
    setTimeout(function() {
        winScreenElement.style.display = "none"
        gameElement.className = "show"
    }, 700)
    objectivesDivElement.style.display = "block"
    objectivesBtn.style.display = "block"
    gameInterfaceElement.removeChild(bossHealthBar)
    nextLvlBtn.removeEventListener('click', handleNextLevelClick)
}


/**
 *
 * Function runs everytime respawn button is clicked
 *
 */
const handleRespawn = (e) => {
    // resets state variables
    player.isDead = false
    player.currentHealth = player.health
    lives = 3
    objectivesCompleted = 0
    for (let i = 0; i < lives; i++) {
        const heart = document.createElement("img")
        heart.className = "heart"
        heart.src = heartPng
        heartsDiv.appendChild(heart)
    }

    // reinitialises the current levels variables
    levelInitResults = levels[level].init()
    map = levelInitResults['map']
    currentMapCollisions = levelInitResults['collisions']
    enemies = levelInitResults['enemies']
    objectives = levelInitResults['objectives']
    noObjectives = objectives.length;
    startPosition = levelInitResults['startPosition']
    player.position.x = startPosition.x
    player.position.y = startPosition.y
    collectibles = levelInitResults['coins']
    respawnBtnElement.removeEventListener('click', handleRespawn)
    deathElement.className = "hide"
    setTimeout(function() {
        deathElement.style.display = "none"
    }, 700)
}

let docTitle = document.title
window.addEventListener('blur', (e) => {
    document.title = "Come back 😔"
})
window.addEventListener('focus', (e) => {
    document.title = docTitle
})
