class TicTacToe {
    constructor() {
      this.board = Array(9).fill(null); // an array with 9 null values, representing an empty 3x3 board.
      this.currentPlayer = "X"; // Tracks which player's turn it is, starting with "X".
      this.win = null; // Stores the winning player when a win occurs.
      this.score = { "X": 0, "O": 0 }; //  A simple object that tracks the scores for X and O.
      this.gameOver = false; // Flag to stop moves after game is over
      this.square = document.querySelectorAll('.square'); // Use DOM elements to control the board's display and game status text.
      this.status = document.querySelector('#status'); // Use DOM elements to control the board's display and game status text.
    }
  
    //Updates the board if the selected square is empty and switches the player.
    makeMove(index) {
      if (this.board[index] === null && !this.gameOver) {
        this.board[index] = this.currentPlayer;
        this.currentPlayer = this.currentPlayer === "X" ? "O" : "X";
        return true;
      }
      return false;
    }
  
    //This checks all winning combinations to see if the current board state has a winner.
    checkWin() {
      const winningCombinations = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8], // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8], // Columns
        [0, 4, 8], [2, 4, 6], // Diagonals
      ];
  
      //This is a for...of loop that iterates over each item in the winningCombinations array.
      for (let combo of winningCombinations) {
        // checks if the three spots in the board array (indexed by a, b, and c) contain the same value (either 'X' or 'O')
        const [a, b, c] = combo;
        //If it's empty, this means no player has made a move there, so no need to check further.
        // checks if all 3 index are the same if they are a player has put thier X or O in either of the positions 
        if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
          return this.board[a]; // Return 'X' or 'O'
        }
      }
      //return either X or O saying this player won the game
      return null;
    }
  
    //Determines if all cells on the board are filled, which helps to check for a draw.
    isBoardFull() {
      return this.board.every((cell) => cell !== null);
    }
  
    updateScore(winner) {
      if (winner) {
        this.score[winner]++;
        document.getElementById(`score${winner}`).textContent = this.score[winner];
      }
    }
  }
  
  // Instantiate the TicTacToe class
  let game = new TicTacToe();
  
  // Grab all square elements and restart button
  const squares = document.querySelectorAll('.square');
  const restartButton = document.getElementById('restartButton');
  const statusDisplay = document.getElementById('status');
  
  // Function to update the UI after each move
  function updateBoard() {
    game.board.forEach((value, index) => {
      const square = document.getElementById(`square${index}`);
      square.textContent = value; // Display 'X', 'O', or empty
    });
  }
  
  // Function to handle when a square is clicked
  function handleSquareClick(event) {
    const squareIndex = event.target.id.replace('square', ''); // Get index
    if (game.makeMove(squareIndex)) {
      updateBoard();
  
      const winner = game.checkWin();
  
      if (winner) {
        statusDisplay.textContent = `${winner} wins!`;
        game.updateScore(winner);
        game.gameOver = true; // Stop further moves
      } else if (game.isBoardFull()) {
        statusDisplay.textContent = 'It\'s a draw!';
        game.gameOver = true;
      }
    }
  }
  
  // Add click event listeners to each square
  squares.forEach(square => {
    square.addEventListener('click', handleSquareClick);
  });
  
  // Function to restart the game
  function restartGame() {
    game.board = Array(9).fill(null);  // Reset the board
    game.currentPlayer = 'X';  // Reset current player
    game.gameOver = false; // Enable moves
    statusDisplay.textContent = 'Game in progress...'; // Reset status
    updateBoard(); // Clear UI
  }
  
  // Add click event listener to restart button
  restartButton.addEventListener('click', restartGame);
  