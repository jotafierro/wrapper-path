'use strict';

const path = {
        resolve: require('path').resolve,
    },
    fs = {
        readdirSync: require('fs').readdirSync,
        rmdirSync: require('fs').rmdirSync,
        statSync: require('fs').statSync,
        unlinkSync: require('fs').unlinkSync,
    };

class Path {

    constructor(pathRoot) {
        if (!pathRoot || typeof pathRoot !== 'string') throw new Error('Param must be "string"');
        this.pathRoot = path.resolve(pathRoot);
    }

    _get(dir) {
        if (!dir || typeof dir !== 'string') throw new Error('Param must be "string"');
        if (dir.charAt(0) !== '/') throw new Error('Invalid path');
        if (!dir.startsWith(this.pathRoot)) return `${this.pathRoot}${dir}`;
        return dir;
    }

    _isDirectory(dir) {
        try {
            return fs.statSync(dir).isDirectory();
        } catch (e) {
            throw new Error('No such file or directory');
        }
    }

    _getFiles(dir) {
        try {
            return fs.readdirSync(dir);
        } catch (e) {
            throw new Error('Not a directory');
        }
    }

    get(dir) {
        dir = this._get(dir);
        if (this._isDirectory(dir) && dir.charAt(dir.length - 1) !== '/')
            return `${dir}/`;
        return dir;
    }

    require(path) {
        return require(this.get(path));
    }

    get recursive() {
        const self = this;
        return {
            files: function recursiveFiles(dir, opts, filelist, currentDepth = 0) {
                const {match, exclude, maxDepth = -1} = opts || {};
                if (maxDepth !== -1 && currentDepth === maxDepth)
                    return filelist;
                dir = self.get(dir);
                filelist = filelist || [];
                const files = self._getFiles(dir);
                for (let i = files.length - 1; i >= 0; i--) {
                    let file = files[i];
                    if (self._isDirectory(`${dir}${file}`))
                        recursiveFiles(`${dir}${file}`, opts, filelist, currentDepth + 1);
                    else {
                        let flag = true;
                        flag &= (match) ? match.test(`${dir}${file}`) : flag;
                        flag &= (exclude) ? !exclude.test(`${dir}${file}`) : flag;
                        if (flag)
                            filelist.push(`${dir}${file}`);
                    }
                }
                return filelist;
            },
            folders: function recursiveFolders(dir, opts, folderlist, currentDepth = 0) {
                const {match, exclude, maxDepth = 0} = opts || {};
                if (maxDepth > 0 && currentDepth === maxDepth)
                    return folderlist;
                dir = self.get(dir);
                folderlist = folderlist || [];
                const files = self._getFiles(dir);
                for (let i = files.length - 1; i >= 0; i--) {
                    const file = files[i];
                    if (self._isDirectory(`${dir}${file}`)) {
                        let flag = true;
                        flag &= (match) ? match.test(`${dir}${file}`) : flag;
                        flag &= (exclude) ? !exclude.test(`${dir}${file}`) : flag;
                        if (flag)
                            folderlist.push(`${dir}${file}`);
                        return recursiveFolders(`${dir}${file}`, opts, folderlist, currentDepth + 1);
                    }
                }
                return folderlist;
            },
        };
    }

    get remove() {
        const self = this,
            file = (dir) => fs.unlinkSync(self.get(dir)),
            files = (dir, opts) => self.recursive.files(dir, opts).forEach(file),
            folder = (dir) => {
                try {
                    fs.rmdirSync(self.get(dir));
                } catch (e) {
                    if (/ENOTEMPTY/g.test(e)) {
                        const files = self.recursive.files(dir);
                        for (let i = files.length - 1; i >= 0; i--) {
                            const file = files[i];
                            fs.unlinkSync(self.get(file));
                        }
                        const folders = self.recursive.folders(dir);
                        for (let i = folders.length - 1; i >= 0; i--) {
                            const folder = folders[i];
                            fs.rmdirSync(self.get(folder));
                        }
                        fs.rmdirSync(self.get(dir));
                    } else throw e;
                }
            },
            folders = (dir, opts) => self.recursive.folders(dir, opts).forEach(folder);
        return {file, files, folder, folders};
    }

}

module.exports = Path;