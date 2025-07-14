const gulp = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const cleanCSS = require('gulp-clean-css');
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');
const eslint = require('gulp-eslint');
const stylelint = require('gulp-stylelint');
const imagemin = require('gulp-imagemin');
const browserSync = require('browser-sync').create();
const rename = require('gulp-rename');

// Caminhos
const paths = {
  styles: {
    src: ['src/scss/**/*.scss', 'src/components/**/*.scss'],
    dest: 'assets/'
  },
  scripts: {
    src: ['src/js/**/*.js', 'src/components/**/*.js'],
    dest: 'assets/'
  },
  images: {
    src: 'src/images/**/*',
    dest: 'assets/'
  }
};

// Lint SASS
function lintSass() {
  return gulp.src(paths.styles.src)
    .pipe(stylelint({
      reporters: [{formatter: 'string', console: true}]
    }));
}

// Lint JS
function lintJs() {
  return gulp.src(paths.scripts.src)
    .pipe(eslint())
    .pipe(eslint.format())
    .pipe(eslint.failAfterError());
}

// SASS
function styles() {
  return gulp.src(paths.styles.src)
    .pipe(sass().on('error', sass.logError))
    .pipe(cleanCSS())
    .pipe(concat('store.min.css'))
    .pipe(gulp.dest(paths.styles.dest))
    .pipe(browserSync.stream());
}

// JS
function scripts() {
  return gulp.src(paths.scripts.src)
    .pipe(concat('store.min.js'))
    .pipe(uglify())
    .pipe(gulp.dest(paths.scripts.dest))
    .pipe(browserSync.stream());
}

// Imagens
function images() {
  return gulp.src(paths.images.src)
    .pipe(imagemin())
    .pipe(gulp.dest(paths.images.dest));
}

// BrowserSync
function serve() {
  browserSync.init({
    proxy: false,
    server: {
      baseDir: './'
    },
    open: false
  });
  gulp.watch(paths.styles.src, gulp.series(lintSass, styles));
  gulp.watch(paths.scripts.src, gulp.series(lintJs, scripts));
  gulp.watch(paths.images.src, images);
  gulp.watch(['assets/store.min.js', 'assets/store.min.css', '*.liquid', 'layout/**/*.liquid', 'sections/**/*.liquid', 'templates/**/*.liquid']).on('change', browserSync.reload);
}

exports.lintSass = lintSass;
exports.lintJs = lintJs;
exports.styles = styles;
exports.scripts = scripts;
exports.images = images;
exports.serve = serve;
exports.watch = serve;
exports.default = gulp.series(gulp.parallel(lintSass, lintJs, styles, scripts, images), serve); 