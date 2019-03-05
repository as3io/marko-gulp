const {
  dest,
  parallel,
  series,
  src,
  watch,
} = require('gulp');
const autoprefixer = require('autoprefixer');
const cache = require('gulp-cached');
const eslint = require('gulp-eslint');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const { spawn } = require('child_process');

const { log } = console;

sass.compiler = require('node-sass');

let node;
const server = async () => {
  if (node) node.kill();
  node = await spawn('node', ['src/index.js'], { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });
  node.on('message', msg => log('> Received message from subprocess', msg));
  node.on('close', (code, signal) => {
    const exited = [];
    if (code) exited.push(`code ${code}`);
    if (signal) exited.push(`signal ${signal}`);
    log(`> Node subprocess (via Gulp) exited with ${exited.join(' ')}`);
  });
};

const lint = () => src(['src/**/*.js', '!src/**/*.marko.js'])
  .pipe(cache('lint'))
  .pipe(eslint())
  .pipe(eslint.format());

const css = () => src('src/styles/app.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(postcss([
    autoprefixer({
      browsers: [
        '>= 1%',
        'last 1 major version',
        'Chrome >= 45',
        'Firefox >= 38',
        'Edge >= 12',
        'Explorer >= 10',
        'iOS >= 9',
        'Safari >= 9',
        'Android >= 4.4',
        'Opera >= 30',
      ],
    }),
  ]))
  .pipe(dest('./dist'));

const build = parallel(css);

const serve = () => {
  const watcher = watch(
    ['src/**/*.js', '!src/**/*.marko.js', 'src/styles/**/*.scss', 'src/**/*.marko'],
    { queue: false, ignoreInitial: false },
    parallel(lint, series(css, server)),
  );
  watcher.on('change', path => log(`File ${path} was changed.`));
  watcher.on('unlink', path => log(`File ${path} was removed.`));
};

exports.default = serve;
exports.serve = serve;
exports.lint = lint;
exports.build = build;
