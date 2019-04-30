/**  
 * JS web component class used in core_hello.html.
 */

class CoreHello extends HTMLElement {

	/**  
	 * Constructor for core-hello, has an empty slot child for text
	 */
	constructor() {
		super();
		this.root = this.attachShadow({mode: 'open'})
		this.root.appendChild(document.createElement('slot'));
		this.slotElement = this.root.querySelector('slot');
	}

	/*
	 * Since "language" is not a default attribute that is tracked in observedAttributes, 
	 * we need to add it to the array to be tracked to be able to call attributeChangedCallback() 
	 * @param
	 * @return list of attribute strings
	 */
	static get observedAttributes() {return ['lang', 'rainbow']; }

	/*
	 * Web component initialization, empty for now.
	 */
	connectedCallback() {
		//Empty for now because the attributeChangedCallback
		//fires first and this is not needed
	}

	/**  
	 * Gets call automatically when an attribute in observedAttributes() is set/changed
	 * allows our tests to change the language and make the component update 
	 * @param {string} attrName - attribute name from observedAttributes returned list
	 *		  oldVal: ignored in this case
	 *        newVal: used for value initialization and update
	 */
	
	attributeChangedCallback(attrName, oldVal, newVal) {
		//get the changed attribute
		let attr = this.getAttribute(attrName);
		//set new value for the changed attribute
		attr = newVal;
		//update the corresponding component
		if (attrName == 'lang') {
			this.updateText(attr, this.innerText);
		} else if (attrName == 'rainbow') {
			this.toggleRainbow(attr);
		}
	}
	/* Invoked each time the custom element is disconnected from the document's DOM.
	 * Empty for now.
	 */
	disconnectedCallback() {
		//Empty for now
	}

	/**
	 * Called from attributeChangedCallback when lang attribute is changed.
	 * set the correct language with name
	 * @param {string} lang - new language value
     * @param {string} componentText - referenced to this.innerText
     */
	updateText(lang,componentText){
		//(word1,word2,word3)
		//set new string in component
		let toSplit = this.innerText.split(" ");
		let name = toSplit[2];
		if (componentText == ''){
			name = '';
		}
		if (lang == "fr") {
			let nameString = "Salut Monde " + name;
			this.innerHTML = nameString; //French
		} else if (lang == "sp") {
			let nameString = "Hola Mundo " + name;
			this.innerHTML = nameString; //Spainsh
		} else if (lang == "en") {
			let nameString = "Hello World " + name
			this.innerHTML = nameString; //English
		}
	}

	/* returns html for rainbow effect. every span is a rainbow character
	 * @param text: string to add effects on
	 * @return each char wrapped in a span tag
	 *
	rainbowEffect(text){
		var chars = text.split("");
		return '<span>' + chars.join('</span><span>') + '</span>';
	}
	*/

	/*
	 * This function toggles whether the component has rainbow text or not.
	 * For now the values are set to True or False,
	 * The class that is added to the element is rainbow-text and can be found in the CSS file.
	 * @param isToggled: ture or false for rainbow effects
     * @return
     */
	toggleRainbow(isToggled) {
		if (isToggled == "true") {
			//add the rainbow css class to the component
			this.classList.add('color-text-flow');
		} else if (isToggled == "false") {
			//remove the css class
			this.classList.remove('color-text-flow');
		}
	}
}
customElements.define('core-hello', CoreHello);