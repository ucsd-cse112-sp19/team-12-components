import {expect, assert} from 'chai';
import '../jj-button.js';

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

//----------Unit Tests ------------------
describe('jj-button Component Unit Tests', () => {
    //place component into DOM, get the element by id
    let compHTML = `<jj-button id="btn" disabled="false" plain="true" round="true" type="primary" native-type="submit" autofocus="true" size="medium"></jj-button>`;
    document.body.insertAdjacentHTML('afterbegin',compHTML);
    let compEl = document.getElementById('btn');

  it('tests assigned type', async () => {
    let compType = compEl.type;
    assert.equal(compType, "primary");
  });

  it('tests assigned round', async () => {
    let compRound = compEl.round;
    assert.equal(compRound, true);
  });

  it('tests assigned plain', async () => {
    let compPlain = compEl.plain;
    assert.equal(compPlain, true);
  });

  it('tests assigned disabled', async () => {
    compEl.disabled = true;
    assert.equal(compEl.disabled, "true");
    compEl.disabled = false;
  });

  it('tests assigned circle', async () => {
    let compCircle = compEl.circle;
    assert.equal(compCircle, false);
  });

  it('tests assigned native-type', async () => {
    let compNType = compEl.native_type;
    assert.equal(compNType, "submit");
  });

  it('tests assigned autofocus', async () => {
    let compAutofocus = compEl.autofocus;
    assert.equal(compAutofocus, "true");
  });

  it('tests assigned size', async () => {
    let compSize = compEl.size;
    assert.equal(compSize, "medium");
  });
  
  it('Change Attribute Circle', async () => {
    compEl.circle = true;
    assert.equal(compEl.circle, true);
    compEl.circle = false;
  });
  
  it('Change Attribute Plain', async () => {
    compEl.plain = false;
    assert.equal(compEl.plain, false);
    compEl.plain = true;
  });

  it('Change Round Attribute', async () => {
    compEl.round = false;
    assert.equal(compEl.round, false);
    compEl.round = true;
  });
  
  let disabledCompHTML = `<jj-button disabled="true" id="disabled" circle="true" plain="true" round="true" type="primary" native-type="submit" autofocus="true" size="medium"></jj-button>`;
  document.body.insertAdjacentHTML('afterbegin',disabledCompHTML);
  let disabledCompEl = document.getElementById('disabled');

  it('Test Disabled button', async () => {
    assert.equal(disabledCompEl.disabled, "true");
  });

  it('Test Circle Attribue', async () => {
    assert.equal(disabledCompEl.circle, true);
  });
  //etc..
});
