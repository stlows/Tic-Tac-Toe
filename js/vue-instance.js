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
      if (this.board[x][y] != "") return;
      var newLine = this.board[x];
      newLine.splice(y, 1, this.currentPlayer());
      this.board.splice(x, 1, newLine);
      alert(this.checkTicTacToe());
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
    },
    count() {
      var count = 0;
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (this.board[i][j] != "") {
            count++;
          }
        }
      }
      return count;
    },
    checkTicTacToe() {
      var c1 = this.board[0][0];
      var c2 = this.board[0][1];
      var c3 = this.board[0][2];
      var c4 = this.board[1][0];
      var c5 = this.board[1][1];
      var c6 = this.board[1][2];
      var c7 = this.board[2][0];
      var c8 = this.board[2][1];
      var c9 = this.board[2][2];

      // Horizontal
      if ((c1 != "") & (c1 == c2) & (c2 == c3)) {
        return "h1";
      }
      if ((c4 != "") & (c4 == c5) & (c4 == c6)) {
        return "h2";
      }
      if ((c7 != "") & (c7 == c8) & (c7 == c9)) {
        return "h3";
      }

      // Vertical
      if ((c1 != "") & (c1 == c4) & (c1 == c7)) {
        return "v1";
      }
      if ((c2 != "") & (c2 == c5) & (c2 == c8)) {
        return "v2";
      }
      if ((c3 != "") & (c3 == c6) & (c3 == c9)) {
        return "v3";
      }

      // Diagonal
      if ((c1 != "") & (c1 == c5) & (c1 == c9)) {
        return "d1";
      }
      if ((c3 != "") & (c3 == c5) & (c3 == c7)) {
        return "d2";
      }

      if (this.count() == 9) {
        return "nul";
      }

      return null;
    }
  }
});
