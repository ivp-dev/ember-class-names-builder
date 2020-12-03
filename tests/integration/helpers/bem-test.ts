import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';
import { getPrefixes, getSeparators } from 'ember-class-names-builder/utils/bem';
import ENV from 'dummy/config/environment';

const separators = getSeparators(ENV['ember-class-names-builder']);
const prefixes = getPrefixes(ENV['ember-class-names-builder']);

module('Integration | Helper | bem', async function (hooks) {
  setupRenderingTest(hooks);

  test("bem helper",
    async function (assert) {
      let
        prefix: string,
        elementSeparator: string,
        modifierSeparator: string;

      elementSeparator = separators[0]
      modifierSeparator = separators.length > 1 ? separators[1] : separators[0];

      await render(hbs`{{bem ''}}`);
      assert.equal(this.element.textContent?.trim(), '', 'empty block');

      await render(hbs`{{bem 'block'}}`);
      assert.equal(this.element.textContent?.trim(), 'block', 'block');

      for (let prefixIdx = 0; prefixIdx < prefixes.length; prefixIdx++) {
        prefix = prefixes[prefixIdx];

        await render(hbs`{{bem 'block' '$modifier'}}`);
        assert.equal(this.element.textContent?.trim(), `block block${modifierSeparator}modifier`, `{{bem 'block' '$modifier'}} with prefix ${prefix}`);

        await render(hbs`{{bem 'block' (hash $modifier=false)}}`);
        assert.equal(this.element.textContent?.trim(), 'block', `{{bem 'block' (hash $modifer=true)}} with prefix ${prefix}`);

        await render(hbs`{{bem 'block' (hash $modifier=true)}}`);
        assert.equal(this.element.textContent?.trim(), `block block${modifierSeparator}modifier`, `{{bem 'block' (hash $modifer=true)}} with prefix ${prefix}`);

        await render(hbs`{{bem (bem 'block') 'element' '$modifier'}}`);
        assert.equal(this.element.textContent?.trim(), `block${elementSeparator}element block${elementSeparator}element${modifierSeparator}modifier`, `{{bem (bem 'block') 'element' '$modifier'}} with prefix ${prefix}`);

        await render(hbs`{{bem (bem 'block') 'element' (hash $modifier=false)}}`);
        assert.equal(this.element.textContent?.trim(), `block${elementSeparator}element`, `{{bem (bem 'block') 'element' (hash $modifier=false)}} with prefix ${prefix}`);

        await render(hbs`{{bem (bem 'block') 'element' (hash $modifier=true)}}`);
        assert.equal(this.element.textContent?.trim(), `block${elementSeparator}element block${elementSeparator}element${modifierSeparator}modifier`, `{{bem (bem 'block') 'element' (hash $modifier=true)}} with prefix ${prefix}`);
      }
    }
  );
});
