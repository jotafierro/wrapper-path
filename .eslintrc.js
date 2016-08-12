/* --ignore-pattern */

'use strict';

module.exports = {
    'env': {'es6': true, 'node': true, 'mongo': true},
    'extends': 'eslint:recommended',
    'parserOptions': {'sourceType': 'module'},
    'globals': {'JFPath': true},
    'rules': {
        'indent': ['error', 4], 'linebreak-style': ['error', 'unix'],
        'quotes': ['error', 'single'], 'semi': ['error', 'always'],
        'comma-dangle': ['error', 'always-multiline']
    }
};
