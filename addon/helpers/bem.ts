import { helper } from '@ember/component/helper';
import bem from '../utils/bem';
import ClassNamesBuilder from "../classes/class-names-builder";

function bemBuilder(
  params: Array<string | ClassNamesBuilder | object>
) {
  if (typeof params[0] === 'string') {
    //build block_modifiers
    return bem(params[0], ...params.slice(1));
  }

  if (typeof params[0] === 'function' && typeof params[1] === 'string') {
    //we have block__element_modifiers
    return params[0](params[1], ...params.slice(2));
  }

  throw 'First parameter should be string or object'
}

export default helper(bemBuilder);
