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

//define the css for this component.
const jjSwitch = () => {
  let styles = `<style>
    .switch {
      position: relative;
      display: inline-block;
      width: 50px;
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
      background-color: white;
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
      font-size: 16px;
      color: black;
    }
    
    .text-active {
      color: #2196F3;
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
  </style>`;

  // this is the template for the switch
  const template = document.createElement('template');
  template.innerHTML = styles + `
    <div id="container">
      <span id="inactiveText" class='text'></span>
      <label class="switch">
        <input type="checkbox">
        <span id="slider" class="slider"></span>
      </label>
      <span id="activeText" class='text'></span>
    </div>
  `;

  class JJSwitch extends HTMLElement {
    static get observedAttributes() {
      return [
        'value', 'disabled', 'name', 'active-value', 'inactive-value', 'active-color',
        'inactive-color', 'active-text', 'inactive-text', 'size', 'round'
      ];
    }

    constructor() {
      super();
      this.root = this.attachShadow({mode : 'open'});
      this.root.appendChild(template.content.cloneNode(true));

      //define the elements.
      this.label = this.root.querySelector('label');
      this.input = this.root.querySelector('input');
      this.slider = this.root.querySelector('#slider');
      this.sliderBall = this.root.querySelector('#slider', ':before');
      this.activeText = this.root.querySelector('#activeText');
      this.inactiveText = this.root.querySelector('#inactiveText');
      this.container = this.root.querySelector('#container');
      
      // Bind "this" to functions to reserve context
      this.onSwitchClick = this.onSwitchClick.bind(this);
    }

    connectedCallback() {
      if (this.hasAttribute('active-color')) {
        this.activeColor = this.getAttribute('active-color');
        if (this.input.checked) {
          this.slider.style.background = this.activeColor;
          this.activeText.classList.add('text-active');
        }
      } else {
        this.activeColor = '#2196F3';
      }

      if (this.hasAttribute('inactive-color')) {
        this.inactiveColor = this.getAttribute('inactive-color');
        if (!this.input.checked) {
          this.slider.style.background = this.inactiveColor;
          this.inactiveText.classList.add('text-active');
        }
      } else {
        this.inactiveColor = '#ccc';
      }

      if (this.hasAttribute('active-text')) {
        this.activeText.innerHTML = this.getAttribute('active-text');
      }

      if (this.hasAttribute('inactive-text')) {
        this.inactiveText.innerHTML = this.getAttribute('inactive-text');
      }

      if (this.hasAttribute('disabled')) {
        this.container.classList.add('disabled');
      }

      if (this.hasAttribute('active-value')) {
        this.activeValue = this.getAttribute('active-value');
      } else {
        this.activeValue = true;
      }

      if (this.hasAttribute('inactive-value')) {
        this.inactiveValue = this.getAttribute('inactive-value');
      } else {
        this.inactiveValue = false;
      }

      if (this.hasAttribute('name')) {
        this.name = this.getAttribute('name');
      } else {
        this.name = 'jj-switch';
      }

      if (this.hasAttribute('round')) {
        this.slider.classList.add('round');
      }

      if (this.hasAttribute('value')) {
        this.value = this.getAttribute('value');
      }

      if (this.hasAttribute('size')) {
        var size = this.getAttribute('size');
        if (size == 'small') {
          this.slider.classList.add('small')
          this.label.style.width = '40px';
          this.label.style.height = '18px';
        } else if (size == 'large'){
          this.slider.classList.add('large')
          this.label.style.width = '70px';
          this.label.style.height = '32px';
        }
      }

      //add event listeners
      this.input.addEventListener('click', this.onSwitchClick);
    }

    attributeChangedCallback(attrName, oldValue, newValue) {
      switch (attrName) {

        case 'round':
          if (this.slider.classList.contains('round')) {
            this.slider.classList.remove('round');
          } else {
            this.slider.classList.add('round');
          }
          break;

        case 'disabled':
          if (this.container.classList.contains('disabled')) {
            this.container.classList.remove('disabled');
          } else {
            this.container.classList.add('disabled');
          }
          break;

        case 'inactive-text':
          this.inactiveText.innerHTML = newValue;
          break;

        case 'inactive-color':
          this.inactiveColor = newValue;
          if (!this.input.checked) {
            this.slider.style.background = newValue;
          }
          break;

        case 'inactive-value':
          this.inactiveValue = newValue;
          break;

        case 'active-text':
          this.activeText.innerHTML = newValue;
          break;
    
        case 'active-color':
          this.activeColor = newValue;
          if (this.input.checked) {
            this.slider.style.background = newValue;
          }
          break;

        case 'active-value':
          this.activeValue = newValue;
          break;

        case 'name':
          this.name = newValue;
          break;
        
        case 'value':
          this.value = newValue;
          break;

        default:
          break;
      }
    }

    onSwitchClick() {
      if (this.input.checked) {
        //change the slider color
        this.slider.style.background = this.activeColor;

        //highlight the text if there is any
        this.activeText.classList.add('text-active');
        this.inactiveText.classList.remove('text-active');
      } else {
        //change the slider color
        this.slider.style.background = this.inactiveColor;

        //highlight the text if there is any
        this.activeText.classList.remove('text-active');
        this.inactiveText.classList.add('text-active');
      }
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
}
jjSwitch();