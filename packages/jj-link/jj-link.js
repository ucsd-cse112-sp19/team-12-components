/**
 * @attribute_name jj link
 * @attribute href, string, the address of our link to, /
 * @attribute type, link type, string, default/primary/success/warning/danger, /
 * @attribute underline, underline the link text, /, false
 * @attribute disabled, disable the link, boolean, /, false
 * @attribute icon, icon class name, string, /, /
 *
 */

const template = document.createElement('template');
template.innerHTML = `
  <style>
    .link {
      display: inline-block;
      line-height: 1;
      white-space: nowrap;
      cursor: pointer;
      text-decoration: none;
      color: black;
    }
    .link:hover {
      color:#409eff;
    }
    .link.underline:hover {
      color:#409eff;
      text-decoration: underline;
    }
    .link.disabled {
      opacity: 0.4;
      pointer-events: none;
    }
    .success {
      color: green;
    }
    .success:hover {
      color:#67c23a;
    }
    .success.underline:hover {
      color:#67c23a;
      text-decoration: underline;
    }
    .info {
      color: gray;
    }
    .info:hover {
      color:#909399
    }
    .info.underline:hover {
      color:#909399;
      text-decoration: underline;
    }
    .warning {
      color: orange;
    }
    .warning:hover {
      color:#e6a23c;
    }
    .warning.underline:hover {
      color:#e6a23c;
      text-decoration: underline;
    }
    .danger {
      color: red;
    }
    .danger:hover {
      color:#f56c6c
    }
    .danger.underline:hover {
      color:#f56c6c;
      text-decoration: underline;
    }
  </style>
  <a class="link"><slot></slot></a> 
  `;
// define the css for this component
class JJLink extends HTMLElement {
  static get observedAttributes() {
    return [ 'href', 'type', 'disabled', 'icon' ];
  }
  constructor() {
    super();
    this.root = this.attachShadow({mode : 'open'});
    this.root.appendChild(template.content.cloneNode(true));

    // define the elements of this component
    this.link = this.root.querySelector('.link');
  }

  connectedCallback() {
    // set the type attribute
    this.type = "default";
    if (this.hasAttribute('type')) {
      this.type = this.getAttribute('type');
      this.link.classList.add(this.getAttribute('type'));
    }
    // set the href attribute
    if (this.hasAttribute('href')) {
      this.link.setAttribute('href', this.getAttribute('href'));
    }
    // set the disabled attribute
    this.disabled = false;
    if (this.getAttribute('disabled') == 'true') {
      this.disabled = true;
      this.link.classList.add('disabled')
    } 
    // set the underline attribute
    this.underline = false;
    if (this.getAttribute('underline') == 'true') {
      this.underline = true;
      this.link.classList.add('underline')
    }
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    switch (attrName) {
    case 'type':
      this.link.classList.remove(oldValue);
      this.link.classList.add(newValue);
      break;
    case 'disabled':
      this.changeDisableUnderline('disabled', newValue);
      break;
    case 'underline':
      this.changeDisableUnderline('underline',newValue);
      break;
    }
  }

  changeDisableUnderline(attribute, newValue){
    if (newValue == "false") {
      this.link.classList.remove(attribute);
    } else {
      this.link.classList.add(attribute);
    }
  }

  // Getters
  get disabled() { return this.getAttribute('disabled'); }
  get type() { return this.getAttribute('type'); }
  get underline() { return this.getAttribute('underline'); }
  get href() { return this.getAttribute('href') };
  // Setters
  set disabled(newValue) { this.setAttribute('disabled', newValue); }
  set type(newValue) { this.setAttribute('type', newValue); }
  set underline(newValue) { this.setAttribute('underline', newValue); }
  set href(newValue) { this.setAttribute('href', newValue) };
}
customElements.define('jj-link', JJLink);