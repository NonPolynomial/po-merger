# po Merger

[![node](https://img.shields.io/badge/node-6.3.0-green.svg)](https://www.nodejs.org/)
[![npm](https://img.shields.io/badge/npm-3.10.5-green.svg)](http://www.npmjs.com/)
[![license.mit](https://img.shields.io/badge/license-MIT-blue.svg)](https://tldrlegal.com/license/mit-license)

Node package for merging .po-files

## How to use

```bash
poMerge <args>
```

### Arguments

```
source       --source , -s       file should be merged

merge        --merge , -m        file should be added

target       --target , -t       save the merge result

print        --print , -p        prints the merge result in console

overwrite    --overwrite , -o    overwrite confilting keys with values from merge file

config       --config , -c       defines a config file
                                 if given, other arguments become ignored

```

## Configuration file

The config file can be named with any name. Just use `poMerge -c <file>`.

```json
{
    "entries": [
        {
            "src": "./a.po",
            "merge": "./b.po",
            "target": "./m.po",
            "print": true,
            "overwrite": true
        },
        {
            "src": "./b.po",
            "merge": "./a.po",
            "target": false,
            "print": true,
            "overwrite": false
        }
    ]
}
```

All file paths are relative to config file.

## License

The MIT License (MIT)

Copyright (c) 2016 Sascha "NonPolynomial" Metz

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.