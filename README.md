# `svelte-svg-loader`

Webpack loader to transform SVGs into Svelte components.

It also optimizes your SVGs by running them thru
[svgo](https://github.com/svg/svgo).

## Note

This package is not published to NPM at this point in time.

## Usage

```svelte
<script>
  import MyIcon from 'assets/my-icon.svg';
</script>

<MyIcon width={42} height={42} />
```

## Setup

### `webpack.config.js`

```js
module.exports = {
  //...
  module: {
    rules: [
      {
        test: /\.svg$/,
        use: [
          {
            loader: 'svelte-svg-loader',
            options: {
              svgoConfig: {},
              ssr: false,
            },
          },
        ],
      },
    ],
  },
};
```

Note: If you are amending an existing Webpack config, make sure to remove the default loader for assets (which includes svgs), or place `svelte-svg-loader` before it in the loaders array.
```js
// Remove default SVG loader
config.module.rules = config.module.rules.filter(l => l.test && !l.test.toString().includes('svg'));
```

## Credits

This plugin is based on the work from the following projects:

- https://github.com/metafy-gg/rollup-plugin-svelte-svg
- https://github.com/metafy-gg/vite-plugin-svelte-svg
- https://github.com/codefeathers/rollup-plugin-svelte-svg
- https://github.com/visualfanatic/vite-svg

## License

MIT
