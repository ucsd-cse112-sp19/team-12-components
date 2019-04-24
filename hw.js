class HelloWorld extends HTMLElement {
	constructor() {
		super();
		this.attachShadow({mode: 'open'})
			.appendChild(document.createElement('slot'));
	}
	connectedCallback() {
		const lang = this.getAttribute("language");
		if (lang == null) {
			lang = "english";
		}
		const temp = this.innerText;
		if (lang == "french") {
			this.innerText = "Salut " + temp;
		} else if (lang == "spanish") {
			this.innerText = "Hola " + temp;
		} else {
			this.innerText = "Hello " + temp; 
		}
	}

	disconnectedCallback() {
  	}
	
}
customElements.define('hello-world', HelloWorld);