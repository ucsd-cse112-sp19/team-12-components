/**
 * @component_name jj input number
 * @component_desc Input numerical values with a customizable range.
 * @attribute value / v-model	,binding value,	number,	/	,0
 * @attribute min,	the minimum allowed value,	number, /
 * ,-Infinity
 * @attribute max,	the maximum allowed value,	number,	—
 * ,Infinity
 * @attribute step,	incremental step, number,	/	,1
 * @attribute step-strictly,whether input value can only be multiple of
 * step,number,/,false
 * @attribute precision,	precision of input value,	number,	/,
 * /
 * @attribute size,	size of the component,	string,	large/small,	/
 * @attribute disabled,	whether the component is disabled,	boolean,
 * /,	false
 * @attribute controls,	whether to enable the control buttons,	boolean,
 * /,	true
 * @attribute controls-position,	position of the control buttons	string,
 * right,	/
 * @attribute name, same as name in native input,	string,	/,	/
 * @attribute label, label text,	string,	/,	/
 * @attribute placeholder,	placeholder in input,	string,	/,	/
 *
 *
 */


const jjInputNum = () => {
  let styles = `<style>
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

    .jj-input-number {
        display: inline-block;
        border: 1px solid var(--border-color,#c2c2c2);
        border-radius: 5px;
        padding: 0px;
    }

    .border-blue {
        border-color: var(--border-color,#75baff);
    }

    .color-blue {
        color: var(--color,#75baff);
    }

    .decrement-btn {
        width: 20%;
        height: 100%;
        font-size: 14px;
        border: none;
        border-right: 1px solid var(--border-color,#c2c2c2);
        border-radius: 5px;
        padding: 0px;
        background-color: var(--decrement-color);
    }

    .increment-btn {
        width: 20%;
        height: 100%;
        font-size: 14px;
        border: none;
        border-left: 1px solid var(--border-color,#c2c2c2);
        border-radius: 5px;
        padding: 0px;
        background-color: var(--increment-color);
    }

    .button-container {
        width:40%;
        height: 100%;
        float:right;
        display: flex;
        flex-direction: column;
        padding: 0px;
    }

    .increment-btn-2{
        width:100%;
        height:50%;
        font-size:14px;
        border:none;
        border-left:1px solid var(--border-color,#c2c2c2);
        border-bottom: 1px solid var(--border-color,#c2c2c2);
        border-radius: 5px;
        text-align: center;
        padding: 0px;
    }

    .decrement-btn-2{
        width:100%;
        height:50%;
        font-size:14px;
        border:none;
        border-left:1px solid var(--border-color,#c2c2c2);
        border-radius: 5px;
        text-align: center;
        padding: 0px;
    }
    
    .input-field {
        width: 60%;
        height: 100%;
        font-size: 14px;
        text-align: center;
        border: none;
        padding: 0px;
        font-family: var(--font, Arial);
    }

    .disabled {
        pointer-events:none;
        opacity: 0.4;
    }

    .small {
        width: 200px;
        height: 40px;
    }

    .large {
        width: 250px;
        height: 55px;
    }
  </style>`;

  // This is the template for the Position default.
  const template = document.createElement('template');
  template.innerHTML = styles + `
  <div class="jj-input-number">
    <button aria-label="decrement" class="decrement-btn" id="decrementBtn">-</button><!--
    --><input id="jj-inputBoxNum" type = "text" class="input-field"></input><!--
    --><button aria-label="increment" class="increment-btn" id="incrementBtn">+</button>
  </div>
`;


  // This is the template for Position right
  const template2 = document.createElement('template');
  template2.innerHTML = styles + `
  <div class="jj-input-number">
    <input id="jj-inputBoxNum" type = "text" class="input-field"></input>
    <div class = "button-container">
      <button aria-label="increment" class="increment-btn-2" id="incrementBtn">&#708;</button>
      <button aria-label="decrement" class="decrement-btn-2" id="decrementBtn">&#709;</button>
    </div>
  </div>
`;

      class JJInputNum extends HTMLElement {
        set value(value) {
          if (this.inputDiv.classList.contains('disabled'))
            return
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
          if (isNaN(this._value)) {
            this._value = this.trans('');
            this.valueElement.value = '';
          } else
            this.valueElement.value =
                parseFloat(this._value).toFixed(this.precision);
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
            if (newValue == "" || newValue == "true")
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

        trans(value) {
          return parseFloat(parseFloat(value).toFixed(this.precision));
        }

        load() {
          // This timer is used for the click and hold functionality.
          var timer;

          // Check if where the position is and render the buttons accordingly.
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

          // Logic for the increment button getting clicked
          this.incrementButton.addEventListener('mousedown', (e) => {
            if (this.valueElement.max >= this.value + this.step) {
              this.value = (this.value) + (this.step);
              this.setAttribute("value", this.value);

              // Click and hold functionality.
              let _this = this; // reserve 'this' context
              timer = setInterval(function() {
                _this.value = (_this.value) + (_this.step);
                _this.setAttribute("value", _this.value);
              }, 400);

              this.decrementButton.classList.remove('disabled');
              if ((this.valueElement.max) <= (this.value))
                this.incrementButton.classList.add('disabled');
            }
          });

          this.incrementButton.addEventListener(
              'mouseleave', function() { clearInterval(timer); });

          this.incrementButton.addEventListener(
              'mouseup', function() { clearInterval(timer); });

          // Logic for the decrement button getting clicked
          this.decrementButton.addEventListener('mousedown', (e) => {
            if (this.valueElement.min <= this.value - this.step){
              this.value = (this.value) - (this.step);
              this.setAttribute("value", this.value);

              let _this = this;
              timer = setInterval(function() {
                _this.value = (_this.value) - (_this.step);
                _this.setAttribute("value", _this.value);
              }, 400);

              this.incrementButton.classList.remove('disabled');
              if ((this.valueElement.min) >= (this.value))
                this.decrementButton.classList.add('disabled');
            }
          });

          this.decrementButton.addEventListener(
              'mouseleave', function() { clearInterval(timer); });

          this.decrementButton.addEventListener(
              'mouseup', function() { clearInterval(timer); });

          /* This two lines give us too much pain!!!!!
          this.valueElement.addEventListener('keyup', (e) => this.value =
                                                          this.valueElement.value);
          */

          this.decrementButton.addEventListener('mouseover', (e) => {
            this.inputDiv.classList.add("border-blue");
            this.decrementButton.classList.add("color-blue");
          });
          this.decrementButton.addEventListener('mouseout', (e) => {
            this.inputDiv.classList.remove("border-blue");
            this.incrementButton.classList.remove("color-blue");
          });

          this.incrementButton.addEventListener('mouseover', (e) => {
            this.inputDiv.classList.add("border-blue");
            this.incrementButton.classList.add("color-blue");
            ;
          });
          this.incrementButton.addEventListener('mouseout', (e) => {
            this.inputDiv.classList.remove("border-blue");
            this.incrementButton.classList.remove("color-blue");
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
              this.setAttribute("value", this.value);
            }
          });
          this.valueElement.addEventListener('mouseover', (e) => {
            this.value = e.srcElement.value;
            this.setAttribute("value", this.value);
            this.inputDiv.classList.add("border-blue");
          });
          this.valueElement.addEventListener('mouseout', (e) => {
            this.value = e.srcElement.value;
            this.setAttribute("value", this.value);
            this.inputDiv.classList.remove("border-blue");
          });
        }
      }
      customElements.define('jj-input-number', JJInputNum);
    }

jjInputNum();
