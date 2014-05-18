'use strict';

var assert    = require('assert');
var gutil     = require('gulp-util');
var layoutize = require('./index');
var fs 		  = require('fs');

it('should render template when using templatePath', function (cb) {
	var stream = layoutize({
		templatePath: './fixtures/template.jade',
		engine  : 'jade',
		locals: {
			pageTitle: "Title"
		}
	});

	stream.on('data', function (file) {
		assert.equal('<!DOCTYPE html><html lang="en"><head><title>Title</title></head><body><h1>Test</h1></body></html>', file.contents.toString());
		cb();
	});

	stream.write(new gutil.File({
		path: 'file.html',
		contents: new Buffer('<h1>Test</h1>')
	}));
});

it('should render template when using template (content)', function (cb) {
	var stream = layoutize({
		template: fs.readFileSync('./fixtures/template.jade', 'utf8'),
		engine  : 'jade',
		locals: {
			pageTitle: "Title"
		}
	});

	stream.on('data', function (file) {
		assert.equal('<!DOCTYPE html><html lang="en"><head><title>Title</title></head><body><h1>Test</h1></body></html>', file.contents.toString());
		cb();
	});

	stream.write(new gutil.File({
		path: 'file.html',
		contents: new Buffer('<h1>Test</h1>')
	}));
});
