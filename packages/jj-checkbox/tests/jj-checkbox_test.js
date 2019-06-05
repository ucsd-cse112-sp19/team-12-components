import { expect, assert } from "chai";
import "../jj-checkbox.js";

/**
 * Triggers a mouse event so that we can simulate mousedown, mouseup,
 * mouseenter, etc...
 *
 * Source: https://stackoverflow.com/questions/24025165/simulating-a-mousedown-click-mouseup-sequence-in-tampermonkey
 */
function triggerMouseEvent(node, eventType) {
  var clickEvent = document.createEvent("MouseEvents");
  clickEvent.initEvent(eventType, true, true);
  node.dispatchEvent(clickEvent);
}

function wait(ms) {
  var start = new Date().getTime();
  var end = start;
  while (end < start + ms) {
    end = new Date().getTime();
  }
}

//----------Unit Tests ------------------
describe("jj-checkbox", function() {
  let compHTML;
  let compEl;
  let compEl2;


  before(function() {
    // runs before all tests in this block
    //place component into DOM, get the element by id
    compHTML = `<jj-checkbox id="jj1" value="testingV" label="testingL"></jj-checkbox> <jj-checkbox id="jj2" value="testingV" label="testingL" disabled></jj-checkbox>`;
    document.body.insertAdjacentHTML("afterbegin", compHTML);
    compEl = document.getElementById("jj1");
    compEl2 = document.getElementById("jj2");
  });

  it("tests correct init value", function() {
    let compVal = compEl.getAttribute("value");
    assert.equal(compVal, "testingV");
  });

  it("tests correct label", function() {
    let compLab = compEl.getAttribute("label");
    assert.equal(compLab, "testingL");
  });

  it("tests correct disabled setting", function() {
    let compDis = compEl.hasAttribute("disabled");
    assert.equal(compDis, false);
  });

  it("tests correct checked value", function() {
    let compChe = compEl.hasAttribute("checked");
    assert.equal(compChe, false);
  });

  it("tests checking the check box with clicking", function() {
    //currently no checked
    let compValue = document.getElementById("jj1").hasAttribute("checked");
    assert.equal(compValue, false);

    let checkbox_body = compEl.shadowRoot.querySelector("#checkbox_body");
    triggerMouseEvent(checkbox_body, "mousedown");
    triggerMouseEvent(checkbox_body, "mouseup");

    compValue = document.getElementById("jj1").hasAttribute("checked");
    assert.equal(compValue, true);
  });

  it("tests checking the disabled check box with clicking", function() {
    //currently no checked
    let compValue = document.getElementById("jj2").hasAttribute("checked");
    assert.equal(compValue, false);

    compValue = document.getElementById("jj2").hasAttribute("disabled");
    assert.equal(compValue, true);

    let checkbox_body = compEl.shadowRoot.querySelector("#checkbox_body");
    triggerMouseEvent(checkbox_body, "mousedown");
    triggerMouseEvent(checkbox_body, "mouseup");

    // should not be checked since it is disabled 
    compValue = document.getElementById("jj2").hasAttribute("checked");
    assert.equal(compValue, false);
  });
});
