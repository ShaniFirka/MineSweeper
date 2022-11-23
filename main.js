'use strict'

// ----global variables----

// var gBoard = []
// var cell = {
//     minesAroundCount: 4,
//     isShown: false,
//     isMine: false,
//     isMarked: true
// }
// var gLevel = {
//     SIZE: 4,
//     MINES: 2
// }
// var gGame = {
//     isOn: false,
//     shownCount: 0,
//     markedCount: 0,
//     secsPassed: 0
//    }
   

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

// renderBoard(board):
    //Render the board as a <table> to the page

// cellClicked(elCell, i, j):
    // Called when a cell (td) is clicked

// cellMarked(elCell):
    //Called on right click to mark a cell (suspected to be a mine)
    //Search the web how to hide the context menu on right click

// checkGameOver():
    //Game ends when all mines:
    // 1- are marked,
    // 2- all the other cells are shown

// expandShown(board, elCell,i, j):
    // start with a basic-only opens the non-mine 1st degree neighbors
    //When user clicks a cell with no mines around, we need to open that cell, but also its neighbors.


