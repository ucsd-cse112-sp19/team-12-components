import {storiesOf} from '@storybook/html';
import '../core-hello.js';

/** 
 * Two ways to add a story demo.
 * 1. use html
 * 1. build the element with document.createElement
 *
 * Both are shown below.
 */
// TODO(Nate): Issue with multi word inner html only displaying last part
storiesOf('core-hello', module)
  .add('Default', () => '<core-hello lang="en">Peter</core-hello>')

  //TODO(Nate) Currently broken with current implementation.
  //.add('with Rainbow', () => '<core-hello lang="en">Peter</core-hello>')
  .add('in Spanish', () => '<core-hello lang="sp">Peter</core-hello>')
  .add('in French', () => {
      const coreHello = document.createElement('core-hello');
      coreHello.innerText = 'Peter';
      coreHello.lang = 'fr';
      return coreHello;
  });
