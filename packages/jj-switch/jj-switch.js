/**
 * @component_name jj switch
 * @component_desc Switch between opposing states.
 * @attribute value / v-model, binding value	number,	boolean/ string/ number,
 * /, /
 * @attribute disabled,	whether switch is disabled,	boolean, /, false
 * @attribute width, width of Switch number, /, 40
 * @attribute active-icon-class, class name of the icon displayed when in on
 * state overrides active-text, string, /, /
 * @attribute inactive-icon-class, class name of the icon displayed when in off
 * state overrides inactive-text, string, /, /
 * @attribute active-text, text displayed when in on state, string, /, /
 * @attribute inactive-text, text displayed when in off state, string, /, /
 * @attribute active-value, switch value when in on state,
 * boolean/ string/ number, /, true
 * @attribute inactive-value, switch value when in off state,
 * boolean/ string/ number, /, false
 * @attribute active-color, background color when in on state, string, /,
 * #409EFF
 * @attribute inactive-color, background color when in off state, string, /,
 * #C0CCDA
 * @attribute name, input name of Switch, string, /, /
 * @attribute validate-event, whether to trigger form validation, boolean, /,
 * true
 *
 */

// define the css for this component.
const jjSwitchTemplate = document.createElement('template');
jjSwitchTemplate.innerHTML = `
  <style>
  @import url("https://unpkg.com/element-ui/lib/theme-chalk/switch.css");

    .el-switch {
      margin-top: 10px;
      margin-bottom: 10px;
    }

    .switch {
      position: relative;
      display: inline-block;
      width: 40px;
      height: 23px;
    }
    
    /* Hide default HTML checkbox */
    .switch input {
      opacity: 0;
      width: 0;
      height: 0;
    }
    
    /* The slider */
    .slider {
      position: absolute;
      cursor: pointer;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    .slider:before {
      position: absolute;
      content: "";
      height: 18px;
      width: 18px;
      left: 3px;
      bottom: 3px;
      background-color: var(--slider-button-color, white);
      -webkit-transition: .4s;
      transition: .4s;
    }
    
    input:checked + .slider:before {
      -webkit-transform: translateX(26px);
      -ms-transform: translateX(26px);
      transform: translateX(26px);
    }
    
    /* Rounded sliders */
    .slider.round {
      border-radius: 34px;
    }
    
    .slider.round:before {
      border-radius: 50%;
    }
    
    .disabled {
      opacity: 0.4;
      pointer-events: none;
    }
    
    .text {
      margin: 0 5px;
      font-size: 14px;
      font-weight: 500;
      font-family: var(--text-font,
      Helvetica Neue,Helvetica,PingFang SC,Hiragino Sans GB,
      Microsoft YaHei,SimSun,sans-serif);
      color: var(--inactive-text-color, #303133);
    }
    
    .text-active {
      color: var(--active-text-color, #409eff);
    }

    .slider.small {
      width: 40px;
      height: 18px;
    }

    .slider.small:before {
      width: 13px;
      height: 13px;
    }

    input:checked + .slider.small:before {
      -webkit-transform: translateX(21px);
      -ms-transform: translateX(21px);
      transform: translateX(21px);
    }

    .slider.large {
      width: 70px;
      height: 32px;
    }

    .slider.large:before {
      width: 26px;
      height: 26px;
    }

    input:checked + .slider.large:before {
      -webkit-transform: translateX(38px);
      -ms-transform: translateX(38px);
      transform: translateX(38px);
    }
  </style>
  <div role="switch" aria-checked="true" class="el-switch">
    <span id="inactiveText" class='text'></span>
      <label class="switch">
      <input id="myinput" type="checkbox" checked>
      <span id="slider" class="slider round"></span>
      </label>
    <span id="activeText" class='text'></span>
  </div>
  `;

class JJSwitch extends HTMLElement {
  static get observedAttributes() {
    return [
      'value', 'disabled', 'active-value', 'inactive-value', 'active-color',
      'inactive-color', 'active-text', 'inactive-text', 'size', 'round'
    ];
  }

  constructor() {
    super();

    this.root = this.attachShadow({mode : 'open'});
    this.root.appendChild(jjSwitchTemplate.content.cloneNode(true));

    // define the elements.
    this.switchContainer = this.root.querySelector('.el-switch');
    this.label = this.root.querySelector('label');
    this.input = this.root.querySelector('input');
    this.slider = this.root.querySelector('#slider');
    this.sliderBall = this.root.querySelector('#slider', ':before');
    this.activeText = this.root.querySelector('#activeText');
    this.inactiveText = this.root.querySelector('#inactiveText');

    // Bind "this" to functions to reserve context
    this.onSwitchClick = this.onSwitchClick.bind(this);
  }

  // Helper function for updating background- and text colors
  updateColors() {
    if (this.value == 'true') {
      this.slider.style.background = this.active_color;
      this.activeText.classList.add('text-active');
      this.inactiveText.classList.remove('text-active');
    } else {
      this.slider.style.background = this.inactive_color;
      this.activeText.classList.remove('text-active');
      this.inactiveText.classList.add('text-active');
    }
  }

  updateSwitch() {
    if (this.value == 'true') {
    } else {
    }
  }

