import { separators } from '../classes/-internal/constants';
import BaseOption from '../classes/-internal/base-option';
import ObjectOption from '../classes/-internal/object-option';
import StringOption from '../classes/-internal/string-option';


export default class ClassNamesDriver {
  constructor(
    private block: string,
    private element: string | boolean,
    private options: Array<string | object>
  ) { }

  /**
   * Base class name (block | block{elementSeparator}element)
   */
  public get base() {
    return this.element
      ? `${this.block}${this.elementSeparator}${this.element}`
      : this.block;
  }

  /**
   * Base class name with modifiers (this.base + $modifiers)
   */
  public get names() {
    return this.options.map(option => optionFactory(this.base, option, this.modiferSeparator).toString()
    ).filter((value, index, array) => array.indexOf(value) === index &&
      value.length
    );
  }

  /**
   * All class names (base + base{modifierSeparator}modifiers)
   */
  public get classes() {
    return this.names.length
      ? [this.base].concat(this.names)
      : [this.base];
  }

  public toString(formatter?: (driver: ClassNamesDriver) => string) {
    return formatter
      ? formatter(this)
      : this.classes.join(' ').trim();
  }

  private get elementSeparator() {
    return separators[0];
  }

  private get modiferSeparator() {
    return separators.length > 1 ? separators[1] : separators[0];
  }
}

export function optionFactory(
  base: string,
  option: unknown,
  separator: string
): BaseOption {
  if (option !== null && typeof option === 'object') {
    return new ObjectOption(base, option as object, separator);
  }

  if (option instanceof String || typeof option === 'string') {
    return new StringOption(base, option as string, separator);
  }

  throw 'type of option can be object or string';
}