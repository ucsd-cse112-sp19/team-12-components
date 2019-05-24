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
