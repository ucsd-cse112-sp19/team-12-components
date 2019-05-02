import {expect, assert} from 'chai';
import '../core_hello.js';


//----------Unit Tests ------------------
describe('Component Unit Tests', () => {
  it('Non Spec Language (Default) Inner Text', async () => {
    // tests the english
    let hwHTML = `<core-hello id='hw1' lang='en'>Shaya!</core-hello>`;
    document.body.insertAdjacentHTML('afterbegin',hwHTML);
    let hwEl = document.getElementById('hw1');
    let hwText = hwEl.innerHTML;
    console.log("Component text: ", hwText);
    assert.equal(hwText, 'Hello World Shaya!');
  });

  it('Spanish Inner Text', async () => {
    // tests the spanish
    let hwHTML = `<core-hello id='hw2' lang='sp'>Shaya!</core-hello>`;
    document.body.insertAdjacentHTML('afterbegin',hwHTML);
    let hwEl = document.getElementById('hw2');
    let hwText = hwEl.innerText;
    console.log("Component text: ", hwText);
    assert.equal(hwText, 'Hola Mundo Shaya!');
    assert.equal(hwEl.getAttribute('lang'),'sp');
  });

  it('French Inner Text', async () => {
    // tests the french
    let hwHTML = `<core-hello id='hw3' lang='fr'>Shaya!</core-hello>`;
    document.body.insertAdjacentHTML('afterbegin',hwHTML);
    let hwEl = document.getElementById('hw3');
    let hwText = hwEl.innerText;
    console.log("Component text: ", hwText);
    assert.equal(hwText, 'Salut Monde Shaya!');
    assert.equal(hwEl.getAttribute('lang'),'fr');
  });

  it('Rainbow ON', async () => {
    // tests the rainbow attribute ON
    let hwHTML = `<core-hello id='hw4' lang='fr' rainbow>Shaya!</core-hello>`;
    document.body.insertAdjacentHTML('afterbegin',hwHTML);
    let hwEl = document.getElementById('hw4');
    let hwText = hwEl.innerText;
    let hwClassList = hwEl.classList;
    console.log("Component text: ", hwText);
    console.log("classList: ", hwClassList);
    assert.equal(hwText, 'Salut Monde Shaya!');
    assert.equal(hwEl.getAttribute('lang'),'fr');
    assert.equal(hwClassList.contains("color-text-flow"), true);
    
  });

  it('Rainbow OFF', async () => {
    // tests the rainbow attribute OFF
    let hwHTML = `<core-hello id='hw5' lang='fr'>Shaya!</core-hello>`;
    document.body.insertAdjacentHTML('afterbegin',hwHTML);
    let hwEl = document.getElementById('hw5');
    let hwText = hwEl.innerText;
    let hwClassList = hwEl.classList;
    console.log("Component text: ", hwText);
    console.log("classList: ", hwClassList);
    assert.equal(hwText, 'Salut Monde Shaya!');
    assert.equal(hwEl.getAttribute('lang'),'fr');
    assert.equal(hwClassList.contains("color-text-flow"), false);
  });

});