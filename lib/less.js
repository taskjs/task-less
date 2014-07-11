var Execution = require('execution');
var Promise = require('es6-promise').Promise;
var Record = require('record');

module.exports = Execution.extend({
    // The type of option could be HTML5 input types: file, directory, number, range, select,
    // url, email, tel, color, date, time, month, time, week, datetime(datetime-local),
    // string(text), boolean(checkbox), array, regexp, function and object.
    options: {
        paths: {
            label: 'Input directory',
            type: 'directory',
            placeholder: 'Directory of input file'
        }
    },
    run: function (inputs, options, logger, settings) {
        return this._run(inputs, options, logger, settings);
    },
    execute: function (resolve, reject) {
        var options = this.options;
        var inputs = this.inputs;
        var logger = this.logger;

        var less = require('less');

        var promises = inputs.map(function(record){
            return new Promise(function(resolve, reject){

                var source = record.contents.toString();
                less.render(source, options, function (err, css) {
                    if (err) {
                        reject(err);
                    } else {
                        resolve(new Record({
                            path: record.path.replace(/\.(less)$/, '.css'),
                            contents: css
                        }));
                    }
                });
            });

        });

        return Promise.all(promises).then(resolve, reject);
    }
})
