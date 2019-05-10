/**
 * JS web component class used in core_hello.html.
 */

class CoreHello extends HTMLElement {

  /**
   * Constructor for core-hello, has an empty slot child for text
   */
  constructor() {
    super();
    this.attachShadow({mode : 'open'})
        .appendChild(document.createElement('slot'));
  }

  /*
   * Since "language" is not a default attribute that is tracked in
   * observedAttributes, we need to add it to the array to be tracked to be able
   * to call attributeChangedCallback()
   * @return list of attribute strings
   */
  static get observedAttributes() { return [ 'lang', 'rainbow' ]; }

  /*
   * Web component initialization, empty for now.
   */
  connectedCallback() {
    if (this.hasAttribute('rainbow'))
      this.toggleRainbow('true');
    else
      this.toggleRainbow('false');
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
  attributeChangedCallback(attrName, oldVal, newVal) {
    // get the changed attribute
    let attr = this.getAttribute(attrName);
    // set new value for the changed attribute
    attr = newVal;
    // update the corresponding component
    if (attrName == 'lang') {
      this.updateText(attr, this.innerText);
    } else if (attrName == 'rainbow') {
      if (this.hasAttribute('rainbow'))
        this.toggleRainbow('true');
      else
        this.toggleRainbow('false');
    }
  }

  /**
   * Invoked each time the custom element is disconnected from the document's
   * DOM. Empty for now.
   */
  disconnectedCallback() {
    // Empty for now
  }

  /**
   * Called from attributeChangedCallback when lang attribute is changed.
   * set the correct language with name
   * @param {string} lang - new language value
   * @param {string} componentText - referenced to this.innerText
   */
  updateText(lang, componentText) {
    //(word1,word2,word3)
    // set new string in component
    let toSplit = this.innerText.split(" ");
    let name = toSplit[toSplit.length - 1];
    console.log(name);

    if (lang == "fr") {
      let nameString = "Salut Monde " + name;
      this.innerText = nameString; // French
    } else if (lang == "sp") {
      let nameString = "Hola Mundo " + name;
      this.innerText = nameString; // Spainsh
    } else if (lang == "en") {let nameString = "Hello World " + name;
      this.innerText = nameString; // English
    }
  }

  /**
   * Toggles whether the component has rainbow text or not.
   * For now the values are set to True or False,
   * The class that is added to the element is rainbow-text and can be found in
   * the CSS file.
   * @param {boolean} isToggled - true or false for rainbow effects
   */
  toggleRainbow(isToggled) {
    if (isToggled == "true") {
      // add the rainbow css class to the component
      this.classList.add('color-text-flow');
    } else if (isToggled == "false") {
      // remove the css class
      this.classList.remove('color-text-flow');
    }
  }
}

customElements.define('core-hello', CoreHello);
