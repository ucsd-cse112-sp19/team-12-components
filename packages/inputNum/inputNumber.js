const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="inputNumber.css">
  <div class="input-number">
    <button aria-label="decrement" class="decrement-btn">-</button><!--
    --><input type="number" value = 0 class="input-field"></input><!--
    --><button aria-label="increment" class="increment-btn">+</button>
  </div>
`;

class InputNum extends HTMLElement {
  set value(value) {
    this._value = value;
    this.valueElement.value = this.value;
  }
  get value() { return this._value; }

  set size(sizeValue) { this._size = sizeValue; }
  get size() { return this._size; }

  set step(stepValue) { this._step = stepValue; }
  get step() { return this._step; }

  set disabled(isdisabled) { this.setAttribute }

  static get observedAttributes() {
    return [
      'controls', 'min', 'max', 'step', 'size', 'disabled', 'placeholder',
      'value'
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
      this.value = 0;
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    switch (attrName) {
    case 'min':
      this.valueElement.min = parseInt(newValue, 10);
      break;
    case 'max':
      this.valueElement.max = parseInt(newValue, 10);
      break;
    case 'step':
      this.step = parseInt(newValue, 10);
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
      if (newValue > this.valueElement.max ||
          newValue < this.valueElement.min) {
        window.alert("Out of Range!");
      } else
        this.value = parseInt(newValue, 10);
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
    }
  }

  constructor() {
    super();
    this._value = 0;

    this.root = this.attachShadow({mode : 'open'});
    this.root.appendChild(template.content.cloneNode(true));

    this.inputDiv = this.root.querySelector('div');
    this.valueElement = this.root.querySelector('input');
    this.incrementButton = this.root.querySelectorAll('button')[1];
    this.decrementButton = this.root.querySelectorAll('button')[0];

    this.incrementButton.addEventListener('click', (e) => {
      console.log(this.step);
      if (this.valueElement.max > this.value + this.step)
        this.value += this.step;
      else
        window.alert("Number too big");
    });

    this.decrementButton.addEventListener('click', (e) => {
      if (this.valueElement.min < this.value - this.step)
        this.value -= this.step;
      else
        window.alert("Number too small")
    });

    this.valueElement.addEventListener('keyup', (e) => this.value =
                                                    this.valueElement.value);

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

    this.valueElement.addEventListener(
        'click', (e) => this.inputDiv.style.borderColor = "#75baff");
  }
}
customElements.define('input-number', InputNum);