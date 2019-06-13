import {expect, assert} from 'chai';
import '../jj-switch.js';

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

// Triggers mouse events to simulate mousedown, mouseup, etc. 
function triggerMouseEvent(node, eventType) {
  var clickEvent = document.createEvent("MouseEvents");
  clickEvent.initEvent(eventType, true, true);
  node.dispatchEvent(clickEvent);
}

//----------Unit Tests ------------------
describe('jj-switch Component Unit Tests', () => {

  // Initialize variables
  let compHTML;
  let compEl;

  // Place component into DOM, get the element by id
  before(function() {
    compHTML = `<jj-switch id="switch" inactive-text="Pay by the year" active-text="Pay by the month" inactive-color="#dcdfe6" active-color="#409eff" size="large" disabled="true" value="true"></jj-slider>`;
    document.body.insertAdjacentHTML('afterbegin', compHTML);
    compEl = document.getElementById('switch');
  });

  it('tests that the value attribute is set and retrievable', async () => {
    let compValue = compEl.value;
    assert.equal(compValue, "true");
  });

  it('tests that the inactive-text attribute is set and retrievable', async () => {
    let compInactiveText = compEl.inactive_text;
    assert.equal(compInactiveText, "Pay by the year");
  });

  it('tests that the active-text attribute is set and retrievable', async () => {
    let compActiveText = compEl.active_text;
    assert.equal(compActiveText, "Pay by the month");
  });

  it('tests that the inactive-color attribute is set and retrievable', async () => {
    let compInactiveColor = compEl.inactive_color;
    assert.equal(compInactiveColor, "#dcdfe6");
  });

  it('tests that the active-color attribute is set and retrievable', async () => {
    let compActiveColor = compEl.active_color;
    assert.equal(compActiveColor, "#409eff");
  });

  it('tests that the size attribute is set and retrievable', async () => {
    let compSize = compEl.size;
    assert.equal(compSize, "large");
  });

  it('tests that the disabled attribute is set and retrievable', async () => {
    let compDisabled = compEl.disabled;
    assert.equal(compDisabled, "true");
  });

  it('tests that the aria-checked is set and retrievable', async () => {
    let compChecked = compEl.shadowRoot.querySelector('.el-switch').getAttribute("aria-checked");
    assert.equal(compChecked, "true");
  });

  // it("tests clicking on the switch", function() {
  //   //currently no checked
  //   let compValue = compEl.shadowRoot.querySelector("#myinput").hasAttribute("checked");
  //   assert.equal(compValue, true);

  //   let switchContainer = compEl.shadowRoot.querySelector(".el-switch");
  //   triggerMouseEvent(switchContainer, "mousedown");
  //   triggerMouseEvent(switchContainer, "mouseup");

  //   // should not be checked since it is disabled 
  //   //compValue = document.getAttribute("value").hasAttribute("checked");
  //   compValue = compEl.shadowRoot.querySelector("#myinput").hasAttribute("checked");
  //   assert.equal(compValue, false);
  // });

});
