const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="inputNumber.css">
  <div class="input-number">
    <button aria-label="decrement" class="decrement-btn">-</button><!--
    --><input type="number" class="input-field"></input><!--
    --><button aria-label="increment" class="increment-btn">+</button>
  </div>
`;

const template2 = document.createElement('template');
template2.innerHTML = `
  <link rel="stylesheet" href="inputNumber.css">
  <div class="input-number">
    <input type="number" value = 0 class="input-field"></input>
    <div class = "button-container">
      <button aria-label="increment" class="increment-btn-2">+</button>
      <button aria-label="decrement" class="decrement-btn-2">-</button>
    </div>
  </div>
`;

class InputNum extends HTMLElement {
  set value(value) {
    this._value = this.trans(value);
    let c = parseFloat(this.value).toFixed(this.precision);
    this.valueElement.value = c;
  }
  get value() { return this.trans(this._value); }

  set size(sizeValue) { this._size = this.trans(sizeValue); }
  get size() { return this.trans(this._size); }

  set step(stepValue) { this._step = this.trans(stepValue); }
  get step() { return this.trans(this._step); }

  set position(new_p) { this._position = new_p; }
  get position() { return this._position; }

  set precision(prec){ this._precision = prec ; }
  get precision(){ return this._precision; }

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
      this.value = 0;

    if (!this.hasAttribute('value'))
      this.position = 'done';

    if(!this.hasAttribute('precision'))
      this.precision = 0;
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    if (this.position !== 'done') 
      this.load();
    
    let curPre = 0;
    if (this.precision !== 'undefined'){
      curPre = this.precision;
    }

    switch (attrName) {
    case 'min':
      this.valueElement.min = this.trans(newValue);
      break;
    case 'max':
      this.valueElement.max = this.trans(newValue);
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
      if(parseInt(newValue) >=0){
        this.precision = parseInt(newValue);
      }
    break;
    }
    this.position = 'done';
  }

  constructor() {
    super();
    this.root = this.attachShadow({mode : 'open'});
  }

  trans(value){
    return parseFloat(parseFloat(value).toFixed(this.precision));
  }

  load() {
    this._value = 0;
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

    this.incrementButton.addEventListener('click', (e) => {
      console.log("step is: " + this.step);
      console.log("value is: " + this.value);
      console.log("precision is: " + this.precision);

      if ((this.valueElement.max) > (this.value) + (this.step))
        this.value = (this.step) + (this.value);
      else
        window.alert("Number too big");
    });

    this.decrementButton.addEventListener('click', (e) => {
      if ((this.valueElement.min) < (this.value) - (this.step))
        this.value = (this.value)- (this.step);
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
        'input', (e) => { this.value = parseFloat(e.srcElement.value).toFixed(this.precision); });

    this.valueElement.addEventListener(
        'click', (e) => this.inputDiv.style.borderColor = "#75baff");
  }
}
customElements.define('input-number', InputNum);