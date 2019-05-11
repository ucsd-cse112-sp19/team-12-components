const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="inputNumber.css">
  <div class="input-number large">
    <button aria-label="decrement" class="decrement-btn">-</button><!--
    --><input type="number" value = 0 class="input-field"></input><!--
    --><button aria-label="increment" class="increment-btn">+</button>
  </div>
`;

class InputNum extends HTMLElement {
  set value(value) {
    this._value = value;
    this.valueElement.value = this._value;
  }

  get value() {
    return this._value;
  }

  constructor() {
    super();
    this._value = 0;

    this.root = this.attachShadow({ mode: 'open' });
    this.root.appendChild(template.content.cloneNode(true));

    this.valueElement = this.root.querySelector('input');
    this.incrementButton = this.root.querySelectorAll('button')[1];
    this.decrementButton = this.root.querySelectorAll('button')[0];

    this.incrementButton
      .addEventListener('click', (e) => this.value++);

    this.decrementButton
      .addEventListener('click', (e) => this.value--);

    this.valueElement
      .addEventListener('keyup', (e) => this.value = this.valueElement.value);

    this.decrementButton
      .addEventListener('mouseover', (e) => {
        this.inputDiv.style.borderColor = "#75baff";
        this.decrementButton.style.color = "#75baff";
      });
    this.decrementButton
      .addEventListener('mouseout', (e) => {
        this.inputDiv.style.borderColor = "#c2c2c2";
        this.decrementButton.style.color = "black";
      });

    this.incrementButton
      .addEventListener('mouseover', (e) => {
        this.inputDiv.style.borderColor = "#75baff";
        this.incrementButton.style.color = "#75baff";
      });
    this.incrementButton
      .addEventListener('mouseout', (e) => {
        this.inputDiv.style.borderColor = "#c2c2c2";
        this.incrementButton.style.color = "black";
      });

    this.valueElement
      .addEventListener('click', (e) => this.inputDiv.style.borderColor = "#75baff");
  }
}

customElements.define('input-number', InputNum);