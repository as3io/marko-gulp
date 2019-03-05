const {
  task,
  src,
  dest,
} = require('gulp');
const sass = require('gulp-sass');

sass.compiler = require('node-sass');

task('sass', () => src('./src/styles/app.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(dest('./dist')));
