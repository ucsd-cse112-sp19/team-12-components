import {expect, assert} from 'chai';
import '../jj-slider.js';


//----------Unit Tests ------------------
describe('jj-slider Component Unit Tests', () => {
    //place component into DOM, get the element by id
    let compHTML = `<jj-slider id="inputNum" value=35 min=0 max=50></jj-slider>`;
    document.body.insertAdjacentHTML('afterbegin',compHTML);
    let compEl = document.getElementById('inputNum');

  it('Test Value attribute', async () => {
    let compValue = compEl.getAttribute("value");
    assert.equal(compValue, 35);
  });

  it('Test Min value', async () => {
    let compMin = compEl.getAttribute("min");
    assert.equal(compMin, 0);
  });

  it('Test Max value', async () => {
    let compMax = compEl.getAttribute("max");
    assert.equal(compMax, 50);
  });

  //etc..
});
