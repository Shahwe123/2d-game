/*

    index.js: starting point
        - creates necessary variables
        - function animate loops

*/
import "./main.css"
import SingleBtnPng from "./assets/Map/SingleButton.png"
import { PlatformGame } from "./Classes/Game"
import MenuSrc from './assets/Map/Menu.png'
const canvas = document.querySelector('canvas')

const image = document.getElementById('menuImg')
image.src = MenuSrc


// Handles pressing the single btn in the game menu on click and changed to the levels available
const singleBtn = document.createElement("img")
singleBtn.src = SingleBtnPng
singleBtn.id = "single"
document.getElementById("menu-btns").appendChild(singleBtn)
singleBtn.addEventListener('click', (e) => {
    document.getElementById("menu-btns").style.display = "none"
    document.getElementById("levels").style.display = "flex"

})

// Creates a new game instance based on the level pressed
const levelsBtn = document.getElementsByClassName("levelBtn")
Array.from(levelsBtn).forEach(function (element) {
    element.addEventListener('click', (e) => {
        const game = new PlatformGame({level: Number(e.target.id)})

        // removes menu setting and displayer canvas
        document.getElementById("objectivesImg").style.display = 'block'
        document.getElementById("menu").style.display = "none"
        canvas.style.display = "block"
        game.gameInterfaceElement.style.display = "flex"
        game.runGame()
    })
});





