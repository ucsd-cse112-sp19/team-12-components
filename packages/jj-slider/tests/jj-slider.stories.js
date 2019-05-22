
import {storiesOf} from '@storybook/html';
import '../jj-slider.js';

storiesOf('jj-slider', module)
  .add('default', () => 
      '<jj-input-number min=0 max=8 value=1 precision=2 step=0.5></jj-input-number>');
