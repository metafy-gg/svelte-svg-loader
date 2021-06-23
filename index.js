const { getOptions } = require('loader-utils');
const { optimize } = require('svgo');
const svelte = require('svelte/compiler');

module.exports.default = function loader(source) {
  const { resourcePath } = this;
  const { svgoConfig, ssr } = getOptions(this) || {};
  const splitRegex = /(<svg.*?)(\/?>.*)/;
  const code = source.toString();

  let svg = optimizeSvg(code, resourcePath, svgoConfig);
  // Support any custom attributes
  const parts = splitRegex.exec(svg);
  if (parts === null) {
    console.error('[svelte-svg-loader] Failed to parse:', resourcePath);
  } else {
    const [_, head, body] = parts;
    svg = `${head} {...$$props}${body}`;
  }

  // Compile with Svelte
  return compileSvg(svg, resourcePath, ssr).code;
};

function compileSvg(source, filename, ssr) {
  const {
    js: { code, map },
  } = svelte.compile(source, {
    generate: ssr ? 'ssr' : 'dom',
    // If `dev` is set to true, trying to instantiate the component from Webpack will throw a "'target' is a required option" error.
    dev: false,
    hydratable: true,
  });
  return { code, map };
}

function optimizeSvg(content, path, config = {}) {
  const { data } = optimize(content, {
    ...config,
    path,
  });
  return data;
}
