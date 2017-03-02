'use strict';

const expect = require('chai').expect;

describe('$Path', () => {
    let wrapperPath = require('../index.js'),
        path = wrapperPath.init({pathRoot: __dirname});
    it('get', () => {
        expect(path.get('/')).to.equal(`${__dirname}/`);
        expect(path.get('/folder1')).to.equal(`${__dirname}/folder1/`);
        expect(path.get('/folder1/index.js')).to.equal(`${__dirname}/folder1/index.js`);
    });
    it('include', () => {
        expect(path.include('/folder1')).to.have.property('keyIndex').to.equal('valueIndex');
        expect(path.include('/folder1', 'index.js')).to.have.property('keyIndex').to.equal('valueIndex');
        expect(path.include('/folder1/index.js')).to.have.property('keyIndex').to.equal('valueIndex');
        expect(path.include('/folder1', 'script.js')).to.have.property('keyScript').to.equal('valueScript');
        expect(path.include('/folder1/script.js')).to.have.property('keyScript').to.equal('valueScript');

        expect(path.require('/folder1')).to.have.property('keyIndex').to.equal('valueIndex');
        expect(path.require('/folder1', 'index.js')).to.have.property('keyIndex').to.equal('valueIndex');
        expect(path.require('/folder1/index.js')).to.have.property('keyIndex').to.equal('valueIndex');
        expect(path.require('/folder1', 'script.js')).to.have.property('keyScript').to.equal('valueScript');
        expect(path.require('/folder1/script.js')).to.have.property('keyScript').to.equal('valueScript');
    });
});
