module.exports = {
  root: true,
  env: {
    browser: true,
    es2022: true,
    node: true
  },
  parserOptions: {
    'ecmaVersion': 13,
    parser: '@typescript-eslint/parser'
  },
  plugins: ['@typescript-eslint'],
  extends: [
    'plugin:vue/vue3-essential',
    'eslint:recommended',
    '@vue/typescript/recommended'
  ],
  rules: {
    'no-console': 'warn',
    'vue/multi-word-component-names': 'off',
    'complexity': ['warn', 10],
    'no-mixed-spaces-and-tabs': 'off',
    '@typescript-eslint/no-unused-expressions': 'off'
  },
  globals: {
    'Enums': 'readonly',
    'CustomEnums': 'readonly',
    'isProduction': 'readonly',
    'defineProps': 'readonly',
    'defineEmits': 'readonly',
    'JitsiMeetExternalAPI': 'readonly'
  }
}