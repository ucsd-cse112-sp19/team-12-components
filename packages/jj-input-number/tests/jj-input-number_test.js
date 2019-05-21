import {expect, assert} from 'chai';
import '../jj-input-number.js';
import $ from "jquery";

//----------Unit Tests ------------------
describe('jj-input-number Component Unit Tests', () => {
    //place component into DOM, get the element by id
    let compHTML = `<jj-input-number id="jj1" min=0 max=8 value=1 precision=2 step=0.5></jj-input-number>`;
    document.body.insertAdjacentHTML('afterbegin',compHTML);
    let compEl = document.getElementById('jj1');

  it('Test Min value', async () => {
    let compMin = compEl.getAttribute("min");
    assert.equal(compMin, 0);
  });

  it('Test Max value', async () => {
    let compMax = compEl.getAttribute("max");
    assert.equal(compMax, 8);
  });

  it('Test Increment Button Click', async () => {
    //need to wait for page to be done for jquery
    $(document).ready(function() {
    //get shadow dom of component
    let buttonInc = document.getElementById('jj1').shadowRoot;
    //get value attribute
    let compValue = document.getElementById('jj1').getAttribute("value"); 
    console.log(compValue);
    //trigger click x1
    $("incrementBtn", buttonInc).click();
    assert.equal(compValue, 1.50);
    console.log(compValue);
    //trigger click x2
    $("incrementBtn", buttonInc).click();
    assert.equal(compValue, 2.00);
    })
  })

  //etc..
});
