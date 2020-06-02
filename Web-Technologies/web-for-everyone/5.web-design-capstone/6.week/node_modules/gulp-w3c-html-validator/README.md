# gulp-w3c-html-validator
<img src=https://centerkey.com/graphics/center-key-logo.svg align=right width=200 alt=logo>

_Gulp plugin to validate HTML using the W3C Markup Validation Service_

[![License:MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://github.com/center-key/gulp-w3c-html-validator/blob/master/LICENSE.txt)
[![npm](https://img.shields.io/npm/v/gulp-w3c-html-validator.svg)](https://www.npmjs.com/package/gulp-w3c-html-validator)
[![Dependencies](https://david-dm.org/center-key/gulp-w3c-html-validator/status.svg)](https://david-dm.org/center-key/gulp-w3c-html-validator)
[![Vulnerabilities](https://snyk.io/test/github/center-key/gulp-w3c-html-validator/badge.svg)](https://snyk.io/test/github/center-key/gulp-w3c-html-validator)
[![Build](https://travis-ci.org/center-key/gulp-w3c-html-validator.svg)](https://travis-ci.org/center-key/gulp-w3c-html-validator)

This Gulp plugin is a wrapper for [w3cjs](https://github.com/thomasdavis/w3cjs) (_"A node.js library for testing files or URLs against the W3C HTML validator."_)

## 1) Setup
Install module into your project:
```shell
$ npm install --save-dev gulp-w3c-html-validator
```

## 2) Define task
Create a task in your **gulpfile.js**:
```javascript
// Imports
const gulp =          require('gulp');
const htmlValidator = require('gulp-w3c-html-validator');

// Tasks
const task = {
   validateHtml() {
      return gulp.src('target/**/*.html')
         .pipe(htmlValidator())
         .pipe(htmlValidator.reporter());
      },
   };

// Gulp
gulp.task('validate-html', task.validateHtml);
```

## 3) Custom Reporting
The results are also added onto each file object under `w3cjs`, containing `success` (boolean)
and `messages` (Array).

### Example usage
```javascript
// Import
const htmlValidator = require('gulp-w3c-html-validator');
const through2 =      require('through2');

// Tasks
const task = {
   validateHtml() {
      const handleFile = (file, encoding, callback) => {
         callback(null, file);
         if (!file.w3cjs.success)
            throw Error('HTML validation error(s) found');
         };
      return gulp.src('target/**/*.html')
         .pipe(htmlValidator())
         .pipe(through2.obj(handleFile));  //custom reporter
      },
   };

// Gulp
gulp.task('validate-html', task.validateHtml);
```

### Example output
```shell
HTML Error: index.html Line 5, Column 19: Element title must not be empty.
   <title></title>
.../gulpfile.js:11
         throw Error('HTML validation error(s) found');
               ^
Error: HTML validation error(s) found
```

## 4) Options
| Option            | Type       | Description                                                                                                 | Default |
| ----------------- | ---------- | ----------------------------------------------------------------------------------------------------------- | ------- |
| **proxy**         | `string`   | HTTP address of the proxy server if you are running behind a firewall, e.g. `'http://proxy:8080'`           | `null` |
| **skipWarnings**  | `boolean`  | Do not output informational warning messages (suppress `type: 'info'`).                                     | `false` |
| **url**           | `string`   | URL to the W3C validator.  Use if you want to use a local validator.                                        | see:&nbsp;[w3cjs](https://github.com/thomasdavis/w3cjs) |
| **verifyMessage** | `function` | Function to determine if a warning or error should be allowed.  Return `true` to allow and `false` to skip. | null |

Example usage of `verifyMessage` option:
```javascript
// Tasks
const task = {
   validateHtml() {
      const ignoreDuplicateIds = (type, message) => !/^Duplicate ID/.test(message);
      return gulp.src('target/**/*.html')
         .pipe(htmlValidator({ verifyMessage: ignoreDuplicateIds }))  //custom function
         .pipe(htmlValidator.reporter());
      },
   };
```

---
[MIT License](LICENSE.txt)
