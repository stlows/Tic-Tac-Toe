var defaultStyle = {
  backgroundColor: "white",
  color: "black"
};
var winningStyle = {
  backgroundColor: "green",
  color: "white"
};
var hoverStyle = {
  color: "#bbbbbb"
};
var tieStyle = {
  backgroundColor: "red",
  color: "white"
};
function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}
var app = new Vue({
  el: "#app",
  data: {
    symbols: ["X", "O"],
    scores: [0, 0],
    board: [["", "", ""], ["", "", ""], ["", "", ""]],
    styles: [
      [defaultStyle, defaultStyle, defaultStyle],
      [defaultStyle, defaultStyle, defaultStyle],
      [defaultStyle, defaultStyle, defaultStyle]
    ],
    logs: [],
    disableAll: false,
    currentPlayerId: 0,
    difficulty: 1,
    type: "HC",
    timeoutId: null,
    showSettings: false
  },
  methods: {
    currentPlayer() {
      return this.symbols[this.currentPlayerId];
    },
    nextPlayer() {
      this.currentPlayerId = (this.currentPlayerId + 1) % 2;
    },
    setValue(x, y, val) {
      var newLine = this.board[x];
      newLine.splice(y, 1, val);
      this.board.splice(x, 1, newLine);
    },
    setStyle(x, y, style) {
      var newLine = this.styles[x];
      newLine.splice(y, 1, style);
      this.styles.splice(x, 1, newLine);
    },
    setTile(x, y) {
      if (this.disableAll) return;
      this.setValue(x, y, this.currentPlayer());
      this.setStyle(x, y, defaultStyle);
      var ttt = this.checkTicTacToe();
      if (ttt != null) {
        if (ttt == "tie") {
          this.tie();
        } else {
          this.win(ttt);
        }
      } else {
        this.nextPlayer();
        if (this.isBot(this.currentPlayerId)) {
          this.botMove();
        }
      }
    },
    win(winner) {
      this.logs.push(this.currentPlayer() + " wins the round.");
      this.scores[this.currentPlayerId]++;
      this.disableAll = true;
      this.colorWinner(winner);
      this.timeoutId = setTimeout(this.newRound, 1000);
    },
    tie() {
      this.logs.push("Round is a tie.");
      this.disableAll = true;
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          this.setStyle(i, j, tieStyle);
        }
      }
      this.timeoutId = setTimeout(this.newRound, 1000);
    },
    hoverInTile(x, y) {
      if (this.disableAll) return;
      if (this.board[x][y] != "") return;
      this.setValue(x, y, this.currentPlayer());
      this.setStyle(x, y, hoverStyle);
    },
    hoverOutTile(x, y) {
      if (this.disableAll) return;
      if (this.styles[x][y] != hoverStyle) return;
      this.setValue(x, y, "");
      this.setStyle(x, y, defaultStyle);
    },
    colorWinner(winner) {
      if (winner === "h1") {
        this.setStyle(0, 0, winningStyle);
        this.setStyle(0, 1, winningStyle);
        this.setStyle(0, 2, winningStyle);
      }
      if (winner === "h2") {
        this.setStyle(1, 0, winningStyle);
        this.setStyle(1, 1, winningStyle);
        this.setStyle(1, 2, winningStyle);
      }
      if (winner === "h3") {
        this.setStyle(2, 0, winningStyle);
        this.setStyle(2, 1, winningStyle);
        this.setStyle(2, 2, winningStyle);
      }
      if (winner === "v1") {
        this.setStyle(0, 0, winningStyle);
        this.setStyle(1, 0, winningStyle);
        this.setStyle(2, 0, winningStyle);
      }
      if (winner === "v2") {
        this.setStyle(0, 1, winningStyle);
        this.setStyle(1, 1, winningStyle);
        this.setStyle(2, 1, winningStyle);
      }
      if (winner === "v3") {
        this.setStyle(0, 2, winningStyle);
        this.setStyle(1, 2, winningStyle);
        this.setStyle(2, 2, winningStyle);
      }
      if (winner === "d1") {
        this.setStyle(0, 0, winningStyle);
        this.setStyle(1, 1, winningStyle);
        this.setStyle(2, 2, winningStyle);
      }
      if (winner === "d2") {
        this.setStyle(0, 2, winningStyle);
        this.setStyle(1, 1, winningStyle);
        this.setStyle(2, 0, winningStyle);
      }
    },
    clearBoard() {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          this.setValue(i, j, "");
        }
      }
    },
    resetStyle() {
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          this.setStyle(i, j, defaultStyle);
        }
      }
    },
    newRound() {
      clearInterval(this.timeoutId);
      this.clearBoard();
      this.resetStyle();
      this.currentPlayerId = 0;
      this.disableAll = false;
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
        return "tie";
      }

      return null;
    },
    isBot(id) {
      return this.type.split("")[id] == "C";
    },
    botMove() {
      switch (this.difficulty) {
        case 1:
          this.botLevel1Move();
          break;
        case 2:
          alert("Bot level 2 moves.");
          break;
        case 3:
          alert("Bot level 3 moves.");
          break;
      }
    },
    botLevel1Move() {
      var availablePairs = [];
      for (var i = 0; i < 3; i++) {
        for (var j = 0; j < 3; j++) {
          if (this.board[i][j] == "") {
            availablePairs.push({ i, j });
          }
        }
      }
      var rand = getRandomInt(availablePairs.length);
      this.setTile(availablePairs[rand].i, availablePairs[rand].j);
    }
  }
});
