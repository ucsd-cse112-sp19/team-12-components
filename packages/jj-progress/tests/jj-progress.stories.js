
import {storiesOf} from '@storybook/html';
import '../../../src/jj-progress.min.js';

storiesOf('jj-progress', module)
  .add('default', () => '<jj-progress id="jj"></jj-progress>')
  .add('20 percent', () => '<jj-progress id="jj" percentage=20 type=line stroke-width=5></jj-progress>')
  .add('80 percent', () => '<jj-progress id="jj" percentage=80></jj-progress>');
