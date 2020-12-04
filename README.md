ember-class-names-builder
==============================================================================

Helper for building class names.

Compatibility
------------------------------------------------------------------------------

* Ember.js v3.16 or above
* Ember CLI v2.13 or above
* Node.js v10 or above


Installation
------------------------------------------------------------------------------

```
ember install ember-class-names-builder
```


Usage
------------------------------------------------------------------------------
By default it use BEM naming convention.
```
<div class={{bem 'block'}} ... // => <div class="block" ...

<div class={{bem 'block' '$modifier'}} ... // => <div class="block block_modifier" ...

<div class={{bem 'block' (hash $modifier=true) }} ... // => <div class="block block_modifier" ...

<div class={{bem 'block' (hash $modifier=true) }} ... // => <div class="block block_modifier" ...

<div class={{bem (bem 'block') 'element' (hash $modifier=true) }} ... // => <div class="block__element block__element_modifier" ...

```

It can be overridden in app environment.
You can set another class name part separators:

```
ENV['ember-class-names-builder']: {
  separators: '-' | ['__', '--'] // it can be string or array of string
}
```
The result will be:

```
<div class={{bem (bem 'block') 'element' (hash $modifier=true) }} ... // in case of '-' => <div class="block-element block-element-modifier" ...
<div class={{bem (bem 'block') 'element' (hash $modifier=true) }} ... // in case of [__, '--'] => <div class="block__element block__element--modifier" ...
```

You can override modifier prefix as well. 

```
ENV['ember-class-names-builder']: {
  prefixes: ['_', '-', '$'] // these prefixes are used by default 
}
```

Contributing
------------------------------------------------------------------------------

See the [Contributing](CONTRIBUTING.md) guide for details.


License
------------------------------------------------------------------------------

This project is licensed under the [MIT License](LICENSE.md).
