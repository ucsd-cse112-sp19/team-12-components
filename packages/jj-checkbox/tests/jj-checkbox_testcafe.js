// TestCafe APIs could be found here:
// https://devexpress.github.io/testcafe/documentation/test-api/

import { Selector } from "testcafe";

fixture`Test jj-checkbox` .page`../demo/jj-checkbox.html`;

test("jj-checkbox", async t => {
  // const increaseBtn = Selector("#incrementBtn"); won't work with shadow dom

  // SELECT the input box
  const checkbox = await Selector(() =>
    document
      .querySelector("#cb0")
  );
  // SELECT the input box
  const checkbox_sub = await Selector(() =>
    document
      .querySelector("#cb1")
  );
  const checkboxContainer = await Selector(() =>
    document
    .querySelector("#cb0")
    .shadowRoot.querySelector("label.el-checkbox")
  );
  // TEST 1: test if the checkbox value is correct
  await t.expect(checkbox.value).eql("fruit");
  await t.expect(checkbox.hasAttribute("checked")).eql(false);
  await t.expect(checkbox_sub.hasAttribute("checked")).eql(false);
  await t.expect(checkbox_sub.hasAttribute("disabled")).eql(true);


  // TEST 2: test if the checkbox is clickable and click it
  await t.click(checkboxContainer);

  // TEST 3: test if the checkbox is checked after clicking it
  await t.expect(checkbox.hasAttribute("checked")).eql(true);
});
