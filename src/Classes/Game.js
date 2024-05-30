import { levels } from "../levels"
import { BossObjective } from "./Objectives/BossObjective"
import { Player } from "./Player"
import objectivesPng from "../assets/Map/objectives1.png"
import heartPng from "../assets/Map/heart.png"
import deathPng from "../assets/Map/newDeathScreen.png"
import objectivesBtnPng from '../assets/Map/objectivesBtn.png'
import winScreenImg from '../assets/Map/winScreen.png'


/**
 *
 * Class represents the platform game instance
 *
 * @param level - a number detailing what level to render
 */
export class PlatformGame {
    constructor({level}) {
        this.level = level

        // variables representing inital game state
        this.player = new Player({position: {x:0,y:0}})
        let levelInitResults = levels[level].init()
        this.map = levelInitResults['map']
        this.currentMapCollisions = levelInitResults['collisions']
        this.enemies = levelInitResults['enemies']
        this.objectives = levelInitResults['objectives']
        this.noObjectives = this.objectives.length;
        this.startPosition = levelInitResults['startPosition']
        this.player.position.y = this.startPosition.y
        this.player.position.x = this.startPosition.x
        this.collectibles = levelInitResults['coins']
        this.objectivesCompleted = 0
        this.enemiesKilled = 0
        this.bossNotification = false
        this.bossHealth = 0
        this.bossTotalHealth = 0
        this.bossGameInterface = false
        this.trapLaid = false
        this.objectivesLaid = false
        this.bossObjective = new BossObjective()
        this.canvas = document.querySelector('canvas')
        this.canvas.width = 960
        this.canvas.height = 640
        this.canvasContext = this.canvas.getContext('2d')
        this.keys = {
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

        // the two listening listen to key clicks -> player movement
        window.addEventListener('keydown', (event) => {
            if (event.repeat) return
            switch (event.key) {
                case "a":
                    this.keys.a.pressed = true
                    this.player.currentAvatarPosition = this.player.avatarPositionLeft
                    break;
                case "w":
                    if (event.repeat) return
                    if (!this.player.isDead && !this.player.cooldown && this.player.velocity.y === 0 && this.player.stamina >= this.player.jumpStaminaCost) {
                        this.player.velocity.y = -15
                        if (this.player.isInCombat) this.player.stamina -= this.player.jumpStaminaCost
                    }
                    break;
                case "d":
                    this.player.currentAvatarPosition = this.player.avatarPositionRight
                    this.keys.d.pressed = true
                    break;
                case "z":
                    this.keys.a.pressed = false
                    this.keys.d.pressed = false
                    this.player.isAttacking = true
                    this.player.attack({enemies: this.enemies, collectibles:this.collectibles, currentMapKey:this.map.key})
                    break;
                case "s":
                    break;

            }
        })
        window.addEventListener('keyup', (event) => {
            switch (event.key) {
                case "a":
                    this.keys.a.pressed = false
                    break;
                case "d":
                    this.keys.d.pressed = false
                    break;
                case "z":
                    this.keys.z.pressed = false
                    this.player.isAttacking = false
                    break;
                case "s":
                    break;

            }
        })

        // Following variables are html elements
        this.enemiesDeadObjective = document.createElement("li")
        this.coinsCollectedObjective = document.createElement("li")
        this.objectivesElement = document.getElementById("objectives")
        this.objectivesDivElement = document.getElementById("objectivesDiv")
        this.gameInterfaceElement = document.getElementById("gameInterface")
        this.winScreenElement = document.getElementById("winScreen")
        this.deathElement = document.getElementById("death")
        this.gameElement = document.getElementById("game")
        this.respawnBtnElement = document.getElementById("respawnBtn")
        this.heartsDiv = document.getElementById("hearts")

        // Draws player's lives
        for (let i = 0; i < this.player.lives; i++) {

            const heart = document.createElement("img")
            heart.className = "heart"
            heart.src = heartPng
            this.heartsDiv.appendChild(heart)
        }

        // the element which holds the objectives
        this.dropdownObjectiveList = document.createElement("ul")
        this.dropdownObjectiveList.style.position = "absolute"
        this.dropdownObjectiveList.id = "objectivesLists"
        this.dropdownObjectiveList.style.top = "25px"
        this.dropdownObjectiveList.style.left = "20px"

        // the background image for objectiveslist
        this.objectivesBackgroundImg = document.createElement("img")
        this.objectivesBackgroundImg.src = objectivesPng
        this.objectivesBackgroundImg.id = "objectivesImg"

        // button closes or open the objectives panel
        this.objectivesBtn = document.createElement('img')
        this.objectivesBtn.src = objectivesBtnPng
        this.objectivesBtn.id = "objectivesBtn"
        this.objectivesBtn.style.marginLeft = "15px"
        this.objectivesBtn.addEventListener('click', (e) => {
            if (this.objectivesElement.style.display === "block") {
                this.objectivesElement.style.display = "none"
            } else {
                this.objectivesElement.style.display = "block"
            }
        })

        // appends the background img and objectives list to the div
        this.objectivesElement.appendChild(this.objectivesBackgroundImg)
        this.objectivesElement.appendChild(this.dropdownObjectiveList)
        this.objectivesDivElement.insertBefore(
            this.objectivesBtn,
            this.objectivesElement
        )

        // Appends the death alert img
        this.deathAlert = document.createElement('img')
        this.deathAlert.src = deathPng
        this.deathElement.appendChild(this.deathAlert)

        this.bossHealthBar = document.createElement("div")
        this.bossHealthBar.id = "bossHealthBar"

        this.winScreenBackground = document.createElement('img')
        this.winScreenBackground.src = winScreenImg
        this.nextLvlBtn = document.getElementById('nextLvlBtn')
        this.winScreenElement.insertBefore(this.winScreenBackground, this.nextLvlBtn)

        this.update = this.update.bind(this);
    }

    handleObjectives() {

    }

    /**
     *
     * Function runs when player presses the next level button
     *
     */
    handleNextLevelClick = (e) => {

        // resets state variables
        this.gameElement.className = "hide"
        this.bossNotification = false
        this.bossGameInterface = false
        this.trapLaid = false
        this.objectivesLaid = false
        this.objectivesCompleted = 0

        // removes old objectives
        while (this.dropdownObjectiveList.firstChild) {
            this.dropdownObjectiveList.firstChild.remove()
        }

        // initialises next levels variables
        this.level += 1
        let levelInitResults = levels[this.level].init()
        this.map = levelInitResults['map']
        this.currentMapCollisions = levelInitResults['collisions']
        this.enemies = levelInitResults['enemies']
        this.objectives = levelInitResults['objectives']
        this.noObjectives = this.objectives.length;
        this.startPosition = levelInitResults['startPosition']
        this.player.position.x = this.startPosition.x
        this.player.position.y = this.startPosition.y
        this.collectibles = levelInitResults['coins']
        this.bossObjective.goalAchieved = false
        this.bossObjective.objectiveActivated = false

        this.winScreenElement.className = "hide"
        this.gameElement.className = "show"
        this.objectivesDivElement.style.display = "block"
        this.objectivesBtn.style.display = "block"
        this.gameInterfaceElement.removeChild(bossHealthBar)
        this.nextLvlBtn.removeEventListener('click', this.handleNextLevelClick)
    }

    /**
     *
     * Function runs everytime respawn button is clicked
     *
     */
    handleRespawn = (e) => {
        // resets state variables
        this.player.isDead = false
        this.player.currentHealth = this.player.health
        this.player.lives = 3
        this.objectivesCompleted = 0

        // redraws the hearts
        for (let i = 0; i < this.player.lives; i++) {
            const heart = document.createElement("img")
            heart.className = "heart"
            heart.src = heartPng
            this.heartsDiv.appendChild(heart)
        }

        // reinitialises the current levels variables, so player starts again
        let levelInitResults = levels[this.level].init()
        this.map = levelInitResults['map']
        this.currentMapCollisions = levelInitResults['collisions']
        this.enemies = levelInitResults['enemies']
        this.objectives = levelInitResults['objectives']
        this.noObjectives = objectives.length;
        this.startPosition = levelInitResults['startPosition']
        this.player.position.x = this.startPosition.x
        this.player.position.y = this.startPosition.y
        this.collectibles = levelInitResults['coins']
        this.respawnBtnElement.removeEventListener('click', this.handleRespawn)
        this.deathElement.className = "hide"

    }


    update() {
        this.canvasContext.clearRect(0, 0, this.canvas.width, this.canvas.height);

        this.map.update({canvasContext: this.canvasContext})

        // this.currentMapCollisions.forEach(element => {
        //     element.draw({canvasContext: this.canvasContext})
        // });

        this.enemies.forEach(enemy => {
            if (enemy.currentMapKey === this.map.key) {
                // prevents boss enemies from being spawned until the boss objective has activated
                if (enemy.boss && this.bossObjective.objectiveActivated === false) {
                    return
                }
                enemy.update({canvasContext:this.canvasContext, currentMapCollisions: this.currentMapCollisions, player: this.player, collectibles: this.collectibles})

                // Updates the bosses health bar content
                if (((this.level === 1 && this.map.key === "bossMap") || (this.level === 2 && this.map.key === "startBottomMap")) && this.bossObjective.objectiveActivated) {
                    this.bossHealth = enemy.currentHealth
                    this.bossTotalHealth = enemy.health

                    // if boss dies, shows the win screen and an option to move to the next level
                    if (this.bossHealth <= 0) {
                        this.winScreenElement.className = "show"
                        this.winScreenElement.style.display = "block"
                        this.nextLvlBtn.addEventListener('click', this.handleNextLevelClick)

                        if (this.level === 2 ) {
                            this.nextLvlBtn.disabled = true
                        }
                    }
                }
            }
        })

        // Place all this in an handleobjectives function //TODO:
        if (!this.objectivesLaid) {
            this.objectives.forEach(objective => {
                if (objective.type === "enemiesKilled") {
                    this.enemiesDeadObjective.id = "enemiesDead"
                    this.enemiesDeadObjective.style.listStyle = "none"
                    this.enemiesDeadObjective.textContent = "Targets Eliminated: 0 / " + objective.goal
                    this.dropdownObjectiveList.appendChild(this.enemiesDeadObjective)
                } else if (objective.type === "coinsCollected") {
                    this.coinsCollectedObjective.id = "coinsCollected"
                    this.coinsCollectedObjective.style.listStyle = "none"
                    this.coinsCollectedObjective.textContent = "Coins Collected: 0  / " + objective.goal
                    this.dropdownObjectiveList.appendChild(this.coinsCollectedObjective)

                }
            });
            this.objectivesLaid = true
        } else if (this.objectivesCompleted != this.noObjectives) {

            // loop checks the players current progress by checking how much enemies have been killed or coins collected
            // TODO: can improve by only calling when enemies are kiled or coins collceted
            this.objectives.forEach(objective => {
                if (!objective.goalAchieved && objective.type === "enemiesKilled") {
                    this.enemiesDeadObjective.textContent = objective.checkProgess(this.enemies)
                    if (objective.goalAchieved) {
                        this.objectivesCompleted += 1
                    }
                } else if (!objective.goalAchieved && objective.type === "coinsCollected"){
                    this.coinsCollectedObjective.textContent = objective.checkProgess(this.collectibles)
                    if (objective.goalAchieved) {
                        this.objectivesCompleted += 1
                    }
                }
            });
        } else {
            // means all objectives have been achieved, lays trap for level 1
            if (!this.trapLaid) {
                if (this.level === 1 && this.map.key === "startMap") {
                    levels[this.level].layTrap({currentMapCollisions: this.currentMapCollisions, currentMapKey: this.map.key, enemies: this.enemies})
                    this.trapLaid = true
                }

                // shows the objective panel hinting to find the boss
                if (!this.bossNotification) {
                    console.log("boss notificaitons");
                    const li = document.createElement("li")
                    li.textContent = "Find the boss..."
                    this.dropdownObjectiveList.appendChild(li)
                    this.objectivesElement.style.display = "block"

                    this.bossObjective = new BossObjective()
                    this.bossObjective.objectiveActivated = true
                    this.bossNotification = true
                }
            }
        }


        // adds the boss interface only if boss objective has been activated and in the correct map for each respective level
        if ((this.level === 1 && this.map.key === "bossMap" || this.level === 2 && this.map.key === "startBottomMap") && !this.bossGameInterface && this.bossObjective.objectiveActivated) {
            this.objectivesDivElement.style.display = "none"
            this.objectivesBtn.style.display = "none"
            this.bossHealthBar.textContent = this.bossHealth + " / " + this.bossTotalHealth

            this.gameInterfaceElement.appendChild(this.bossHealthBar)
            this.bossGameInterface = true

        }

        // condition in place to update bosses health count when necessary
        if (this.bossGameInterface) {
            this.bossHealthBar.textContent = this.bossHealth + " / " + this.bossTotalHealth
        }

        this.player.update({
            canvas:this.canvas,
            canvasContext: this.canvasContext,
            currentMapCollisions: this.currentMapCollisions,
            enemies: this.enemies,
            collectibles: this.collectibles,
            currentMapKey:this.map.key,
            gameInstance:this
        })

        this.collectibles.forEach(collectible => {
            if (collectible.mapKey === this.map.key && !collectible.isPickedUp) {
                collectible.draw({canvasContext:this.canvasContext})
            }
        });

        if (!this.player.isDead) {
            this.player.velocity.x = 0

            // if the player's position goes out to the left side of the canvas
            // changes map to the left
            if (this.player.hitbox.position.x + this.player.hitbox.width < 0) {
                let changeMapResults = levels[this.level].changeMap({direction: "left", currentMapKey: this.map.key, currentPlayerPosition: this.player.position})
                this.currentMapCollisions = changeMapResults['collisions']
                this.map = changeMapResults['newMap']
                this.map.update({canvasContext: this.canvasContext})
                this.player.position.x = changeMapResults['newPlayerPosition'].x
                this.player.position.y = changeMapResults['newPlayerPosition'].y
                this.player.update({canvas: this.canvas, canvasContext: this.canvasContext, currentMapCollisions: this.collectibles, enemies: this.enemies, collectibles: this.collectibles})
            }
            // if the player's positions goes out of the canvas' right side
            else if (this.player.hitbox.position.x >= this.canvas.width) {
                let changeMapResults = levels[this.level].changeMap({direction: "right", currentMapKey: this.map.key, currentPlayerPosition: this.player.position})
                this.currentMapCollisions = changeMapResults['collisions']
                this.map = changeMapResults['newMap']
                this.map.update({canvasContext: this.canvasContext})
                this.player.position.x = changeMapResults['newPlayerPosition'].x
                this.player.position.y = changeMapResults['newPlayerPosition'].y
                this.player.update({canvas: this.canvas, canvasContext: this.canvasContext, currentMapCollisions: this.collectibles, enemies: this.enemies, collectibles: this.collectibles})
            }
            // if the player's positions goes below the bottom of the canvas
            else if (this.player.hitbox.position.y > this.canvas.height) {
                let changeMapResults = levels[this.level].changeMap({direction: "bottom", currentMapKey: this.map.key, currentPlayerPosition: this.player.position})
                this.currentMapCollisions = changeMapResults['collisions']
                this.map = changeMapResults['newMap']
                this.map.update({canvasContext: this.canvasContext})
                this.player.position.x = changeMapResults['newPlayerPosition'].x
                this.player.position.y = changeMapResults['newPlayerPosition'].y
                this.player.update({canvas: this.canvas, canvasContext: this.canvasContext, currentMapCollisions: this.collectibles, enemies: this.enemies, collectibles: this.collectibles})
            }
            // if the player's positions goes above the top of the canvas
            else if (this.player.hitbox.position.y + this.player.hitbox.height < 0) {
                let changeMapResults = levels[this.level].changeMap({direction: "top", currentMapKey: this.map.key, currentPlayerPosition: this.player.position})
                this.currentMapCollisions = changeMapResults['collisions']
                this.map = changeMapResults['newMap']
                this.map.update({canvasContext: this.canvasContext})
                this.player.position.x = changeMapResults['newPlayerPosition'].x
                this.player.position.y = changeMapResults['newPlayerPosition'].y
                this.player.update({canvas: this.canvas, canvasContext: this.canvasContext, currentMapCollisions: this.collectibles, enemies: this.enemies, collectibles: this.collectibles})
            }

            // z represents if the player is attacking
            if (this.keys.z.pressed) this.player.isAttacking = true

            // player's positions to the right and switches to a run animation
            if (this.keys.d.pressed ) {
                // player.velocity.x = 5
                (this.player.cooldown) ? this.player.velocity.x = 2: this.player.velocity.x = 5
                if (this.player.currentSpriteKey !== "runRight") this.player.switchSprite('runRight')
                this.player.lastDirection = 'right'
            }
            // player's positions to the left and switches to a run animation
            else if (this.keys.a.pressed) {
                // player.velocity.x = -5
                (this.player.cooldown) ? this.player.velocity.x = -2: this.player.velocity.x = -5
                if (this.player.currentSpriteKey !== "runLeft") this.player.switchSprite('runLeft')
                this.player.lastDirection = 'left'

            }
            // if the player is not falling or attacking, animations switch to an idle
            // animation based on which direction they faced last
            else if (this.player.velocity.y === 0 && this.player.isAttacking === false){
                if (this.player.lastDirection === 'right'){
                    if (this.player.currentSpriteKey !== "idleRight") this.player.switchSprite("idleRight")
                } else {
                    if (this.player.currentSpriteKey !== "idleLeft") this.player.switchSprite("idleLeft")
                }
            }

            // handles player jumping with the animation to the left or right
            if (this.player.velocity.y < 0 ) {
                if (this.player.lastDirection === 'right'){
                    if (this.player.currentSpriteKey !== "jump") this.player.switchSprite("jump")
                } else {
                    if (this.player.currentSpriteKey !== "jumpLeft") this.player.switchSprite("jumpLeft")
                }
            }
            // handles player falling
            else if (this.player.velocity.y > 0) {
                if (this.player.lastDirection === 'right'){
                    if (this.player.currentSpriteKey !== "fall") this.player.switchSprite("fall")
                } else {
                    if (this.player.currentSpriteKey !== "fallLeft") this.player.switchSprite("fallLeft")
                }
            }
        }

        requestAnimationFrame(this.update);
    }

    /**
     * Calls the games update method on loop
     */
    runGame() {
        window.requestAnimationFrame(this.update)
    }
}