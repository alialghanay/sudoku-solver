const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');
let solver = new Solver;

suite('Unit Tests', () => {

    suite('validtion', function() {
        const pz = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
        const coordinate = "A1";
        const value = 5;
        const unValid = undefined;
        test('Parms Check', function() {
            assert.throws(solver.parmsCheck(pz, unValid, value), ReferenceError, "Required field(s) missing");
        })
    });

});
