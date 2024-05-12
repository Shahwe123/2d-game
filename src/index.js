/*

    index.js: starting point
        - creates necessary variables
        - function animate loops

*/

import { Player } from './Classes/Player'
import { levels } from './levels'

const canvas = document.querySelector('canvas')
const canvasContext = canvas.getContext('2d')

canvas.width = 960
canvas.height = 640

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

function animate() {
    window.requestAnimationFrame(animate)


    map.update({canvasContext})
    // currentMapCollisions.forEach(collision => {
    //     canvasContext.fillStyle = "rgba(255,0,0,0.2)"
    //     canvasContext.fillRect(collision.position.x, collision.position.y, collision.width, collision.height)
    // });
    enemies.forEach(enemy => {
        if (enemy.currentMapKey === map.key) enemy.update({canvasContext, currentMapCollisions, player})
    })


    player.update({canvas, canvasContext, currentMapCollisions, enemies})
    player.velocity.x = 0

    if (player.hitbox.position.x + player.hitbox.width < 0) {
        let changeMapResults = levels[level].changeMap({direction: "left", currentMapKey: map.key, currentPlayerPosition: player.position})
        currentMapCollisions = changeMapResults['collisions']
        map = changeMapResults['newMap']
        map.update({canvasContext})
        player.position.x = changeMapResults['newPlayerPosition'].x
        player.position.y = changeMapResults['newPlayerPosition'].y
        player.update({canvas, canvasContext, currentMapCollisions})
    } else if (player.hitbox.position.x >= canvas.width) {
        let changeMapResults = levels[level].changeMap({direction: "right", currentMapKey: map.key, currentPlayerPosition: player.position})
        currentMapCollisions = changeMapResults['collisions']
        map = changeMapResults['newMap']
        map.update({canvasContext})
        player.position.x = changeMapResults['newPlayerPosition'].x
        player.position.y = changeMapResults['newPlayerPosition'].y
        player.update({canvas, canvasContext, currentMapCollisions})
    } else if (player.hitbox.position.y >= canvas.height) {
        let changeMapResults = levels[level].changeMap({direction: "bottom", currentMapKey: map.key, currentPlayerPosition: player.position})
        currentMapCollisions = changeMapResults['collisions']
        map = changeMapResults['newMap']
        map.update({canvasContext})
        player.position.x = changeMapResults['newPlayerPosition'].x
        player.position.y = changeMapResults['newPlayerPosition'].y
        player.update({canvas, canvasContext, currentMapCollisions})
    } else if (player.hitbox.position.y <= 0) {
        let changeMapResults = levels[level].changeMap({direction: "top", currentMapKey: map.key, currentPlayerPosition: player.position})
        currentMapCollisions = changeMapResults['collisions']
        map = changeMapResults['newMap']
        map.update({canvasContext})
        player.position.x = changeMapResults['newPlayerPosition'].x
        player.position.y = changeMapResults['newPlayerPosition'].y
        player.update({canvas, canvasContext, currentMapCollisions})
    }

    if (keys.z.pressed) {
        player.switchSprite('attack2')
        player.isAttacking = true
    }



    if (keys.d.pressed) {
        player.velocity.x = 5
        player.switchSprite('runRight')
        player.lastDirection = 'right'
    } else if (keys.a.pressed) {
        player.velocity.x = -5
        player.switchSprite('runLeft')
        player.lastDirection = 'left'

    }  else if (player.velocity.y === 0 && !player.isAttacking){
        if (player.lastDirection === 'right'){
            player.switchSprite("idleRight")
        } else {
            player.switchSprite("idleLeft")
        }
    }

    if (player.velocity.y < 0 ) {
        if (player.lastDirection === 'right'){
            player.switchSprite("jump")
        } else {
            player.switchSprite("jumpLeft")
        }
    } else if (player.velocity.y > 0) {
        if (player.lastDirection === 'right'){
            player.switchSprite("fall")
        } else {
            player.switchSprite("fallLeft")
        }
    }
}
let levelInitResults = levels[level].init()
map = levelInitResults['map']
currentMapCollisions = levelInitResults['collisions']
enemies = levelInitResults['enemies']
animate()

window.addEventListener('keydown', (event) => {
    switch (event.key) {
        case "a":
            keys.a.pressed = true
            break;
        case "w":
            if (!player.isDead) player.velocity.y = -15
            break;
        case "d":
            keys.d.pressed = true
            break;
        case "z":
            keys.a.pressed = false
            keys.d.pressed = false
            keys.z.pressed = true
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