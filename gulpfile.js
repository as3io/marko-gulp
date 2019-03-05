const {
  dest,
  src,
} = require('gulp');
const gulpSass = require('gulp-sass');

gulpSass.compiler = require('node-sass');

const sass = () => src('./src/styles/app.scss')
  .pipe(gulpSass().on('error', gulpSass.logError))
  .pipe(dest('./dist'));

exports.sass = sass;
