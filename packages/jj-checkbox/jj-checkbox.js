const template = document.createElement('template');
template.innerHTML = `
<style>
    @import url("https://unpkg.com/element-ui/lib/theme-chalk/checkbox.css");
</style>

<div>
   <label role="checkbox" aria-checked="true" class="el-checkbox">
      <span aria-checked="mixed" class="el-checkbox__input">
         <span class="el-checkbox__inner"></span>
         <input type="checkbox" aria-hidden="true" class="el-checkbox__original" value="">
      </span>
      <span class="el-checkbox__label"><span></span><!----></span>
   </label>
</div>
`;

class JJCheckbox extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({mode : 'open'});
    this.root.appendChild(template.content.cloneNode(true));

    // target elements with querySelector
    this.checkboxContainer = this.root.querySelector("label.el-checkbox");
    this.checkboxInputSpan = this.root.querySelector("span.el-checkbox__input");
    this.labelSpan = this.root.querySelector(".el-checkbox__label span");

    // Bind "this" to functions to reserve context
    this.onCheckboxClick = this.onCheckboxClick.bind(this);
  }

  connectedCallback() {
    // Bind event listener to checkbox elements
    this.checkboxContainer.addEventListener('mousedown', this.onCheckboxClick);

    if (this.hasAttribute('value')) {
      this._value = this.getAttribute('value');
    } else {
      this._value = "option value";
    }

    if (this.hasAttribute('label')) {
      this.label = this.getAttribute('label');
      this.labelSpan.innerHTML = this.label;
    } else {
      this.label = "Option";
      this.labelSpan.innerHTML = this.label;
    }

    if (this.hasAttribute('checked')) {
      this.checked = true;
      this.checkboxContainer.classList.add("is-checked");
      this.checkboxInputSpan.classList.add("is-checked");
    } else {
      this.checked = false;
    }

    if (this.hasAttribute('disabled')) {
      this.disabled = true;
      this.checkboxContainer.classList.add("is-disabled");
      this.checkboxInputSpan.classList.add("is-disabled");
    } else {
      this.disabled = false;
    }
  }

  onCheckboxClick(event) {
    if (!this.disabled) {
      this.checked = !this.checked;
      console.log(this.checked ? "Checked" : "Not Checked");
      if (this.checked) {
        this.setAttribute("checked", "");
        this.checkboxContainer.classList.add("is-checked");
        this.checkboxInputSpan.classList.add("is-checked");
      } else {
        this.removeAttribute("checked");
        this.checkboxContainer.classList.remove("is-checked");
        this.checkboxInputSpan.classList.remove("is-checked");
      }
    }
  }

  // Observe only the array of attribute names
  static get observedAttributes() { return [ 'checked', 'disabled' ]; }

  // Listen for changed attributes
  attributeChangedCallback(name, oldValue, newValue) {
    switch (name) {
    case 'checked':
      if (newValue !== null) {
        this.checkboxContainer.classList.add("is-checked");
        this.checkboxInputSpan.classList.add("is-checked");
      } else {
        this.checkboxContainer.classList.remove("is-checked");
        this.checkboxInputSpan.classList.remove("is-checked");
      }
      break;
    case 'disabled':
      if (newValue !== null) {
        this.checkboxContainer.classList.add("is-disabled");
        this.checkboxInputSpan.classList.add("is-disabled");
      } else {
        this.checkboxContainer.classList.remove("is-disabled");
        this.checkboxInputSpan.classList.remove("is-disabled");
      }
      break;
    }
  }

  // Getters
  get checked() { return this.hasAttribute('checked'); }
  get disabled() { return this.hasAttribute('disabled'); }

  // Setters
  set checked(newValue) {
    if (newValue) {
      this.setAttribute('checked', "");
    } else {
      this.removeAttribute('checked');
    }
  }
  set disabled(newValue) {
    if (newValue) {
      this.setAttribute('disabled', "");
    } else {
      this.removeAttribute('disabled');
    }
  }
}

customElements.define('jj-checkbox', JJCheckbox);