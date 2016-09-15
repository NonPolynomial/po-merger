'use strict';
let path = require('path');
let checkArgument = (args, {name, aliases, type = 'string', required = false} = {}) => {
    if(!name) throw Error('No value defined for "name"!');
    if(!aliases || !aliases.length) throw Error(`No aliases defined for "${name}"!`);
    let aliasError = aliases.reduce((ca, alias) => {
        if(ca !== '') {
            ca = `${ca} / `;
        }
        ca = `${ca}"${alias}"`;
        return ca;
    }, '');
    let argIdx = args.reduce((c, a, i) => {
        if(!!~aliases.indexOf(a)) {
            if(!c) {
                c = `${i}`;
            } else {
                throw Error(`Duplicate entry for argument "${name}"! Please check your arguments (${aliasError}).`);
            }
        }
        return c;
    }, null);
    if(!argIdx) {
        if(required) throw Error(`No entry found for argument "${name}"! Use ${aliasError}!`);
        return undefined;
    }
    switch(type) {
        case 'boolean':
            return true;
        case 'path':
            return path.resolve(args[parseInt(argIdx) + 1]);
        case 'string':
        default:
            return args[parseInt(argIdx) + 1];
    }
};

module.exports = checkArgument;