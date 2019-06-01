// TestCafe APIs could be found here:
// https://devexpress.github.io/testcafe/documentation/test-api/

import { Selector } from "testcafe";

fixture`Getting Started`.page`../core_hello.html`;

test("Example Test for core-hello: test if texts are correctly displayed", async t => {
    // Use the assertion to check if the actual header text is equal to the expected one
    const component_sp = Selector('#sp');
    const component_en = Selector('#en');
    const component_fr = Selector('#fr');
    let text_sp = await component_sp.innerText;
    let text_en = await component_en.innerText;
    let text_fr = await component_fr.innerText;
    await t.expect(component_sp.innerText).eql('Hola Mundo Shaya!');
    await t.expect(component_en.innerText).eql('Hello World Shaya!');
    await t.expect(component_fr.innerText).eql('Salut Monde Shaya!');
});
