// this is the template for the switch
const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="jj-switch.css">
  <div class="jj-switch">
    <label>
      <input type="checkbox">
      <span class="slider"></span>
    </label>
  </div>
`;

class JJSwitch extends HTMLElement {
  static get observedAttributes() {
    return [
      'value', 'disabled', 'name', 'active-value', 'inactive-value', 'active-color',
      'inactive-color', 'active-text', 'inactive-text', 'size'
    ];
  }

  constructor() {
    super();
    this.root = this.attachShadow({mode : 'open'});
  }

  connectedCallback() {

  }

  attributeChangedCallback(attrName, oldValue, newValue) {

  }

  // Getters
  get value() { return this.getAttribute('value'); }
  get active_value() { return this.getAttribute('active-value'); }
  get inactive_value() { return this.getAttribute('inactive-value'); }
  get active_text() { return this.getAttribute('active-text'); }
  get inactive_text() {return this.getAttribute('inactive-text'); }
  get active_color() {return this.getAttribute('active-color'); }
  get inactive_color() {return this.getAttribute('inactive-color'); }
  get size() {return this.getAttribute('size'); }
  get name() {return this.getAttribute('name'); }

  // Setters
  set value(newValue) { this.setAttribute('value', newValue); }
  set active_value(newValue) {this.setAttribute('active-value', newValue); }
  set inactive_value(newValue) {this.setAttribute('inactive-value', newValue); }
  set active_text(newValue) {this.setAttribute('active-text', newValue); }
  set inactive_text(newValue) {this.setAttribute('inactive-text', newValue); }
  set active_color(newValue) {this.setAttribute('active-color', newValue); }
  set inactive_color(newValue) {this.setAttribute('inactive-color', newValue); }
  set size(newValue) {this.setAttribute('size', newValue);  }
  set name(newValue) {this.setAttribute('name', newValue); }
}
customElements.define('jj-switch', JJSwitch);