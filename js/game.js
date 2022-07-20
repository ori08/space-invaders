'use strict'
const EMPTY = "";
const BOARD_SIZE = 14;


var gBoard;
var gGame = {
    isOn: false,
    aliensCount: 0,
    score: 0
}

var gInterval
var gIntervalAllien;

function createBoard() {

    var board = [];
    for (var i = 0; i < BOARD_SIZE; i++) {
        board.push([]);
        for (var j = 0; j < BOARD_SIZE; j++) {
            board[i][j] = EMPTY
        }
    }
    return board;
}

function init() {
    closeGameOverModal()
    closeWinModal()
    gBoard = createBoard()
    gHero = createHero(gBoard)
    createAlliens(gBoard)
    console.log(gGame.isOn)
    gIntervalAllien = setInterval(moveAlliens, 1000)

    renderBoard(gBoard)

}

function renderBoard(board) {
    var strHtml = ""
    for (var i = 0; i < board.length; i++) {
        strHtml += `<tr>`
        for (var j = 0; j < board[0].length; j++) {

            strHtml += `<td class="cell-${i}-${j}">
             ${board[i][j]}`
        }
        strHtml += `</td ></tr > `
        document.querySelector(`.gameBoard`).innerHTML = strHtml
    }
}

function renderCell(location, value) {
    // Select the elCell and set the value
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

function readKeyboard(ev) {
    switch (ev.code) {

        case 'ArrowLeft': {
            moveHero(ev)
        }
            break;

        case 'ArrowRight': {
            moveHero(ev)
        }
            break;
        case "Space": {
            if (!isLaser) gIntervalLaser = setInterval(shotLaser, LASER_SPEED)
            isLaser = true
        }

            break;
    }
}

function updateScore() {
    gGame.score += 10
    var elScore = document.querySelector(".score")
    elScore.innerText = gGame.score
}


function openGameOverModal() {
    var elModal = document.querySelector(".gameOverModal")
    elModal.style.display = "flex"
    // resetGame()
}

function closeGameOverModal() {
    var elModal = document.querySelector(".gameOverModal")
    elModal.style.display = "none"
}


function closeWinModal() {
    var elModal = document.querySelector(".winModal")
    elModal.style.display = "none"
}


function openWinModal() {
    var elModal = document.querySelector(".winModal")
    elModal.style.display = "flex"

}

function resetGame() {
    gGame = {
        isOn: false,
        aliensCount: 0,
        score: 0
    }
    isHitWall = false
    firstRound = true
    gAliensTopRowIdx = 0
    gAliensBottomRowIdx = 3
    gAlliens = []
    clearInterval(gIntervalLaser)
    clearInterval(gIntervalAllien)
    init()
}

function isWin() {
    console.log(gAlliens.length * 10);
    if (gGame.score === gAlliens.length * 10) alert(win)


}