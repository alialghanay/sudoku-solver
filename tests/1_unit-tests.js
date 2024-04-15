const chai = require('chai');
const assert = chai.assert;

const Solver = require('../controllers/sudoku-solver.js');

let solver = new Solver;
const pz = "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const coordinate = "A1";
const value = 5;
const unValid = undefined;
const solution = "769235418851496372432178956174569283395842761628713549283657194516924837947381625";
const unsolvableSudoku = "53..7....6..195....58....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79";

suite('Unit Tests', () => {

    suite('validtion', function() {
        // #1
        test('Required field(s) missing', function(done) {
            assert.throws(() => solver.parmsCheck(pz, unValid, value), "Required field(s) missing");
            done();
        });
        
        // #2
        test('Invalid value', function(done) {
            assert.throws(() => solver.parmsCheck(pz, coordinate, "10"), "Invalid value");
            done();
        });

        // #3
        test('Invalid coordinate', function(done) {
            assert.throws(() => solver.coordinateConverter('55'), "Invalid coordinate");
            done();
        });

        // #4
        test('Expected puzzle to be 81 characters long', function(done) {
            assert.throws(() => solver.validate(pz + "....."), "Expected puzzle to be 81 characters long");
            assert.throws(() => solver.validate(pz.replace("9", "x")), "Invalid characters in puzzle");
            done();
        });

        // #5
        test('Invalid characters in puzzle', function(done) {
            assert.throws(() => solver.validate(pz.replace("9", "x")), "Invalid characters in puzzle");
            done();
        });

        // #6
        test('Unsolvable Sudoku', function(done) {
            assert.isFalse(solver.solve(unsolvableSudoku));
            done();
        })
    });

    suite('Coordinate Converter', function() {
        
        // #7
        test('Convert Coordinate to be array', function(done) {
            assert.deepEqual(solver.coordinateConverter(coordinate), [0, 0]);
            done();
        });

    });

    suite('Check Placement', function() {
        
        // #8
        test('Check Cell Placement', function(done) {
            assert.isFalse(solver.checkCellPlacement(pz, 0, 0, value));
            assert.isTrue(solver.checkCellPlacement(pz, 0, 2, 9));
            done();
        });

        // #9
        test('Check Row Placement', function(done) {
            assert.isFalse(solver.checkRowPlacement(pz, 0, 0, value));
            assert.isTrue(solver.checkRowPlacement(pz, 0, 2, 8));
            done();
        });

        // #10
        test('Check Column Placement', function(done) {
            assert.isFalse(solver.checkColPlacement(pz, 0, 0, value));
            assert.isTrue(solver.checkColPlacement(pz, 0, 0, 9));
            done();
        });

        // #11
        test('Check Region Placement', function(done) {
            assert.isFalse(solver.checkRegionPlacement(pz, 0, 0, value));
            assert.isTrue(solver.checkRegionPlacement(pz, 0, 0, 6));
            done();
        });

    });

    suite('Solve Sudoku', function() {

        // #12
        test('Solve', function(done) {
            assert.equal(solver.solve(pz), solution);
            done();
        });

    })

});
