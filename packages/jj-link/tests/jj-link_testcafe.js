// TestCafe APIs could be found here:
// https://devexpress.github.io/testcafe/documentation/test-api/

import { Selector } from "testcafe";

fixture`Test jj-link` .page`../demo/jj-link.html`;

test("jj-link", async t => {

    //get the button
    const btn = await Selector(() =>
    document
      .querySelector("jj-link")
      .shadowRoot.querySelector("#jj-link")
    );

    // TEST 1: link test here
});