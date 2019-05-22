import {expect, assert} from 'chai';
import '../jj-input-number.js';

//----------Unit Tests ------------------
describe('jj-input-number Component Unit Tests', function() {

  let compHTML;
  let compEl;

  before(function() {
    // runs before all tests in this block
    //place component into DOM, get the element by id
    compHTML = `<jj-input-number id="jj1" min=0 max=8 value=1 precision=2 step=0.5></jj-input-number>`;
    document.body.insertAdjacentHTML('afterbegin',compHTML);
    compEl = document.getElementById('jj1');
  });

  it('Test Min value', function() {
    let compMin = compEl.getAttribute("min");
    assert.equal(compMin, 0);
  });

  it('Test Max value', function() {
    let compMax = compEl.getAttribute("max");
    assert.equal(compMax, 8);
  });

  it('Test Increment Button Clicks', function() {
    //currently value = 1.00 (see above)

    //go into shadow dom of component, find inc button
    //trigger inc click x1
    document.getElementById('jj1').shadowRoot.getElementById("incrementBtn").click();
    //get value in the input textbox
    let compValue = document.getElementById('jj1').shadowRoot.getElementById('jj-inputBoxNum').value; 
    assert.equal(compValue, 1.50);

    //trigger inc click x2
    document.getElementById('jj1').shadowRoot.getElementById("incrementBtn").click();
    //must recheck the value again in shadowDOM, otherwise it won't update
    compValue = document.getElementById('jj1').shadowRoot.getElementById('jj-inputBoxNum').value;
    assert.equal(compValue, 2.00);
    //set back to default for other tests
    document.getElementById('jj1').shadowRoot.getElementById('jj-inputBoxNum').value = 1.0;
  })


  it('Test Decrement Button Clicks', function() {
    //currently value = 1.00 (see above)

    //go into shadow dom of component, find dec button
    //trigger dec click x1
    document.getElementById('jj1').shadowRoot.getElementById("decrementBtn").click();
    //get value in the input textbox
    let compValue = document.getElementById('jj1').shadowRoot.getElementById('jj-inputBoxNum').value; 
    assert.equal(compValue, 1.50);

    //trigger dec click x2
    document.getElementById('jj1').shadowRoot.getElementById("decrementBtn").click();
    //must recheck the value again in shadowDOM, otherwise it won't update
    compValue = document.getElementById('jj1').shadowRoot.getElementById('jj-inputBoxNum').value;
    assert.equal(compValue, 1.00);
    //set back to default for other tests
    document.getElementById('jj1').shadowRoot.getElementById('jj-inputBoxNum').value = 1.00;
  })


  //etc..
});
