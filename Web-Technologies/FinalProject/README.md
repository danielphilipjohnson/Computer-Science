# Gulp Task Runner

## Running

### Install node and grunt dependencies
```
npm init
```

### Build project
```
gulp build

```
- Build Task
  - 'html',
  - 'html-validate',
  - 'imagemin',
  - 'style',
  - 'doc',
  - 'compress',
  - 'js',

### Running tests
```
gulp test

```
- Tests Task
  - gulp-jasmine
  - gulp-mocha

### Watching SCSS files

```
gulp watch

```

### Build Html files

```
gulp build-html
```

Whats included
- HTML Task 
  - pug 
  - htmlhint
  - html minify
  - build html
 
### Validate HTML
```
gulp html-validate
```
- HTML-validate Task
  - HTML HINT

### Build Style

```
gulp style
```
- Style Task
  - Sass to CSS
  - autoprefixer from browser specific
  - CSS comb
  - CSS lint
  - CSS Minify
  - Build CSS

### Minify Images
```
gulp imagemin
```

- Images responsive Task
  - gulp-imagemin
    - gifsicle
    - jpegtran
    - optipng
    - svgo 

### Build JS docs
```
gulp doc
```

- Documentation Task 
  - gulp-jsdoc3


### Compress JS

- Compress js Task
  - gulp-uglify
  ```
  gulp compress
  ```

### Minify JS
- Minify and Concat Js
  -  sourcemaps
  -  concat app.min.js
  -  Build build/js
  ```
  gulp js
  ```
