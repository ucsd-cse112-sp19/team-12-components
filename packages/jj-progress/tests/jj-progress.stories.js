
import {storiesOf} from '@storybook/html';
import '../../../src/jj-progress.min.js';

storiesOf('jj-progress', module)
  .add('default', () => '<jj-progress></jj-progress>')
  .add('percentage and color', () => 
    '<jj-progress percentage=20></jj-progress>' + 
    '<br/>' +
    '<jj-progress percentage=40 color="#8595ad"></jj-progress>' + 
    '<br/>' +
    '<jj-progress percentage=60 color="red"></jj-progress>' + 
    '<br/>' +
    '<jj-progress percentage=80 color="green"></jj-progress>' +
    '<br/>' +
    '<jj-progress percentage=100 color=#b71b54></jj-progress>'
  )
  .add('stroke-width', () => 
      '<jj-progress percentage=15 type=line></jj-progress>' +
      '<br/>' +
      '<jj-progress percentage=30 stroke-width=20 type=line></jj-progress>' +
      '<br/>' +
      '<jj-progress percentage=40 stroke-width=60 type=line></jj-progress>' + 
      '<br/>' +
      '<jj-progress stroke-width=80 type=line></jj-progress>');
