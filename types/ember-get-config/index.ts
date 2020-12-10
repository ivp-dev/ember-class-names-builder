declare module 'ember-get-config' {
  export interface BemOptions {
    separators?: string[] | string
    prefixes?: string[] | string
  }

  const config: { 'ember-class-names-builder'?: BemOptions }

  export default config;
}