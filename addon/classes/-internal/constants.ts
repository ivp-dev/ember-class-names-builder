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

export const separators: Array<string> | string = ((options: BemOptions) =>
  getSeparators(options)
)(config['ember-class-names-builder'] as BemOptions);

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

export const prefixes: Array<string> | string = ((options) =>
  getPrefixes(options)
)(config['ember-class-names-builder'] as BemOptions);
