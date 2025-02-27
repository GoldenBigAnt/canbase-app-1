const { getDefaultConfig } = require("expo/metro-config");
const { withNativeWind } = require("nativewind/metro");

const defaultConfig = getDefaultConfig(__dirname);

module.exports = withNativeWind({
  ...defaultConfig,
  transformer: {
    ...defaultConfig.transformer,
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    ...defaultConfig.resolver,
    sourceExts: [
      ...defaultConfig.resolver.sourceExts, 
      'jsx', 
      'js', 
      'ts', 
      'tsx', 
      'cjs', 
      'json', 
      'svg'
    ],
    assetExts: defaultConfig.resolver.assetExts.filter((ext) => ext !== 'svg'),
  },
}, { input: "./src/style/global.css" });