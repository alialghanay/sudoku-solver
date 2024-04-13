class SudokuSolver {

  coordinateConverter(coordinate){
    if(coordinate.length === 0 || coordinate == undefined) throw new Error("Required field(s) missing");
    const coordinateArray = coordinate.split("");
    let row = coordinateArray[0].charCodeAt(0) - 65;
    let col = coordinateArray[1] - 1;
    if(col < 0 || col > 10) throw new Error("Invalid coordinate");
    if(row < 0 || row > 10) throw new Error("Invalid coordinate");
    return [col, row];
  }

  validate(puzzleString) {
    console.log(puzzleString);
    if(puzzleString.length === 0) throw new Error("Required field missing");
    if (puzzleString.length !== 81) throw new Error("Expected puzzle to be 81 characters long");
    if (!/^[1-9\.]+$/.test(puzzleString)) throw new Error("Invalid characters in puzzle");
    return true;
  }

  checkRowPlacement(puzzleString, row, column, value) {
    if(value.length === 0) throw new Error("Required field(s) missing");
    const rowIndex = row * 9;
    if(puzzleString.slice(rowIndex, rowIndex + 9).includes(value)){
      return false;
    }
    return true;
  }

  checkColPlacement(puzzleString, row, column, value) {
    for(let i = column; i<=81; i += 9){
      if(puzzleString[i] === value){
        return false
      }
    }
    return true;
  }

  checkRegionPlacement(puzzleString, row, column, value) {
    const regionStartRow = Math.floor(row / 3) * 3;
    const regionStartCol = Math.floor(column / 3) * 3;

    for(let i = regionStartRow; i<regionStartRow + 3; i++){
      for(let j = regionStartCol; j< regionStartCol + 3; j++){
        if(puzzleString[i * 9 + j] === value) return false;
      }
    }
    return true;
  }
    
  solve(puzzleString) {
    try{

      this.validate(puzzleString);
      const checkRowPlacement = this.checkRowPlacement;
      const checkColPlacement = this.checkColPlacement;
      const checkRegionPlacement = this.checkRegionPlacement;
      function solveRecursive(puzzle) {
        
      const emptyCellIndex = puzzle.indexOf('.');
  
        if (emptyCellIndex === -1) {
          return puzzle;
        }
  
        // beging of the alogorhitm 
        for (let digit = 1; digit <= 9; digit++) {
  
          const digitStr = digit.toString();
          const row = Math.floor(emptyCellIndex / 9);
          const col = emptyCellIndex % 9;
          if (
            checkRowPlacement(puzzle, row, col, digitStr) &&
            checkColPlacement(puzzle, row, col, digitStr) &&
            checkRegionPlacement(puzzle, row, col, digitStr)
          ) {
            const updatedPuzzle = puzzle.slice(0, emptyCellIndex) + digitStr + puzzle.slice(emptyCellIndex + 1); // adding new digitStr to our string
            const solution = solveRecursive(updatedPuzzle);
  
            if (solution) {
              return solution;
            }
  
          }
        }
        return false;
      }
      return solveRecursive(puzzleString);
    }catch (error){
      return {error: error.message};
    }
  }
    
}

module.exports = SudokuSolver;

