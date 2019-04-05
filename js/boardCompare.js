function isSameBoard(board1, bord2) {
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      if (board1[i][j] !== bord2[i][j]) {
        return false;
      }
    }
  }
  return true;
}
function getSymetricBoard(board, symFunc) {
  var newBoard = [["", "", ""], ["", "", ""], ["", "", ""]];
  for (var i = 0; i < 3; i++) {
    for (var j = 0; j < 3; j++) {
      var symetry = symFunc(i, j);
      newBoard[i][j] = board[symetry.i][symetry.j];
    }
  }
  return newBoard;
}
function isSameSymetricBoard(board1, board2) {
  for (symetry in symetries) {
    var symetricBoard = getSymetricBoard(board2, symetries[symetry]);
    if (isSameBoard(board1, symetricBoard)) {
      return symetry;
    }
  }
  return null;
}
