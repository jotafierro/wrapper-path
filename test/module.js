'use strict';

var module = require('./index');

// var JFPath = module.init({pathRoot: __dirname, prefix: 'JF', inGlobal: false});
module.init({pathRoot: __dirname + '/../', prefix: 'JF'});

// console.log(JFPath);

console.log('eeee: ',JFPath.include('/', 'eeee.js'));
console.log('aaaa: ',JFPath.get('/aaaa', 'index.js'));



// @n: debe poder iniciarse con opciones pasandole el pathRoot, prefix (default: $), inGlobal (default: true)
// @n: utilizar eslint
