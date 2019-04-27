class HelloWorld extends HTMLElement {

  constructor() {
    super();
    this.attachShadow({mode : 'open'})
        .appendChild(document.createElement('slot'));
  }

  // Since "language" is not a default attribute that is tracked
  // in observedAttributes, we need to add it to the array to be
  // tracked to be able to call attributeChangedCallback()
  static get observedAttributes() { return [ 'language' ]; }

  connectedCallback() {
    let lang = this.getAttribute("language");
    if (lang == null) {
      lang = "english";
    }
    // update component's text
    this.updateText(lang, this.innerText);
  }

  // gets call automatically when an attribute in observedAttributes() is
  // set/changed allows our tests to change the language and make the component
  // update
  attributeChangedCallback(attrName, oldVal, newVal) {
    // get language attribute
    let lang = this.getAttribute(attrName);
    // set new value to language
    lang = newVal;
    // update component's text
    this.updateText(lang, this.innerText);
  }

  disconnectedCallback() {}

  // set the correct language with name
  updateText(lang, componentText) {
    //(word1,word2,word3)
    let sT = componentText.split(" ");
    // get last word (name)
    let name = sT[sT.length - 1];
    // set new string in component
    if (lang == "french") {
      this.innerText = "Salut " + name;
    } else if (lang == "spanish") {this.innerText = "Hola " + name;
    } else {this.innerText = "Hello " + name;
    }
  }
}
customElements.define('hello-world', HelloWorld);