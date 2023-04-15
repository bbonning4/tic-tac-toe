// constants
const SYMBOLS = {
    '0': '',
    '1': 'X',
    '-1': 'O'
};
// state variables
let board;
let turn;
let winner;

// cached elements
const messageEl = document.querySelector('h1');
const resetBtn = document.querySelector('button');
const sqrEl = [...document.querySelectorAll('#board > div')];

// event listeners; 2nd one added in init 
resetBtn.addEventListener('click', init);

// functions
init();

function init() {
    document.getElementById('board').addEventListener('click', placeSymbol);
    sqrEl.forEach((sqr) => {
        sqr.style.setProperty('--div-bg-color', 'lightgrey');
    });

    board = [
        [0, 0, 0],
        [0, 0, 0],
        [0, 0, 0]
    ];

    turn = 1;
    winner = null;
    render();
}

function render(sqrIdx) {
    renderBoard(sqrIdx);
    renderMessage();
    // change/disable the div:hover for divs not 0
    // if there is a winner or 'draw'
    renderControls();
}

function placeSymbol(evt) {
    // place turn player's symbol on div if it doesn't already have one
    const sqr = evt.target;
    const sqrIdx = sqrEl.indexOf(sqr);
    // Guard
    if(sqrIdx === -1) return;
    const xIdx = sqrIdx % 3;
    
    let yIdx;
    if(sqrIdx < 3) {
        yIdx = 2;
    }
    else if(sqrIdx < 6) {
        yIdx = 1;
    }
    else {
        yIdx = 0;
    }
    
    if(board[xIdx][yIdx] === 0) {
        board[xIdx][yIdx] = turn;
    }
    else {
        return;
    }

    turn *= -1;
    winner = getWinner(xIdx, yIdx);
    render(sqrIdx);
}

function renderBoard(sqrIdx) {
    if(sqrIdx || sqrIdx === 0) {
        board.forEach(function(xIdx) {
            xIdx.forEach(function(yIdx) {
                sqrEl[sqrIdx].innerText = SYMBOLS[-1*turn];
            });
        });
    }
    else {
        sqrEl.forEach(function(sqr) {
            sqr.innerText = '';
        });
    }
}

function getWinner(x, y) {
    //next
    return checkVerticalWin(x, y) ||
        checkHorizontalWin(x, y) ||
        checkDiagonalWin(x, y) ||
        checkDraw();
}

function checkVerticalWin(x, y) {
    return countAdjacent(x, y, 0, 1) === 2 ? board[x][y] : null;
}

function checkHorizontalWin(x, y) {
    return countAdjacent(x, y, 1, 0) === 2 ? board[x][y] : null;
}
// missing NW>SE diagonal win
function checkDiagonalWin(x, y) {
    return countAdjacent(x, y, 1, 1) === 2 ||
        countAdjacent(x, y, 1, -1) === 2 ? board[x][y] : null;
}

function checkDraw() {
    let fullColumn = 0;
    board.forEach(function(xIdx) {
        if(xIdx.includes(0)) {}
        else {fullColumn++;}
    });
    return fullColumn === 3 ? 'draw' : null;
}

function countAdjacent(x, y, dx, dy) {
    const player = board[x][y];
    let count = 0;

    // negative offset
    let xNegative = x - dx;
    let yNegative = y - dy;
    // positive offset
    x += dx;
    y += dy;
    while(board[x] !== undefined &&
        board[x][y] !== undefined &&
        board[x][y] === player) {
            count++
            x += dx;
            y += dy;
        }
    while(board[xNegative] !== undefined &&
        board[xNegative][yNegative] !== undefined &&
        board[xNegative][yNegative] === player) {
            count++;
            xNegative -= dx;
            yNegative -= dy;
        }
    return count;
}

function renderMessage() {
    if(winner) {
        if(winner === 'draw') {
            messageEl.innerHTML = `It's a Draw!`;
        }
        else {
            messageEl.innerHTML = `${SYMBOLS[-1*turn]} Wins!`
        }
    }
    else {
        messageEl.innerHTML = `${SYMBOLS[turn]}'s Turn`;
    }
}

function renderControls() {
    if(winner !== null) {
        document.getElementById('board').removeEventListener('click', placeSymbol);
    }
    sqrEl.forEach(function(sqr) {
        const disableHover = (sqr.innerText === 'O') ||
        (sqr.innerText === 'X') || winner;
        if(disableHover) {
            sqr.style.setProperty('--div-bg-color', 'darkgrey');
        }
    });
}