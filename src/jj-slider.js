'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
     * @component_name Slider
     * @component_desc Drag the slider within a fixed range.
     * @attribute value / v-model,	binding value	number,	/,	0
     * @attribute min,	minimum value	number,	/, 0
     * @attribute max,	maximum value	number,	/,	100
     * @attribute disabled,	whether Slider is disabled,	boolean,	/,	false
     * @attribute step,	step size	number,	/,	1
     * @attribute show-input,	whether to display an input box, works when range is false,	boolean,	/,	false
     * @attribute show-input-controls,	whether to display control buttons when show-input is true,	boolean,	/,	true
     * @attribute input-size,	size of the input box,	string,	large / medium / small / mini,	small
     * @attribute show-stops,	whether to display breakpoints,	boolean,	/,	false
     * @attribute show-tooltip,	whether to display tooltip value,	boolean,	/,	true
     * @attribute format-tooltip,	format to display tooltip value,	function(value),	/,	/
     * @attribute range,	whether to select a range,	boolean,	/,	false
     * @attribute vertical,	vertical mode	boolean,	/,	false
     * @attribute height,	Slider height, required in vertical mode, string,	/,	/
     * @attribute label,	label for screen reader,	string, /, /
     * @attribute debounce,	debounce delay when typing... in milliseconds...works when show-input is true,	number,	/,	300 
     * @attribute tooltip-class,	custom class name for the tooltip, string,	/,	/
     * @attribute marks	marks, type of key must be number and must in closed interval [min max] each mark can custom style,	object, /,	/
 * 
 */

var template = document.createElement('template');
template.innerHTML = '\n    <style>\n      @import url("https://unpkg.com/element-ui/lib/theme-chalk/slider.css");\n      \n      body, html {\n        font-family: Helvetica, Arial, sans-serif;\n        font-weight: 400;\n      }\n      \n      p {\n        color: #8492a6;\n        font-weight: 200;\n      }\n      \n      /* Slider demo blocks */\n      .demo-block {\n        border: 1px solid #ebebeb;\n        border-radius: 3px;\n        transition: .2s;\n      }\n      .demo-block .block {\n        padding: 30px 24px;\n        overflow: hidden;\n        border-bottom: 1px solid #eff2f6;\n      }\n      .el-slider {\n        font-family: Helvetica, Arial, sans-serif;\n        float: right;\n        width: 70%;\n        margin-right: 20px;\n      }\n      \n      /* Layout container */\n      .container {\n        padding-right: 15px;\n        padding-left: 15px;\n        margin-right: auto;\n        margin-left: auto;\n      }\n      @media (min-width: 768px) {\n        .container {\n          width: 750px;\n        }\n      }\n      @media (min-width: 992px) {\n        .container {\n          width: 970px;\n        }\n      }\n      @media (min-width: 1200px) {\n        .container {\n          width: 1170px;\n        }\n      }\n    </style>\n    <div role="slider" aria-valuemin="0" aria-valuemax="100" aria-orientation="horizontal" class="el-slider" aria-valuetext="0" aria-label="slider between 0 and 100">\n        <div class="el-slider__runway">\n            <div class="el-slider__bar" style="left: 0%;"></div>\n            <div tabindex="0" class="el-slider__button-wrapper">\n                <div class="el-tooltip el-slider__button" aria-describedby="el-tooltip-9861" tabindex="0"></div>\n            </div>\n        </div>\n        <div role="tooltip" id="el-tooltip-9861" aria-hidden="false" class="el-tooltip__popper is-dark" x-placement="top">\n            <span></span>\n            <div x-arrow="" class="popper__arrow" style="left: 10.5px;"></div>\n        </div>\n    </div>\n  ';

