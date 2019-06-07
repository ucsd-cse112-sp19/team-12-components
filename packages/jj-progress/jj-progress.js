/**
 * @component_name jj progress
 * @component_desc Progress is used to show the progress of current operation
 * and inform the user the current status.
 * @attribute percentage, percentage required, number, 0-100, 0
 * @attribute type, the type of progress bar, string,line/circle/dashboard, line
 * @attribute stroke-width, the width of progress bar, number, /, 6
 * @attribute text-inside, whether to place the percentage inside progress bar,
 * string, /, false
 * @attribute status, the current status of progress bar, string,
 * success/exception/warning, /
 * @attribute color, background color of progress bar, string, /, ''
 * @attribute width, the canvas width of circle progress bar, number, /, 126
 * @attribute show-text, whether to show percentage, boolean, /, true
 * // TODO(Nate): Add css-variable details.
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
      background-color: #409EFF;
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
    <div role="progressbar" aria-valuemin="0" aria-valuemax="100" 
        aria-orientation="horizontal" class="el-progress el-progress--line" 
        aria-valuetext="0" aria-label="progress between 0 and 100">

      <div class="el-progress-bar">
        <div class="el-progress-bar__outer" style="height: 6px;">
          <div class="el-progress-bar__inner" style="height:6px; width: 10%"></div>
        </div>
      </div>
      <div class="el-progress__text" style="font-size: 14.4px"></div>
    </div> 
  `;

      class JJProgress extends HTMLElement {
        constructor() {
          super();

          // Define constants here
          this.DEFAULT_PERCENTAGE = 50;
          this.DEFAULT_MIN = 0;
          this.DEFAULT_MAX = 100;
          this.DEFAULT_STROKE_WIDTH = 6;
          this.DEFAULT_PROGRESS_COLOR = "#409EFF";

          this._min = this.DEFAULT_MIN;
          this._max = this.DEFAULT_MAX;

          this.root = this.attachShadow({mode : 'open'});
          this.root.appendChild(template.content.cloneNode(true));

          // Target elements with querySelector
          this.progressContainer = this.root.querySelector('.el-progress');
          this.progressBar = this.root.querySelector('.el-progress-bar');
          this.progressBarOuter =
              this.root.querySelector('.el-progress-bar__outer');
          this.progressBarInner =
              this.root.querySelector('.el-progress-bar__inner');
          this.progressBarText = this.root.querySelector('.el-progress__text');
          // Bind "this" to functions to reserve context
          this.getCurrentPosition = this.getCurrentPosition.bind(this);
        }

        /*
         * Invoked each time the custom element is appended into a
         * document-connected element.
         */
        connectedCallback() {
          console.debug("in connectedCallback");
          // Assigns default values for attributes.

          if (!this.hasAttribute('percentage')) {
            console.log("setting default percentage:", this.DEFAULT_PERCENTAGE);
            this.percentage = this.DEFAULT_PERCENTAGE;
          }

          if (!this.hasAttribute('color')) {
            this.color = this.DEFAULT_PROGRESS_COLOR;
          }

          if (!this.hasAttribute('stroke-width')) {
            this.strokeWidth = this.DEFAULT_STROKE_WIDTH;
          }

          console.debug("Setting strokeWidth to ", this.strokeWidth);
          // Set the width of the progress bar.
          this.progressBarOuter.style.height = this.strokeWidth + "px";

          if (this.hasAttribute('type')) {
            this.type = this.getAttribute('type');
          } else {
            this.type = "line";
          }

          // Initialize positions
          this.updateProgressPosition();
          this.updatePercentageText();
        }

        /*
         * Update the percentage text based on current percentage.
         */
        updatePercentageText() {
          console.debug("in updatePercentageText");
          let text = "" + this.percentage + "%";
          console.debug("Updating percentage text to", text);
          this.progressBarText.innerText = text;
        }

        /*
         * Get the percentage value of the progress position on runway
         */
        getCurrentPosition() {
          return (this.percentage - this._min) / (this._max - this._min) * 100 +
                 "%";
        }

        /*
          Initialization: Set position of progress bar based on position of
         * current percentage
         */
        updateProgressPosition() {
          console.debug("in updateProgressPosition");
          const percent =
              (this.percentage - this._min) / (this._max - this._min) * 100;
          this.progressBarInner.style.width = percent + "%";
        }

        /*
         * Holds the list of attributes the component can have.
         */
        static get observedAttributes() {
          return [ 'percentage', 'stroke-width', 'type', 'color' ];
        }

        /*
         * Invoked when one of the custom element's attributes is added,
         * removed, or changed.
         */
        attributeChangedCallback(name, oldValue, newValue) {
          console.debug("in attributeChangedCallback for", name);
          switch (name) {
          case 'percentage':
            // When the percentage change update the progress bar and the text.
            if (this.percentage < 0) {
              this.percentage = this._min;
            } else if (this.percentage > 100) {
              this.percentage = this._max;
            }
            this.updateProgressPosition();
            this.updatePercentageText();
            break;
          case 'type':
            break;
          case 'stroke-width':
            // this.strokeWidth = this.getAttribute('stroke-width');
            this.progressBarOuter.style.height = this.strokeWidth + "px";
            break;
          case 'color':
            this.progressBarInner.style.backgroundColor = this.color;
            this.progressBarInner.style.borderColor = this.color;
            break;
          }
        }

        // Getters
        get percentage() { return this.getAttribute('percentage'); }
        get color() { return this.getAttribute('color'); }
        get strokeWidth() { return this.getAttribute('stroke-width'); }

        // Setters
        set percentage(newValue) { this.setAttribute('percentage', newValue); }
        set color(newValue) { this.setAttribute('color', newValue); }
        set strokeWidth(newValue) {
          this.setAttribute('stroke-width', newValue);
        }
      }

      customElements.define('jj-progress', JJProgress);
    }

jjProgress();
