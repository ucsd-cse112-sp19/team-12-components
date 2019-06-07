// TestCafe APIs could be found here:
// https://devexpress.github.io/testcafe/documentation/test-api/

import { Selector } from "testcafe";

fixture`Test jj-progress` .page`../demo/jj-progress.html`;


test("increase progress value", async t => {

  // SELECT the input box
  const incProgressBtn = await Selector(() => document.querySelector("#incBtn"));

  // Get the component.
  let compSelector = Selector("#jj1");
  // Get the components percentage
  let currPercentage = parseInt(await compSelector.getAttribute('percentage'));

  await t
    .click(incProgressBtn)
    .click(incProgressBtn)
    .click(incProgressBtn);

  // Need to break up action and assert to ensure completion.
  await t
    .expect(parseInt(await compSelector.getAttribute('percentage')))
    .eql(50);
});


test("decrease progress value", async t => {

  // SELECT the input box
  const decProgressBtn = await Selector(() => document.querySelector("#decBtn"));

  // Get the component.
  let compSelector = Selector("#jj1");
  // Get the components percentage
  let currPercentage = parseInt(await compSelector.getAttribute('percentage'));

  await t
    .click(decProgressBtn);
  await t
    .expect(parseInt(await compSelector.getAttribute('percentage')))
    .eql(10);
});

test("percentage when increment past 100%", async t => {

  // SELECT the input box
  const incProgressBtn = await Selector(() => document.querySelector("#incBtn"));

  // Get the component.
  let compSelector = Selector("#jj1");
  // Get the components percentage
  let currPercentage = parseInt(await compSelector.getAttribute('percentage'));

  await t
    .click(incProgressBtn)
    .click(incProgressBtn)
    .click(incProgressBtn)
    .click(incProgressBtn)
    .click(incProgressBtn)
    .click(incProgressBtn)
    .click(incProgressBtn)
    .click(incProgressBtn) // at 100% after this click.
    .click(incProgressBtn)
    .click(incProgressBtn)
    .click(incProgressBtn);
  await t
    .expect(parseInt(await compSelector.getAttribute('percentage')))
    .eql(100);
});

test("percentage when decrement past 0%", async t => {

  // SELECT the input box
  const decProgressBtn = await Selector(() => document.querySelector("#decBtn"));

  // Get the component.
  let compSelector = Selector("#jj1");
  // Get the components percentage
  let currPercentage = parseInt(await compSelector.getAttribute('percentage'));

  await t
    .click(decProgressBtn)
    .click(decProgressBtn)
    .click(decProgressBtn) // at 0% after this click.
    .click(decProgressBtn)
    .click(decProgressBtn);
  await t
    .expect(parseInt(await compSelector.getAttribute('percentage')))
    .eql(0);
});

test("increment then decrement gives same inital point.", async t => {
  const incProgressBtn = await Selector(() => document.querySelector("#incBtn"));
  const decProgressBtn = await Selector(() => document.querySelector("#decBtn"));
  let compSelector = Selector("#jj1");
  let currPercentage = parseInt(await compSelector.getAttribute('percentage'));

  await t
    .click(decProgressBtn)
    .click(incProgressBtn)
    .expect(parseInt(await compSelector.getAttribute('percentage')))
    .eql(currPercentage);

  await t
    .click(incProgressBtn) 
    .click(decProgressBtn)
    .expect(parseInt(await compSelector.getAttribute('percentage')))
    .eql(currPercentage);
});
