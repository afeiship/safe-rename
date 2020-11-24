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

const { version } = nx.absolutePackage();
const program = new Command();
const replacer = (char) => {
  return [
    [/\(/g, char],
    [/\)/g, char]
  ];
};

program.version(version);

program
  .requiredOption('-p, --pattern <string>', "glob pattern for gobby('*.doc,*.pdf').")
  .option('-c, --char <string>', 'replacement char (default is: _).', '_')
  .option('-s, --strip', 'strip repeat replacement char.', true)
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
    },
    start() {
      const files = globby.sync(this.patts);
      const char = this.options.char;
      files.forEach((file) => {
        const { name, ext } = path.parse(file);
        const sfilename = nx.sanitizeFilename(name, {
          items: replacer(char)
        });
        const processor = this.options.strip ? (val) => nx.trimRepeated(val, char) : nx.stubValue;
        const nname = processor(`${nx.trim(sfilename, char)}${ext}`);
        this.rename(file, nname);
      });
    },
    rename(inOldName, inNewName) {
      if (program.debug) {
        console.log(`[debug]: ${inOldName} -> ${inNewName}`);
      } else {
        fs.renameSync(inOldName, inNewName);
      }
    }
  }
});
