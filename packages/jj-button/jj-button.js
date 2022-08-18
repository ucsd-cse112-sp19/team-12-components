/**
 * @component_name jj button
 * @component_desc A simple button with various attributes and styling.
 * @attribute size, determines the button size, string, medium/small/mini, /
 * @attribute type, button type, string, primary/success/warning/danger/info/
 * text, /
 * @attribute plain, determine whether it's a plain button, boolean, /, false
 * @attribute round, determine whether it's a round button, boolean, /, false
 * @attribute circle, determine whether it's a circle button, boolean, /, false
 * @attribute loading, determine whether it's loading, boolean, /, false
 * @attribute disabled, disable the button, boolean, /, false
 * @attribute icon, icon class name, string, /, /
 * @attribute autofocus, same as native button's autofocus, boolean, /, false
 * @attribute native-type, same as native button's type, string,
 * button/submit/reset, button
 *
 */

//define the css for this component
const jjButtonTemplate = document.createElement('template');
jjButtonTemplate.innerHTML = `
  <style>
    .btn {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      background: #fff;
      border: 1px solid #dcdfe6;
      color: #606266;
      -webkit-appearance: none;
      text-align: center;
      box-sizing: border-box;
      outline: none;
      margin: 0;
      transition: .1s;
      font-weight: 500;
      -moz-user-select: none;
      -webkit-user-select: none;
      -ms-user-select: none;
      padding: 12px 20px;
      font-size: 14px;
      border-radius: 4px;
    }
    .btn:focus, .btn:hover {
      color:#409eff;
      border-color:#c6e2ff;
      background-color:#ecf5ff
    }
    .btn.plain:focus, .btn.plain:hover {
      background:#fff;
      border-color:#409eff;
      color:#409eff
    }
    .btn.round {
      border-radius:20px;
      padding:12px 23px
    }
    .btn.circle {
      border-radius:50%;
      padding:12px
    }
    .btn.disabled {
      opacity: 0.4;
      pointer-events: none;
    }
    .btn.text {
      border-color:transparent;
      color:#409eff;
      background:transparent;
      padding-left:0;
      padding-right:0
    }
    .btn.text:focus, .btn.text:hover {
      color:#66b1ff;
      border-color:transparent;
      background-color:transparent
    }
    .btn.text:active {
      color:#3a8ee6;
      background-color:transparent
    }
    .btn.medium {
      padding:10px 20px;
      font-size:14px;
    }
    .btn.medium.round {
      padding:10px 20px
    }
    .btn.medium.circle {
      padding:10px
    }
    .btn.small {
      padding:9px 15px;
      font-size:12px;
    }
    .btn.small.round {
      padding:9px 15px
    }
    .btn.small.circle {
      padding:9px
    }
    .btn.mini {
      padding:7px 15px;
      font-size:12px;
    }
    .btn.mini.round {
      padding:7px 15px
    }
    .btn.mini.circle {
      padding:7px
    }

    .btn.loading {
      position:relative;
      pointer-events:none
    }
    .btn.loading:before {
      pointer-events:none;
      content:"";
      position:absolute;
      left:-1px;
      top:-1px;
      right:-1px;
      bottom:-1px;
      border-radius:inherit;
      background-color:hsla(0,0%,100%,.35)
    }

    .primary {
      color: #fff;
      background-color: #409eff;
      border-color: #409eff;
    }
    .primary:focus, .primary:hover {
      background:#66b1ff;
      border-color:#66b1ff;
      color:#fff
    }
    .primary.plain {
      color:#409eff;
      background:#ecf5ff;
      border-color:#b3d8ff
    }
    .primary.plain:focus, .primary.plain:hover {
      background:#409eff;
      border-color:#409eff;
      color:#fff
    }
    .primary.plain:active {
      background:#3a8ee6;
      border-color:#3a8ee6;
      color:#fff;
      outline:none
    }

    .success {
      color: #fff;
      background-color: #67c23a;
      border-color: #67c23a;
    }
    .success:focus, .success:hover {
      background:#85ce61;
      border-color:#85ce61;
      color:#fff
    }
    .success.plain {
      color:#67c23a;
      background:#f0f9eb;
      border-color:#c2e7b0
    }
    .success.plain:focus, .success.plain:hover {
      background:#67c23a;
      border-color:#67c23a;
      color:#fff
    }
    .success.plain:active {
      background:#5daf34;
      border-color:#5daf34;
      color:#fff;
      outline:none
    }

    .info {
      color: #fff;
      background-color: #909399;
      border-color: #909399;
    }
    .info:focus, .info:hover {
      background:#a6a9ad;
      border-color:#a6a9ad;
      color:#fff
    }
    .info.plain {
      color:#909399;
      background:#f4f4f5;
      border-color:#d3d4d6
    }
    .info.plain:focus, .info.plain:hover {
      background:#909399;
      border-color:#909399;
      color:#fff
    }
    .info.plain:active {
      background:#82848a;
      border-color:#82848a;
      color:#fff;
      outline:none
    }

    .warning {
      color: #fff;
      background-color: #e6a23c;
      border-color: #e6a23c;
    }
    .warning:focus, .warning:hover {
      background:#ebb563;
      border-color:#ebb563;
      color:#fff
    }
    .warning.plain {
      color:#e6a23c;
      background:#fdf6ec;
      border-color:#f5dab1
    }
    .warning.plain:focus, .warning.plain:hover {
      background:#e6a23c;
      border-color:#e6a23c;
      color:#fff
    }
    .warning.plain:active {
      background:#cf9236;
      border-color:#cf9236;
      color:#fff;
      outline:none
    }

    .danger {
      color: #fff;
      background-color: #f56c6c;
      border-color: #f56c6c;
    }
    .danger:focus, .danger:hover {
      background:#f78989;
      border-color:#f78989;
      color:#fff
    }
    .danger.plain {
      color:#f56c6c;
      background:#fef0f0;
      border-color:#fbc4c4
    }
    .danger.plain:focus, .danger.plain:hover {
      background:#f56c6c;
      border-color:#f56c6c;
      color:#fff
    }
    .danger.plain:active {
      background:#dd6161;
      border-color:#dd6161;
      color:#fff;
      outline:none
    }
  </style>
  <button id="jj-button" class="btn"><slot></slot></button> 
  `;

