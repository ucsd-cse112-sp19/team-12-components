import {expect, assert} from 'chai';
import '../jj-slider.js';

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

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

  // Bug: value is not being updated after the event (tested the same code in Google Chrome)
  it('Test move slider to the right', () => {
    let mouseDown = new MouseEvent('mousedown', {movementX: 50});
    let mouseUp = new MouseEvent('mouseup');
    let oldValue = parseInt(compEl.getAttribute('value'));
    compEl.shadowRoot.getElementById('btn').dispatchEvent(mouseDown);
    compEl.shadowRoot.getElementById('btn').dispatchEvent(mouseUp);
    wait(1000);
    let newValue = parseInt(compEl.getAttribute('value'));
    assert.isAbove(newValue, oldValue);
  });

  // Bug: same as above, tested in Google Chrome
  it('Test move slider to the left', () => {
    let mouseDown = new MouseEvent('mousedown', {movementX: -50});
    let mouseUp = new MouseEvent('mouseup');
    let oldValue = parseInt(compEl.getAttribute('value'));
    compEl.shadowRoot.getElementById('btn').dispatchEvent(mouseDown);
    compEl.shadowRoot.getElementById('btn').dispatchEvent(mouseUp);
    wait(1000);
    let newValue = parseInt(compEl.getAttribute('value'));
    assert.isBelow(newValue, oldValue);
  });
  //etc..
});
