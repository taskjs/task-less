'use strict';

var assert = require('assert');
var path = require('path');
var fs = require('fs');
var Less = require('../lib/less');

function errorHandler(err){
    process.nextTick(function rethrow() { throw err; });
}

var filepath = path.join(__dirname, 'fixtures/foo.less');

(new Less).run(
    [{
        contents: fs.readFileSync(filepath),
        path: filepath
    }], // inputs
    {
        paths: path.dirname(filepath)
    }, // options
    console // logger
).then(function(inputs){
    var expected = fs.readFileSync(path.join(__dirname, 'expected/foo.css'));
    assert.equal(inputs[0].contents.toString(), expected.toString())

}).catch(errorHandler)
