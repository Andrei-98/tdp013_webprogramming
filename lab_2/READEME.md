1. in terminal type: npm install

2. in tdp013/lab_2/node_modules/whatwg-url/dist/encoding.js 
delete everything in encode.js and replace it with the following:


"use strict";
const util = require('util');
const utf8Encoder = new util.TextEncoder('utf-8');
const utf8Decoder = new util.TextDecoder("utf-8", { ignoreBOM: true });

function utf8Encode(string) {
  return utf8Encoder.encode(string);
}

function utf8DecodeWithoutBOM(bytes) {
  return utf8Decoder.decode(bytes);
}

module.exports = {
  utf8Encode,
  utf8DecodeWithoutBOM
};


3. install mongodb

4. in  terminal type: npm test
The test file creates an instace of mongodb that will be closed 
after all the tests are run.
