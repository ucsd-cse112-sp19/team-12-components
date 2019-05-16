const template = document.createElement('template');
template.innerHTML = `
    <!-- import CSS -->
    <link rel="stylesheet" href="https://unpkg.com/element-ui/lib/theme-chalk/index.css">
    <link rel="stylesheet" href="../slider.css">
    <div role="slider" aria-valuemin="0" aria-valuemax="100" aria-orientation="horizontal" class="el-slider" aria-valuetext="0" aria-label="slider between 0 and 100">
        <div class="el-slider__runway">
            <div class="el-slider__bar" style="left: 0%;"></div>
            <div tabindex="0" class="el-slider__button-wrapper">
                <div class="el-tooltip el-slider__button" aria-describedby="el-tooltip-9861" tabindex="0"></div>
            </div>
        </div>
        
        <div role="tooltip" id="el-tooltip-9861" aria-hidden="false" class="el-tooltip__popper is-dark" x-placement="top" style="transform-origin: center bottom; z-index: 2282; position: absolute; top: 200px; left: 200px;">
            <span></span>
            <div x-arrow="" class="popper__arrow" style="left: 10.5px;"></div>
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
        this.tooltip = this.root.querySelector('.el-tooltip__popper');
        this.tooltipSpan = this.root.querySelector('.el-tooltip__popper span');

        // Bind the "this" to the functions
        this.getCurrentPosition = this.getCurrentPosition.bind(this);
        this.setInitPosition = this.setInitPosition.bind(this);
        this.setPosition = this.setPosition.bind(this);
        this.onSliderClick = this.onSliderClick.bind(this);
        this.onButtonHover = this.onButtonHover.bind(this);
        this.onButtonDown = this.onButtonDown.bind(this);
        this.onDragStart = this.onDragStart.bind(this);
        this.onDragging = this.onDragging.bind(this);
        this.onDragEnd = this.onDragEnd.bind(this);
    }

    connectedCallback() {
        // Bind event listener to sliderbar whenever it is clicked

        this.sliderRunway.addEventListener('mousedown', this.onSliderClick);
        this.sliderBtnWrapper.addEventListener('mousedown', this.onButtonDown);
        this.sliderBtnWrapper.addEventListener('mouseover', this.onButtonHover);

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

        this.setInitPosition();
        this.tooltipSpan.innerHTML = Math.round(this._value);
    }

    getCurrentPosition() {
        return (this._value - this.min) / (this.max - this.min) * 100 + "%";
    }

    setInitPosition() {
        const percent = (this._value - this.min) / (this.max - this.min) * 100;
        // console.log("Initial percentage: " + Math.round(percent) + "%");
        // set sliderBar width
        this.sliderBar.style.width = percent + "%";
        // set sliderBtn offset
        this.sliderBtnWrapper.style.left = percent + "%";
    }

    setPosition(percent) {
        let targetValue = parseInt(this.min) + percent * (this.max - this.min) / 100;
        if (targetValue > this.max) {
            targetValue = this.max;
        } else if (targetValue < this.min) {
            targetValue = this.min;
        }
        this._value = targetValue;
        this.tooltipSpan.innerHTML = Math.round(this._value);

        let newPercent = percent;
        if (newPercent > 100) {
            newPercent = 100;
        } else if (newPercent < 0) {
            newPercent = 0;
        }
        // set sliderBar width
        this.sliderBar.style.width = newPercent + "%";
        // set sliderBtn offset
        this.sliderBtnWrapper.style.left = newPercent + "%";

        // console.log("New value: " + Math.round(targetValue));
        // console.log("New percentage: " + Math.round(newPercent) + "%");
    }

    onSliderClick(event) {
        // if (this.sliderDisabled || this.dragging) return;
        this.sliderSize = this.sliderContainer.clientWidth;
        const sliderOffsetLeft = this.sliderContainer.getBoundingClientRect().left;
        this.setPosition((event.clientX - sliderOffsetLeft) / this.sliderSize * 100);
        this.onButtonDown(event);
    }

    onButtonHover(event) {
        console.log(event.screenX);
        console.log(event.screenY);
    }

    onButtonDown(event) {
        if (this.disabled) return;
        event.preventDefault();
        this.onDragStart(event);
        window.addEventListener('mousemove', this.onDragging);
        window.addEventListener('touchmove', this.onDragging);
        window.addEventListener('mouseup', this.onDragEnd);
        window.addEventListener('touchend', this.onDragEnd);
        window.addEventListener('contextmenu', this.onDragEnd);
    };

    onDragStart(event) {
        this.dragging = true;
        this.isClick = true;
        if (event.type === 'touchstart') {
            event.clientX = event.touches[0].clientX;
        }
        this.startX = event.clientX;
        this.startPosition = parseFloat(this.getCurrentPosition());
        this.newPosition = this.startPosition;
    };

    onDragging(event) {
        if (this.dragging) {
            this.isClick = false;
            // this.displayTooltip();
            let diff = 0;
            if (event.type === 'touchmove') {
                event.clientX = event.touches[0].clientX;
            }
            this.currentX = event.clientX;
            diff = (this.currentX - this.startX) / this.sliderSize * 100;
            this.newPosition = this.startPosition + diff;
            this.setPosition(this.newPosition);
        }
    }

    onDragEnd() {
        if (this.dragging) {
            setTimeout(() => {
                this.dragging = false;
                // this.hideTooltip();
                if (!this.isClick) {
                    this.setPosition(this.newPosition);
                }
            }, 0);
            window.removeEventListener('mousemove', this.onDragging);
            window.removeEventListener('touchmove', this.onDragging);
            window.removeEventListener('mouseup', this.onDragEnd);
            window.removeEventListener('touchend', this.onDragEnd);
            window.removeEventListener('contextmenu', this.onDragEnd);
        }
    }

    static get observedAttributes() {
        return ['value', 'min', 'max'];
    }

    attributeChangedCallback(name, oldValue, newValue) {
        switch (name) {
            case 'value':
                // console.log(`Initial value: ${newValue}`);
                break;
            case 'min':
                // console.log(`Minimum value: ${newValue}`);
                break;
            case 'max':
                // console.log(`Maximum value: ${newValue}`);
                break;
        }
    }
}

customElements.define('vanilla-slider-v2', VanillaSliderV2);