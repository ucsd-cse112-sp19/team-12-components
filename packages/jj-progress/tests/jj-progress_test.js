import {expect, assert} from 'chai';
import '../../../src/jj-progress.min.js';

//----------Unit Tests ------------------
describe('jj-progress; percentage; color', () => {

    let compHTML = `<jj-progress id="progress1" percentage=40 color="#8595ad" stroke-width=4 type=line></jj-progress>`;
    document.body.insertAdjacentHTML('afterbegin',compHTML);
    let compEl1 = document.getElementById('progress1');

    let compHTML = `<jj-progress id="progress2" percentage=200></jj-progress>`;
    document.body.insertAdjacentHTML('afterbegin',compHTML);
    let compEl2 = document.getElementById('progress2');

    let compHTML = `<jj-progress id="progress3" percentage=-20></jj-progress>`;
    document.body.insertAdjacentHTML('afterbegin',compHTML);
    let compEl3 = document.getElementById('progress3');

    it('tests the percentage attribute is set and retrievable', async () => {
        let compPercentage = compEl1.percentage;
        assert.equal(compPercentage, 40);
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
        let compStrokeWidth = compEl1.stroke-width;
        assert.equal(compStrokeWidth, 4);
    });

});
