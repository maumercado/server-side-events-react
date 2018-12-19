const request = require("supertest");
const { startServer } = require("../../../api/initializers");
const config = require("../../../config");

describe("#### API Heartbeat ####", () => {
    let API;
    beforeAll(done => {
        startServer(config)
            .then(api => {
                API = api;
                done();
            })
            .catch(done);
    });

    afterAll(done => {
        API.close(done);
    });

    test("It should respond with 200 for GET /ping method", done => {
        return request(API)
            .get("/ping")
            .expect(200)
            .end(done);
    });
});
