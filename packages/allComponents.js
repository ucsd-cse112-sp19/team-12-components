const jjSwitch = () => {
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    @import url("https://unpkg.com/element-ui/lib/theme-chalk/switch.css");
  
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
    <div role="switch" id="container" class="el-switch">
      <span id="inactiveText" class='text'></span>
        <label class="switch">
        <input type="checkbox">
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
        this.root.appendChild(template.content.cloneNode(true));
  
        // define the elements.
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
          this.activeColor = '#409eff';
        }
  
        if (this.hasAttribute('inactive-color')) {
          this.inactiveColor = this.getAttribute('inactive-color');
          if (!this.input.checked) {
            this.slider.style.background = this.inactiveColor;
            this.inactiveText.classList.add('text-active');
          }
        } else {
          this.inactiveColor = '#dcdfe6';
        }
  
        if (this.hasAttribute('active-text')) {
          this.activeText.innerHTML = this.getAttribute('active-text');
        }
  
        if (this.hasAttribute('inactive-text')) {
          this.inactiveText.innerHTML = this.getAttribute('inactive-text');
        }
  
        if (this.hasAttribute('disabled')) {
          if (this.getAttribute('disabled') == 'true') {
            this.container.classList.add('disabled');
          } else {
            this.container.classList.remove('disabled');
          }
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
          if (this.getAttribute('round') == 'false') {
            console.log(this.getAttribute('round'));
            this.slider.classList.remove('round');
          } else {
            console.log("else "+this.getAttribute('round'));
            this.slider.classList.add('round');
          }
        }
  
        if (this.hasAttribute('value')) {
          this.value = this.getAttribute('value');
          if (this.getAttribute('value') == 'true') {
            this.input.checked = true;
            this.onSwitchClick();
          }
        } else {
          if (this.input.checked) {
            this.value = this.activeValue;
          } else {
            this.value = this.inactiveValue;
          }
        }
  
        if (this.hasAttribute('size')) {
          var size = this.getAttribute('size');
          if (size == 'small') {
            this.slider.classList.add('small');
            this.label.style.width = '40px';
            this.label.style.height = '18px';
          } else if (size == 'large') {
            this.slider.classList.add('large');
            this.label.style.width = '70px';
            this.label.style.height = '32px';
          }
        }
  
        // add event listeners
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
          console.log("switch click checked "+this.value);
        } else {
          // change the slider color
          this.slider.style.background = this.inactiveColor;
  
          // highlight the text if there is any
          this.activeText.classList.remove('text-active');
          this.inactiveText.classList.add('text-active');
  
          // change the value
          this.value = this.inactiveValue;
          console.log("switch click not checked "+this.value);
        }
      }
  
      // Getters
      get value() { return (this.getAttribute('value') == 'true'); }
      get active_value() { return this.getAttribute('active-value'); }
      get inactive_value() { return this.getAttribute('inactive-value'); }
      get active_text() { return this.getAttribute('active-text'); }
      get inactive_text() { return this.getAttribute('inactive-text'); }
      get active_color() { return this.getAttribute('active-color'); }
      get inactive_color() { return this.getAttribute('inactive-color'); }
      get size() { return this.getAttribute('size'); }
  
      // Setters
      set value(newValue) { this.setAttribute('value', newValue); }
      set active_value(newValue) {this.setAttribute('active-value', newValue); }
      set inactive_value(newValue) {this.setAttribute('inactive-value', newValue); }
      set active_text(newValue) {this.setAttribute('active-text', newValue); }
      set inactive_text(newValue) {this.setAttribute('inactive-text', newValue); }
      set active_color(newValue) {this.setAttribute('active-color', newValue); }
      set inactive_color(newValue) {this.setAttribute('inactive-color', newValue); }
      set size(newValue) {this.setAttribute('size', newValue); }
      set name(newValue) {this.setAttribute('name', newValue); }
    }
    customElements.define('jj-switch', JJSwitch);
  }

  const jjSlider =
  () => {
    const template = document.createElement('template');
    template.innerHTML = `
  <style>
  @import url("https://unpkg.com/element-ui/lib/theme-chalk/slider.css");

  .el-slider {
      font-family: var(--tooltip-font, Helvetica, Arial, sans-serif);
      width: var(--slider-width);
      margin: 0 auto;
  }
  
  .el-slider__runway {
      background-color: var(--runway-color, #E4E7ED);
  }
  
  .el-slider__bar {
      background-color: var(--bar-color, #409EFF);
  }
  
  .el-slider__button {
      border: 2px solid var(--button-border-color, #409EFF);
      background-color: var(--button-color, #FFF);
  }
  
  .el-tooltip__popper.is-dark {
      background: var(--tooltip-color, #303133);
      color: var(--tooltip-text-color, #FFF);
  }
  
  .el-tooltip__popper[x-placement^=top] .popper__arrow,
  .el-tooltip__popper[x-placement^=top] .popper__arrow::after {
      border-top-color: var(--tooltip-color, #303133);
  }
  </style>
  <div role="slider" aria-valuemin="0" aria-valuemax="100" aria-orientation="horizontal" class="el-slider" aria-valuetext="0" aria-label="slider between 0 and 100">
      <div class="el-slider__runway" id="runway">
          <div class="el-slider__bar" style="left: 0%;"></div>
          <div tabindex="0" class="el-slider__button-wrapper" id="btn">
              <div class="el-tooltip el-slider__button" aria-describedby="el-tooltip-9861" tabindex="0"></div>
          </div>
      </div>
      <div role="tooltip" id="el-tooltip-9861" aria-hidden="false" class="el-tooltip__popper is-dark" x-placement="top">
          <span></span>
          <div x-arrow="" class="popper__arrow" style="left: 10.5px;"></div>
      </div>
  </div>
`;

    class JJSlider extends HTMLElement {
      constructor() {
        super();
        this.root = this.attachShadow({mode : 'open'});
        this.root.appendChild(template.content.cloneNode(true));

        // Target elements with querySelector
        this.sliderContainer = this.root.querySelector('.el-slider');
        this.sliderRunway = this.root.querySelector('.el-slider__runway');
        this.sliderBar = this.root.querySelector('.el-slider__bar');
        this.sliderBtnWrapper =
            this.root.querySelector('.el-slider__button-wrapper');
        this.sliderBtn =
            this.root.querySelector('.el-tooltip.el-slider__button');
        this.tooltip = this.root.querySelector('.el-tooltip__popper');
        this.tooltipSpan =
            this.root.querySelector('.el-tooltip__popper span');

        // Bind "this" to functions to reserve context
        this.getCurrentPosition = this.getCurrentPosition.bind(this);
        this.setInitPosition = this.setInitPosition.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.onSliderClick = this.onSliderClick.bind(this);
        this.onButtonHover = this.onButtonHover.bind(this);
        this.onButtonHoverEnd = this.onButtonHoverEnd.bind(this);
        this.onButtonDown = this.onButtonDown.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragging = this.onDragging.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
      }

      connectedCallback() {
        // Bind event listener to slider elements
        this.sliderRunway.addEventListener('mousedown', this.onSliderClick);
        this.sliderBtnWrapper.addEventListener('mouseover',
                                               this.onButtonHover);
        this.sliderBtnWrapper.addEventListener('mouseout',
                                               this.onButtonHoverEnd);
        this.sliderBtnWrapper.addEventListener('mousedown',
                                               this.onButtonDown);

        // Get attribute values and set default values if not provided
        if (this.hasAttribute('value')) {
          this._value = this.getAttribute('value');
        } else {
          this._value = 0;
        }
        if (this.hasAttribute('min')) {
          this.min = this.getAttribute('min');
        } else {
          this.min = 0;
        }
        if (this.hasAttribute('max')) {
          this.max = this.getAttribute('max');
        } else {
          this.max = 100;
        }

        // Initialize positions
        this.setInitPosition();
        // Set tooltip display value
        this.tooltipSpan.innerHTML = Math.round(this._value);
        // Hide tooltip at initialization
        this.tooltip.style =
            "transform-origin: center bottom; z-index: 2282; position: absolute; display: none;";
      }

      // Get the percentage value of button's position on slider runway.
      getCurrentPosition() {
        return (this._value - this.min) / (this.max - this.min) * 100 + "%";
      }

      // Initialization: Set width of slider bar and offset of slider button
      // based on position of current value
      setInitPosition() {
        const percent =
            (this._value - this.min) / (this.max - this.min) * 100;
        this.sliderBar.style.width = percent + "%";
        this.sliderBtnWrapper.style.left = percent + "%";
      }

      // Calculate target value based on percentage and set width of slider
      // bar and offset of slider button
      setPosition(percent) {
        // Calculate target value based on percentage
        let targetValue =
            parseInt(this.min) + percent * (this.max - this.min) / 100;
        if (targetValue > this.max) {
          targetValue = this.max;
        } else if (targetValue < this.min) {
          targetValue = this.min;
        }
        this._value = targetValue;
        this.setAttribute("value", Math.round(this._value));

        // Percentage boundary check
        let newPercent = percent;
        if (newPercent > 100) {
          newPercent = 100;
        } else if (newPercent < 0) {
          newPercent = 0;
        }
        this.sliderBar.style.width = newPercent + "%";
        this.sliderBtnWrapper.style.left = newPercent + "%";

        // Set tooltip display value
        this.tooltipSpan.innerHTML = Math.round(this._value);
        // Set tooltip position
        let rect = this.sliderBtnWrapper.getBoundingClientRect();
        this.tooltip.style =
            "transform-origin: center bottom; z-index: 2282; position: absolute; top: " +
            (rect.top - rect.height) + "px; left: " + rect.left + "px;";
      }

      // This event handler will be called when the slider runway receives a
      // 'mousedown' signal. Set width of slider bar and offset of slider
      // button based on position of cursor on mousedown.
      onSliderClick(event) {
        this.sliderSize = this.sliderContainer.clientWidth;
        const sliderOffsetLeft =
            this.sliderContainer.getBoundingClientRect().left;
        this.setPosition((event.clientX - sliderOffsetLeft) /
                         this.sliderSize * 100);
        this.onButtonDown(event);
      }

      // This event handler will be called when the slider button receives a
      // 'mouseover' signal. Set tooltip position on mouseover.
      onButtonHover(event) {
        let rect = this.sliderBtnWrapper.getBoundingClientRect();
        this.tooltip.style =
            "transform-origin: center bottom; z-index: 2282; position: absolute; top: " +
            (rect.top - rect.height) + "px; left: " + rect.left + "px;";
      }

      // This event handler will be called when the slider button receives a
      // 'mouseout' signal. Hide tooltip on mouseout.
      onButtonHoverEnd(event) {
        this.tooltip.style =
            "transform-origin: center bottom; z-index: 2282; position: absolute; display: none;";
      }

      // This event handler will be called when the slider button receives a
      // 'mousedown' signal. Trigger onDragStart() and add event listeners to
      // onDragging() and onDragEnd().
      onButtonDown(event) {
        if (this.disabled)
          return;
        event.preventDefault();
        this.onDragStart(event);
        window.addEventListener('mousemove', this.onDragging);
        window.addEventListener('touchmove', this.onDragging);
        window.addEventListener('mouseup', this.onDragEnd);
        window.addEventListener('touchend', this.onDragEnd);
        window.addEventListener('contextmenu', this.onDragEnd);
      };

      // Mark original value's position when dragging starts
      onDragStart(event) {
        this.dragging = true;
        this.isClick = true;
        if (event.type === 'touchstart') {
          event.clientX = event.touches[0].clientX;
        }
        this.startX = event.clientX;
        this.startPosition = parseFloat(this.getCurrentPosition());
        this.newPosition = this.startPosition;
      };

      // This event handler will be called when the window (global scope)
      // receives a 'mousemove' or 'touchmove' signal. Call setPosition() with
      // new position on mousemove.
      onDragging(event) {
        if (this.dragging) {
          this.isClick = false;
          let diff = 0;
          if (event.type === 'touchmove') {
            event.clientX = event.touches[0].clientX;
          }
          this.currentX = event.clientX;
          diff = (this.currentX - this.startX) / this.sliderSize * 100;
          this.newPosition = this.startPosition + diff;
          this.setPosition(this.newPosition);
        }
      }

      // This event handler will be called when the window (global scope)
      // receives a 'mouseup', 'touchend', or 'contextmenu' signal. Call
      // setPosition(), hide tooltip, and remove event listeners on mouseup.
      onDragEnd() {
        if (this.dragging) {
          setTimeout(() => {
            this.dragging = false;
            if (!this.isClick) {
              this.setPosition(this.newPosition);
              this.tooltip.style =
                  "transform-origin: center bottom; z-index: 2282; position: absolute; display: none;";
            }
          }, 0);
          window.removeEventListener('mousemove', this.onDragging);
          window.removeEventListener('touchmove', this.onDragging);
          window.removeEventListener('mouseup', this.onDragEnd);
          window.removeEventListener('touchend', this.onDragEnd);
          window.removeEventListener('contextmenu', this.onDragEnd);
        }
      }

      // Observe only the array of attribute names
      static get observedAttributes() { return [ 'value', 'min', 'max' ]; }

      // Listen for changed attributes
      attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
        case 'value':
          // console.log(`Initial value: ${newValue}`);
          break;
        case 'min':
          // console.log(`Minimum value: ${newValue}`);
          break;
        case 'max':
          // console.log(`Maximum value: ${newValue}`);
          break;
        }
      }

      // Getters
      get value() { return this.getAttribute('value'); }
      get min() { return this.getAttribute('min'); }
      get max() { return this.getAttribute('max'); }

      // Setters
      set value(newValue) { this.setAttribute('value', newValue); }
      set min(newValue) { this.setAttribute('min', newValue); }
      set max(newValue) { this.setAttribute('max', newValue); }
    }

    customElements.define('jj-slider', JJSlider);
  }

  const jjInputNum =
  () => {
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
          return; 
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
          if (this.valueElement.min <= this.value - this.step) {
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
jjSlider();
jjSwitch();