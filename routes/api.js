'use strict';

const Sudokufunctions = require('./sudokuFunctions.js');

module.exports = function (app) {
  
  let solver = new Sudokufunctions();

  app.route('/api/check')
    .post((req, res) => {
      const {puzzle, coordinate, value} = req.body;
      console.log(puzzle, coordinate, value);
      let result = solver.sudokuValidation(puzzle, coordinate, value);
      console.log(result);
      res.json(result);
    });
    
  app.route('/api/solve')
    .post((req, res) => {
      const { puzzle } = req.body;
      let result = solver.sudokuSoltion(puzzle);
      res.json(result);
    });
};
