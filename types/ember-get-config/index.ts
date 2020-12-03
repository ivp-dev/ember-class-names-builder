interface BemOptions {
  separators?: string[] | string
  prefixes?: string[] | string
}

declare module 'ember-get-config' {
  const config: { 'ember-class-names-builder'?: BemOptions }
  export default config;
}