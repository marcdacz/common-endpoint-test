
describe("Common API Endpoint Tests", () => {
  let scenarios = helpers.getJsons(`${__root}/data/scenarios/`);
  console.log(JSON.stringify(scenarios));

  for (let scenario of scenarios) {
    it(`${scenario.name}`, () => {
      let mandatory = require('../data/mandatoryFields.js')();
      let person = Object.assign({}, mandatory, require('../data/scenarios/scenario1.json'))
      console.log(person);

      const str = "Hello guys!";
      expect(str).to.equal("Hello guys!")
    })
  };
})