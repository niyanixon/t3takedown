class TicTacToe {
    constructor() {
      this.board = Array(9).fill(null);  // Board initialized to empty
      this.currentPlayer = 'X';  // X always starts first
      this.gameOver = false;
  
      // Initialize scores for both players
      this.scoreX = 0;
      this.scoreO = 0;
  
      // DOM elements
      this.squares = document.querySelectorAll('.square');
      this.restartButton = document.getElementById('restartButton');
      this.statusDisplay = document.getElementById('status');
      this.scoreDisplayX = document.getElementById('scoreX'); // Element to display X's score
      this.scoreDisplayO = document.getElementById('scoreO'); // Element to display O's score
  
      this.init();
    }
  
    // Initialize game by adding event listeners
    init() {
      this.squares.forEach(square => {
        square.addEventListener('click', (event) => this.handleSquareClick(event));
      });
      this.restartButton.addEventListener('click', () => this.restartGame());
      this.updateBoard();
      this.updateScoreDisplay();
    }
  
    // Update the board after each move
    updateBoard() {
      this.board.forEach((value, index) => {
        const square = document.getElementById(`square${index}`);
        square.textContent = value;  // Display 'X', 'O', or empty
      });
    }
  
    // Handle square click
    handleSquareClick(event) {
      const squareIndex = event.target.id.replace('square', ''); // Get index
      if (!this.gameOver && this.makeMove(squareIndex)) {
        this.updateBoard();
        const winner = this.checkWin();
  
        if (winner) {
          this.statusDisplay.textContent = `${winner} wins!`;
          this.updateScore(winner);
          this.updateScoreDisplay(); // Update the score display
          this.gameOver = true; // Stop further moves
        } else if (this.isBoardFull()) {
          this.statusDisplay.textContent = 'It\'s a draw!';
          this.gameOver = true;
        }
      }
    }
  
    // Each players turn
    makeMove(index) {
      if (this.board[index] === null && !this.gameOver) {
        this.board[index] = this.currentPlayer;
        this.currentPlayer = this.currentPlayer === 'X' ? 'O' : 'X'; // Switch player
        return true;
      }
      return false;
    }
  
    // Check for a winner
    checkWin() {
      const winPatterns = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],  // Rows
        [0, 3, 6], [1, 4, 7], [2, 5, 8],  // Columns
        [0, 4, 8], [2, 4, 6]              // Diagonals
      ];
  
      for (const pattern of winPatterns) {
        const [a, b, c] = pattern;
        if (this.board[a] && this.board[a] === this.board[b] && this.board[a] === this.board[c]) {
          return this.board[a]; // Return 'X' or 'O'
        }
      }
      return null;
    }
  
    // Check if the board is full
    isBoardFull() {
      return this.board.every(cell => cell !== null);
    }
  
    // Update score for the winner
    updateScore(winner) {
      if (winner === 'X') {
        this.scoreX += 1;
      } else if (winner === 'O') {
        this.scoreO += 1;
      }
    }
  
    // Update the score display
    updateScoreDisplay() {
      this.scoreDisplayX.textContent = `Player X: ${this.scoreX}`;
      this.scoreDisplayO.textContent = `Player O: ${this.scoreO}`;
    }
  
    // Restart the game
    restartGame() {
      this.board = Array(9).fill(null);  // Reset the board
      this.currentPlayer = 'X';  // Reset current player
      this.gameOver = false;  // Enable moves
      this.statusDisplay.textContent = 'Game in progress...';  // Reset status
      this.updateBoard();  // Clear UI
    }
  }
  
  // Create a new instance of the TicTacToe game
  const game = new TicTacToe();
  