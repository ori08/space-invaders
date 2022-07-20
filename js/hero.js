'use strict'
const HERO = '♆';
const LASER = '⤊';
const LASER_SPEED = 80;

var gHero;
var gIntervalLaser
var gLaserPos
var laserStep = 1
var isLaser = false


function createHero(board) {
    gHero = {
        pos: { i: 12, j: 5 },
        isShoot: false
    }
    board[gHero.pos.i][gHero.pos.j] = HERO
    return gHero
}

function moveHero(ev) {

    var nextLocation = getNextLocation(ev)
    // varified that hero not pass the wall
    if (nextLocation.j < 0 || nextLocation.j > BOARD_SIZE - 1) return

    var nextCell = gBoard[nextLocation.i][nextLocation.j]
    //Update the board
    gBoard[gHero.pos.i][gHero.pos.j] = EMPTY
    // TODO: update the DOM
    renderCell(gHero.pos, EMPTY)

    gHero.pos = nextLocation
    //Update the board
    gBoard[gHero.pos.i][gHero.pos.j] = HERO
    // TODO: update the DOM
    renderCell(gHero.pos, HERO)
}

function getNextLocation(ev) {

    var nextLocation = {
        i: gHero.pos.i,
        j: gHero.pos.j,
    }

    switch (ev.code) {

        case 'ArrowLeft': {
            nextLocation.j--
        }
            break;

        case 'ArrowRight': {
            nextLocation.j++
        }
            break;
    }
    return nextLocation;
}

function shotLaser(laserLine = gHero.pos.j) {
    gLaserPos = { i: gHero.pos.i - laserStep, j: laserLine }
    if (gLaserPos.i < 0) {
        clearInterval(gIntervalLaser)
        isLaser = false
        laserStep = 1
        return
    }
    renderLaser()
    laserStep++
}

function renderLaser() {
    var cellBefore = { i: gLaserPos.i + 1, j: gLaserPos.j }

    if (gBoard[gLaserPos.i][gLaserPos.j] === ALIEN) {
        killAliien(gLaserPos)

        gBoard[gLaserPos.i][gLaserPos.j] = EMPTY
        gBoard[cellBefore.i][cellBefore.j] = EMPTY

        clearInterval(gIntervalLaser)
        isLaser = false
        laserStep = 1
        renderBoard(gBoard)
        return
    }


    if (gBoard[cellBefore.i][cellBefore.j] !== HERO) {
        gBoard[cellBefore.i][cellBefore.j] = EMPTY
        renderCell(cellBefore, EMPTY)
    }
    gBoard[gLaserPos.i][gLaserPos.j] = LASER
    renderCell(gLaserPos, LASER)
}

function killAliien(pos) {
    for (var i = 0; i < gAlliens.length; i++) {
        if (gAlliens[i].pos.i === pos.i && gAlliens[i].pos.j === pos.j) {
            gAlliens.splice(i, 1)
            updateScore()
        }
    }
    console.log(gAlliens);
}
