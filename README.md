# gulp-layoutize
[![NPM version][npm-image]][npm-url] [![Build Status][travis-image]][travis-url] [![Dependency Status][depstat-image]][depstat-url]

> Render contents of input files through a templating engine (powered by consolidate.js)

## Usage

First, install `gulp-layoutize` as a development dependency:

```shell
npm install --save-dev gulp-layoutize
```

Then, add it to your `gulpfile.js`:

```javascript
var layoutize = require("gulp-layoutize");

gulp.src("./src/*.ext")
	.pipe(layoutize({
		templatePath: 'path/to/template',
    engine: 'templatingEngine',
    locals: {}
	}))
	.pipe(gulp.dest("./dist"));
```

## API

### layoutize(options)

Either define `options.templatePath` or `options.template`. If both are given, `options.templatePath` is used.

#### options.templatePath
Type: `String`
Default: `undefined`
Required: `true`

Path to template.

#### options.template
Type: `String`
Default: `undefined`
Required: `true`

Template content.

#### options.engine
Type: `String`
Default: `undefined`
Required: `true`

Provide the templating engine name as supported by `consolidate.js`.

#### options.locals
Type: `Object`
Default: `{}`
Required: `true`

The locals object is passed as template variables to the templating engine. Refer to the templating engine guides on how to use variables in the template.
Also, you have some predefined locals, refering to the current file:

* content (String): content of the current file
* file (Object): [vinyl](https://github.com/wearefractal/vinyl#file) file object with filename, path, etc.


## License

[MIT License](http://en.wikipedia.org/wiki/MIT_License)

[npm-url]: https://npmjs.org/package/gulp-layoutize
[npm-image]: https://badge.fury.io/js/gulp-layoutize.png

[travis-url]: http://travis-ci.org/rowoot/gulp-layoutize
[travis-image]: https://secure.travis-ci.org/rowoot/gulp-layoutize.png?branch=master

[coveralls-url]: https://coveralls.io/r/rowoot/gulp-layoutize
[coveralls-image]: https://coveralls.io/repos/rowoot/gulp-layoutize/badge.png

[depstat-url]: https://david-dm.org/rowoot/gulp-layoutize
[depstat-image]: https://david-dm.org/rowoot/gulp-layoutize.png
