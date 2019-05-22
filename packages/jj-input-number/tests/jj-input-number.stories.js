import {storiesOf} from '@storybook/html';
import '../jj-input-number.js';

storiesOf('jj-input-number', module)
  .add('Default', () => 
     '<jj-slider value=35 min=0 max=50 color="purple"></jj-slider>');
