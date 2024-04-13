const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver();
class Sudokufunctions {
  sudokuValidation(puzzle, coordinate, value){
      try{
        solver.parmsCheck(puzzle, coordinate, value);
        const isValid = solver.validate(puzzle);
        const coordinateArray = solver.coordinateConverter(coordinate);
        const rowCheck = solver.checkRowPlacement(puzzle, coordinateArray[1], coordinateArray[0], value);
        const colCheck = solver.checkColPlacement(puzzle, coordinateArray[1], coordinateArray[0], value);
        const regionCheck = solver.checkRegionPlacement(puzzle, coordinateArray[1], coordinateArray[0], value);
        const cellCheck = solver.checkCellPlacement(puzzle, coordinateArray[1], coordinateArray[0], value);
        let valid = rowCheck && colCheck && regionCheck || cellCheck;
        if(!valid){
          let conflict = [];
          if(!rowCheck) conflict.push('row');
          if(!colCheck) conflict.push('column');
          if(!regionCheck) conflict.push('region');
          return {valid : valid, conflict : conflict};
        }
        return {valid : isValid};
      }catch (error){
        return {error: error.message};
      }
  }

  sudokuSoltion(puzzle){
      if(puzzle === undefined || puzzle === null) puzzle = "";
      let result = solver.solve(puzzle);
      if(result.error){
        return result;
      }else if(result === false) {
        return {error: 'Puzzle cannot be solved'}
      }
      else{
        return {solution: result}
      }
  }
}


module.exports = Sudokufunctions;