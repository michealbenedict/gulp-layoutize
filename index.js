'use strict'

var path        = require('path');
var gutil       = require('gulp-util');
var through     = require('through2');
var fs          = require('fs');
var consolidate = require('consolidate');
var extend      = require('node.extend');
var PluginError = gutil.PluginError;

/*
 * gulp-layoutize
 *
 * Inspired by https://github.com/timrwood/gulp-consolidate/blob/master/index.js
 * @param opts.templatePath {String} - Path to template
 * @param opts.template {String} - Template content
 * @param opts.engine {String} - Template engine (Refer to consolidate.js)
 * @param opts.locals {String} - Local variables for templating engine
**/
module.exports = function (opts) {
	opts = opts || {};
	var fn, arg;

	if (!opts.engine) {
		throw new PluginError('gulp-layoutize',  'No template engine supplied');
	}

	if (opts.templatePath) {
		fn = consolidate[opts.engine];
		arg = opts.templatePath;
	} else if (opts.template) {
		fn = consolidate[opts.engine].render;
		arg = opts.template;
	}

	if (!fn) {
	    throw new PluginError('gulp-layoutize',  'No template path or template content supplied');
	}

	function layoutize(file, enc, callback) {
		/*jshint validthis:true*/

		if (file.isNull()) {
			this.push(file);
			return callback();
		}

		if (file.isStream()) {
			this.emit("error",
				new gutil.PluginError("gulp-layoutize", "Stream content is not supported"));
			return callback();
		}

		if (file.isBuffer()) {
			fn(arg, extend(true, {
				content: String(file.contents)
			}, opts.locals),
      		function (err, html) {
		        if (err) new PluginError('gulp-layoutize', 'Error during conversion');
		        file.contents = new Buffer(html);
		        this.push(file);
		        callback();
    		}.bind(this));
		}
	}

	return through.obj(layoutize);
};
