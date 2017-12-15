'use strict';

const expect = require('chai').expect;

describe('Path', () => {
    const fs = require('fs'),
        Path = require('../Path.js'),
        path = new Path(__dirname),
        folder = `${__dirname}/folder`,
        innerFolder = `${__dirname}/folder/folder`,
        folderIndex = `${folder}/index.js`,
        folderScript = `${folder}/script.js`,
        folderFoo = `${folder}/foobar.js`;

    before((done) => {
        if (!fs.existsSync(folder)) {
            fs.mkdirSync(folder);
            fs.mkdirSync(innerFolder);
            fs.writeFileSync(
                folderIndex,
                '\'use strict\';\n\nmodule.exports = {\'keyIndex\': \'valueIndex\'};',
                'utf8'
            );
            fs.writeFileSync(
                folderScript,
                '\'use strict\';\n\nmodule.exports = {\'keyScript\': \'valueScript\'};',
                'utf8'
            );
            fs.writeFileSync(
                folderFoo,
                '\'use strict\';\n\nmodule.exports = {\'foo\': \'bar\'};',
                'utf8'
            );
        }
        done();
    });

    it('success: get', () => {
        expect(path.get('/')).to.equal(`${__dirname}/`);
        expect(path.get('/folder')).to.equal(`${folder}/`);
        expect(path.get('/folder/index.js')).to.equal(folderIndex);
    });
    it('catch: get', () => {
        expect(() => path.get()).to.throw('Param must be "string"');
        expect(() => path.get({})).to.throw('Param must be "string"');
        expect(() => path.get([])).to.throw('Param must be "string"');
        expect(() => path.get(true)).to.throw('Param must be "string"');

        expect(() => path.get('bar')).to.throw('Invalid path');
        expect(() => path.get('foo/bar')).to.throw('Invalid path');

        expect(() => path.get('/bar')).to.throw('No such file or directory');
        expect(() => path.get('/folder/foo.js')).to.throw('No such file or directory');
    });
    it('success: require', () => {
        expect(path.require('/folder')).to.have.property('keyIndex').to.equal('valueIndex');
        expect(path.require('/folder/index.js')).to.have.property('keyIndex').to.equal('valueIndex');
        expect(path.require('/folder/script.js')).to.have.property('keyScript').to.equal('valueScript');
    });
    it('catch: require', () => {
        expect(() => path.require()).to.throw('Param must be "string"');
        expect(() => path.require({})).to.throw('Param must be "string"');
        expect(() => path.require([])).to.throw('Param must be "string"');
        expect(() => path.require(true)).to.throw('Param must be "string"');

        expect(() => path.require('bar')).to.throw('Invalid path');
        expect(() => path.require('foo/bar')).to.throw('Invalid path');

        expect(() => path.require('/bar')).to.throw('No such file or directory');
        expect(() => path.require('/folder/foo.js')).to.throw('No such file or directory');
    });
    it('success: recursive.files', () => {
        expect(path.recursive.files('/', {match: /.+test\/index.js/g})).to.be.length(1);
        expect(path.recursive.files('/', {exclude: /.+test\/index.js/g})).to.be.length(4);
        expect(path.recursive.files('/', {maxDepth: 1})).to.be.length(1);
        let files = path.recursive.files('/');
        expect(files).to.be.length(5);
        expect(files.indexOf(`${__dirname}/index.js`) != -1).to.be.true;
        expect(files.indexOf(`${__dirname}/folder/index.js`) != -1).to.be.true;
        expect(files.indexOf(`${__dirname}/folder/script.js`) != -1).to.be.true;
    });
    it('catch: recursive.files', () => {
        expect(() => path.recursive.files()).to.throw('Param must be "string"');
        expect(() => path.recursive.files({})).to.throw('Param must be "string"');
        expect(() => path.recursive.files([])).to.throw('Param must be "string"');
        expect(() => path.recursive.files(true)).to.throw('Param must be "string"');

        expect(() => path.recursive.files('bar')).to.throw('Invalid path');
        expect(() => path.recursive.files('foo/bar')).to.throw('Invalid path');

        expect(() => path.recursive.files('/bar')).to.throw('No such file or directory');
        expect(() => path.recursive.files('/folder/foo.js')).to.throw('No such file or directory');
    });
    it('success: recursive.folders', () => {
        expect(path.recursive.folders('/', {match: /.+test\/folder$/g})).to.be.length(1);
        expect(path.recursive.folders('/', {exclude: /.+test\/folder/g})).to.be.length(1);
        expect(path.recursive.folders('/', {maxDepth: 1})).to.be.length(1);
        let folders = path.recursive.folders('/');
        expect(folders).to.be.length(2);
        expect(folders.indexOf(`${__dirname}/folder`) != -1).to.be.true;
    });
    it('catch: recursive.folders', () => {
        expect(() => path.recursive.folders()).to.throw('Param must be "string"');
        expect(() => path.recursive.folders({})).to.throw('Param must be "string"');
        expect(() => path.recursive.folders([])).to.throw('Param must be "string"');
        expect(() => path.recursive.folders(true)).to.throw('Param must be "string"');

        expect(() => path.recursive.folders('bar')).to.throw('Invalid path');
        expect(() => path.recursive.folders('foo/bar')).to.throw('Invalid path');

        expect(() => path.recursive.folders('/bar')).to.throw('No such file or directory');
        expect(() => path.recursive.folders('/folder/foo.js')).to.throw('No such file or directory');
    });
    it('success: remove.file', () => {
        path.remove.file('/folder/index.js');
        expect(fs.existsSync(folderIndex)).to.be.false;
    });
    it('catch: remove.files', () => {
        expect(() => path.remove.files()).to.throw('Param must be "string"');
    });
    it('success: remove.folder', () => {
        path.remove.folder('/folder');
        expect(fs.existsSync(folder)).to.be.false;
    });
    it('catch: remove.folders', () => {
        expect(() => path.remove.folders()).to.throw('Param must be "string"');
    });
});
