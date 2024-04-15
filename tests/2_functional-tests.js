const chai = require("chai");
const chaiHttp = require('chai-http');
const assert = chai.assert;
const server = require('../server');

chai.use(chaiHttp);

suite('Functional Tests', () => {
    suite('Integration tests with chai-http', function () {
        // #1
        test('Test NOT FOUND', function (done) {
          chai
            .request(server)
            .get('/test')
            .end(function (err, res) {
              assert.equal(res.status, 404);
              assert.equal(res.text, 'Not Found');
              done();
            });
        });
        // #2

    
  });
});

