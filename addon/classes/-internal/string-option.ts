import BaseOption from './base-option';
import { prefixes } from './constants';

export default class StringOption extends BaseOption {
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
