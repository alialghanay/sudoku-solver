const chai = require("chai");
const chaiHttp = require("chai-http");
const assert = chai.assert;
const server = require("../server");

chai.use(chaiHttp);

const pz =
  "..9..5.1.85.4....2432......1...69.83.9.....6.62.71...9......1945....4.37.4.3..6..";
const coordinate = "A1";
const value = 7;
const unValid = undefined;
const solution =
  "769235418851496372432178956174569283395842761628713549283657194516924837947381625";
const unsolvableSudoku =
  "53..7....6..195....58....6.8...6...34..8.3..17...2...6.6....28....419..5....8..79";

suite("Functional Tests", () => {
  suite("Integration tests with chai-http", function () {
    // #1
    test("Test NOT FOUND", function (done) {
      chai
        .request(server)
        .get("/test")
        .end(function (err, res) {
          assert.equal(res.status, 404);
          assert.equal(res.text, "Not Found");
          done();
        });
    });
    // #2
    test("post /api/check works", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .end((err, res) => {
          if (err) console.error(err);
          assert.equal(res.status, 400);
          done();
        });
    });
    // #3
    test("post /api/solve works", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .end((err, res) => {
          if (err) console.error(err);
          assert.equal(res.status, 400);
          done();
        });
    });
  });

  suite("test api solve", function () {
    //#4
    test("check if returned object will contain a solution", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: pz })
        .end((err, res) => {
          if (err) console.error(err);
          assert.equal(res.status, 200);
          assert.isString(pz);
          assert.isObject(res.body);
          assert.property(res.body, "solution");
          assert.isString(res.body.solution);
          done();
        });
    });

    // #5
    test("missing puzzle", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: unValid })
        .end((err, res) => {
          if (err) console.error(err);
          assert.equal(res.status, 400);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Required field missing");
          done();
        });
    });

    // #6
    test("contains values which are not numbers or periods", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: pz.replace("9", "x") })
        .end((err, res) => {
          if (err) console.error(err);
          assert.equal(res.status, 400);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Invalid characters in puzzle");
          done();
        });
    });

    // #7
    test("contains values which are not numbers or periods", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: pz + "." })
        .end((err, res) => {
          if (err) console.error(err);
          assert.equal(res.status, 400);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(
            res.body.error,
            "Expected puzzle to be 81 characters long"
          );
          done();
        });
    });

    // #8
    test("invalid or cannot be solved", (done) => {
      chai
        .request(server)
        .post("/api/solve")
        .send({ puzzle: unsolvableSudoku })
        .end((err, res) => {
          if (err) console.error(err);
          assert.equal(res.status, 400);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Puzzle cannot be solved");
          done();
        });
    });
  });

  suite("test api check", function () {
    // #9
    test("check if is it possible to post puzzle, coordinate, value", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: pz, coordinate, value })
        .end((err, res) => {
          if (err) console.error(err);
          assert.equal(res.status, 200);
          assert.lengthOf(pz, 81);
          assert.lengthOf(coordinate, 2);
          assert.isAtLeast(value, 1);
          assert.isAtMost(value, 9);
          assert.isNotEmpty(res.body);
          done();
        });
    });

    // #10
    test("check if returned is not valid", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: pz, coordinate, value: 8 })
        .end((err, res) => {
          if (err) console.error(err);
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.isFalse(res.body.valid);
          assert.isAtLeast(res.body.conflict.length, 1);
          assert.includeMembers(["row", "column", "region"], res.body.conflict);
          done();
        });
    });

    // #11
    test("check if returned valid", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: pz, coordinate, value })
        .end((err, res) => {
          if (err) console.error(err);
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.isTrue(res.body.valid);
          done();
        });
    });

    // #12
    test("check if returned valid when is already placed in puzzle on that coordinate,", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: pz, coordinate: "A3", value: 9 })
        .end((err, res) => {
          if (err) console.error(err);
          assert.equal(res.status, 200);
          assert.isObject(res.body);
          assert.isTrue(res.body.valid);
          done();
        });
    });

    // #13
    test("check if contains values which are not numbers or periods", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: pz.replace("9", "x"), coordinate, value })
        .end((err, res) => {
          if (err) console.error(err);
          assert.equal(res.status, 400);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Invalid characters in puzzle");
          done();
        });
    });

    // #14
    test("check if puzzle is greater or less than 81 characters", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: pz + "...", coordinate, value })
        .end((err, res) => {
          if (err) console.error(err);
          assert.equal(res.status, 400);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(
            res.body.error,
            "Expected puzzle to be 81 characters long"
          );
          done();
        });
    });

    test("check if puzzle, coordinate or value is missing", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: unValid, coordinate: unValid, value: unValid })
        .end((err, res) => {
          if (err) console.error(err);
          assert.equal(res.status, 400);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Required field(s) missing");
          done();
        });
    });

    test("check if does not point to an existing grid cell", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: pz, coordinate: "j10", value })
        .end((err, res) => {
          if (err) console.error(err);
          assert.equal(res.status, 400);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Invalid coordinate");
          done();
        });
    });

    test("check if submitted to /api/check is not a number between 1 and 9", function (done) {
      chai
        .request(server)
        .post("/api/check")
        .send({ puzzle: pz, coordinate, value: 10 })
        .end((err, res) => {
          if (err) console.error(err);
          assert.equal(res.status, 400);
          assert.isObject(res.body);
          assert.property(res.body, "error");
          assert.equal(res.body.error, "Invalid value");
          done();
        });
    });
  });
});
