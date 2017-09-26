'use strict';

const Benchmark = require('benchmark'),
    a = 'hola mundo',
    b = 'hola',
    c = new RegExp('hola');

/* eslint-disable no-console, no-unused-vars */
// add tests
(new Benchmark.Suite)
    .add('startsWith', () => a.startsWith(b))
    .add('RegExp', () => c.test(a))
    // add listeners
    .on('cycle', (event) => {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({ 'async': true });
