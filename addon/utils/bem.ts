import { assert } from '@ember/debug';
import config, { BemOptions } from 'ember-get-config';

export function getSeparators(options: BemOptions): Array<string> {
  if (options && options.separators) {
    if (Array.isArray(options.separators)) {
      return options.separators;
    }

    if (typeof options.separators === 'string') {
      return [options.separators]
    }

    throw 'Not supported separator type. Expected array or string';
  }

  return ["__", "_"]
}

export function getPrefixes(options: BemOptions): Array<string> {
  if (options && options.prefixes) {
    if (Array.isArray(options.prefixes)) {
      return options.prefixes;
    }

    if (typeof options.prefixes === 'string') {
      return [options.prefixes]
    }

    throw 'Not supported prefix type. Expected array or string';
  }

  return ['_', '-', '$'];
}

const separators: Array<string> | string = ((options: BemOptions) =>
  getSeparators(options)
)(config['ember-class-names-builder'] as BemOptions);

const prefixes: Array<string> | string = ((options) =>
  getPrefixes(options)
)(config['ember-class-names-builder'] as BemOptions);


abstract class BaseOption {
  constructor(
    public separator: string
  ) { }
  public toString() {
    return '';
  }
}

class ObjectOption extends BaseOption {
  constructor(
    public base: string,
    public option: object,
    separator: string
  ) { super(separator); }

  public get classNames() {
    return Object.keys(this.option).reduce((names: Array<string>, key: string) => (
      Reflect.get(this.option, key)
        ? names.concat(this.keyToString(key))
        : names
    ), []);
  }

  public toString() {
    return this.classNames.join(' ').trim();
  }

  private keyToString(key: string) {
    return new StringOption(this.base, key, this.separator).toString();
  }
}

class StringOption extends BaseOption {
  constructor(
    public base: string,
    public option: string,
    separator: string
  ) { super(separator); }

  get isModifier() {
    return typeof prefixes === 'string'
      ? this.hasPrefix(prefixes)
      : prefixes.some((prefix: string) => this.hasPrefix(prefix));
  }

  public toString() {
    return this.isModifier
      ? this.toModifier()
      : this.option;
  }

  private withoutPrefix() {
    return this.option.substring(1);
  }

  private hasPrefix(char: string) {
    return this.option.charAt(0) === char;
  }

  private toModifier() {
    return `${this.base}${this.separator}${this.withoutPrefix()}`;
  }
}

function optionFactory(
  base: string,
  option: unknown,
  separator: string
): BaseOption {
  if (option && typeof option === 'object') {
    return new ObjectOption(base, option as object, separator);
  }

  if (option instanceof String || typeof option === 'string') {
    return new StringOption(base, option as string, separator);
  }

  throw 'type of option can be object or string';
}

export class ClassNamesDriver {
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


export type ClassNamesBuilder = {
  (element: string, ...elementArgs: (string | object)[]): ClassNamesDriver;
  toString(formatter?: (driver: ClassNamesDriver) => string): string;
};

/**
 * BEM class names builder 
 * @param block 
 * @param args 
 */
function bem(
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

export default bem;