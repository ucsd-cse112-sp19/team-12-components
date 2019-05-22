'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
     * @component_name InputNumber
     * @component_desc Input numerical values with a customizable range.
     * @attribute value / v-model	,binding value,	number,	/	,0
     * @attribute min,	the minimum allowed value,	number, /	,-Infinity 
     * @attribute max,	the maximum allowed value,	number,	—	,Infinity
     * @attribute step,	incremental step, number,	/	,1
     * @attribute step-strictly,whether input value can only be multiple of step,number,/,false
     * @attribute precision,	precision of input value,	number,	/,	/
     * @attribute size,	size of the component,	string,	large/small,	/
     * @attribute disabled,	whether the component is disabled,	boolean,	/,	false
     * @attribute controls,	whether to enable the control buttons,	boolean,	/,	true
     * @attribute controls-position,	position of the control buttons	string,	right,	/
     * @attribute name, same as name in native input,	string,	/,	/
     * @attribute label, label text,	string,	/,	/
     * @attribute placeholder,	placeholder in input,	string,	/,	/
 * 
 * 
 */

// This is the template for the Position default.
var template = document.createElement('template');
template.innerHTML = '\n  <link rel="stylesheet" href="jj-input-number.css">\n  <div class="jj-input-number">\n    <button aria-label="decrement" class="decrement-btn" id="decrementBtn">-</button><!--\n    --><input type = "text" class="input-field"></input><!--\n    --><button aria-label="increment" class="increment-btn" id="incrementBtn">+</button>\n  </div>\n';

// This is the template for Position right
var template2 = document.createElement('template');
template2.innerHTML = '\n  <link rel="stylesheet" href="jj-input-number.css">\n  <div class="jj-input-number">\n    <input type = "text" class="input-field"></input>\n    <div class = "button-container">\n      <button aria-label="increment" class="increment-btn-2" id="incrementBtn">&#708;</button>\n      <button aria-label="decrement" class="decrement-btn-2" id="decrementBtn">&#709;</button>\n    </div>\n  </div>\n';

