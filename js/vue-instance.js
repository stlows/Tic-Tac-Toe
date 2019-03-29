var app = new Vue({
  el: "#app",
  data: {
    symbols: ["X", "O"],
    scores: [0, 0],
    board: [["", "", ""], ["", "", ""], ["", "", ""]],
    currentPlayerId: 0,
    difficulty: 1
  },
  methods: {
    currentPlayer() {
      return this.symbols[this.currentPlayerId];
    },
    nextPlayer() {
      this.currentPlayerId = (this.currentPlayerId + 1) % 2;
    },
    setTile(x, y) {
      var newLine = this.board[x];
      newLine.splice(y, 1, this.currentPlayer());
      this.board.splice(x, 1, newLine);
      this.nextPlayer();
    },
    clearBoard() {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          this.board[i][j] = "";
        }
      }
      this.$forceUpdate();
    },
    newRound() {
      this.clearBoard();
      this.currentPlayerId = 0;
    }
  }
});
