

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {
            var currCell = board[i][j]

            var cellData = 'data-i="' + i + '" data-j="' + j + '"'
            strHTML += `<td ${cellData} onclick="CellClicked(this,${i},${j})">
                ${currCell}</td>`
        }
        strHTML += '</tr>\n'
    }
    var elBoard = document.querySelector('.board')
    elBoard.innerHTML = strHTML
}
function craeteMinesArrey() {
    var minesArrey = []
    var mines = gLevel.MINES
    for (var i = 0; i < gLevel.SIZE ** 2; i++) {
        var value = (mines > 0) ? MINE : ''
        minesArrey.push(value)
        mines--
    }
    console.log(minesArrey)
    return minesArrey
}
function drawNum(array) {
    var idx = getRandomInt(0, array.length)
    var value = array[idx]
    array.splice(idx, 1)
    return value
}

function createBoardWithMines() {
    var minesArrey = craeteMinesArrey()
    var board = []
    for (var i = 0; i < gLevel.SIZE; i++) {
        board.push([])
        for (var j = 0; j < gLevel.SIZE; j++) {
            board[i][j] = drawNum(minesArrey)
        }
    }
    return board
}

function countNegs(cellI, cellJ, mat) {
    var negsCount = 0
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= mat.length) continue
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue
            if (j < 0 || j >= mat[i].length) continue
            if (mat[i][j]) negsCount++
        }
    }
    return negsCount
}

/////////////////////////////////////////////////////////////////////////////////
function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min)) + min; //The maximum is inclusive and the minimum is inclusive 
}