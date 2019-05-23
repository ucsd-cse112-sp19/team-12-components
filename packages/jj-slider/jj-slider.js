/**
 * @component_name jj slider
 * @component_desc Drag the slider within a fixed range.
 * @attribute value / v-model,	binding value	number,	/,	0
 * @attribute min,	minimum value	number,	/, 0
 * @attribute max,	maximum value	number,	/,	100
 * @attribute disabled,	whether Slider is disabled,	boolean,	/,
 * false
 * @attribute step,	step size	number,	/,	1
 * @attribute show-input,	whether to display an input box, works when
 * range is false,	boolean,	/,	false
 * @attribute show-input-controls,	whether to display control buttons when
 * show-input is true,	boolean,	/,	true
 * @attribute input-size,	size of the input box,	string,	large / medium /
 * small / mini,	small
 * @attribute show-stops,	whether to display breakpoints,	boolean,
 * /,	false
 * @attribute show-tooltip,	whether to display tooltip value,	boolean,
 * /,	true
 * @attribute format-tooltip,	format to display tooltip value,
 * function(value),	/,	/
 * @attribute range,	whether to select a range,	boolean,	/,
 * false
 * @attribute vertical,	vertical mode	boolean,	/,	false
 * @attribute height,	Slider height, required in vertical mode, string,
 * /,	/
 * @attribute label,	label for screen reader,	string, /, /
 * @attribute debounce,	debounce delay when typing... in milliseconds...works
 * when show-input is true,	number,	/,	300
 * @attribute tooltip-class,	custom class name for the tooltip, string,
 * /,	/
 * @attribute marks	marks, type of key must be number and must in closed
 * interval [min max] each mark can custom style,	object, /,	/
 *
 */

const template = document.createElement('template');
template.innerHTML = `
    <style>
      @import url("https://unpkg.com/element-ui/lib/theme-chalk/slider.css");
      
      body, html {
        font-family: Helvetica, Arial, sans-serif;
        font-weight: 400;
      }
      
      p {
        color: #8492a6;
        font-weight: 200;
      }
      
      /* Slider demo blocks */
      .demo-block {
        border: 1px solid #ebebeb;
        border-radius: 3px;
        transition: .2s;
      }
      .demo-block .block {
        padding: 30px 24px;
        overflow: hidden;
        border-bottom: 1px solid #eff2f6;
      }
      .el-slider {
        font-family: Helvetica, Arial, sans-serif;
        float: right;
        width: 70%;
        margin-right: 20px;
      }
      
      /* Layout container */
      .container {
        padding-right: 15px;
        padding-left: 15px;
        margin-right: auto;
        margin-left: auto;
      }
      @media (min-width: 768px) {
        .container {
          width: 750px;
        }
      }
      @media (min-width: 992px) {
        .container {
          //width: 970px;
        }
      }
      @media (min-width: 1200px) {
        .container {
          width: 1170px;
        }
      }
    </style>
    <div role="slider" aria-valuemin="0" aria-valuemax="100" aria-orientation="horizontal" class="el-slider" aria-valuetext="0" aria-label="slider between 0 and 100">
        <div class="el-slider__runway">
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
    this.sliderBtn = this.root.querySelector('.el-tooltip.el-slider__button');
    this.tooltip = this.root.querySelector('.el-tooltip__popper');
    this.tooltipSpan = this.root.querySelector('.el-tooltip__popper span');

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
    this.sliderBtnWrapper.addEventListener('mouseover', this.onButtonHover);
    this.sliderBtnWrapper.addEventListener('mouseout', this.onButtonHoverEnd);
    this.sliderBtnWrapper.addEventListener('mousedown', this.onButtonDown);

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
    // If 'color' attribute is specified, the colour of the button and the
    // runway before the button will be set to that colour
    if (this.hasAttribute('color')) {
      this.sliderBar.style.backgroundColor = this.getAttribute('color');
      this.sliderBtn.style.borderColor = this.getAttribute('color');
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

  // Initialization: Set width of slider bar and offset of slider button based
  // on position of current value
  setInitPosition() {
    const percent = (this._value - this.min) / (this.max - this.min) * 100;
    this.sliderBar.style.width = percent + "%";
    this.sliderBtnWrapper.style.left = percent + "%";
  }

  // Calculate target value based on percentage and set width of slider bar and
  // offset of slider button
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
  // 'mousedown' signal. Set width of slider bar and offset of slider button
  // based on position of cursor on mousedown.
  onSliderClick(event) {
    this.sliderSize = this.sliderContainer.clientWidth;
    const sliderOffsetLeft = this.sliderContainer.getBoundingClientRect().left;
    this.setPosition((event.clientX - sliderOffsetLeft) / this.sliderSize *
                     100);
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

  // This event handler will be called when the window (global scope) receives a
  // 'mousemove' or 'touchmove' signal. Call setPosition() with new position on
  // mousemove.
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

  // This event handler will be called when the window (global scope) receives a
  // 'mouseup', 'touchend', or 'contextmenu' signal. Call setPosition(), hide
  // tooltip, and remove event listeners on mouseup.
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
  get color() { return this.getAttribute('color'); }

  // Setters
  set value(newValue) { this.setAttribute('value', newValue); }
  set min(newValue) { this.setAttribute('min', newValue); }
  set max(newValue) { this.setAttribute('max', newValue); }
  set color(newValue) { this.setAttribute('color', newValue); }
}

customElements.define('jj-slider', JJSlider);
