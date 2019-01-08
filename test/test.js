describe("Common API Endpoint Tests", () => {
  let scenarios = helpers.requireUncached(`${__root}/test/scenarios.json`);

  scenarios.map(scenario => {
    it(scenario.label, function(done) {
      let data = helpers.requireUncached(`../data/${scenario.request.baseJSON}.json`);

      if (scenario.request.fields) {
        for (const field of scenario.request.fields) {
          jsonpath.value(data, field.path, field.value);
        }
      }

      chai
        .request(baseURL)
        .post("/posts")
        .send(data)
        .end((err, res) => {

          let isFailed;

          // Check Response Status
          if (res.status != scenario.response.status) {
            isFailed = true;
          }

          // Check Response Fields
          if (scenario.response.fields) {
            for (const field of scenario.response.fields) {
              let expectedValue = field.value;
              let actualValue = jsonpath.value(res.body, field.path);              
              if (actualValue != expectedValue) {
                isFailed = true;
              }
    
            }
          }

          // Check Match Strings
          if (scenario.response.matchStrings) {
            for (const matchString of scenario.response.matchStrings) {
              if (res.text.match(matchString) === null) {
                isFailed = true;
              }
            }
          }
          
          addContext(this, {
            title: 'Test Data',
            value: {
              Request: data,
              Response: res
            }
          });

          if (isFailed) {
            done(new Error('Test failed! See report for more details.'));
          } else {
            done();
          }
          
        });
    });
  });
});
