//define the css for this component
const jjButton = () => {
    const template = document.createElement('template');
    template.innerHTML = `
    <style>
    
    </style>

    `;

    class JJButton extends HTMLElement {
        static get observedAttributes() {
            return [

            ];
        }
        constructor () {

        }

        connectedCallback() {

        }

        attributeChangedCallback(attrName, oldValue, newValue) {

        }


    }

    //Getters

    //Setters

    customElements.define('jj-button', JJButton);
}
jjButton();