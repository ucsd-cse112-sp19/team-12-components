const template = document.createElement('template');
template.innerHTML = `
    <!-- import CSS -->
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <!-- <link rel="stylesheet" href="../slider.css"> -->
    <div role="slider" aria-valuemin="0" aria-valuemax="100" aria-orientation="horizontal" class="el-slider" aria-valuetext="0" aria-label="slider between 0 and 100">
        <div class="el-slider__runway">
            <div class="el-slider__bar" style="left: 0%;"></div>
            <!--
            <div tabindex="0" class="el-slider__button-wrapper" style="left: 25%;">
                <div class="el-tooltip el-slider__button" aria-describedby="el-tooltip-9861" tabindex="0"></div>
            -->
            </div>
        </div>
    </div>
  `;

class VanillaSliderV2 extends HTMLElement {
    constructor() {
        super();
        this.root = this.attachShadow({ mode: 'open' });
        this.root.appendChild(template.content.cloneNode(true));

        this.sliderContainer = this.root.querySelector('.el-slider');
        this.sliderRunway = this.root.querySelector('.el-slider__runway');
        this.sliderBar = this.root.querySelector('.el-slider__bar');
        this.sliderBtnWrapper = this.root.querySelector('.el-slider__button-wrapper');
        this.tootip = this.root.querySelector('.el-tooltip.el-slider__button');

        // Bind the "this" to the functions
        this.setInitPosition = this.setInitPosition.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.onSliderClick = this.onSliderClick.bind(this);

        this.onButtonDown = this.onButtonDown.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
    }

    connectedCallback() {
        // Bind event listener to sliderbar whenever it is clicked
        // this.sliderRunway.addEventListener('click', this.onButtonDown);

        this.sliderRunway.addEventListener('click', this.onSliderClick);

        if (this.hasAttribute('value')) {
            this._value = this.getAttribute('value');
        }
        if (this.hasAttribute('min')) {
            this.min = this.getAttribute('min');
        }
        if (this.hasAttribute('max')) {
            this.max = this.getAttribute('max');
        }

        this.setInitPosition();
    }

    setInitPosition() {
        const percent = (this._value - this.min) / (this.max - this.min) * 100;
        console.log("Initial percentage: " + percent + "%");
        this.sliderBar.style.width = percent + "%";

        // TODO: set button position
    }

    setPosition(percent) {
        const targetValue = parseInt(this.min) + percent * (this.max - this.min) / 100;
        console.log("New value: " + targetValue);
        console.log("New percentage: " + percent);
        this.sliderBar.style.width = percent + "%";

        // TODO: set button position
        // this.$refs[button].setPosition(percent);
    }

    onSliderClick(event) {
        // if (this.sliderDisabled || this.dragging) return;
        this.sliderSize = this.sliderContainer.clientWidth;
        const sliderOffsetLeft = this.sliderContainer.getBoundingClientRect().left;
        this.setPosition((event.clientX - sliderOffsetLeft) / this.sliderSize * 100);
    }

    // TODO: implement event handlers

    onButtonDown(event) {
        if (this.disabled) return;
        event.preventDefault();
        this.onDragStart(event);
        window.addEventListener('mousemove', this.onDragging);
        window.addEventListener('touchmove', this.onDragging);
        window.addEventListener('mouseup', this.onDragEnd);
        window.addEventListener('touchend', this.onDragEnd);
        window.addEventListener('contextmenu', this.onDragEnd);
        console.log(event);
    };

    onDragStart(event) {
        this.dragging = true;
        this.isClick = true;
        console.log(event.clientX);
        if (event.type === 'touchstart') {
            // event.clientY = event.touches[0].clientY;
            event.clientX = event.touches[0].clientX;
        }
        if (this.vertical) {
            // this.startY = event.clientY;
        } else {
            this.startX = event.clientX;
        }
        // this.currentPosition = this.sliderBar.style.width;
        this.startPosition = parseFloat(this.currentPosition);
        this.newPosition = this.startPosition;
        console.log(this.startPosition);
        console.log(this.newPosition);
    };

    // onDragging(event) {
    //     if (this.dragging) {
    //         this.isClick = false;
    //         this.displayTooltip();
    //         this.$parent.resetSize();
    //         let diff = 0;
    //         if (event.type === 'touchmove') {
    //             event.clientY = event.touches[0].clientY;
    //             event.clientX = event.touches[0].clientX;
    //         }
    //         if (this.vertical) {
    //             this.currentY = event.clientY;
    //             diff = (this.startY - this.currentY) / this.$parent.sliderSize * 100;
    //         } else {
    //             this.currentX = event.clientX;
    //             diff = (this.currentX - this.startX) / this.$parent.sliderSize * 100;
    //         }
    //         this.newPosition = this.startPosition + diff;
    //         this.setPosition(this.newPosition);
    //     }
    // }

    // onDragEnd() {
    //     if (this.dragging) {
    //         setTimeout(() => {
    //             this.dragging = false;
    //             this.hideTooltip();
    //             if (!this.isClick) {
    //                 this.setPosition(this.newPosition);
    //                 this.$parent.emitChange();
    //             }
    //         }, 0);
    //         window.removeEventListener('mousemove', this.onDragging);
    //         window.removeEventListener('touchmove', this.onDragging);
    //         window.removeEventListener('mouseup', this.onDragEnd);
    //         window.removeEventListener('touchend', this.onDragEnd);
    //         window.removeEventListener('contextmenu', this.onDragEnd);
    //     }
    // }

    // Set the position of the drop being dragged
    // setPosition(newPosition) {
    //     if (newPosition === null || isNaN(newPosition)) return;
    //        if (newPosition < 0) {
    //          newPosition = 0;
    //      } else if (newPosition > 100) {
    //          newPosition = 100;
    //      }
    //      const lengthPerStep = 100 / ((this.max - this.min) / this.step);
    //      const steps = Math.round(newPosition / lengthPerStep);
    //      let value = steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min;
    //      value = parseFloat(value.toFixed(this.precision));
    //      this.$emit('input', value);
    //      this.$nextTick(() => {
    //          this.$refs.tooltip && this.$refs.tooltip.updatePopper();
    //      });
    //      if (!this.dragging && this.value !== this.oldValue) {
    //          this.oldValue = this.value;
    //      }
    //  }

    //  // Call the set position 
    //  setPosition(percent) {
    //     const targetValue = this.min + percent * (this.max - this.min) / 100;
    //     if (!this.range) {
    //       this.$refs.button1.setPosition(percent);
    //       return;
    //     }
    //     let button;
    //     if (Math.abs(this.minValue - targetValue) < Math.abs(this.maxValue - targetValue)) {
    //       button = this.firstValue < this.secondValue ? 'button1' : 'button2';
    //     } else {
    //       button = this.firstValue > this.secondValue ? 'button1' : 'button2';
    //     }
    //     this.$refs[button].setPosition(percent);
    //   }

    static get observedAttributes() {
        return ['value', 'min', 'max'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value':
                console.log(`Initial value: ${newValue}`);
                break;
            case 'min':
                console.log(`Minimum value: ${newValue}`);
                break;
            case 'max':
                console.log(`Maximum value: ${newValue}`);
                break;
        }
    }
}

customElements.define('vanilla-slider-v2', VanillaSliderV2);