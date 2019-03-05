const {
  dest,
  parallel,
  series,
  src,
  watch,
} = require('gulp');
const autoprefixer = require('autoprefixer');
const cache = require('gulp-cached');
const cssnano = require('cssnano');
const eslint = require('gulp-eslint');
const livereload = require('gulp-livereload');
const log = require('fancy-log');
const postcss = require('gulp-postcss');
const sass = require('gulp-sass');
const sourcemaps = require('gulp-sourcemaps');
const {
  green,
  magenta,
  cyan,
  red,
  yellow,
} = require('chalk');
const { spawn } = require('child_process');

if (!process.env.LIVERELOAD_PORT) {
  process.env.LIVERELOAD_PORT = 37800;
}
const { LIVERELOAD_PORT } = process.env;

sass.compiler = require('node-sass');

let isFirstRun = true;
let node;
const server = async () => {
  if (node) node.kill();
  isFirstRun = false;
  node = await spawn('node', ['src/index.js'], { stdio: ['inherit', 'inherit', 'inherit', 'ipc'] });
  node.on('message', (msg) => {
    if (msg.event === 'ready') {
      log(`Server ${green('ready')} on ${yellow(msg.location)}`);
      livereload.changed('/');
    }
  });
  node.on('close', (code, signal) => {
    const exited = [];
    if (code) exited.push(`code ${code}`);
    if (signal) exited.push(`signal ${signal}`);
    log(`Process ${green('exited')} with ${magenta(exited.join(' '))}`);
  });
};

const lint = () => src(['src/**/*.js', '!src/**/*.marko.js'])
  .pipe(cache('lint'))
  .pipe(eslint())
  .pipe(eslint.format());

const css = () => src('src/styles/app.scss')
  .pipe(sourcemaps.init())
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
    cssnano(),
  ]))
  .pipe(sourcemaps.write('.'))
  .pipe(dest('./dist'));

const build = parallel(css);

const serve = () => {
  livereload.listen({ port: LIVERELOAD_PORT, quiet: true });
  log(`Livereload ${green('listening')} on port ${magenta(LIVERELOAD_PORT)}`);
  const watcher = watch(
    ['src/**/*.js', '!src/**/*.marko.js', 'src/styles/**/*.scss', 'src/**/*.marko'],
    { queue: false, ignoreInitial: false },
    parallel(lint, series(css, server)),
  );
  watcher.on('add', (path) => {
    if (!isFirstRun) log(`File ${green(path)} was ${green('added')}`);
  });
  watcher.on('change', path => log(`File ${green(path)} was ${cyan('changed')}`));
  watcher.on('unlink', path => log(`File ${green(path)} was ${red('removed')}.`));
};

exports.default = serve;
exports.serve = serve;
exports.lint = lint;
exports.build = build;
