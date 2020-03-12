module.exports = {
  root: true,
  extends: '@react-native-community',
  parserOptions: {
    ecmaFeatures: {
      legacyDecorators: true,
    },
  },
  rules: {
    'semi': [2, 'never'],
    'semi-spacing': [2, {
      'before': false,
      'after': true,
    }],
  },
}