  connectedCallback() {

    // add event listeners
    this.switchContainer.addEventListener('click', this.onSwitchClick);

    if (!this.hasAttribute('active-color')) {
      this.active_color = "#409eff";
    }

    if (!this.hasAttribute('inactive-color')) {
      this.inactive_color = "#dcdfe6";
    }

    if (!this.hasAttribute('active-text')) {
      this.active_text = "Active Text";
    }

    if (!this.hasAttribute('inactive-text')) {
      this.inactive_text = "Inactive Text";
    }

    if (!this.hasAttribute('active-value')) {
      this.activeValue = true;
    }

    if (!this.hasAttribute('inactive-value')) {
      this.inactiveValue = false;
    }

    if (!this.hasAttribute('name')) {
      this.name = 'jj-switch';
    }

    if (!this.hasAttribute('round')) {
      this.slider.classList.add('round');
    }

    if (!this.hasAttribute('value')) {
      this.value = true;
    } else {
      if (this.getAttribute('value') == 'true') {
        this.switchContainer.classList.add('is-checked');
        this.switchContainer.setAttribute("aria-checked", true)
      } else {
        this.input.removeAttribute('checked');
        this.switchContainer.classList.remove('is-checked');
        this.switchContainer.setAttribute("aria-checked", false)
      }
    }

    if (!this.hasAttribute('size')) {
      this.size = 'large';
    }

    // Call the default slider color
    this.updateColors();
  }

  // Listen for changed attributes
  attributeChangedCallback(attrName, oldValue, newValue) {
    switch (attrName) {

    case 'active-color':
      if (this.value == 'true') {
        this.slider.style.background = newValue;
      }
      break;

    case 'inactive-color':
      if (this.value == 'false') {
        this.slider.style.background = newValue;
      }
      break;

    case 'active-text':
      this.activeText.innerHTML = newValue;
      break;

    case 'inactive-text':
      this.inactiveText.innerHTML = newValue;
      break;

    case 'disabled':
      if (this.switchContainer.classList.contains('disabled')) {
        this.switchContainer.classList.remove('disabled');
      } else {
        this.switchContainer.classList.add('disabled');
      }
      break;

    case 'active-value':
      break;

    case 'inactive-value':
      break;

    case 'name':
      break;

    case 'round':
      if (this.slider.classList.contains('round')) {
        this.slider.classList.remove('round');
      } else {
        this.slider.classList.add('round');
      }
      break;

    case 'value':
      this.updateColors();
      this.updateSwitch();
      break;

    case 'size':
      if (this.size == 'small') {
        this.slider.classList.remove('large');
        this.slider.classList.add('small');
        this.label.style.width = '40px';
        this.label.style.height = '18px';
      } else if (this.size == 'large') {
        this.slider.classList.remove('small');
        this.slider.classList.add('large');
        this.label.style.width = '70px';
        this.label.style.height = '32px';
      }
      break;

    default:
      break;
    }
  }

  onSwitchClick() {
    if (this.input.checked) {
      // change the slider color
      this.slider.style.background = this.activeColor;

      // highlight the text if there is any
      this.activeText.classList.add('text-active');
      this.inactiveText.classList.remove('text-active');

      // change the value
      this.value = this.activeValue;

      // Add is-checked to the class name and set aria-checked to true
      this.switchContainer.classList.add('is-checked');
      this.switchContainer.setAttribute("aria-checked", true);

      this.input.setAttribute('checked', "");

    } else {

      // change the slider color
      this.slider.style.background = this.inactiveColor;

      // highlight the text if there is any
      this.activeText.classList.remove('text-active');
      this.inactiveText.classList.add('text-active');

      // change the value
      this.value = this.inactiveValue;

      // Remove is-checked from the class name and set aria-checked to false
      this.switchContainer.classList.remove('is-checked');
      this.switchContainer.setAttribute("aria-checked", false);

      this.input.removeAttribute('checked');
    }
  }

  // Getters
  get value() { return this.getAttribute('value'); }
  get active_value() { return this.getAttribute('active-value'); }
  get inactive_value() { return this.getAttribute('inactive-value'); }
  get active_text() { return this.getAttribute('active-text'); }
  get inactive_text() { return this.getAttribute('inactive-text'); }
  get active_color() { return this.getAttribute('active-color'); }
  get inactive_color() { return this.getAttribute('inactive-color'); }
  get size() { return this.getAttribute('size'); }
  get disabled() { return this.getAttribute('disabled'); }

  // Setters
  set value(newValue) { this.setAttribute('value', newValue); }
  set active_value(newValue) { this.setAttribute('active-value', newValue); }
  set inactive_value(newValue) {
    this.setAttribute('inactive-value', newValue);
  }
  set active_text(newValue) { this.setAttribute('active-text', newValue); }
  set inactive_text(newValue) { this.setAttribute('inactive-text', newValue); }
  set active_color(newValue) { this.setAttribute('active-color', newValue); }
  set inactive_color(newValue) {
    this.setAttribute('inactive-color', newValue);
  }
  set size(newValue) { this.setAttribute('size', newValue); }
  set name(newValue) { this.setAttribute('name', newValue); }
  set disabled(newValue) { this.setAttribute('disabled', newValue); }
}
customElements.define('jj-switch', JJSwitch);
