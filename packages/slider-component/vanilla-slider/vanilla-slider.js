var script = document.createElement('script');
var script2 = document.createElement('script');

script.setAttribute("src", 'https://unpkg.com/vue/dist/vue.js');
script2.setAttribute("src", 'https://unpkg.com/element-ui/lib/index.js');

document.head.appendChild(script);
document.head.appendChild(script2);

const template = document.createElement('template');
template.innerHTML = `
    <!-- import CSS -->
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
  <link rel="stylesheet" href="../slider.css">
  <div role="slider" aria-valuemin="0" aria-valuemax="100" aria-orientation="horizontal" 
  aria-label="slider between 0 and 100" class="slider">
    <!--
    --><input type="number" value = 0 class="input-field"></input>
    <el-slider v-model="0"></el-slider>
  </div>
`;

class Slider extends HTMLElement {

    // Set the _value to the value passed in (value = 0)
    set value(value) {
        this._value = value;
        this.valueElement.value = this.value; 
    }
    // Get the _value that was set
    get value() { return this._value; }

    // Check what attributes were given in the HTML
    connectedCallback() {
        if (!this.hasAttribute('value')) {
            this.value = 0;
        }
    }

    // Pass in the attribute values
    attributeChangedCallback(attrName, oldValue, newValue) {
        // Check if the attribute name passed into the HTML is 'value'
        if (attrName === 'value') {
            // Check if the newValue given is within range of the slider
            if (newValue > this.valueElement.max ||
                newValue < this.valueElement.min) {
                    window.alert("Out of Range!");
            } else {
                    this.value = parseInt(newValue, 10);
            }
        }
    }

    // Constructor
    constructor() {
        super();
        this._value = 0;    // Initialize the value to 0

        // Shadow DOM
        this.root = this.attachShadow({mode : 'open'});
        this.root.appendChild(template.content.cloneNode(true));

        // Get the input div defined at the top
        this.inputDiv = this.root.querySelector('div');
        // Get the input element defined at the top
        this.valueElement = this.root.querySelector('input');
        
    }
}



customElements.define('vanilla-slider', Slider);