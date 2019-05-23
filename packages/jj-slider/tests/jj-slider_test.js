import {expect, assert} from 'chai';
import '../jj-slider.js';


//----------Unit Tests ------------------
describe('jj-slider Component Unit Tests', () => {
    //place component into DOM, get the element by id
    let compHTML = `<jj-slider id="inputNum" value=35 min=0 max=50></jj-slider>`;
    document.body.insertAdjacentHTML('afterbegin',compHTML);
    let compEl = document.getElementById('inputNum');

  it('tests assigned value', async () => {
    let compValue = compEl.value;
    assert.equal(compValue, 35);
  });

  it('tests assigned min value', async () => {
    let compMin = compEl.min;
    assert.equal(compMin, 0);
  });

  it('tests assigned max value', async () => {
    let compMax = compEl.max;
    assert.equal(compMax, 50);
  });

});
