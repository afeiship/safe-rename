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

const { version } = nx.absolutePackage();
const program = new Command();
const exec = require('child_process').execSync;

program.version(version);

program
  .option('-d, --debug', 'only show cmds, but not clean.')
  .parse(process.argv);

nx.declare({
  statics: {
    init() {
      const app = new this();
      app.start();
    }
  },
  methods: {
    init() {},
    start() {
      const files = globby.sync('./*.pdf');
      files.forEach((file) => {
        const newName = nx.sanitizeFilename(file, {
          items: [
            [/\(/g, '_'],
            [/\)/g, '_']
          ]
        });

        //fs.readFileSync(file, newName);
        console.log(`[debug]: ${newName}`);
      });
    }
  }
});
