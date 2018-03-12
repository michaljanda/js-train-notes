let gulp = require('gulp');
let inject = require('gulp-inject');
let sourcemaps = require('gulp-sourcemaps');
let wiredep = require('wiredep');
let babel = require('gulp-babel');
let rimraf = require('rimraf');
let eslint = require('gulp-eslint');
let templateCache = require('gulp-angular-templatecache');

let watch = require('gulp-watch');
let sass = require('gulp-sass');
let merge = require('merge2');

let indexFile = 'index.html';
let jsEntry = ['./app.js'];
let jsFiles = ['./app/**/*.js'];
let tplFiles = ['./app/**/*.html'];
let sassFiles = ['./app-sass-styles/**/*.scss'];
let targetDir = './dev';
let watchedFiles = [].concat(
  jsEntry,
  jsFiles,
  tplFiles,
  sassFiles,
  'bower.json',
  indexFile
);

let browserSync = require('browser-sync').create();
let nodemon = require('nodemon');

gulp.task('default', ['clean'], function() {
  gulp.start('serve');
});

gulp.task('serve', ['nodemon'], function() {
  browserSync.init({
    proxy: 'http://localhost:3000',
    port: 80
  });

  watch(watchedFiles, event => {
    console.info(`[watcher] ${event.path}`);
    gulp.start('reload');
  });
});

gulp.task('nodemon', ['compile'], function(cb) {
  var started = false;

  return nodemon({
    script: 'proxy.js'
  }).on('start', function() {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  });
});

gulp.task('reload', ['compile'], function() {
  browserSync.reload();
});

gulp.task('clean', function() {
  rimraf.sync(targetDir);
});

gulp.task('compile', function() {
  return compile();
});

function compile() {

  let templates = gulp.src(tplFiles)
  .pipe(templateCache('app-templates.js', {module: 'notes', root: 'app'}))
  .pipe(gulp.dest(targetDir));

  let pipeline = gulp
    .src(jsFiles, { base: '.' })
    .pipe(eslint('./.eslintrc'))
    .pipe(eslint.format());

    let pipelineEntry = gulp
    .src(jsEntry, { base: '.' })
    .pipe(eslint('./.eslintrc'))
    .pipe(eslint.format());

  let entry = babelize(pipelineEntry)
    .pipe(gulp.dest(targetDir));
  let js = babelize(pipeline)
    .pipe(gulp.dest(targetDir));

  let styles = gulp
    .src('./app-sass-styles/**/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest(targetDir + '/css'));

  let targetFiles = merge(entry, templates, js, styles);

  return gulp
    .src(indexFile)
    .pipe(inject(targetFiles, { relative: true, ignorePath: ['dev/'] }))
    .pipe(wiredep.stream())
    .pipe(gulp.dest(targetDir));
}

function babelize(pipeline) {
  return pipeline
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['es2015'] }).on('error', logBabelError))
    .pipe(sourcemaps.write('.'));
}

function logBabelError(e) {
  console.error('[BABEL] ' + e.message);
}
