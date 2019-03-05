const {
  dest,
  src,
  watch,
} = require('gulp');
const gulpSass = require('gulp-sass');
const cache = require('gulp-cached');
const eslint = require('gulp-eslint');

gulpSass.compiler = require('node-sass');

const lint = () => src('src/**/*.js')
  .pipe(cache('lint'))
  .pipe(eslint())
  .pipe(eslint.format());

const sass = () => src('src/styles/app.scss')
  .pipe(gulpSass().on('error', gulpSass.logError))
  .pipe(dest('./dist'));

const watchSass = () => watch('src/styles/**/*.scss', sass);

exports.lint = lint;
exports.sass = sass;
exports.watchSass = watchSass;
