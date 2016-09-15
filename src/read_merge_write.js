'use strict';
let fs = require('fs');
let path = require('path');
let readMergeWrite = ({src, merge, target, print = false, overwrite = false}) => {
    let translations = {
        keys: [],
        values: [],
        merged: []
    };

    fs.readFile(src, 'UTF-8', (err, data) => {
        if(err) throw Error(err);
        data.replace(/\r\n/g,'\n').split('\n').filter((line) => line !== '').reduce((c,line,ln) => {
            let match = /^(msgid|msgstr) "(.*)"$/g.exec(line);
            if(match) {
                switch(match[1]) {
                    case 'msgid':
                        translations.keys.push(match[2]);
                        break;
                    case 'msgstr':
                        translations.values.push(match[2]);
                        break;
                }
            }
        }, translations);
        fs.readFile(merge, 'UTF-8', (errM, dataM) => {
            if(errM) throw Error(errM);
            dataM.replace(/(\r|\n)+/g,'\n').split('\n').filter((line) => line !== '').reduce((c,line,ln) => {
                let match = /^(msgid|msgstr) "(.*)"$/g.exec(line);
                if(match) {
                    switch(match[1]) {
                        case 'msgid':
                            if(!~translations.keys.indexOf(match[2])) {
                                translations.keys.push(match[2]);
                            } else if(overwrite) {
                                let rmIdx = translations.keys.indexOf(match[2]);
                                translations.keys.splice(rmIdx,1);
                                translations.values.splice(rmIdx,1);
                                translations.keys.push(match[2]);
                            }
                            break;
                        case 'msgstr':
                            if(translations.keys.length > translations.values.length) {
                                translations.values.push(match[2]);
                            }
                            break;
                    }
                    return c;
                }
            }, translations);

            // Result
            translations.keys.reduce((c,k,i) => {
                c.push({
                    key: k,
                    value: translations.values[i]
                });
                return c;
            },translations.merged);
            translations.merged.sort((a,b) => a.key > b.key);
            let result = translations.merged.reduce((c,{key,value}) => `${c}msgid "${key}"
msgstr "${value}"

`,'');

            if(print) {
                console.log(`Merged result of ${src} and ${merge}:

${result}`);
            }

            if(target) {
                let tPath = path.dirname(target);
                fs.stat(tPath, (errS, data) => {
                    if(errS) {
                        target = path.resolve(path.normalize(`${path.dirname(src)}/${path.basename(target)}`));
                        console.log(`Target directory "${tPath}" not found!
The result will be written to ${target}.`);
                    }
                    fs.writeFile(target, result, (errW) => {
                        if(errW) throw Error(errW);
                    });
                });
            }
        });
    });
};

module.exports = readMergeWrite;