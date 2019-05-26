// TestCafe APIs could be found here:
// https://devexpress.github.io/testcafe/documentation/test-api/

import { Selector } from "testcafe";

fixture`Test jj-slider` .page`../demo/jj-slider.html`;


test("increase slider value", async t => {

  // SELECT the slider
  const slider = Selector(() => document .querySelector("jj-slider"));

  // SELECT the input box
  const sliderButton = await Selector(() =>
      document
      .querySelector("jj-slider")
      .shadowRoot.querySelector(".el-slider__button-wrapper")
  );

  let compSelector = Selector("#jj");
  let currentValue = parseInt(await compSelector.value);

  await t
    .hover(sliderButton, {speed: 0.9})
    .click(sliderButton)
    .drag(sliderButton, 200, 50, {speed: 0.9});

  // Need to break up execution by first assuring the first await is executed
  // and completed. Then we can do our check of value. If we don't we cannot 
  // guarantee the slider will be moved.
  await t.expect(parseInt(await compSelector.value)).gt(currentValue);

});

test("decrease slider value", async t => {

  // SELECT the slider
  const slider = Selector(() => document .querySelector("jj-slider"));

  // SELECT the input box
  const sliderButton = await Selector(() =>
      document
      .querySelector("jj-slider")
      .shadowRoot.querySelector(".el-slider__button-wrapper")
  );

  let compSelector = Selector("#jj");
  let currentValue = parseInt(await compSelector.value);

  await t
    .hover(sliderButton, {speed: 0.9})
    .click(sliderButton)
    .drag(sliderButton, -200, 50, {speed: 0.9});

  // Need to break up execution by first assuring the first await is executed
  // and completed. Then we can do our check of value. If we don't we cannot 
  // guarantee the slider will be moved.
  await t.expect(parseInt(await compSelector.value)).lt(currentValue);
});

test("decrease to min limit", async t => {
  // SELECT the slider
  const slider = Selector(() => document .querySelector("jj-slider"));

  // SELECT the input box
  const sliderButton = await Selector(() =>
      document
      .querySelector("jj-slider")
      .shadowRoot.querySelector(".el-slider__button-wrapper")
  );

  let compSelector = Selector("#jj");
  let currentValue = parseInt(await compSelector.value);

  await t
    .hover(sliderButton, {speed: 0.9})
    .click(sliderButton)
    .drag(sliderButton, -10000, 50, {speed: 0.9});

  await t.expect(parseInt(await compSelector.value)).eql(0);
});

test("increase to max limit", async t => {
  // SELECT the slider
  const slider = Selector(() => document .querySelector("jj-slider"));

  // SELECT the input box
  const sliderButton = await Selector(() =>
      document
      .querySelector("jj-slider")
      .shadowRoot.querySelector(".el-slider__button-wrapper")
  );

  let compSelector = Selector("#jj");
  let currentValue = parseInt(await compSelector.value);

  await t
    .hover(sliderButton, {speed: 0.9})
    .click(sliderButton)
    .drag(sliderButton, 10000, 50, {speed: 0.9});

  await t.expect(parseInt(await compSelector.value)).eql(50);
});

test("tooltip shows on hover", async t => {
    // TODO(Nate): complete this test.
});
