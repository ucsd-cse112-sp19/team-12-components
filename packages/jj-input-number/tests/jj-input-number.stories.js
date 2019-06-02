import {storiesOf} from '@storybook/html';
import '../jj-input-number.js';

storiesOf('jj-input-number', module)
  .add('min, max, start value', () =>
     '<jj-input-number min=0 max=8 value=1 precision=2 step=0.5></jj-input-number>');
