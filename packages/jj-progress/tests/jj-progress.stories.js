
import {storiesOf} from '@storybook/html';
import '../jj-progress.js';

storiesOf('jj-progress', module)
  .add('percentage', () => '<jj-progress id="jj" percentage=35 type=line stroke-width=5></jj-progress>');
