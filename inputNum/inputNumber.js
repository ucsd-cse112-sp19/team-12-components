const template = document.createElement('template');
template.innerHTML = `
  <link rel="stylesheet" href="inputNumber.css">
  <button aria-label="decrement">-</button>
    <input type="number" value = 0></input>
  <button aria-label="increment">+</button>
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
      .addEventListener('keyup', (e) => this.value = this.valueElement.value)
  }
}

customElements.define('input-number', InputNum);