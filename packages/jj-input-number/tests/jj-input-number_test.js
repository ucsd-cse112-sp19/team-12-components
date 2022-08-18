import {expect, assert} from 'chai';
import '../jj-input-number.js';

/**
 * Triggers a mouse event so that we can simulate mousedown, mouseup,
 * mouseenter, etc...
 *
 * Source: https://stackoverflow.com/questions/24025165/simulating-a-mousedown-click-mouseup-sequence-in-tampermonkey
 */
function triggerMouseEvent (node, eventType) {
    var clickEvent = document.createEvent ('MouseEvents');
    clickEvent.initEvent (eventType, true, true);
    node.dispatchEvent (clickEvent);
}

function wait(ms){                                                              
    var start = new Date().getTime();                                             
    var end = start;                                                              
    while(end < start + ms) {                                                     
        end = new Date().getTime();                                                 
    }                                                                              
}  

//----------Unit Tests ------------------
describe('jj-input-number with defined [min, max, value, precision, step]', function() {

  let compHTML;
  let compEl;

  before(function() {
    // runs before all tests in this block
    //place component into DOM, get the element by id
    compHTML = `<jj-input-number id="jj1" min=0 max=8 value=1 precision=2 step=0.5 size="large" placeholder="test"></jj-input-number>`;
    document.body.insertAdjacentHTML('afterbegin',compHTML);
    compEl = document.getElementById('jj1');
  });

  it('tests correct init value', function() {
    let compVal = compEl.value;
    assert.equal(compVal, 1);
  });

  it('tests correct min value', function() {
    let compMin = compEl.getAttribute("min");
    assert.equal(compMin, 0);
  });

  it('tests correct max value', function() {
    let compMax = compEl.getAttribute("max");
    assert.equal(compMax, 8);
  });

  it('tests correct precision value', function() {
    let compPrecision = compEl.precision;
    assert.equal(compPrecision, 2);
  });

  it('tests correct step value', function() {
    let compStep = compEl.step;
    assert.equal(compStep, 0.5);
  });

  it('tests increment button increases inner value', function() {
    //currently value = 1.00 (see above)

    //go into shadow dom of component, find inc button
    //trigger inc click x1
    let incButton = document.getElementById('jj1').shadowRoot.getElementById("incrementBtn");
    triggerMouseEvent(incButton, 'mousedown');
    triggerMouseEvent(incButton, 'mouseup');
    //get value in the input textbox
    let compValue = document.getElementById('jj1').shadowRoot.getElementById('jj-inputBoxNum').value; 
    assert.equal(compValue, 1.50);

    //trigger inc click x2
    incButton = document.getElementById('jj1').shadowRoot.getElementById("incrementBtn");
    triggerMouseEvent(incButton, 'mousedown');
    triggerMouseEvent(incButton, 'mouseup');
    //must recheck the value again in shadowDOM, otherwise it won't update
    compValue = document.getElementById('jj1').shadowRoot.getElementById('jj-inputBoxNum').value;
    assert.equal(compValue, 2.00);
    //set back to default for other tests
    document.getElementById('jj1').shadowRoot.getElementById('jj-inputBoxNum').value = 1.0;
  })

  it('tests decrement buttons decreases the inner value', function() {
    //currently value = 1.00 (see above)

    //go into shadow dom of component, find dec button
    //trigger dec click x1
    let decButton = document.getElementById('jj1').shadowRoot.getElementById("decrementBtn");
    triggerMouseEvent(decButton, 'mousedown');
    triggerMouseEvent(decButton, 'mouseup');
    //get value in the input textbox
    let compValue = compEl.value;
    assert.equal(compValue, 1.50);

    //trigger dec click x2
    decButton = document.getElementById('jj1').shadowRoot.getElementById("decrementBtn");
    triggerMouseEvent(decButton, 'mousedown');
    triggerMouseEvent(decButton, 'mouseup');

    //must recheck the value again in shadowDOM, otherwise it won't update
    compValue = compEl.value;
    assert.equal(compValue, 1.00);
    //set back to default for other tests
    compEl.value = 1.0;
  })
 
  it('tests if we can decrease jj-input-number with "disabled" _boolean attribue_', function() {
    let savedDisabledValue = compEl.getAttribute('disabled'); // Save disabled value.
    compEl.setAttribute('disabled', ''); // Set the component as disabled.

    let oldValue = compEl.value;
    let decButton = document.getElementById('jj1').shadowRoot.getElementById("decrementBtn");
    triggerMouseEvent(decButton, 'mousedown');
    triggerMouseEvent(decButton, 'mouseup');

    assert.equal(compEl.value, oldValue);

    // reset disable value.
    if (savedDisabledValue == null) {
      compEl.removeAttribute('disabled');
    } else {
      compEl.setAttribute('disabled', savedDisabledValue);
    }
  });

  it('tests if we can increase jj-input-number with "disabled" _boolean attribue_', function() {
    //compEl.removeAttribute('disabled');
    let savedDisabledValue = compEl.getAttribute('disabled'); // Save disabled value.
    compEl.setAttribute('disabled', ''); // Set the component as disabled.

    let incButton = document.getElementById('jj1').shadowRoot.getElementById("incrementBtn");
    let oldValue = compEl.value;

    triggerMouseEvent(incButton, 'mousedown');
    triggerMouseEvent(incButton, 'mouseup');

    assert.equal(compEl.value, oldValue);

    // reset disable value.
    if (savedDisabledValue == null) {
      compEl.removeAttribute('disabled');
    } else {
      compEl.setAttribute('disabled', savedDisabledValue);
    }
  });

  it('tests if we can decrease when jj-input-number using "disabled" attribue', function() {
    let savedDisabledValue = compEl.getAttribute('disabled');

    compEl.setAttribute('disabled', 'true'); // Set the component as disabled.
    let oldValue = compEl.value;
    
    let decButton = document.getElementById('jj1').shadowRoot.getElementById("decrementBtn");
    triggerMouseEvent(decButton, 'mousedown');
    triggerMouseEvent(decButton,'mouseup');
    assert.equal(compEl.value, oldValue);

    // reset disable value.
    if (savedDisabledValue == null) {
      compEl.removeAttribute('disabled');
    } else {
      compEl.setAttribute('disabled', savedDisabledValue);
    }
  });

 it('tests if we can increase when jj-input-number using "disabled" attribue', function() {
   let savedDisabledValue = compEl.getAttribute('disabled');

   compEl.setAttribute("disabled", "true"); // Set the component as disabled.

   let incButton = document.getElementById('jj1').shadowRoot.getElementById("incrementBtn");
   let oldValue = compEl.value;

   triggerMouseEvent(incButton, 'mousedown');
   triggerMouseEvent(incButton,'mouseup');
   assert.equal(compEl.value, oldValue);

   // reset disable value.
   if (savedDisabledValue == null) {
       compEl.removeAttribute('disabled');
   } else {
       compEl.setAttribute('disabled', savedDisabledValue);
   }
 });

 it("Test size attribute", async () => {
   let value = compEl.getAttribute("size");
   assert.equal(value, "large");
 });

 it("Test placeholder", async () =>{
   let value = compEl.getAttribute("placeholder");
   assert.equal(value, "test"); 
 });

 it("Test on hover for increment button", async () => {
  let incButton = document.getElementById('jj1').shadowRoot.getElementById("incrementBtn");
  triggerMouseEvent(incButton, 'mouseover');
  assert.equal(incButton.classList.contains("color-blue"), true);
 });

 it("Test on hover for decrement button", async () => {
  let decButton = document.getElementById('jj1').shadowRoot.getElementById("decrementBtn");
  triggerMouseEvent(decButton, 'mouseover');
  assert.equal(decButton.classList.contains("color-blue"), true);
 });
    //etc..
});

