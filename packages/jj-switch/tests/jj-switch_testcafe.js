// TestCafe APIs could be found here:
// https://devexpress.github.io/testcafe/documentation/test-api/

import { Selector } from "testcafe";

fixture`Test jj-switch`.page`../demo/jj-switch.html`;

test("toggle the switch", async t => {
  let compEl = Selector(() => document.querySelector("jj-switch"));
  // Initial value is on
  await t.expect(compEl.value).eql("true");
  // SELECT the slider
  const slider = Selector(() =>
    document.querySelector("jj-switch").shadowRoot.querySelector("#slider")
  );
  await t.click(slider);
  // should be off
  await t.expect(compEl.value).eql("false");
  await t.click(slider);
  await t.expect(compEl.value).eql("true");
  await t.click(slider);
  await t.expect(compEl.value).eql("false");
  await t.click(slider);
  await t.expect(compEl.value).eql("true");
  await t.click(slider);
  await t.expect(compEl.value).eql("false");

});
