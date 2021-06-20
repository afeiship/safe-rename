# safe-rename
> Rename file or dictionary use cli.

[![version][version-image]][version-url]
[![license][license-image]][license-url]
[![size][size-image]][size-url]
[![download][download-image]][download-url]

![snapshot](https://tva1.sinaimg.cn/large/008i3skNgy1grp3gf61wqj30v80f843g.jpg)

## installation
```shell
npm install @jswork/safe-rename
```

## usage
~~~
Usage: safe-rename [options]

Options:
  -V, --version           output the version number
  -p, --pattern <string>  glob pattern for gobby('*.doc,*.pdf').
  -c, --char <string>     replacement char (default is: _). (default: "_")
  -s, --strip             strip repeat replacement char. (default: true)
  -d, --debug             only show cmds, but not clean.
  -h, --help              display help for command
~~~

## filters
| name        | description                                      |
| ----------- | ------------------------------------------------ |
| camelize    | Camelize filename. (abcCase.jpg)                 |
| classify    | Classify filename. (AbcCase.jpg)                 |
| date        | Add date filename. (2021-06-20_filename.jpg)     |
| idx         | Add 001_ prefix for filename. (001_filename.jpg) |
| kebab       | Kebab case filename(abc-des.jpg).                |
| lower       | Lower case filename(abc-des.jpg).                |
| pinyin      | Transform pinyin.                                |
| underscored | Underscored pinyin(abc_des.png).                 |
| upper       | Upper case filename(ABC_DES.png).                |

## license
Code released under [the MIT license](https://github.com/afeiship/safe-rename/blob/master/LICENSE.txt).

[version-image]: https://img.shields.io/npm/v/@jswork/safe-rename
[version-url]: https://npmjs.org/package/@jswork/safe-rename

[license-image]: https://img.shields.io/npm/l/@jswork/safe-rename
[license-url]: https://github.com/afeiship/safe-rename/blob/master/LICENSE.txt

[size-image]: https://img.shields.io/bundlephobia/minzip/@jswork/safe-rename
[size-url]: https://github.com/afeiship/safe-rename/blob/master/dist/safe-rename.min.js

[download-image]: https://img.shields.io/npm/dm/@jswork/safe-rename
[download-url]: https://www.npmjs.com/package/@jswork/safe-rename
