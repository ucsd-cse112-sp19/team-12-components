import {expect, assert} from 'chai';
import '../jj-checkbox.js';

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
describe('jj-checkbox', function() {

  let compHTML;
  let compEl;

  before(function() {
    // runs before all tests in this block
    //place component into DOM, get the element by id
    compHTML = `<jj-input-number id="jj1" value="testingV" label="testingL"></jj-input-number>`;
    document.body.insertAdjacentHTML('afterbegin',compHTML);
    compEl = document.getElementById('jj1');
  });

  it('tests correct init value', function() {
    let compVal = compEl.getAttribute("value");
    assert.equal(compVal, "testingV");
  });

  it('tests correct label', function() {
    let compLab = compEl.getAttribute("label");
    assert.equal(compLab, "testingL");
  });

  it('tests correct disabled setting', function() {
    let compDis = compEl.hasAttribute("disabled");
    assert.equal(compDis, false);
  });

  it('tests correct checked value', function() {
    let compChe = compEl.hasAttribute("checked");
    assert.equal(compChe, false);
  });

  // TODO broken test
  it('tests checking the check box with clicking', function() {
    //currently no checked
    let checkbox_body = compEl.shadowRoot.querySelector("checkbox_body");
    triggerMouseEvent(checkbox_body, 'mousedown');
    triggerMouseEvent(checkbox_body, 'mouseup');
    let compValue = document.getElementById('jj1').hasAttribute("checked"); 
    assert.equal(compValue, true);
  })
});

