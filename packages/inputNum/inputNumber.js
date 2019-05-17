// This is the template for the Position default.
const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="inputNumber.css">
  <div class="input-number">
    <button aria-label="decrement" class="decrement-btn" id="decrementBtn">-</button><!--
    --><input type = "text" class="input-field"></input><!--
    --><button aria-label="increment" class="increment-btn" id="incrementBtn">+</button>
  </div>
`;

// This is the template for Position right
const template2 = document.createElement('template');
template2.innerHTML = `
  <link rel="stylesheet" href="inputNumber.css">
  <div class="input-number">
    <input type = "text" class="input-field"></input>
    <div class = "button-container">
      <button aria-label="increment" class="increment-btn-2" id="incrementBtn">&#708;</button>
      <button aria-label="decrement" class="decrement-btn-2" id="decrementBtn">&#709;</button>
    </div>
  </div>
`;

class InputNum extends HTMLElement {
  set value(value) {
    // console.log("in set value: " + value);
    // console.log("after concersion: " + this.trans(value));
    if (value === '') {
      this._value = this.trans('');
      this.valueElement.value = '';
      return;
    }

    if (this.trans(value) >= this.valueElement.max) {
      value = this.valueElement.max;
      this.incrementButton.classList.add('disabled');
    } else {
      this.incrementButton.classList.remove('disabled');
    }

    if (this.trans(value) <= this.valueElement.min) {
      value = this.valueElement.min;
      this.decrementButton.classList.add('disabled');
    } else {
      this.decrementButton.classList.remove('disabled');
    }

    this._value = this.trans(value);
    this.valueElement.value = parseFloat(this.value).toFixed(this.precision);
  }

  get value() { return this._value; }

  set size(sizeValue) { this._size = this.trans(sizeValue); }
  get size() { return this._size; }

  set step(stepValue) { this._step = this.trans(stepValue); }
  get step() { return this._step; }

  set position(new_p) { this._position = new_p; }
  get position() { return this._position; }

  set precision(prec) { this._precision = prec; }
  get precision() { return this._precision; }

  static get observedAttributes() {
    return [
      'controls', 'min', 'max', 'step', 'size', 'disabled', 'placeholder',
      'value', 'controls-position', 'precision'
    ];
  }

  connectedCallback() {
    if (!this.hasAttribute('min'))
      this.valueElement.min = Number.NEGATIVE_INFINITY;

    if (!this.hasAttribute('max'))
      this.valueElement.max = Number.POSITIVE_INFINITY;

    if (!this.hasAttribute('step'))
      this.step = 1;

    if (!this.hasAttribute('size'))
      this.inputDiv.className += ' small';

    if (!this.hasAttribute('value'))
      this.value = this.valueElement.min;

    if (!this.hasAttribute('precision'))
      this.precision = 0;
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (this.position !== 'done')
      this.load();

    let curPre = 0;
    if (this.precision !== 'undefined') {
      curPre = this.precision;
    }

    switch (attrName) {
    case 'min':
      this.valueElement.min = this.trans(newValue);
      this.value = this.value;
      break;
    case 'max':
      this.valueElement.max = this.trans(newValue);
      this.value = this.value;
      break;
    case 'step':
      this.step = this.trans(newValue);
      break;
    case 'size':
      this.inputDiv.classList.remove(oldValue);
      this.inputDiv.classList.add(newValue);
      break;
    case 'disabled':
      if (newValue)
        this.inputDiv.classList.add('disabled');
      else
        this.inputDiv.classList.remove('disabled');
      break;
    case 'placeholder':
      this.valueElement.setAttribute('placeholder', newValue);
      break;
    case 'value':
      this.value = this.trans(newValue);
      break;

    case 'controls':
      if (newValue === 'false') {
        this.incrementButton.style.display = 'none';
        this.decrementButton.style.display = 'none';
        this.valueElement.style.width = '99%';
      } else {
        this.incrementButton.style.display = 'inline-block';
        this.decrementButton.style.display = 'inline-block';
        this.valueElement.style.width = '59%';
      }
      break;

    case 'precision':
      if (parseInt(newValue) >= 0) {
        this.precision = parseInt(newValue);
        this.value = this.trans(this.value);
      }
      break;
    }
    this.position = 'done';
  }

  constructor() {
    super();
    this.root = this.attachShadow({mode : 'open'});
  }

  trans(value) { return parseFloat(parseFloat(value).toFixed(this.precision)); }

  load() {
    var timer;
    if (this.getAttribute('controls-position') === 'right') {
      this.root.appendChild(template2.content.cloneNode(true));
      this.inputDiv = this.root.querySelector('div');
      this.valueElement = this.root.querySelector('input');
      this.incrementButton = this.root.querySelectorAll('button')[0];
      this.decrementButton = this.root.querySelectorAll('button')[1];
    } else {
      this.root.appendChild(template.content.cloneNode(true));

      this.inputDiv = this.root.querySelector('div');
      this.valueElement = this.root.querySelector('input');
      this.incrementButton = this.root.querySelectorAll('button')[1];
      this.decrementButton = this.root.querySelectorAll('button')[0];
    }

    this.incrementButton.addEventListener('mousedown', (e) => {
      if ((this.valueElement.max) >= (this.value) + (this.step)) {
        this.value = (this.value) + (this.step);

        // Click and hold functionality.
        var dom = this.root;
        var step = this.step;
        var precision = this.precision;
        var value = this.value;
        let _this = this; // reserve 'this' context
        timer = setInterval(function() {
          dom.querySelector('input').value =
              (parseFloat(dom.querySelector('input').value) + step)
                  .toFixed(precision);
          value = (parseFloat(dom.querySelector('input').value) + step)
                      .toFixed(precision);
          console.log('inside the fun' + value);
          _this.value = value; // this.value won't work
        }, 500);
        console.log(value);
        // this.value = value;

        this.decrementButton.classList.remove('disabled');
        if ((this.valueElement.max) <= (this.value))
          this.incrementButton.classList.add('disabled');
      }
    });

    this.incrementButton.addEventListener('mouseleave',
                                          function() { clearInterval(timer); });

    this.incrementButton.addEventListener('mouseup',
                                          function() { clearInterval(timer); });

    this.decrementButton.addEventListener('mousedown', (e) => {
      if ((this.valueElement.min) <= (this.value) - (this.step)) {
        this.value = (this.value) - (this.step);
        var dom = this.root;
        var step = this.step;
        var precision = this.precision;
        var value = this.value;
        let _this = this;
        timer = setInterval(function() {
          dom.querySelector('input').value =
              (parseFloat(dom.querySelector('input').value) - step)
                  .toFixed(precision);
          value = (parseFloat(dom.querySelector('input').value) - step)
                      .toFixed(precision);
          _this.value = value;
        }, 500);
        // this.value = value;
        this.incrementButton.classList.remove('disabled');
        if ((this.valueElement.min) >= (this.value))
          this.decrementButton.classList.add('disabled');
      }
    });

    this.decrementButton.addEventListener('mouseleave',
                                          function() { clearInterval(timer); });

    this.decrementButton.addEventListener('mouseup',
                                          function() { clearInterval(timer); });

    /* This two lines give us too much pain!!!!!
    this.valueElement.addEventListener('keyup', (e) => this.value =
                                                    this.valueElement.value);
    */

    this.decrementButton.addEventListener('mouseover', (e) => {
      this.inputDiv.style.borderColor = "#75baff";
      this.decrementButton.style.color = "#75baff";
    });
    this.decrementButton.addEventListener('mouseout', (e) => {
      this.inputDiv.style.borderColor = "#c2c2c2";
      this.decrementButton.style.color = "black";
    });

    this.incrementButton.addEventListener('mouseover', (e) => {
      this.inputDiv.style.borderColor = "#75baff";
      this.incrementButton.style.color = "#75baff";
    });
    this.incrementButton.addEventListener('mouseout', (e) => {
      this.inputDiv.style.borderColor = "#c2c2c2";
      this.incrementButton.style.color = "black";
    });

    this.valueElement.addEventListener('keydown', (e) => {
      const key = e.key;
      let string = this.valueElement.value;
      if (key === "Backspace" || key === "Delete") {
        if (string.length == 1 || string.length == 0) {
          this.value = '';
        } else {
          this.valueElement.value = string.substring(0, string.length);
          return;
        }
      }
      if (key === "Enter") {
        this.value = e.srcElement.value;
      }
    });
    this.valueElement.addEventListener('click', (e) => {
      this.value = e.srcElement.value;
      this.inputDiv.style.borderColor = "#75baff";
    });
  }
}
customElements.define('input-number', InputNum);