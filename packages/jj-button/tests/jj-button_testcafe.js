// TestCafe APIs could be found here:
// https://devexpress.github.io/testcafe/documentation/test-api/

import { Selector } from "testcafe";

fixture`Test jj-button` .page`../demo/jj-button.html`;

test("jj-button", async t => {

    //get the button
    const btn = await Selector(() =>
    document
      .querySelector("jj-button")
      .shadowRoot.querySelector("#jj-button")
    );

    // TEST 1: button test here
});