// constants
const SYMBOLS = {
    '0': null,
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

function render() {
    renderBoard();
    renderMessage();
    // change/disable the div:hover for divs not 0
    renderControls();
}

function placeSymbol(evt) {
    
}