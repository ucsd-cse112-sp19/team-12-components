//----------Future home for Unit Tests ------------------
// not working yet, only have in-browser tests so far



/* eslint-disable no-unused-expressions */
//import fixture from '../node_modules/@open-wc/testing/index';
//import expect from '../node_modules/@open-wc/testing/index.js';
//import { assert } from '../node_modules/chai';
//const expect = require('chai').expect; 
//const fixture = require('mocha').fixture;

//let assert = chai.assert;
//let should = chai.should();
//let expect = chai.expect;

//import '../hw.js';
//import component from '../hw.js'; 





//----------Unit Tests ------------------
describe('Component Unit Tests', () => {
    it('Spanish text update', async () => {
      let hwComponent = document.getElementById('hw-comp');
      hwComponent.setAttribute("language", "spanish");
      let hwText = hwComponent.innerText;
      assert.equal(hwText, 'Hola Shaya!');
    });

    it('French text update', async () => {
      let hwComponent = document.getElementById('hw-comp');
      hwComponent.setAttribute("language", "french");
      let hwText = hwComponent.innerText;
      assert.equal(hwText, 'Salut Shaya!');
    });

    it('English text update', async () => {
      let hwComponent = document.getElementById('hw-comp');
      hwComponent.setAttribute("language", "english");
      let hwText = hwComponent.innerText;
      assert.equal(hwText, 'Hello Shaya!');
    });
});