'use strict'
const ALIEN = '👽';
const ALIENS_ROW_LENGTH = 8
const ALIENS_ROW_COUNT = 3
var gAliensTopRowIdx = 0
var gAliensBottomRowIdx = 3;


var firstRound = true



var gAlliens = []

var gIdx = 0

var isHitWall = false


function createAlliens(board) {
    for (var i = 0; i < ALIENS_ROW_COUNT; i++) {

        for (var j = BOARD_SIZE - 1; j >= BOARD_SIZE - ALIENS_ROW_LENGTH; j--) {

            var allien = {
                pos: { i: i, j: j },
            }
            board[i][j] = ALIEN
            gAlliens.push(allien)

        }
    }

}

function moveAlliens() {
    if (gGame.isOn) return

    var lastAllien = 0
    var firstAllien = Infinity

    // find the first and last allign in the y index
    for (var i = 0; i < gAlliens.length; i++) {
        if (gAlliens[i].pos.j < firstAllien) firstAllien = gAlliens[i].pos.j
        if (gAlliens[i].pos.j > lastAllien) lastAllien = gAlliens[i].pos.j
    }

    if (firstAllien === 0) {

        isHitWall = true
        gAliensTopRowIdx++
        gAliensBottomRowIdx++
        shiftBoardDown(gBoard, firstAllien, lastAllien)
    }
    if (lastAllien === BOARD_SIZE - 1 && !firstRound) {

        isHitWall = false
        gAliensTopRowIdx++
        gAliensBottomRowIdx++
        shiftBoardDown(gBoard, firstAllien, lastAllien)
    }


    // tell the aliien wheich side to move
    for (var i = 0; i < gAlliens.length; i++) {
        if (!isHitWall) gAlliens[i].pos.j--
        else gAlliens[i].pos.j++
    }



    if (isHitWall) shiftBoardRight(gBoard, firstAllien, lastAllien)
    else shiftBoardLeft(gBoard, firstAllien, lastAllien)
    renderBoard(gBoard)
    firstRound = false
    isWin()
    isGameOver()
}



function shiftBoardRight(board, from, to) {
    for (var i = gAliensTopRowIdx; i < gAliensBottomRowIdx; i++) {
        for (var j = to; j >= from; j--) {
            if (board[i][j] === ALIEN) {
                board[i][j + 1] = ALIEN
                board[i][j] = EMPTY
            }
        }
    }
}

function shiftBoardLeft(board, from, to) {
    for (var i = gAliensTopRowIdx; i < gAliensBottomRowIdx; i++) {
        for (var j = from; j <= to; j++) {
            if (board[i][j] === ALIEN) {
                board[i][j - 1] = ALIEN
                board[i][j] = EMPTY
            }
        }
    }
}


function shiftBoardDown(board, from, to) {
    for (var i = 0; i < gAlliens.length; i++) {
        gAlliens[i].pos.i++

    }


    for (var i = gAliensBottomRowIdx - 1; i >= gAliensTopRowIdx - 1; i--) {
        for (var j = to; j >= from; j--) {
            if (board[i][j] === ALIEN) {
                board[i + 1][j] = ALIEN
                board[i][j] = EMPTY
            }
        }
    }
}


function isGameOver() {
    for (var i = 0; i < gAlliens.length; i++) {
        if (gAlliens[i].pos.i === BOARD_SIZE - 2) {
            gGame.isOn = true
            openGameOverModal()
        }
    }
}