var JJSlider = function (_HTMLElement) {
  _inherits(JJSlider, _HTMLElement);

  function JJSlider() {
    _classCallCheck(this, JJSlider);

    var _this = _possibleConstructorReturn(this, (JJSlider.__proto__ || Object.getPrototypeOf(JJSlider)).call(this));

    _this.root = _this.attachShadow({ mode: 'open' });
    _this.root.appendChild(template.content.cloneNode(true));

    // Target elements with querySelector
    _this.sliderContainer = _this.root.querySelector('.el-slider');
    _this.sliderRunway = _this.root.querySelector('.el-slider__runway');
    _this.sliderBar = _this.root.querySelector('.el-slider__bar');
    _this.sliderBtnWrapper = _this.root.querySelector('.el-slider__button-wrapper');
    _this.sliderBtn = _this.root.querySelector('.el-tooltip.el-slider__button');
    _this.tooltip = _this.root.querySelector('.el-tooltip__popper');
    _this.tooltipSpan = _this.root.querySelector('.el-tooltip__popper span');

    // Bind "this" to functions to reserve context
    _this.getCurrentPosition = _this.getCurrentPosition.bind(_this);
    _this.setInitPosition = _this.setInitPosition.bind(_this);
    _this.setPosition = _this.setPosition.bind(_this);
    _this.onSliderClick = _this.onSliderClick.bind(_this);
    _this.onButtonHover = _this.onButtonHover.bind(_this);
    _this.onButtonHoverEnd = _this.onButtonHoverEnd.bind(_this);
    _this.onButtonDown = _this.onButtonDown.bind(_this);
    _this.onDragStart = _this.onDragStart.bind(_this);
    _this.onDragging = _this.onDragging.bind(_this);
    _this.onDragEnd = _this.onDragEnd.bind(_this);
    return _this;
  }

  _createClass(JJSlider, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
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
      this.tooltip.style = "transform-origin: center bottom; z-index: 2282; position: absolute; display: none;";
    }

    // Get the percentage value of button's position on slider runway.

  }, {
    key: 'getCurrentPosition',
    value: function getCurrentPosition() {
      return (this._value - this.min) / (this.max - this.min) * 100 + "%";
    }

    // Initialization: Set width of slider bar and offset of slider button based
    // on position of current value

  }, {
    key: 'setInitPosition',
    value: function setInitPosition() {
      var percent = (this._value - this.min) / (this.max - this.min) * 100;
      this.sliderBar.style.width = percent + "%";
      this.sliderBtnWrapper.style.left = percent + "%";
    }

    // Calculate target value based on percentage and set width of slider bar and
    // offset of slider button

  }, {
    key: 'setPosition',
    value: function setPosition(percent) {
      // Calculate target value based on percentage
      var targetValue = parseInt(this.min) + percent * (this.max - this.min) / 100;
      if (targetValue > this.max) {
        targetValue = this.max;
      } else if (targetValue < this.min) {
        targetValue = this.min;
      }
      this._value = targetValue;

      // Percentage boundary check
      var newPercent = percent;
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
      var rect = this.sliderBtnWrapper.getBoundingClientRect();
      this.tooltip.style = "transform-origin: center bottom; z-index: 2282; position: absolute; top: " + (rect.top - rect.height) + "px; left: " + rect.left + "px;";
    }

    // This event handler will be called when the slider runway receives a
    // 'mousedown' signal. Set width of slider bar and offset of slider button
    // based on position of cursor on mousedown.

  }, {
    key: 'onSliderClick',
    value: function onSliderClick(event) {
      this.sliderSize = this.sliderContainer.clientWidth;
      var sliderOffsetLeft = this.sliderContainer.getBoundingClientRect().left;
      this.setPosition((event.clientX - sliderOffsetLeft) / this.sliderSize * 100);
      this.onButtonDown(event);
    }

    // This event handler will be called when the slider button receives a
    // 'mouseover' signal. Set tooltip position on mouseover.

  }, {
    key: 'onButtonHover',
    value: function onButtonHover(event) {
      var rect = this.sliderBtnWrapper.getBoundingClientRect();
      this.tooltip.style = "transform-origin: center bottom; z-index: 2282; position: absolute; top: " + (rect.top - rect.height) + "px; left: " + rect.left + "px;";
    }

    // This event handler will be called when the slider button receives a
    // 'mouseout' signal. Hide tooltip on mouseout.

  }, {
    key: 'onButtonHoverEnd',
    value: function onButtonHoverEnd(event) {
      this.tooltip.style = "transform-origin: center bottom; z-index: 2282; position: absolute; display: none;";
    }

    // This event handler will be called when the slider button receives a
    // 'mousedown' signal. Trigger onDragStart() and add event listeners to
    // onDragging() and onDragEnd().

  }, {
    key: 'onButtonDown',
    value: function onButtonDown(event) {
      if (this.disabled) return;
      event.preventDefault();
      this.onDragStart(event);
      window.addEventListener('mousemove', this.onDragging);
      window.addEventListener('touchmove', this.onDragging);
      window.addEventListener('mouseup', this.onDragEnd);
      window.addEventListener('touchend', this.onDragEnd);
      window.addEventListener('contextmenu', this.onDragEnd);
    }
  }, {
    key: 'onDragStart',


    // Mark original value's position when dragging starts
    value: function onDragStart(event) {
      this.dragging = true;
      this.isClick = true;
      if (event.type === 'touchstart') {
        event.clientX = event.touches[0].clientX;
      }
      this.startX = event.clientX;
      this.startPosition = parseFloat(this.getCurrentPosition());
      this.newPosition = this.startPosition;
    }
  }, {
    key: 'onDragging',


    // This event handler will be called when the window (global scope) receives a
    // 'mousemove' or 'touchmove' signal. Call setPosition() with new position on
    // mousemove.
    value: function onDragging(event) {
      if (this.dragging) {
        this.isClick = false;
        var diff = 0;
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

  }, {
    key: 'onDragEnd',
    value: function onDragEnd() {
      var _this2 = this;

      if (this.dragging) {
        setTimeout(function () {
          _this2.dragging = false;
          if (!_this2.isClick) {
            _this2.setPosition(_this2.newPosition);
            _this2.tooltip.style = "transform-origin: center bottom; z-index: 2282; position: absolute; display: none;";
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

  }, {
    key: 'attributeChangedCallback',


    // Listen for changed attributes
    value: function attributeChangedCallback(name, oldValue, newValue) {
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

  }, {
    key: 'value',
    get: function get() {
      return this.getAttribute('value');
    },


    // Setters
    set: function set(newValue) {
      this.setAttribute('value', newValue);
    }
  }, {
    key: 'min',
    get: function get() {
      return this.getAttribute('min');
    },
    set: function set(newValue) {
      this.setAttribute('min', newValue);
    }
  }, {
    key: 'max',
    get: function get() {
      return this.getAttribute('max');
    },
    set: function set(newValue) {
      this.setAttribute('max', newValue);
    }
  }, {
    key: 'color',
    get: function get() {
      return this.getAttribute('color');
    },
    set: function set(newValue) {
      this.setAttribute('color', newValue);
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['value', 'min', 'max'];
    }
  }]);

  return JJSlider;
}(HTMLElement);

customElements.define('jj-slider', JJSlider);