class JJButton extends HTMLElement {
  static get observedAttributes() {
    return [
      'size', 'type', 'round', 'plain', 'circle', 'loading', 'disabled', 'icon', 'autofocus', 'native-type'
    ];
  }
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.root.appendChild(jjButtonTemplate.content.cloneNode(true));

    //define the elements of this component
    this.button = this.root.querySelector('.btn');

    // Bind "this" to functions to reserve context
    this.initPhysProps = this.initPhysProps.bind(this);
    this.initSizeType = this.initSizeType.bind(this);
    this.initNativeAutofocus = this.initNativeAutofocus.bind(this);
    this.classNameSwitch = this.classNameSwitch.bind(this);
  }

  // helper functions for connectedCallback
  initPhysProps(attr) {
    if (this.hasAttribute(attr) && this.getAttribute(attr) == 'true') {
      this[attr] = 'true';
      this.button.classList.add(attr);
    } else {
      this[attr] = 'false';
    }
  }
  initSizeType(attr) {
    this[attr] = this.getAttribute(attr);
    this.button.classList.add(this[attr]);
  }
  initNativeAutofocus(attr) {
    let newAttr = attr.replace(/-/g, "_");
    this[newAttr] = this.getAttribute(attr);
    this.button.setAttribute(attr, this.getAttribute(attr));
  }

  // Helper function for attributeChangedCallback
  classNameSwitch(attr, value) {
    if (value == "false") {
      this.button.classList.remove(attr);
    } else {
      this.button.classList.add(attr);
    }
  }

  connectedCallback() {
    // set the round attribute
    this.initPhysProps('round');

    // set the plain attribute
    this.initPhysProps('plain');

    // set the circle attribute
    this.initPhysProps('circle');

    // set the disabled attribute
    this.initPhysProps('disabled');

    // set the size attribute
    if (this.hasAttribute('size')) {
      this.initSizeType('size');
    }

    // set the type attribute
    if (this.hasAttribute('type')) {
      this.initSizeType('type');
    } else {
      this.type = "default";
    }

    // set the native type attribute
    if (this.hasAttribute('native-type')) {
      this.initNativeAutofocus('native-type');
    } else {
      this.native_type = 'button';
    }

    // set the autofocus attribute
    if (this.hasAttribute('autofocus')) {
      this.initNativeAutofocus('autofocus');
    } else {
      this.autofocus = 'false';
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    switch (attrName) {
      case 'size':
        this.button.classList.remove(oldValue);
        this.button.classList.add(newValue);
        break;
      case 'type':
        this.button.classList.remove(oldValue);
        this.button.classList.add(newValue);
        break;
      case 'disabled':
        this.classNameSwitch('disabled', newValue);
        break;
      case 'circle':
        this.classNameSwitch('circle', newValue);
        break;
      case 'plain':
        this.classNameSwitch('plain', newValue);
        break;
      case 'round':
        this.classNameSwitch('round', newValue);
        break;
      case 'autofocus':
        this.button.setAttribute('autofocus', newValue);
        break;
      case 'native-type':
        this.button.setAttribute('type', newValue);
        break;
    }
  }

  //Getters
  get round() { return this.getAttribute('round') == 'true'; }
  get plain() { return this.getAttribute('plain') == 'true'; }
  get circle() { return this.getAttribute('circle') == 'true'; }
  get size() { return this.getAttribute('size'); }
  get disabled() { return this.getAttribute('disabled'); }
  get type() { return this.getAttribute('type'); }
  get native_type() { return this.getAttribute('native-type'); }
  get autofocus() { return this.getAttribute('autofocus'); }

  //Setters
  set round(newValue) { this.setAttribute('round', newValue); }
  set plain(newValue) { this.setAttribute('plain', newValue); }
  set circle(newValue) { this.setAttribute('circle', newValue); }
  set size(newValue) { this.setAttribute('size', newValue); }
  set disabled(newValue) { this.setAttribute('disabled', newValue); }
  set type(newValue) { this.setAttribute('type', newValue); }
  set native_type(newValue) { this.setAttribute('native-type', newValue); }
  set autofocus(newValue) { this.setAttribute('autofocus', newValue); }
}
customElements.define('jj-button', JJButton);
