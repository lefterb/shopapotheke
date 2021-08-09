module.exports = function (api) {
  api.cache(true);
  const presets = [
    ["@babel/preset-env", {
        "useBuiltIns": "usage",
        "corejs": "3",
        "modules": false
    }],
    ["@babel/preset-react", {
      'plugins': ['@babel/plugin-proposal-class-properties']
    }],
    ["@babel/preset-typescript", {
      "allExtensions": true,
      "isTSX": true
    }]

  ];

  const plugins = [
    "@babel/plugin-transform-react-jsx",
    "@babel/plugin-syntax-jsx",
    "@babel/plugin-transform-runtime"
  ];

  return {
    presets,
    plugins
  };
}