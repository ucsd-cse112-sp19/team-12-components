const template = document.createElement('template');
template.innerHTML = `
  <style>
    button, p {
      display: inline-block;
    }
    input[type="number"] {
      -webkit-appearance: textfield;
         -moz-appearance: textfield;
              appearance: textfield;
    }
    input[type=number]::-webkit-inner-spin-button, 
    input[type=number]::-webkit-outer-spin-button { 
      -webkit-appearance: none;
    }
  </style>
  <button aria-label="decrement">-</button>
    <input type="number"></input>
  <button aria-label="increment">+</button>
`;

class InputNum extends HTMLElement {
  set value(value) {
    this._value = value;
    this.valueElement.value = this.value;
  }
  get value() {
    return this._value;
  }

  set size(sizeValue){
    this._size = sizeValue;
  }
  get size(){
    return this._size;
  }

  set step(stepValue){
    this._step = stepValue;
  }
  get step(){
    return this._step;
  }

  set disabled(isdisabled){
    this.setAttribute
  }

  static get observedAttributes() { return [ 'min', 'max', 'step', 'size', 'disabled', 'placeholder', 'value']; }
  
  connectedCallback() {
    if (!this.hasAttribute('min'))
      this.valueElement.min = Number.NEGATIVE_INFINITY;
    
    if (!this.hasAttribute('max'))
      this.valueElement.max = Number.POSITIVE_INFINITY;
    
    if (!this.hasAttribute('step'))
      this.step = 1;
    
    if(!this.hasAttribute('size'))
      //TODO
      this.valueElement.setAttribute('size','small');
  
    if(!this.hasAttribute('disabled'))
      //TODO
    
    /*
    if(!this.hasAttribute('placeholder'))
      this.valueElement.setAttribute('placeholder', '');
    */
    if (!this.hasAttribute('value'))
      this.value = 0;
    
    
  }

  attributeChangedCallback(attrName, oldValue, newValue) {
    switch (attrName) {
      case 'min':
        this.valueElement.setAttribute(min,parseInt(newValue, 10));
        //this.valueElement.min = parseInt(newValue, 10);
        break;
      case 'max':
        this.valueElement.max = parseInt(newValue, 10);
        break;
      case 'step':
        this.step = parseInt(newValue, 10);
        break;
      case 'size':
        //TODO
        break;
      case 'disabled':
        //TODO
        break;
      case 'placeholder':
        this.valueElement.setAttribute('placeholder',newValue);
        break;
      case 'value':
        this.value = parseInt(newValue, 10);
        break;
      case 'controls':
        if (newValue === 'true'){
          this.incrementButton.style.display = 'none';
          this.decrementButton.style.display = 'none';
        }
      }
  }

  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.root.appendChild(template.content.cloneNode(true));

    this.valueElement = this.root.querySelector('input');
    this.incrementButton = this.root.querySelectorAll('button')[1];
    this.decrementButton = this.root.querySelectorAll('button')[0];

    this.incrementButton
      .addEventListener('click', (e) => {
        console.log(this.step);
        if (this.valueElement.max > this.value+this.step)
          this.value+=this.step;
        else
          window.alert("Number too big");
      });

    this.decrementButton
      .addEventListener('click', (e) => {
        if (this.valueElement.min < this.value-this.step)
          this.value-=this.step;
        else
          window.alert("Number too small")
      });

    this.valueElement
      .addEventListener('keyup', (e) => this.value = this.valueElement.value);
  }
}

customElements.define('input-number', InputNum);