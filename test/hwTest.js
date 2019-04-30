import {expect, assert} from 'chai';
import '../core_hello.js';


//----------Unit Tests ------------------
describe('Component Unit Tests', () => {
  it('Non Spec Language (Default) Inner Text', async () => {
    let hwHTML = `<hello-world id='hw1'>Shaya!</hello-world>`;
    document.body.insertAdjacentHTML('afterbegin',hwHTML);
    let hwEl = document.getElementById('hw1');
    let hwText = hwEl.innerText;
    console.log("Component text: ", hwText);
    assert.equal(hwText, 'Hello Shaya!');
  });

  it('Spanish Inner Text', async () => {
    let hwHTML = `<hello-world id='hw2' language='spanish'>Shaya!</hello-world>`;
    document.body.insertAdjacentHTML('afterbegin',hwHTML);
    let hwEl = document.getElementById('hw2');
    let hwText = hwEl.innerText;
    console.log("Component text: ", hwText);
    assert.equal(hwText, 'Hola Shaya!');
    assert.equal(hwEl.getAttribute('language'),'spanish');
  });

  it('French Inner Text', async () => {
    let hwHTML = `<hello-world id='hw3' language='french'>Shaya!</hello-world>`;
    document.body.insertAdjacentHTML('afterbegin',hwHTML);
    let hwEl = document.getElementById('hw3');
    let hwText = hwEl.innerText;
    console.log("Component text: ", hwText);
    assert.equal(hwText, 'Salut Shaya!');
    assert.equal(hwEl.getAttribute('language'),'french');
  });

});