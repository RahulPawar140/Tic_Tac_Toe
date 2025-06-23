let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let players = { X: "Player 1", O: "Player 2" };
let scores = { X: 0, O: 0 };
let gameActive = true;

function startGame(skipNames = false) {
    const name1 = document.getElementById("player1").value.trim();
    const name2 = document.getElementById("player2").value.trim();

    if (!skipNames && (name1 === "" || name2 === "")) {
        alert("Please enter both names or click 'Start Without Names'.");
        return;
    }

    players.X = skipNames ? "Player 1" : name1;
    players.O = skipNames ? "Player 2" : name2;

    document.getElementById("start-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";

    updateStatus();
    updateScores();
}

function makeMove(cell, index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    cell.setAttribute("data-value", currentPlayer);
    cell.classList.add(currentPlayer.toLowerCase()); // Add class 'x' or 'o'

    if (checkWinner()) {
        document.getElementById("status").innerText = `${players[currentPlayer]} (${currentPlayer}) wins!`;
        scores[currentPlayer]++;
        gameActive = false;
        updateScores();
    } else if (board.every(cell => cell !== "")) {
        document.getElementById("status").innerText = "It's a draw!";
        gameActive = false;
    } else {
        currentPlayer = currentPlayer === "X" ? "O" : "X";
        updateStatus();
    }
}

function checkWinner() {
    const combos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];
    return combos.some(([a, b, c]) =>
        board[a] && board[a] === board[b] && board[a] === board[c]
    );
}

function updateStatus() {
    document.getElementById("status").innerText =
        `${players[currentPlayer]}'s turn (${currentPlayer})`;
}

function updateScores() {
    document.getElementById("scoreX").innerText = `${players.X} (X): ${scores.X}`;
    document.getElementById("scoreO").innerText = `${players.O} (O): ${scores.O}`;
}

function restartGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    gameActive = true;
    currentPlayer = "X";
    document.querySelectorAll(".cell").forEach(cell => {
        cell.removeAttribute("data-value");
        cell.classList.remove("x", "o");
    });
    updateStatus();
}

function resetToNewPlayers() {
    board = ["", "", "", "", "", "", "", "", ""];
    scores = { X: 0, O: 0 };
    gameActive = true;
    currentPlayer = "X";

    document.getElementById("game-screen").style.display = "none";
    document.getElementById("start-screen").style.display = "block";

    document.querySelectorAll(".cell").forEach(cell => {
        cell.removeAttribute("data-value");
        cell.classList.remove("x", "o");
    });

    document.getElementById("player1").value = "";
    document.getElementById("player2").value = "";
}
