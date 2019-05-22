
import {storiesOf} from '@storybook/html';
import '../jj-slider.js';

storiesOf('jj-slider', module)
  .add('default', () => '<jj-slider></jj-slider>')
  .add('min, max', () => '<jj-slider min=-100 max=100></jj-slider>')
  .add('min, max, start value', () => '<jj-slider value=35 min=0 max=50></jj-slider>');
