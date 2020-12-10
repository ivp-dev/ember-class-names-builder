import BaseOption from './base-option';
import StringOption from "./string-option";

export default class ObjectOption extends BaseOption {
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
