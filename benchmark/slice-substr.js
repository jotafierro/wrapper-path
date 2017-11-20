'use strict';

const Benchmark = require('benchmark'),
    a = 'hola mundo',
    b = 'hola mundo',
    lastPositionInPath = a.length - 1;

/* eslint-disable no-console, no-unused-vars */
// add tests
(new Benchmark.Suite)
    .add('slice', () => a.slice(0, lastPositionInPath))
    .add('substr', () => b.substr(0, lastPositionInPath))
    // add listeners
    .on('cycle', (event) => {
        console.log(String(event.target));
    })
    .on('complete', function() {
        console.log('Fastest is ' + this.filter('fastest').map('name'));
    })
    // run async
    .run({ 'async': true });
