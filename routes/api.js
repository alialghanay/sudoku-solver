"use strict";

const Sudokufunctions = require("./sudokuFunctions.js");

module.exports = function (app) {
  let solver = new Sudokufunctions();

  app.route("/api/check").post((req, res) => {
    const { puzzle, coordinate, value } = req.body;
    let result = solver.sudokuValidation(puzzle, coordinate, value);
    if (result.error) res.status(400).json(result);
    res.json(result);
  });

  app.route("/api/solve").post((req, res) => {
    const { puzzle } = req.body;
    let result = solver.sudokuSoltion(puzzle);
    if (result.error) res.status(400).json(result);
    res.json(result);
  });
};
