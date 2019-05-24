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

  it('Test click on runway to the right of the button', () => {
    let mouseDown = new MouseEvent('mousedown', {clientX: 1000});
    let mouseUp = new MouseEvent('mouseup');
    let oldValue = parseInt(compEl.getAttribute('value'));
    compEl.shadowRoot.getElementById('runway').dispatchEvent(mouseDown);
    compEl.shadowRoot.getElementById('runway').dispatchEvent(mouseUp);
    let newValue = parseInt(compEl.getAttribute('value'));
    assert.isAbove(newValue, oldValue);
  });

  
  it('Test click on runway to the left of the button', () => {
    let mouseDown = new MouseEvent('mousedown');
    let mouseUp = new MouseEvent('mouseup');
    let oldValue = parseInt(compEl.getAttribute('value'));
    compEl.shadowRoot.getElementById('runway').dispatchEvent(mouseDown);
    compEl.shadowRoot.getElementById('runway').dispatchEvent(mouseUp);
    let newValue = parseInt(compEl.getAttribute('value'));
    assert.isBelow(newValue, oldValue);
  });
  //etc..
});
