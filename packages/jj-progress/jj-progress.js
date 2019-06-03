/**
 * @component_name jj progress
 * @component_desc Progress is used to show the progress of current operation
 * and inform the user the current status.
 * @attribute percentage, percentage required, 0-100, 0
 * @attribute type, the type of progress bar, line/circle/dashboard, line
 * @attribute stroke-width, the width of progress bar, /, 6
 * @attribute text-inside, whether to place the percentage inside progress bar,
 * /, false
 * @attribute status, the current status of progress bar,
 * success/exception/warning, /
 * @attribute color, background color of progress bar, /, ''
 * @attribute width, the canvas width of circle progress bar, /, 126
 * @attribute show-text, whether to show percentage, /, true
 *
 */

const jjProgress =
    () => {
      const template = document.createElement('template');
      template.innerHTML = `
    <style>
    @import url("https://unpkg.com/element-ui/lib/theme-chalk/progress.css");

    .el-progress {
      position: relative;
      font-family: var(--text-font, Helvetica, Arial, sans-serif);
      width: var(--progress-width, 100%);
      margin: 0 auto;
    }

    .el-progress-bar__outer {
      background-color: var(--bar-outer-color, #ebeef5);
    }

    .el-progress-bar__inner {
      position: absolute;
      left: 0;
      top: 0;
      height: 100%;
      background-color: var(--bar-color, #409EFF);
      text-align: right;
      border-radius: 100px;
      line-height: 1;
      white-space: nowrap;
      transition: width .6s;
    }
    
    .el-progress__text {
      color: var(--progress-text-color, #606266);
      display: inline-block;
      vertical-align: middle;
      margin-left: 10px;
      line-height: 1;
    }

    </style>
    <div role="progressbar" aria-valuemin="0" aria-valuemax="100" aria-orientation="horizontal" class="el-progress el-progress--line" aria-valuetext="0" aria-label="progress between 0 and 100">
      <div class="el-progress-bar">
        <div class="el-progress-bar__outer" style="height: 6px;">
          <div class="el-progress-bar__inner" style="width: 10%"></div>
        </div>
      </div>
      <div class="el-progress__text" style="font-size: 14.4px">50%</div>
    </div> 
  `;

      class JJProgress extends HTMLElement {
        constructor() {
          super();
          this.root = this.attachShadow({mode : 'open'});
          this.root.appendChild(template.content.cloneNode(true));

          // Target elements with querySelector
          this.progressContainer = this.root.querySelector('.el-progress');
          this.progressBar = this.root.querySelector('.el-progress-bar');
          this.progressBarOuter = this.root.querySelector('.el-progress-bar__outer');
          this.progressBarInner = this.root.querySelector('.el-progress-bar__inner');

          // Bind "this" to functions to reserve context
          this.getCurrentPosition = this.getCurrentPosition.bind(this);
          this.setInitPosition = this.setInitPosition.bind(this);
        }

        connectedCallback() {
          // Get attribute values and set default values if not provided
          if (this.hasAttribute('percentage')) {
            this.percentage = this.getAttribute('percentage');
          } else {
            this.percentage = 50;
          }
          if (this.hasAttribute('value')) {
            this._value = this.getAttribute('value');
          } else {
            this._value = 0;
          }
          if (this.hasAttribute('min')) {
            this.min = this.getAttribute('min');
          } else {
            this.min = 0;
          }
          if (this.hasAttribute('max')) {
            this.max = this.getAttribute('max');
          } else {
            this.max = 100;
          }
          if (this.hasAttribute('color')) {
            this.progressBarInner.style.backgroundColor = this.getAttribute('color');
            this.progressBarInner.style.borderColor = this.getAttribute('color');
          } else {
            this.color = "#409EFF";
          }

          // NEEDS IMPLEMENTATION
          if (this.hasAttribute('stroke-width')) {
            this.strokeWidth = this.getAttribute('stroke-width');
          } else {
            this.strokeWidth = 6;
          }

          if (this.hasAttribute('type')) {
            this.type = this.getAttribute('type');
          } else {
            this.type = "line";
          }

          // Initialize positions
          this.setInitPosition();
        }

        // Get the percentage value of the progress position on runway
        getCurrentPosition() {
          return (this.percentage - this.min) / (this.max - this.min) * 100 + "%";
        }

        // Initialization: Set width of progress bar based on position of 
        // current percentage
        setInitPosition() {
          const percent = (this.percentage - this.min)/ (this.max - this.min) * 100;
          this.progressBarInner.style.width = percent + "%";
        }

        // // Observe only the array of attribute names
        // static get observedAttributes() { return [ 'percentage', 'value', 'min', 'max', 'color' ]; }

        // // Listen for changed attributes
        // attributeChangedCallback(name, oldValue, newValue) {
        //   switch (name) {
        //   case 'percentage':
        //     break;
        //   case 'value':
        //     // console.log(`Initial value: ${newValue}`);
        //     break;
        //   case 'min':
        //     // console.log(`Minimum value: ${newValue}`);
        //     break;
        //   case 'max':
        //     // console.log(`Maximum value: ${newValue}`);
        //     break;
        //   case 'color':
        //     break;
        //   }
        // }

        // // Getters
        // get percentage() { return this.getAttribute('percentage'); }
        // get value() { return this.getAttribute('value'); }
        // get min() { return this.getAttribute('min'); }
        // get max() { return this.getAttribute('max'); }
        // get color() { return this.getAttribute('color'); }

        // // Setters
        // set percentage(newValue) { this.setAttribute('percentage', newValue); }
        // set value(newValue) { this.setAttribute('value', newValue); }
        // set min(newValue) { this.setAttribute('min', newValue); }
        // set max(newValue) { this.setAttribute('max', newValue); }
        // set color(newValue) { this.setAttribute('color', newValue); }
      }

      customElements.define('jj-progress', JJProgress);
    }

jjProgress();