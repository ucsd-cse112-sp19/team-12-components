import {expect, assert} from 'chai';
import '../jj-progress.js';

//----------Unit Tests ------------------
describe('jj-progress; percentage; color', () => {

  let compHTML;
  let compEl0;
  let compEl1;
  let compEl2;
  let compEl3;

  before(function() {
    compHTML = `<jj-progress id="progress0"></jj-progress>`;
    document.body.insertAdjacentHTML('afterbegin',compHTML);
    compEl0 = document.getElementById('progress0');

    compHTML = `<jj-progress id="progress1" percentage=40 color="#8595ad" stroke-width=4 type=line></jj-progress>`;
    document.body.insertAdjacentHTML('afterbegin',compHTML);
    compEl1 = document.getElementById('progress1');

    compHTML = `<jj-progress id="progress2" percentage=200></jj-progress>`;
    document.body.insertAdjacentHTML('afterbegin',compHTML);
    compEl2 = document.getElementById('progress2');

    compHTML = `<jj-progress id="progress3" percentage=-20></jj-progress>`;
    document.body.insertAdjacentHTML('afterbegin',compHTML);
    compEl3 = document.getElementById('progress3');
  });

  it('tests the default progress bar with no attributes', async () => {
    let compPercentage = compEl0.percentage;
    let compColor = compEl0.color;
    let compStrokeWidth = compEl0.strokeWidth;
    let compType = compEl0.type;
    assert.equal(compPercentage, 50);
    assert.equal(compColor, '#409EFF');
    assert.equal(compStrokeWidth, 6);
    assert.equal(compType, 'line');
  });
  
  it('tests the percentage attribute is set and retrievable', async () => {
    let compPercentage = compEl1.percentage;
    assert.equal(compPercentage, 40);
  });

  it('tests the default colors', function () {
    let compColorDefault = compEl2.color;
    assert.equal(compColorDefault, "#409EFF");
  });

  it('tests the color value is set and retrievable', async () => {
    let compColor = compEl1.color;
    assert.equal(compColor, "#8595ad");
  });

  it('tests the percentage value range > 100', async () => {
    let compPercentage = compEl2.percentage;
    assert.equal(compPercentage, 100);
  });

  it('tests the percentage value range < 0', async () => {
    let compPercentage = compEl3.percentage;
    assert.equal(compPercentage, 0);
  });
    
  it('tests the stroke-width value is set and retrievable', async () => {
    let compStrokeWidth = compEl1.strokeWidth;
    assert.equal(compStrokeWidth, 4);
  });

});
