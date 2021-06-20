#!/usr/bin/env node
const { Command } = require('commander');
const chalk = require('chalk');
const globby = require('globby');
const fs = require('fs');
const path = require('path');

// next packages:
require('@jswork/next');
require('@jswork/next-absolute-package');
require('@jswork/next-sanitize-filename');
require('@jswork/next-trim');
require('@jswork/next-path-parse');
require('@jswork/next-trim-repeated');
require('@jswork/next-compose');
require('@jswork/next-date');
require('@jswork/next-kebab-case');
require('@jswork/next-camelize');
require('@jswork/next-classify');
require('@jswork/next-underscored');

const { version } = nx.absolutePackage();
const program = new Command();
const replacer = (char) => {
  return [
    [/\s/g, char],
    [/\(/g, char],
    [/\)/g, char]
  ];
};

program.version(version);

program
  .requiredOption('-p, --pattern <string>', "glob pattern for gobby('*.doc,*.pdf').")
  .option('-c, --char <string>', 'replacement char (default is: _).', '_')
  .option('-s, --strip', 'strip repeat replacement char.', true)
  .option('-f, --filters <list>', 'Process filename one by one.', (str) => str.split(','))
  .option('-d, --debug', 'only show cmds, but not clean.')
  .parse(process.argv);

nx.declare({
  statics: {
    init() {
      const app = new this();
      app.start();
    }
  },
  properties: {
    patts() {
      return this.options.pattern.split(',');
    }
  },
  methods: {
    init() {
      this.options = program.opts();
      this.composeFilter = nx.compose.apply(
        null,
        this.options.filters.map((item) => require(`./filters/${item}`))
      );
    },
    start() {
      const files = globby.sync(this.patts, { onlyFiles: false });
      const char = this.options.char;
      this.options.debug && console.log(files);
      files.forEach((file, index) => {
        const { name, ext } = path.parse(file);
        const sfilename = nx.sanitizeFilename(name, {
          items: replacer(char)
        });
        const processor = this.options.strip ? (val) => nx.trimRepeated(val, char) : nx.stubValue;
        const nname = processor(`${nx.trim(sfilename, char)}${ext}`);
        const fname = this.composeFilter({ str: nname, index }).str;
        this.rename(file, fname);
      });
    },
    rename(inOldName, inNewName) {
      if (this.options.debug) {
        console.log(`[debug]: ${inOldName} -> ${inNewName}`);
      } else {
        fs.renameSync(inOldName, inNewName);
      }
    }
  }
});
