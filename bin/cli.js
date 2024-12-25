#!/usr/bin/env node

import fs from 'fs';
import arg from 'arg';
import stringify from "json-stringify-pretty-compact";

const { _, ...options } = arg({
    '--help': Boolean,
    '--indent': Number,
    '--max-length': Number,
});

// Display help
if(_[0] === 'help' || options['--help']) {
    console.log(`\
Format a file with https://github.com/lydell/json-stringify-pretty-compact

Usage:

json-spc [--indent=<spaces>] [--max-length=<characters>] [<file.json>] [> newfile.json]

If no file is specified, reads from stdin.

Options:

--indent: Defaults to 2. Works exactly like the third parameter of JSON.stringify.
--max-length: Defaults to 80. Lines will be tried to be kept at maximum this many characters long.
    `);
    process.exit(0);
}

// Convert command line options to function arguments
const opts = {};
const optMap = {
    "--indent": `indent`,
    "--max-length": `maxLength`,
}
for (const [key, value] of Object.entries(options)) {
    const newKey = optMap[key];
    if (newKey) {
        opts[newKey] = value;
    }
}

/** @type {string} The input text (either from a file or stdin) */
let text;
const filePath = _[0];
if (filePath) {
    text = fs.readFileSync(filePath, 'utf-8');
} else {
    text = fs.readFileSync(0, 'utf-8')
}

// Parse JSON
let json;
try {
    json = JSON.parse(text);
} catch (e) {
    console.error(`Error parsing JSON!`, e);
    process.exit(2);
}

// Format and output
console.log(stringify(json, opts));
