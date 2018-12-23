
describe("Common API Endpoint Tests", () => {
  let scenarios = require('./scenarios');

  scenarios.map(scenario => {
    it(scenario.label, (done) => {
      let data = require('../data/base')

      if (scenario.request.fields) {
        for (const field of scenario.request.fields) {
          jsonpath.value(data, field.path, field.value)
        }
      }

      chai.request(baseURL)
        .post('/posts')
        .send(data)
        .end((err, res) => {
          expect(res.status).to.equal(scenario.response.status);

          if (scenario.response.fields) {
            for (const field of scenario.response.fields) {          
              expect(jsonpath.value(res.body, field.path)).to.equal(jsonpath.value(data, field.path))
            }
          }

          if (scenario.response.matchStrings) {
            for (const matchString of scenario.response.matchStrings) {          
              expect(res.text.match(matchString)).to.not.be.null
            }
          }

          done();
        })
    });
  })
})