'use strict'

// ----global variables----
const MINE = '💣'
var gBoard = []

var gLevel = {
    SIZE: 4,
    MINES: 2
}
var gGame = {
    isOn: false,
    shownCount: 0,
    markedCount: 0,
    secsPassed: 0
}

function initGame() {
    gBoard = buildBoard()
    console.log(gBoard)
    renderBoard(gBoard)

}

function buildBoard() {
    var boardToCompare = createBoardWithMines()
    console.log(boardToCompare)
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {

            var isMine = (boardToCompare[i][j]) ? true : false
            var minesAroundCount = countNegs(i, j, boardToCompare)

            board[i][j] = {
                minesAroundCount: minesAroundCount,
                isShown: true,
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
            var currCell = board[i][j]
            var isMinevalue = (currCell.isMine) ? MINE : ''
            var showm = (currCell.isShown) ? isMinevalue : ''


            var cellData = 'data-i="' + i + '" data-j="' + j + '"'
            strHTML += `<td ${cellData} onclick="CellClicked(this,${i},${j})">
            ${isMinevalue}</td > `
        }
        strHTML += '</tr>\n'
    }
    // console.log(strHTML)
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}




// ----FUNCTIONS:----

// initGame() -- onload

// buildBoard() :
// -Builds the board
// Set mines at random locations
// Call setMinesNegsCount()
// Return the created board

// setMinesNegsCount(board):
// Count mines around each cell
// set the cell's minesAroundCount.


// cellClicked(elCell, i, j):
// Called when a cell (td) is clicked

// cellMarked(elCell):
//Called on right click to mark a cell (suspected to be a mine)
//Search the web how to hide the context menu on right click

// checkGameOver():
//Game ends when:
// 1- all mines are marked,
// 2- all the other cells are shown

// expandShown(board, elCell,i, j):
// start with a basic-only opens the non-mine 1st degree neighbors
//When user clicks a cell with no mines around, we need to open that cell, but also its neighbors.
