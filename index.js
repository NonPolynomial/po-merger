#!/usr/bin/env node
'use strict';
let fs = require('fs');
let path = require('path');
let checkArgument = require('./src/check_argument.js');
let readMergeWrite = require('./src/read_merge_write.js');

let args = Array.prototype.slice.call(process.argv,2);

let config = checkArgument(args, {
    name: 'config',
    aliases: ['--config','-c'],
    type: 'path'
});

if(!config) {
    let src = checkArgument(args, {
        name: 'source',
        aliases: ['--source', '-s'],
        required: true,
        type: 'path'
    });
    let merge = checkArgument(args, {
        name: 'merge',
        aliases: ['--merge', '-m'],
        required: true,
        type: 'path'
    });
    let target = checkArgument(args, {
        name: 'target',
        aliases: ['--target', '-t'],
        type: 'path'
    });
    let print = checkArgument(args, {
        name: 'print',
        aliases: ['--print','-p'],
        type: 'boolean'
    });


    let overwrite = checkArgument(args, {
        name: 'overwrite',
        aliases: ['--overwrite','-o'],
        type: 'boolean'
    });

    readMergeWrite({
        src,
        merge,
        target,
        print,
        overwrite
    });
} else {
    let configPath = path.dirname(config);
    config = require(config);
    config.entries.reduce((c,e,i) => {
        e.src = path.join(configPath, e.src);
        e.merge = path.join(configPath, e.merge);
        e.target = !e.target ? e.target : path.join(configPath, e.target);
        e.overwrite = !!e.overwrite;
        readMergeWrite(e);
    },null);
}
