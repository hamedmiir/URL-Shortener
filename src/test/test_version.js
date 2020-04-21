const http = require('http');

const chai = require('chai');
const chaiSubset = require('chai-subset');
import { Given } from 'rest-bdd-testing';

import app from '../app';
const packageJson = require('../../package.json');


const expect = chai.expect;
chai.use(chaiSubset);

describe('GET /apiv1/version', function() {
    let server, given;

    before(function(done) {
        server = http.createServer(app);
        server.listen(0, 'localhost', done);
    });

    after(function(done) {
        given.end();
        server.close(done);
    });

    it('should GET the version', async function() {
        given = new Given(server, 'Get version', 'Getting version', {
            url: '/apiv1/version'
        });

        const fulfilledGiven = await given.requestBaseCall();
        const response = fulfilledGiven.response.toJson();

        expect(response).to.containSubset({
            status: 200,
            json: { version: packageJson.version }
        });
    });
});