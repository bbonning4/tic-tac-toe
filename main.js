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

// event listeners
document.getElementById('board').addEventListener('click', placeSymbol);
resetBtn.addEventListener('click', init);

// functions
init();

function init() {
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
            xIdx.forEach(function() {
                sqrEl[sqrIdx].innerText = SYMBOLS[turn];
            });
        });
    }
    else {
        sqrEl.forEach(function(sqr) {
            sqr.innerText = '';
        });
    }
}

function getWinner() {

}

function renderMessage() {

}

function renderControls() {

}