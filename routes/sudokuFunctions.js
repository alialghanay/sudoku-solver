const SudokuSolver = require('../controllers/sudoku-solver.js');
let solver = new SudokuSolver();
class Sudokufunctions {
  sudokuValidation(puzzle, coordinate, value){
      try{
        const isValid = solver.validate(puzzle);
        const coordinateArray = solver.coordinateConverter(coordinate);
        const rowCheck = solver.checkRowPlacement(puzzle, coordinateArray[1], coordinateArray[0], value);
        const colCheck = solver.checkColPlacement(puzzle, coordinateArray[1], coordinateArray[0], value);
        const regionCheck = solver.checkRegionPlacement(puzzle, coordinateArray[1], coordinateArray[0], value);
        let valid = rowCheck && colCheck && regionCheck;
        if(!valid){
          let conflict = [];
          if(!rowCheck) conflict.push('row');
          if(!colCheck) conflict.push('column');
          if(!regionCheck) conflict.push('region');
          return {valid : valid, conflict : conflict};
        }
        return {valid : isValid};
      }catch (error){
        return error.message;
      }
  }

  sudokuSoltion(puzzle){
    let result = {solution: solver.solve(puzzle)}
    return result;
  }
}


module.exports = Sudokufunctions;