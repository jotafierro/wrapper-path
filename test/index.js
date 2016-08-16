'use strict';

const expect = require('chai').expect;

describe('$Path', () => {
    let wrapperPath = require('../index.js');
    wrapperPath.init({pathRoot: __dirname});
    it('get', () => {
        expect($Path.get(__dirname)).to.equal(__dirname + '/');
    });
    it('include', () => {
        expect($Path.include('/folder1')).to.have.property('keyIndex').to.equal('valueIndex');
        expect($Path.include('/folder1', 'index.js')).to.have.property('keyIndex').to.equal('valueIndex');
        expect($Path.include('/folder1', 'script.js')).to.have.property('keyScript').to.equal('valueScript');
    });
});
