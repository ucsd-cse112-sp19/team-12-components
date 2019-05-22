'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

/**
 * JS web component class used in core_hello.html.
 * //EXAMPLE USAGE OF AUTO-DOCUMENTATION:
 * @component_name Core Hello
 * @component_desc This component simply outputs "Hello World" followed by the
 * input text inside the tag.
 */
var CoreHello = function (_HTMLElement) {
  _inherits(CoreHello, _HTMLElement);

  /**
   * Constructor for core-hello, has an empty slot child for text
   */
  function CoreHello() {
    _classCallCheck(this, CoreHello);

    var _this = _possibleConstructorReturn(this, (CoreHello.__proto__ || Object.getPrototypeOf(CoreHello)).call(this));

    _this.attachShadow({ mode: 'open' }).appendChild(document.createElement('slot'));
    return _this;
  }

  /**
   * Since "language" is not a default attribute that is tracked in
   * observedAttributes, we need to add it to the array to be tracked to be able
   * to call attributeChangedCallback()
   * @return list of attribute strings
   *
   * //attributeName, attributeDescription, type, accepted values, default
   * @attribute Rainbow, Flashes components text in various colors,
   *boolean,---,false
   * @attribute Fake Attribute1, Fake attribute1 description,
   *string,small/medium/large,medium
   * @attribute Fake Attribute2, Fake attribute2 description,
   *string,primary/success/warning,----
   *
   **/


  _createClass(CoreHello, [{
    key: 'connectedCallback',


    /*
     * Web component initialization, empty for now.
     */
    value: function connectedCallback() {
      if (this.hasAttribute('rainbow')) this.toggleRainbow('true');else this.toggleRainbow('false');
    }

    /**
     * Gets call automatically when an attribute in observedAttributes() is
     * set/changed allows our tests to change the language and make the component
     * update
     * @param {string} attrName - attribute name from observedAttributes returned
     *     list
     * @param {string} oldVal - ignored in this case
     * @param {string} newVal - used for value initialization and update
     */

  }, {
    key: 'attributeChangedCallback',
    value: function attributeChangedCallback(attrName, oldVal, newVal) {
      // get the changed attribute
      var attr = this.getAttribute(attrName);
      // set new value for the changed attribute
      attr = newVal;
      // update the corresponding component
      if (attrName == 'lang') {
        this.updateText(attr, this.innerText);
      } else if (attrName == 'rainbow') {
        if (this.hasAttribute('rainbow')) this.toggleRainbow('true');else this.toggleRainbow('false');
      }
    }

    /**
     * Invoked each time the custom element is disconnected from the document's
     * DOM. Empty for now.
     */

  }, {
    key: 'disconnectedCallback',
    value: function disconnectedCallback() {}
    // Empty for now


    /**
     * Called from attributeChangedCallback when lang attribute is changed.
     * set the correct language with name
     * @param {string} lang - new language value
     * @param {string} componentText - referenced to this.innerText
     */

  }, {
    key: 'updateText',
    value: function updateText(lang, componentText) {
      //(word1,word2,word3)
      // set new string in component
      var toSplit = this.innerText.split(" ");
      var name = toSplit[toSplit.length - 1];
      console.log(name);

      if (lang == "fr") {
        var nameString = "Salut Monde " + name;
        this.innerText = nameString; // French
      } else if (lang == "sp") {
        var _nameString = "Hola Mundo " + name;
        this.innerText = _nameString; // Spainsh
      } else if (lang == "en") {
        var _nameString2 = "Hello World " + name;
        this.innerText = _nameString2; // English
      }
    }

    /**
     * Toggles whether the component has rainbow text or not.
     * For now the values are set to True or False,
     * The class that is added to the element is rainbow-text and can be found in
     * the CSS file.
     * @param {boolean} isToggled - true or false for rainbow effects
     */

  }, {
    key: 'toggleRainbow',
    value: function toggleRainbow(isToggled) {
      if (isToggled == "true") {
        // add the rainbow css class to the component
        this.classList.add('color-text-flow');
      } else if (isToggled == "false") {
        // remove the css class
        this.classList.remove('color-text-flow');
      }
    }
  }], [{
    key: 'observedAttributes',
    get: function get() {
      return ['lang', 'rainbow'];
    }
  }]);

  return CoreHello;
}(HTMLElement);

customElements.define('core-hello', CoreHello);