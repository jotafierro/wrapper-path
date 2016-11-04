'use strict';

var _ = {
        isUndefined: require('lodash').isUndefined,
        isString: require('lodash').isString,
        isBoolean: require('lodash').isBoolean,
        isPlainObject: require('lodash').isPlainObject,
        isNull: require('lodash').isNull,
    },
    pathResolve = require('path').resolve,
    functions = (pathRoot) => {
        let get = (path, file) => {
            let pathComplete = '';
            if ((_.isUndefined(path)) || (!_.isUndefined(path) && !_.isString(path))) return null;
            if (path.substring(0, pathRoot.length) != pathRoot) pathComplete += pathRoot;
            pathComplete += path;
            if (pathComplete.slice(-1) != '/') {
                pathComplete = pathResolve(pathComplete);
                pathComplete += '/';
            }
            if (!_.isUndefined(file) && !_.isString(file)) return null;
            if (!_.isUndefined(file)) pathComplete += file;
            return pathComplete;
        };
        pathRoot = pathResolve(pathRoot);
        return {
            include: (path, file) => {
                let pathComplete = get(path, file);
                if (_.isNull(pathComplete)) return;
                return require(pathComplete);
            },
            get: get,
        };
    };

module.exports.init = (opts) => {
    if (_.isUndefined(opts) || !_.isPlainObject(opts)) return;
    if (!_.isString(opts.pathRoot)) return;
    if (!_.isUndefined(opts.prefix) && !_.isString(opts.prefix)) return;
    if ((_.isUndefined(opts.inGlobal)) || (!_.isUndefined(opts.inGlobal) && !_.isBoolean(opts.inGlobal)))
        opts.inGlobal = true;
    if (_.isUndefined(opts.prefix)) opts.prefix = '$';

    if (opts.inGlobal) global[opts.prefix + 'Path'] = functions(opts.pathRoot);
    else return functions(opts.pathRoot);
};
