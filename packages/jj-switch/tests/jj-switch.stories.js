
import {storiesOf} from '@storybook/html';
import '../jj-switch.js';

storiesOf('jj-switch', module)
  .add('default', () => '<jj-switch></jj-switch>')
  .add('inactive and active text', () => 
  '<jj-switch inactive-text="Pay by the year" active-text="Pay by the month"></jj-switch>')
  .add('inactive and active color', () => 
  '<jj-switch inactive-color="#dcdfe6" active-color="#409eff"></jj-switch>' +
  '<br/>' +
  '<jj-switch inactive-color="pink" active-color="lime"></jj-switch>' +
  '<br/>' +
  '<jj-switch inactive-color="magenta" active-color="purple"></jj-switch>')
  .add('size', () => 
  '<jj-switch size="large"></jj-switch>' +
  '<br/>' +
  '<jj-switch size="small"></jj-switch>');
