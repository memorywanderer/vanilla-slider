// babel.config.js
module.exports = {
  presets: [
    [
      '@babel/preset-env',
      {
        targets: {
          node: 'current', // or specify your target environments
        },
      },
    ],
  ],
};