var JJInputNum = function (_HTMLElement) {
  _inherits(JJInputNum, _HTMLElement);

  _createClass(JJInputNum, [{
    key: 'connectedCallback',
    value: function connectedCallback() {
      if (!this.hasAttribute('min')) this.valueElement.min = Number.NEGATIVE_INFINITY;

      if (!this.hasAttribute('max')) this.valueElement.max = Number.POSITIVE_INFINITY;

      if (!this.hasAttribute('step')) this.step = 1;

      if (!this.hasAttribute('size')) this.inputDiv.className += ' small';

      if (!this.hasAttribute('value')) this.value = this.valueElement.min;

      if (!this.hasAttribute('precision')) this.precision = 0;
    }
  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attrName, oldValue, newValue) {
      if (this.position !== 'done') this.load();

      var curPre = 0;
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
          if (newValue) this.inputDiv.classList.add('disabled');else this.inputDiv.classList.remove('disabled');
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
  }, {
    key: 'value',
    set: function set(value) {

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
      } else this.valueElement.value = parseFloat(this._value).toFixed(this.precision);
    },
    get: function get() {
      return this._value;
    }
  }, {
    key: 'size',
    set: function set(sizeValue) {
      this._size = this.trans(sizeValue);
    },
    get: function get() {
      return this._size;
    }
  }, {
    key: 'step',
    set: function set(stepValue) {
      this._step = this.trans(stepValue);
    },
    get: function get() {
      return this._step;
    }
  }, {
    key: 'position',
    set: function set(new_p) {
      this._position = new_p;
    },
    get: function get() {
      return this._position;
    }
  }, {
    key: 'precision',
    set: function set(prec) {
      this._precision = prec;
    },
    get: function get() {
      return this._precision;
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['controls', 'min', 'max', 'step', 'size', 'disabled', 'placeholder', 'value', 'controls-position', 'precision'];
    }
  }]);

  function JJInputNum() {
    _classCallCheck(this, JJInputNum);

    var _this2 = _possibleConstructorReturn(this, (JJInputNum.__proto__ || Object.getPrototypeOf(JJInputNum)).call(this));

    _this2.root = _this2.attachShadow({ mode: 'open' });
    return _this2;
  }

  _createClass(JJInputNum, [{
    key: 'trans',
    value: function trans(value) {
      return parseFloat(parseFloat(value).toFixed(this.precision));
    }
  }, {
    key: 'load',
    value: function load() {
      var _this3 = this;

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
      this.incrementButton.addEventListener('mousedown', function (e) {
        if (_this3.valueElement.max >= _this3.value + _this3.step) {
          _this3.value = _this3.value + _this3.step;

          // Click and hold functionality.
          var _this = _this3; // reserve 'this' context
          timer = setInterval(function () {
            _this.value = _this.value + _this.step;
          }, 400);

          _this3.decrementButton.classList.remove('disabled');
          if (_this3.valueElement.max <= _this3.value) _this3.incrementButton.classList.add('disabled');
        }
      });

      this.incrementButton.addEventListener('mouseleave', function () {
        clearInterval(timer);
      });

      this.incrementButton.addEventListener('mouseup', function () {
        clearInterval(timer);
      });

      // Logic for the decrement button getting clicked
      this.decrementButton.addEventListener('mousedown', function (e) {
        if (_this3.valueElement.min <= _this3.value - _this3.step) {
          _this3.value = _this3.value - _this3.step;

          var _this = _this3;
          timer = setInterval(function () {
            _this.value = _this.value - _this.step;
          }, 400);

          _this3.incrementButton.classList.remove('disabled');
          if (_this3.valueElement.min >= _this3.value) _this3.decrementButton.classList.add('disabled');
        }
      });

      this.decrementButton.addEventListener('mouseleave', function () {
        clearInterval(timer);
      });

      this.decrementButton.addEventListener('mouseup', function () {
        clearInterval(timer);
      });

      /* This two lines give us too much pain!!!!!
      this.valueElement.addEventListener('keyup', (e) => this.value =
                                                      this.valueElement.value);
      */

      this.decrementButton.addEventListener('mouseover', function (e) {
        _this3.inputDiv.classList.add("border-blue");
        _this3.decrementButton.classList.add("color-blue");
      });
      this.decrementButton.addEventListener('mouseout', function (e) {
        _this3.inputDiv.classList.remove("border-blue");
        _this3.incrementButton.classList.remove("color-blue");
      });

      this.incrementButton.addEventListener('mouseover', function (e) {
        _this3.inputDiv.classList.add("border-blue");
        _this3.incrementButton.classList.add("color-blue");
        ;
      });
      this.incrementButton.addEventListener('mouseout', function (e) {
        _this3.inputDiv.classList.remove("border-blue");
        _this3.incrementButton.classList.remove("color-blue");
      });

      this.valueElement.addEventListener('keydown', function (e) {
        var key = e.key;
        var string = _this3.valueElement.value;
        if (key === "Backspace" || key === "Delete") {
          if (string.length == 1 || string.length == 0) {
            _this3.value = '';
          } else {
            _this3.valueElement.value = string.substring(0, string.length);
            return;
          }
        }
        if (key === "Enter") {
          _this3.value = e.srcElement.value;
        }
      });
      this.valueElement.addEventListener('mouseover', function (e) {
        _this3.value = e.srcElement.value;
        _this3.inputDiv.classList.add("border-blue");
      });
      this.valueElement.addEventListener('mouseout', function (e) {
        _this3.value = e.srcElement.value;
        _this3.inputDiv.classList.remove("border-blue");
      });
    }
  }]);

  return JJInputNum;
}(HTMLElement);

customElements.define('jj-input-number', JJInputNum);