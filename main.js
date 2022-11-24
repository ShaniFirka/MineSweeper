'use strict'

// ----global variables----
const MINE = '💣'
const FLEG = '🚩'
var gBoard = []

var gLevel = {
    SIZE: 4,
    MINES: 2
}
var ginterval
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function initGame(size, mines) {
    var gLevel = {
        SIZE: size,
        MINES: mines
    }
    gBoard = buildBoard()
    console.log(gBoard)
    renderBoard(gBoard)

}
function startTimer() {
    ginterval = setInterval(setTimer, 1000)
}

function setTimer() {
    //sec
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
    // console.log(boardToCompare)
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {

            var isMine = (boardToCompare[i][j]) ? true : false
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
            var cellValue = ''
            var cellData = 'i="' + i + '" j="' + j + '"'
            if (cell.isShown) {
                if (cell.isMine) cellValue = MINE
                else cellValue = (cell.ngsMinesCount === 0) ? '' : cell.ngsMinesCount
            }
            strHTML += `<td class="cell" ${cellData} oncontextmenu="cellMarked(this,${i},${j})" onclick="cellClicked(event,this,${i},${j})">
            <span>${cellValue}</span></td> `
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

function cellClicked(ev, elCell, i, j) {
    console.log(ev)
    var cell = gBoard[i][j]
    var cellValue = ''
    if (!cell.isShown) {
        cell.isShown = true
        if (!cell.isMine) {
            if (cell.minesAroundCount) cellValue = cell.minesAroundCount //(ngs>0)
            // else expandShown(i, j)
        } else cellValue = MINE
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


// function getCellIndex(elCell) {
//     var i = +elCell.id.split('-')[1]
//     var j = +elCell.id.split('-')[2]
//     console.log(i, j)
//     return { i: i, j: j }
// }
// ----FUNCTIONS:----

function cellMarked(elCell, i, j) {
    var cell = gBoard[i][j]
    if (cell.isShown) return
    if (cell.isMarked) {
        cell.isMarked = false
        renderCell(elCell, '')
    }
    cell.isMarked = true
    renderCell(elCell, FLEG)
}
// cellMarked(elCell):
//Called on right click to mark a cell (suspected to be a mine)
//Search the web how to hide the context menu on right click

// checkGameOver():
//Game ends when:
// 1- all mines are marked,
// 2- all the other cells are shown

