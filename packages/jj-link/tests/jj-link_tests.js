import {expect, assert} from 'chai';
import '../jj-link.js';

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

//----------Unit Tests ------------------
describe('jj-link Component Unit Tests', () => {
    //place component into DOM, get the element by id
    let compHTML = `<jj-link href="https://element.eleme.io" underline = "true" type = "danger" disabled = 'true'>default</jj-link>`;
    document.body.insertAdjacentHTML('afterbegin',compHTML);
    let compEl = document.getElementById('link');

  it('tests assigned type', async () => {
    let compType = compEl.type;
    assert.equal(compType, "danger");
  });

  it('tests assigned underline', async () => {
    let compUnderline = compEl.underline;
    assert.equal(compUnderline, "true");
  });

  it('tests assigned disabled', async () => {
    let compDisabled = compEl.disabled;
    assert.equal(compDisabled, "false");
  });

  //etc..
});