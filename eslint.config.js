const antfu = require('@antfu/eslint-config').default

module.exports = antfu({
  typescript: true,
  vue: false,
  ignores: ['**/*.md', '**/*.md/*.*', 'dist/', 'public/', '**/dist/**/', 'node_modules', '**/node_modules/**', 'node_modules/', '**/node_modules/**/', 'patches/', '**/patches/**/', 'types/', '**/types/**/', 'cache/', '**/cache/**/', '!packages/.vitepress', '!packages/.vitepress/**', '!.eslintrc.js', '!.eslintrc.js/**', '!rollup.config.js', '!rollup.config.js/**', '!.test', '!**/.test/**', '.temp', '**/.temp/**'],
}, {
  rules: {
    'spaced-comment': ['error', 'always', { exceptions: ['#__PURE__'] }],
    'no-restricted-imports': [
      'error',
      {
        patterns: ['../**/core', '../**/vue3'],
      },
    ],
    'node/no-callback-literal': 'off',
    'import/namespace': 'off',
    'eqeqeq': 'off',
    'import/default': 'off',
    'dot-notation': 'off',
    'ts/consistent-type-imports': 'off',
    'import/no-named-as-default': 'off',
    'no-console': 'off',
    'import/no-named-as-default-member': 'off',
    'curly': ['error', 'multi-line'],
    'style/max-statements-per-line': ['error', {
      max: 2,
    }],
  },
}, {
  files: ['demo.vue', 'demo.client.vue', 'scripts/*.ts', '**/**/*.test.ts', '**/*.spec.ts'],
  rules: {
    'no-alert': 'off',
    'no-console': 'off',
    'no-undef': 'off',
    'no-unused-vars': 'off',
    'no-restricted-imports': 'off',
    '@typescript-eslint/no-unused-vars': 'off',
    '@typescript-eslint/no-redeclare': 'off',
    'unused-imports/no-unused-vars': 'off',
  },
})
