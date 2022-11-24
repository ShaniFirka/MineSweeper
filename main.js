'use strict'

// ----global variables----
const MINE = '💣'
const FLAG = '🚩'
const EMPTY = ''
var gBoard = []

var gLevel = {
    SIZE: 4,
    MINES: 2,
    life: 1
}
var gTimerInterval
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0,
    minesCells: [],
    isFirstClick: true,
    markedCount: 0,
    life: 1,
    nonMineShown: 0,
}

function initGame() {
    gGame = {
        isOn: true,
        shownCount: 0,
        markedCount: 0,
        secsPassed: 0,
        isFirstClick: true,
        minesCells: [],
        markedCount: 0,
        life: gLevel.life,
        nonMineShown: 0,
    }
    gBoard = buildBoard()
    renderBoard(gBoard)
}

function setLevel(difficulty) {
    switch (difficulty) {
        case ('easy'):
            gLevel.SIZE = 4
            gLevel.MINES = 2
            gLevel.life = 1
            break;
        case ('medium'):
            gLevel.SIZE = 8
            gLevel.MINES = 14
            gLevel.life = 3
            break;
        case ('hard'):
            gLevel.SIZE = 12
            gLevel.MINES = 36
            gLevel.life = 3
            break;
        default:
            gLevel.SIZE = 4
            gLevel.MINES = 2
            gLevel.life = 2
    }
    initGame()
}

function toggleGame() {
    if (gGame.isOn && gGame.secsPassed === 0) {
        gTimerInterval = setInterval(setTimer, 1000)
    } else if (gGame.isOn && gGame.secsPassed > 0) {
        clearInterval(gTimerInterval)
        var elSec = document.querySelector('.sec')
        elSec.innerText = '00'
        var elMin = document.querySelector('.min')
        elMin.innerText = '00'
        initGame()
    }

}

function setTimer() {
    if (!gGame.isOn) return
    //sec
    gGame.secsPassed++
    var elSec = document.querySelector('.sec')
    var currSec = elSec.innerText
    currSec++
    elSec.innerText = currSec
    //min
    var elMin = document.querySelector('.min')
    var currMin = elMin.innerText
    if (currSec > 60) {
        currMin++
        elMin.innerText = currMin
        //need to reset the sec
        currSec = 0
        elSec.innerText = currSec
    }
}

function buildBoard() {
    var boardToCompare = createBoardWithMines()
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            var isMine = (boardToCompare[i][j]) ? true : false
            if (isMine) gGame.minesCells.push({ i: i, j: j })
            var minesAroundCount = countNegs(i, j, boardToCompare)

            board[i][j] = {
                minesAroundCount: minesAroundCount,
                isShown: false,
                isMine: isMine,
                isMarked: false
            }
        }
    }
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var cell = board[i][j]
            var cellData = i + '-' + j

            strHTML += `<td class="cell ${cellData}" oncontextmenu="cellMarked(this,${i},${j})" onclick="cellClicked(this,${i},${j})">
            <span>${EMPTY}</span></td> `
        }
        strHTML += '</tr>\n'
    }

    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}

function renderCell(elCell, value) {
    var elSpan = elCell.querySelector('span')
    elSpan.innerText = value
}

function countNegs(cellI, cellJ, mat) {
    var negsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
            var cell = mat[i][j]
            if (cell === MINE) negsCount++
        }
    }
    return negsCount
}

function cellClicked(elCell, i, j) {
    if (gGame.isOn === false) return
    if (gGame.isFirstClick && gGame.secsPassed === 0) {
        toggleGame()
        gGame.isFirstClick = false
    }
    var cell = gBoard[i][j]

    if (cell.isMarked) return
    if (!cell.isShown) {
        cell.isShown = true
        if (cell.isMine) {
            var cellValue = MINE
            gGame.life--
            checkGameOver()
        }
        else {
            gGame.nonMineShown++
            var cellValue = (cell.minesAroundCount === 0) ? EMPTY : cell.minesAroundCount
        }
        elCell.classList.add('shown')
        renderCell(elCell, cellValue)
    } return
}

function expandShown(cellI, cellJ) {
    // start with a basic-only opens the non-mine 1st degree neighbors
    var emptyCells = []
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= gBoard[i].length) continue
            var cell = gBoard[i][j]
            if (cell.isMine) continue
            if (cell.minesAroundCount > 0) continue
            if (cell.minesAroundCount === 0) {

                var nextCellclass = '.cell i=' + i + ' j=' + j + ''
                var elnextCell = document.querySelector(nextCellclass)
                console.log(elnextCell)
                // var emptyCell = { cellelement: elnextCell, i: i, j: j }
                // emptyCells.push(emptyCell)
            }
        }
    }
    for (var x = 0; x < emptyCells.length; x++) {
        var currCell = emptyCells[x]
        cellClicked(currCell.cellelement, currCell.i, currCell.j)
    }
    //When user clicks a cell with no mines around, we need to open that cell, but also its neighbors.
}

function cellMarked(elCell, i, j) {
    var cell = gBoard[i][j]
    if (cell.isShown) return
    if (cell.isMarked) {
        if (cell.isMine) gGame.markedCount--
        cell.isMarked = false
        renderCell(elCell, EMPTY)
    } else {
        if (cell.isMine) gGame.markedCount++
        cell.isMarked = true
        checkGameOver()
        renderCell(elCell, FLAG)
    }
}

function checkGameOver() {
    // 1- all mines are marked,
    var cellCount = gLevel.SIZE ** 2
    if (gGame.markedCount === gLevel.MINES || cellCount - gGame.nonMineShown === gLevel.MINES) console.log('Win!')
    else if (gGame.life === 0) endGame() // end(game)
    else return
    // 2- all the other cells are shown
}

function endGame() {
    gGame.isOn = false
    // revealMines()
    clearInterval(gTimerInterval)
    console.log('ended!')
}


function revealMines() {
    for (var i = 0; i < gGame.minesCells; i++) {
        var pos = gGame.minesCells[i] // {i:i, j:j}
        var cell = gBoard[pos.i][pos.j]

        cell.isShown = true
        var cellclass = ' .' + pos.i + '-' + pos.j + ''
        var elcells = document.querySelectorAll('.cell')
        var elCell = elcells.querySelector(cellclass)
        console.log(elcell)
        console(cell)
    }
}

