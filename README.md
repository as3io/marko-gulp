# Marko with Gulp build tools.
Example respository for creating a dev enviroment with Gulp, ESLint, MarkoJS and Express. Supports autoprefixed, minified SASS compilation with source maps.

## Usage
1. Clone the repository
2. Run `yarn dev`

This will run the default Gulp task (as defined in `gulpfile.js`) and set the `NODE_ENV`, `LIVERELOAD_PORT` and `PORT` environment variables.

## gulpfile.js
Three commands are publically exposed:
1. `serve` (also the `default` command): runs lint + build and starts the express/app server.
2. `lint`: lints all JavaScript files (via eslint) within the `./src` folder.
3. `build`: builds all assets (currently SASS files) and stores them in the `./dist` folder.

### Lint
Runs eslint on `src/**/*.js` (all JavaScript files), but will ignore compiled `*.marko.js` files. Respects rules defined in `.eslintrc.js` and `.eslintignore`.

### Build
Reads the `src/styles.app.scss` SASS file and transforms it into a regular CSS file with the following pipleline:
- Compile SASS using `node-sass`
- Autoprefix the CSS using `autoprefixer` via `postcss` (using browser targets corresponding to Bootstrap 4.3.1)
- Minify the CSS using `cssnano` via `postcss`
- Write the sourcemap
- Save the `app.css` and `app.css.map` to the `./dist` folder

## Serve
This command runs the dev environment:
- A browser live reload server is started and runs on `LIVERELOAD_PORT`. This allows the browser to automatically refresh when files change.
- All JavaScript (`.js`), Marko template (`.marko` _not_ `.marko.js`) and SASS (`.scss`) files are watched within the project `./src` directory.
- Anytime these files are changed, added, or removed the following tasks occur
  - Lint all appropriate JavaScript (via the `lint` task)
  - Compile the `app.scss` into regular CSS (via the `build` task)
  - Spawn a Node subprocess and run the Express server
  - Once the Express server is ready, notify livereload to refresh the browser window
