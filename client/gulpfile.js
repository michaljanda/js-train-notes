let _ = require('lodash');
let gulp = require('gulp');
let inject = require('gulp-inject');
let sourcemaps = require('gulp-sourcemaps');
let wiredep = require('wiredep');
let babel = require('gulp-babel');
let express = require('express');
let open = require('open');
let fs = require('fs');
let connect = require('gulp-connect');
let rimraf = require('rimraf');

let livereload = require('gulp-livereload');
let livereloadHook = require('connect-livereload');
let proxy = require('http-proxy');
let watch = require('gulp-watch');
let sass = require('gulp-sass');
let merge = require('merge2');

let externalHelpers = './node_modules/babel-core/external-helpers.js';
let indexFile = 'index.html';
let jsFiles = ['./app/**/*.js'];
let tplFiles = ['./app/**/*.html'];
let sassFiles = ['./app-sass-styles/**/*.scss'];
let targetDir = './dev';
let watchedFiles = [].concat(jsFiles, tplFiles, sassFiles, 'bower.json', indexFile);

let browserSync = require('browser-sync').create();
let nodemon = require('nodemon');

gulp.task('default', ['clean'], function () {
  gulp.start('serve');
});

gulp.task('serve', ['nodemon'], function(){
  browserSync.init({
    proxy: "http://localhost:3000",
    port: 80,
  });

  let watcher = watch(watchedFiles, (event) => {
    console.info(`[watcher] ${event.path}`);
    gulp.start('reload');
  });
});

gulp.task('nodemon', ['compile'], function (cb) {

  var started = false;

  return nodemon({
    script: 'proxy.js'
  }).on('start', function () {
    // to avoid nodemon being started multiple times
    if (!started) {
      cb();
      started = true;
    }
  });
})

gulp.task('reload', ['compile'], function () {
  browserSync.reload();
});

gulp.task('clean', function () {
  rimraf.sync(targetDir);
});

gulp.task('compile', function () {
  return compile();
});

function compile() {
  let js = babelize(jsFiles)
    .pipe(gulp.dest(targetDir));

  let styles = gulp.src('./app-sass-styles/**/*.scss')
  .pipe(sass().on('error', sass.logError))
  .pipe(gulp.dest(targetDir + '/css'));

  let targetFiles = merge(js, styles);

  return gulp.src(indexFile)
    .pipe(inject(targetFiles, { relative: true, ignorePath: ['dev/'] }))
    .pipe(wiredep.stream())
    .pipe(gulp.dest(targetDir));
}

function babelize(jsFilesPath) {
  return gulp.src(jsFilesPath, { base: '.' })
    .pipe(sourcemaps.init())
    .pipe(babel({ presets: ['es2015'] }).on('error', logBabelError))
    .pipe(sourcemaps.write('.'));
}

function logBabelError(e) {
  console.error('[BABEL] ' + e.message);
}
