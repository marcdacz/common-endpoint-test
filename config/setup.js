global.chai = require('chai');
global.expect = chai.expect;
global.should = chai.should();
chai.use(require('chai-http'));
chai.use(require('chai-json-schema'));

global.faker = require('faker');
global.fs = require('fs');
global.path = require('path');

global.helpers = require('../methods/helpers');
global.__root = path.resolve(__dirname, '..');
