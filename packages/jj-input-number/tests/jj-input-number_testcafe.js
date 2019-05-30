<<<<<<< HEAD:test_testcafe/jj-input-number_testcafe.js
// TestCafe APIs could be found here:
// https://devexpress.github.io/testcafe/documentation/test-api/

import { Selector } from "testcafe";

fixture`Getting Started`
  .page`../packages/jj-input-number/demo/jj-input-number.html`;

test("jj-input-number", async t => {
  // const increaseBtn = Selector("#incrementBtn"); won't work with shadow dom

  // SELECT the input box
  const input = await Selector(() =>
    document
      .querySelector("jj-input-number")
      .shadowRoot.querySelector("#jj-inputBoxNum")
  );

  // SELECT the increase button
  const increaseBtn = await Selector(() =>
    document
      .querySelector("jj-input-number")
      .shadowRoot.querySelector("#incrementBtn")
  );
  // SELECT the decrease button
  const decreaseBtn = await Selector(() =>
    document
      .querySelector("jj-input-number")
      .shadowRoot.querySelector("#decrementBtn")
  );

  // TEST 1: test if the initial value is 1.00
  await t.expect(input.value).eql("1.00");

  // TEST 2: test clicking inc button and value increases by 0.5
  for (let i = 0; i < 11; i++) {
    await t.click(increaseBtn);
  }
  await t.expect(input.value).eql("6.50"); // should be 1 + 11 * 0.5 = 6.50
});

test("jj-input-number2", async t => {
  // const increaseBtn = Selector("#incrementBtn"); won't work with shadow dom

  // SELECT the input box
  const input = await Selector(() =>
    document
      .querySelector("jj-input-number")
      .shadowRoot.querySelector("#jj-inputBoxNum")
  );

  // SELECT the increase button
  const increaseBtn = await Selector(() =>
    document
      .querySelector("jj-input-number")
      .shadowRoot.querySelector("#incrementBtn")
  );
  // SELECT the decrease button
  const decreaseBtn = await Selector(() =>
    document
      .querySelector("jj-input-number")
      .shadowRoot.querySelector("#decrementBtn")
  );

  // TEST 3: test input number directly and decrease button
  await t
    .selectText( input)
    .typeText(input, "3")
    .click(decreaseBtn)
    .click(decreaseBtn)
    .click(decreaseBtn)
    .click(decreaseBtn)
    .click(decreaseBtn)
    .click(decreaseBtn)
    .expect(input.value).eql("0.00");
});
=======
// TestCafe APIs could be found here:
// https://devexpress.github.io/testcafe/documentation/test-api/

import { Selector } from "testcafe";

fixture`Test jj-input-number` .page`../demo/jj-input-number.html`;

test("jj-input-number", async t => {
  // const increaseBtn = Selector("#incrementBtn"); won't work with shadow dom

  // SELECT the input box
  const input = await Selector(() =>
    document
      .querySelector("jj-input-number")
      .shadowRoot.querySelector("#jj-inputBoxNum")
  );

  // SELECT the increase button
  const increaseBtn = await Selector(() =>
    document
      .querySelector("jj-input-number")
      .shadowRoot.querySelector("#incrementBtn")
  );
  // SELECT the decrease button
  const decreaseBtn = await Selector(() =>
    document
      .querySelector("jj-input-number")
      .shadowRoot.querySelector("#decrementBtn")
  );

  // TEST 1: test if the initial value is 1.00
  await t.expect(input.value).eql("1.00");

  // TEST 2: test clicking inc button and value increases by 0.5
  for (let i = 0; i < 11; i++) {
    await t.click(increaseBtn);
  }
  await t.expect(input.value).eql("6.50"); // should be 1 + 11 * 0.5 = 6.50
});

test("jj-input-number2", async t => {
  // const increaseBtn = Selector("#incrementBtn"); won't work with shadow dom

  // SELECT the input box
  const input = Selector(() =>
    document
      .querySelector("jj-input-number")
      .shadowRoot.querySelector("#jj-inputBoxNum")
  );

  // SELECT the increase button
  const increaseBtn = Selector(() =>
    document
      .querySelector("jj-input-number")
      .shadowRoot.querySelector("#incrementBtn")
  );
  // SELECT the decrease button
  const decreaseBtn = Selector(() =>
    document
      .querySelector("jj-input-number")
      .shadowRoot.querySelector("#decrementBtn")
  );

//  // TEST 3: test input number directly and decrease button
//  await t
//    .hover(input, {speed: 0.1})
//    .typeText(input, "3", {replace: true})
//    .selectText(input)
//    .hover(decreaseBtn, {speed: 0.1})
//    .click(decreaseBtn)
//    .expect(input.value).eql("3.00");
    
//    .click(increaseBtn)
//    .click(decreaseBtn)
//    .click(decreaseBtn)
//    .click(decreaseBtn)
//    .click(decreaseBtn)
//    .click(decreaseBtn)
//    .expect(input.value).eql("0.00");
});
>>>>>>> 69c980649fcd6c9bf5da4522234224548bb5ad53:packages/jj-input-number/tests/jj-input-number_testcafe.js
