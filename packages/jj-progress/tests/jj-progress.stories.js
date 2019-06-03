
import {storiesOf} from '@storybook/html';
import '../../../src/jj-progress.min.js';

storiesOf('jj-progress', module)
  .add('percentage', () => '<jj-progress id="jj" percentage=35 type=line stroke-width=5></jj-progress>');
