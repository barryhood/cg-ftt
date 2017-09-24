/**
 * Created by brett.hadley on 10/10/2016.
 */

require('es6-promise').polyfill();
require('isomorphic-fetch');

const chai = require('chai');
const assertArrays = require('chai-arrays');
chai.use(assertArrays);
const expect = require('chai').expect;
const getData = require('../src/api').getData;
const server = require('../server');

describe("getData method:", function() {

    before(() => {
        server.listen(9988);
    });
    it('should respond with a non-empty Array of vehicles when passed a valid vehicles url', (done) => {
        const url = 'http://localhost:9988/api/vehicle';
        getData(url)
        .then((data) => {
            expect(data['data']['vehicles']).to.be.array();
            expect(data['data']['vehicles']).to.have.length.above(0);
            done();
        })
        .catch((err) => { console.log(err); })
    });

    it('should respond with a non-empty Object containing vehicle data when passed an individual vehicle url', (done) => {
        const url = 'http://localhost:9988/api/vehicle/xe';
        getData(url)
        .then((data) => {
            expect(data['data']).to.be.an('object');
            expect(Object.keys(data['data']).length).to.be.above(0);
            done();
        })
        .catch((err) => { console.log(err); })
    });

    it('should respond with an error flag and code when the server returns an error', (done) => {
        const url = 'http://httpstat.us/500';
        getData(url)
        .then((data) => {
            expect(data['isError']).to.equal(true);
            expect(data['errMsg']).to.have.length.above(0);
            done();
        })
        .catch((err) => { console.log(err); })
    });

});
