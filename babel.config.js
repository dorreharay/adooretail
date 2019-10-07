module.exports = {
  presets: ['module:metro-react-native-babel-preset'],
};

const plugins = [
  [
    require.resolve('babel-plugin-module-resolver'),
    {
      root: ["./src/"],
      alias: {
        "test": "./test"
      }
    }
    
  ]
];
