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
    let compHTML = `<jj-button id="btn" plain="true" round="true" type"primary" native-type="submit" autofocus="true" size="medium"></jj-slider>`;
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
    let compDisabled = compEl.disabled;
    assert.equal(compDisabled, "false");
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
  //etc..
});
