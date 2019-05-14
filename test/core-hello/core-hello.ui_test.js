import { Selector } from "testcafe";

fixture`Getting Started`.page`http://devexpress.github.io/testcafe/example`;

test("My first test", async t => {
  await t
    .typeText("#developer-name", "John Smith")
    .click("#submit-button")

    // Use the assertion to check if the actual header text is equal to the expected one
    .expect(Selector("#article-header").innerText)
    .eql("Thank you, John Smith!");
});

test("My second test", async t => {
  await t.typeText("#developer-name", "John Smith").click("#submit-button");

  const articleHeader = await Selector(".result-content").find("h1");

  // Obtain the text of the article header
  let headerText = await articleHeader.innerText;
});
