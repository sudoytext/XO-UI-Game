const gameBoard = document.getElementById("game-board");
const statusDisplay = document.getElementById("status");
const restartButton = document.getElementById("restart");

let currentPlayer = "X";
let board = Array(9).fill(null);
let isGameActive = true;

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

// Initialize game board
function createBoard() {
    gameBoard.innerHTML = "";
    board.forEach((_, index) => {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        cell.dataset.index = index;
        cell.addEventListener("click", handleCellClick);
        gameBoard.appendChild(cell);
    });
}

function handleCellClick(e) {
    const cell = e.target;
    const cellIndex = cell.dataset.index;

    if (board[cellIndex] || !isGameActive) return;

    board[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add("taken");

    if (checkWin()) {
        statusDisplay.textContent = `Player ${currentPlayer} Wins!`;
        isGameActive = false;
    } else if (board.every(cell => cell)) {
        statusDisplay.textContent = "It's a Draw!";
        isGameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        statusDisplay.textContent = `Player ${currentPlayer}'s Turn`;
    }
}

function checkWin() {
    return winningCombinations.some(combination => {
        return combination.every(index => board[index] === currentPlayer);
    });
}

restartButton.addEventListener("click", () => {
    board = Array(9).fill(null);
    currentPlayer = "X";
    isGameActive = true;
    statusDisplay.textContent = "Player X's Turn";
    createBoard();
});

createBoard();
