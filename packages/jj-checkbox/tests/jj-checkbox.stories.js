import { storiesOf } from "@storybook/html";
import "../jj-checkbox.js";

storiesOf("jj-checkbox", module)
  .add(
    "default",
    () => '<jj-checkbox></jj-checkbox>'
  )
  .add(
    "disabled",
    () =>
      '<jj-checkbox value="disabled" label="disabled" disabled></jj-checkbox>'
  )
  .add(
    "checked",
    () =>
      '<jj-checkbox value="checked" label="checked" checked></jj-checkbox>'
  )
  .add(
    "both",
    () =>
      '<jj-checkbox value="both" label="both" checked disabled></jj-checkbox>'
  );
