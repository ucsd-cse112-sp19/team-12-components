class CoreHello extends HTMLElement {
	
	constructor() {
		super();
		this.attachShadow({mode: 'open'})
			.appendChild(document.createElement('slot'));
	}

	//Since "language" is not a default attribute that is tracked
	// in observedAttributes, we need to add it to the array to be 
	// tracked to be able to call attributeChangedCallback() 
	static get observedAttributes() {return ['lang', 'rainbow']; }

	connectedCallback() {
		//Empty for now because the attributeChangedCallback
		//fires first and this is not needed
	}

	//gets call automatically when an attribute in observedAttributes() is set/changed
	//allows our tests to change the language and make the component update 
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

	disconnectedCallback() {
		//Empty for now
	}

	//set the correct language with name
	updateText(lang,componentText){
		//(word1,word2,word3)
		let sT = componentText.split(" ");
		//get last word (name)
		let name = sT[sT.length - 1];	
		//set new string in component
		if (lang == "fr") {
			this.innerText = "Salut Monde " + name; //French
		} else if (lang == "sp") {
			this.innerText = "Hola Mundo " + name; //Spainsh
		} else if (lang == "en") {
			this.innerText = "Hello World " + name; //English
		} 
	}

	/*
	This function toggles whether the component has rainbow text or not.
	For now the values are set to True or False,
	The class that is added to the element is rainbow-text and can be found in the CSS file.
	*/
	toggleRainbow(isToggled) {
		if (isToggled == "true") {
			//add the rainbow css class to the component
			this.classList.add('rainbow-text');
		} else if (isToggled == "false") {
			//remove the css class
			this.classList.remove('rainbow-text');
		}
	}
}
customElements.define('core-hello', CoreHello);