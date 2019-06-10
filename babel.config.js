module.exports = function(api) {
  api.cache(true)
  return {
    presets: ['babel-preset-expo'],
    env: {
      production: {
        plugins: ['react-native-paper/babel'],
      },
    },
    plugins: [
      [
        'module-resolver',
        {
          extensions: ['.ios.js', '.android.js', '.js', '.json', '.ts', '.tsx'],
          alias: {
            assets: './app/assets',
            components: './app/components',
            appredux: './app/redux',
            screens: './app/screens',
            styles: './app/styles',
            utils: './app/utils',
          },
        },
      ],
    ],
  }
}
