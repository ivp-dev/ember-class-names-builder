import { assert } from '@ember/debug';
import ClassNamesDriver from '../classes/class-names-driver';
import ClassNamesBuilder from '../classes/class-names-builder';

/**
 * BEM class names builder 
 * @param block 
 * @param args 
 */
function bemUtil(
  block: string,
  ...args: Array<string | object>
): ClassNamesBuilder {

  assert("Block should have single class name.", block.indexOf(' ') === -1);

  const classNamesBuilder: ClassNamesBuilder = (
    element: string,
    ...elementArgs: Array<string | object>
  ) => {
    return new ClassNamesDriver(block, element, elementArgs);
  };

  classNamesBuilder.toString = (
    formatter?: (driver: ClassNamesDriver) => string
  ) => (
      formatter
        ? formatter(new ClassNamesDriver(block, false, args))
        : `${new ClassNamesDriver(block, false, args)}`
    );

  return classNamesBuilder;
}

export default bemUtil;