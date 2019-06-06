import {expect, assert} from 'chai';
import '../jj-switch.js';

function wait(ms){
  var start = new Date().getTime();
  var end = start;
  while(end < start + ms) {
    end = new Date().getTime();
 }
}

//----------Unit Tests ------------------
describe('jj-switch Component Unit Tests', () => {
    // Place component into DOM, get the element by id
    let compHTML = `<jj-switch id="switch" inactive-text="Pay by the year" active-text="Pay by the month" inactive-color="#dcdfe6" active-color="#409eff" size="large" disabled="true"></jj-slider>`;
    document.body.insertAdjacentHTML('afterbegin',compHTML);
    let compEl = document.getElementById('switch');

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

  it('Test click on switch button', () => {
    // TODO:
    // what does "clientX: 1000" mean?
    let mouseDown = new MouseEvent('mousedown', {clientX: 1000});
    let mouseUp = new MouseEvent('mouseup');
    // let oldValue = parseInt(compEl.getAttribute('value'));
    compEl.shadowRoot.getElementById('slider').dispatchEvent(mouseDown);
    compEl.shadowRoot.getElementById('slider').dispatchEvent(mouseUp);
    // let newValue = parseInt(compEl.getAttribute('value'));
    // assert.isAbove(newValue, oldValue);
  });

});
