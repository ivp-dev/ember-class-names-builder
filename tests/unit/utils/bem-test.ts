import bem from 'ember-class-names-builder/utils/bem';
import { getPrefixes, getSeparators } from 'ember-class-names-builder/utils/bem';
import { module, test } from 'qunit';
import ENV from 'dummy/config/environment';


const separators = getSeparators(ENV['ember-class-names-builder']);
const prefixes = getPrefixes(ENV['ember-class-names-builder']);

module('Unit | Utility | bem', function () {
  let
    prefix: string,
    elementSeparator: string,
    modifierSeparator: string;

  elementSeparator = separators[0]
  modifierSeparator = separators.length > 1 ? separators[1] : separators[0];

  test("bem('')", function (assert) { assert.equal(bem(''), ''); });
  test("bem('block')", function (assert) { assert.equal(bem('block'), 'block'); });

  for (let prefixIdx = 0; prefixIdx < prefixes.length; prefixIdx++) {
    prefix = prefixes[prefixIdx];
    test(`bem('block', '${prefix}modifier')`, function (assert) { assert.equal(bem('block', `${prefix}modifier`), `block block${modifierSeparator}modifier`); });
    test(`bem('block', { '${prefix}modifier': false })`, function (assert) { assert.equal(bem('block', { [`${prefix}modifier`]: false }), 'block'); });
    test(`bem('block', { '${prefix}modifier': true })`, function (assert) { assert.equal(bem('block', { [`${prefix}modifier`]: true }), `block block${modifierSeparator}modifier`); });
    test("bem('block')('element')", function (assert) { assert.equal(bem('block')('element'), `block${elementSeparator}element`); });
    test(`bem('block')('element', '${prefix}modifier')`, function (assert) { assert.equal(bem('block')('element',  `${prefix}modifier`), `block${elementSeparator}element block${elementSeparator}element${modifierSeparator}modifier`); });
    test(`bem('block')('element', {'${prefix}modifier': true})`, function (assert) { assert.equal(bem('block')('element', { [`${prefix}modifier`]: true }), `block${elementSeparator}element block${elementSeparator}element${modifierSeparator}modifier`); });
    test(`bem('block')('element', {'${prefix}modifier': false})`, function (assert) { assert.equal(bem('block')('element', { [`${prefix}modifier`]: false }), `block${elementSeparator}element`); });
  }
});
