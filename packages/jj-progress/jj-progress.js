/**
 * @component_name jj progress
 * @component_desc Progress is used to show the progress of current operation
 * and inform the user the current status.
 * @attribute percentage, percentage required, 0-100, 0
 * @attribute type, the type of progress bar, line/circle/dashboard, line
 * @attribute stroke-width, the width of progress bar, /, 6
 * @attribute text-inside, whether to place the percentage inside progress bar, /, false
 * @attribute status, the current status of progress bar, success/exception/warning, /
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
        font-family: var(--tooltip-font, Helvetica, Arial, sans-serif);
        width: var(--progress-width);
        margin: 0 auto;
    }
    
    .el-progress__runway {
        background-color: var(--runway-color, #E4E7ED);
    }
    
    .el-progress__bar {
        background-color: var(--bar-color, #409EFF);
    }
    
    .el-progress__button {
        border: 2px solid var(--button-border-color, #409EFF);
        background-color: var(--button-color, #FFF);
    }

    </style>
    <div role="progress" aria-valuemin="0" aria-valuemax="100" aria-orientation="horizontal" class="el-progress" aria-valuetext="0" aria-label="progress between 0 and 100">
        <div class="el-progress__runway" id="runway">
            <div class="el-progress__bar" style="left: 0%;"></div>
            <div tabindex="0" class="el-progress__button-wrapper" id="btn">
                <div class="el-tooltip el-progress__button" aria-describedby="el-tooltip-9861" tabindex="0"></div>
            </div>
        </div>
    </div>
  `;

      class JJProgress extends HTMLElement {
        constructor() {
          super();
          this.root = this.attachShadow({mode : 'open'});
          this.root.appendChild(template.content.cloneNode(true));

          // Target elements with querySelector
          this.progressContainer = this.root.querySelector('.el-progress');
          this.progressRunway = this.root.querySelector('.el-progress__runway');
          this.progressBar = this.root.querySelector('.el-progress__bar');
        //   this.progressBtnWrapper =
        //       this.root.querySelector('.el-progress__button-wrapper');
        //   this.progressBtn =
        //       this.root.querySelector('.el-tooltip.el-progress__button');
          //this.tooltip = this.root.querySelector('.el-tooltip__popper');
          //this.tooltipSpan =
              //this.root.querySelector('.el-tooltip__popper span');

          // Bind "this" to functions to reserve context
          this.getCurrentPosition = this.getCurrentPosition.bind(this);
          this.setInitPosition = this.setInitPosition.bind(this);
          this.setPosition = this.setPosition.bind(this);
          this.onprogressClick = this.onprogressClick.bind(this);
          //this.onButtonHover = this.onButtonHover.bind(this);
          //this.onButtonHoverEnd = this.onButtonHoverEnd.bind(this);
          //this.onButtonDown = this.onButtonDown.bind(this);
          //this.onDragStart = this.onDragStart.bind(this);
          //this.onDragging = this.onDragging.bind(this);
          //this.onDragEnd = this.onDragEnd.bind(this);
        }

        connectedCallback() {
          // Bind event listener to progress elements
          //this.progressRunway.addEventListener('mousedown', this.onprogressClick);
        //   this.progressBtnWrapper.addEventListener('mouseover',
        //                                          this.onButtonHover);
        //   this.progressBtnWrapper.addEventListener('mouseout',
        //                                          this.onButtonHoverEnd);
        //   this.progressBtnWrapper.addEventListener('mousedown',
        //                                          this.onButtonDown);
          // Set default for min and max
          this.min = 0;
          this.max = 100;

          // Get attribute values and set default values if not provided
          if (this.hasAttribute('percentage')) {
            this.percentage = this.getAttribute('percentage');
          } else {
            this.percentage = 0;
          }
          if (this.hasAttribute('type')) {
            this.type = this.getAttribute('type');
          } else {
            this.type = "line";
          }
          if (this.hasAttribute('stroke-width')) {
            this.strokeWidth = this.getAttribute('stroke-width');
          } else {
            this.strokeWidth = 6;
          }

          // Initialize positions
          this.setInitPosition();
          // Set tooltip display value
          //this.tooltipSpan.innerHTML = Math.round(this._value);
          // Hide tooltip at initialization
          //this.tooltip.style =
            //   "transform-origin: center bottom; z-index: 2282; position: absolute; display: none;";
        }

        // Get the percentage value of button's position on progress runway.
        getCurrentPosition() {
          return (this._value - this.min) / (this.max - this.min) * 100 + "%";
        }

        // Initialization: Set width of progress bar and offset of progress button
        // based on position of current value
        setInitPosition() {
            const percentage = 1;
        //   const percent =
        //       (this._value - this.min) / (this.max - this.min) * 100;
        //   this.progressBar.style.width = percent + "%";
        //   this.progressBtnWrapper.style.left = percent + "%";
        }

        // Calculate target value based on percentage and set width of progress
        // bar and offset of progress button
        setPosition(percent) {
          // Calculate target value based on percentage
          let targetValue =
              parseInt(this.min) + percent * (this.max - this.min) / 100;
          if (targetValue > this.max) {
            targetValue = this.max;
          } else if (targetValue < this.min) {
            targetValue = this.min;
          }
          this._value = targetValue;
          this.setAttribute("value", Math.round(this._value));

          // Percentage boundary check
          let newPercent = percent;
          if (newPercent > 100) {
            newPercent = 100;
          } else if (newPercent < 0) {
            newPercent = 0;
          }
          this.progressBar.style.width = newPercent + "%";
          this.progressBtnWrapper.style.left = newPercent + "%";

          // Set tooltip display value
        //   this.tooltipSpan.innerHTML = Math.round(this._value);
        //   // Set tooltip position
        //   let rect = this.progressBtnWrapper.getBoundingClientRect();
        //   this.tooltip.style =
        //       "transform-origin: center bottom; z-index: 2282; position: absolute; top: " +
        //       (rect.top - rect.height) + "px; left: " + rect.left + "px;";
        }

        // This event handler will be called when the progress runway receives a
        // 'mousedown' signal. Set width of progress bar and offset of progress
        // button based on position of cursor on mousedown.
        onprogressClick(event) {
          this.progressSize = this.progressContainer.clientWidth;
          const progressOffsetLeft =
              this.progressContainer.getBoundingClientRect().left;
          this.setPosition((event.clientX - progressOffsetLeft) /
                           this.progressSize * 100);
          this.onButtonDown(event);
        }

        // This event handler will be called when the progress button receives a
        // 'mouseover' signal. Set tooltip position on mouseover.
        // onButtonHover(event) {
        //   let rect = this.progressBtnWrapper.getBoundingClientRect();
        //   this.tooltip.style =
        //       "transform-origin: center bottom; z-index: 2282; position: absolute; top: " +
        //       (rect.top - rect.height) + "px; left: " + rect.left + "px;";
        //}

        // This event handler will be called when the progress button receives a
        // 'mouseout' signal. Hide tooltip on mouseout.
        // onButtonHoverEnd(event) {
        //   this.tooltip.style =
        //       "transform-origin: center bottom; z-index: 2282; position: absolute; display: none;";
        // }

        // This event handler will be called when the progress button receives a
        // 'mousedown' signal. Trigger onDragStart() and add event listeners to
        // onDragging() and onDragEnd().
        // onButtonDown(event) {
        //   if (this.disabled)
        //     return;
        //   event.preventDefault();
        //   this.onDragStart(event);
        //   window.addEventListener('mousemove', this.onDragging);
        //   window.addEventListener('touchmove', this.onDragging);
        //   window.addEventListener('mouseup', this.onDragEnd);
        //   window.addEventListener('touchend', this.onDragEnd);
        //   window.addEventListener('contextmenu', this.onDragEnd);
        // };

        // Mark original value's position when dragging starts
        // onDragStart(event) {
        //   this.dragging = true;
        //   this.isClick = true;
        //   if (event.type === 'touchstart') {
        //     event.clientX = event.touches[0].clientX;
        //   }
        //   this.startX = event.clientX;
        //   this.startPosition = parseFloat(this.getCurrentPosition());
        //   this.newPosition = this.startPosition;
        // };

        // This event handler will be called when the window (global scope)
        // receives a 'mousemove' or 'touchmove' signal. Call setPosition() with
        // new position on mousemove.
        onDragging(event) {
          if (this.dragging) {
            this.isClick = false;
            let diff = 0;
            if (event.type === 'touchmove') {
              event.clientX = event.touches[0].clientX;
            }
            this.currentX = event.clientX;
            diff = (this.currentX - this.startX) / this.progressSize * 100;
            this.newPosition = this.startPosition + diff;
            this.setPosition(this.newPosition);
          }
        }

        // This event handler will be called when the window (global scope)
        // receives a 'mouseup', 'touchend', or 'contextmenu' signal. Call
        // setPosition(), hide tooltip, and remove event listeners on mouseup.
        // onDragEnd() {
        //   if (this.dragging) {
        //     setTimeout(() => {
        //       this.dragging = false;
        //       if (!this.isClick) {
        //         this.setPosition(this.newPosition);
        //         this.tooltip.style =
        //             "transform-origin: center bottom; z-index: 2282; position: absolute; display: none;";
        //       }
        //     }, 0);
        //     window.removeEventListener('mousemove', this.onDragging);
        //     window.removeEventListener('touchmove', this.onDragging);
        //     window.removeEventListener('mouseup', this.onDragEnd);
        //     window.removeEventListener('touchend', this.onDragEnd);
        //     window.removeEventListener('contextmenu', this.onDragEnd);
        //   }
        // }

        // Observe only the array of attribute names
        static get observedAttributes() { return [ 'percentage', 'type', 'stroke-width' ]; }

        // Listen for changed attributes
        attributeChangedCallback(name, oldValue, newValue) {
          switch (name) {
          case 'percentage':
            // console.log(`Initial value: ${newValue}`);
            break;
          case 'type':
            // console.log(`Minimum value: ${newValue}`);
            break;
          case 'stroke-width':
            // console.log(`Maximum value: ${newValue}`);
            break;
          }
        }

        // Getters
        get percentage() { return this.getAttribute('percentage'); }
        get type() { return this.getAttribute('type'); }
        get strokeWidth() { return this.getAttribute('stroke-width'); }

        // Setters
        set percentage(newValue) { this.setAttribute('percentage', newValue); }
        set type(newValue) { this.setAttribute('type', newValue); }
        set strokeWidth(newValue) { this.setAttribute('stroke-width', newValue); }
      }

      customElements.define('jj-progress', JJProgress);
    }

jjProgress();