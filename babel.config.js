module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          root: ['./'],
          alias: {
            src: './src',
            '@app': './src/app',
            '@screens': './src/screens',
            '@widgets': './src/widgets',
            '@features': './src/features',
            '@entities': './src/entities',
            '@shared': './src/shared',
          },
          extensions: ['.ts', '.tsx', '.js', '.jsx', '.json'],
        },
      ],
      // react-native-worklets/plugin (Reanimated 4) MUST be last
      'react-native-worklets/plugin',
    ],
  };
};
