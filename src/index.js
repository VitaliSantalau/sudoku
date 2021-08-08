module.exports = function solveSudoku(matrix) {

  function toFindEmptyCell(matrix) {
    for(let row = 0; row < matrix.length; row++) {
      for(let column = 0; column < matrix[row].length; column++) {
        if(matrix[row][column] === 0) return [row, column];
      }
    }
    return false;
  }

  function isPossibleNumber(matrix, row, column, number) {
    function isNoNumberInRow() {
      for(let i = 0; i < matrix[row].length; i++) {
        if(matrix[row][i] === number) return false;
      }
      return true;
    }
  
    function isNoNumberInColumn() {
      for(let i = 0; i < matrix.length; i++) {
        if(matrix[i][column] === number) return false;
      }
      return true;
    }
  
    function isNoNumberInSquare() {
      const startRowSquare = Math.floor(row / 3) * 3;
      const startColumnSquare = Math.floor(column / 3) * 3;
      for(let row = startRowSquare; row < startRowSquare + 3; row++) {
        for(let column = startColumnSquare; column < startColumnSquare + 3; column++) {
          if(matrix[row][column] === number) return false;
        }
      }
      return true;
    }

    if(isNoNumberInRow() &&
      isNoNumberInColumn() &&
      isNoNumberInSquare()) return true;
    return false;
  }

  function toSolve(matrix) {
    let emptyCell = toFindEmptyCell(matrix);
    if(!emptyCell) return 'solved!';
    let [row, column] = emptyCell;
    
    for(let number = 1; number <= 9; number++) {
      if(isPossibleNumber(matrix, row, column, number)) {
        matrix[row][column] = number;
        toSolve(matrix);
      }
    }
    if(toFindEmptyCell(matrix)) matrix[row][column] = 0; // backtracking

    return matrix;
  }

  return toSolve(matrix);
}