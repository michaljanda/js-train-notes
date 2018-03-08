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

let livereload = require('gulp-livereload');
let livereloadHook = require('connect-livereload');
let proxy = require('http-proxy');

let externalHelpers = './node_modules/babel-core/external-helpers.js';
let indexFile = 'index.html';
let jsFiles = ['./app/**/*.js'];
let tplFiles = ['./app/**/*.html'];
let targetDir = './dev';

let browserSync = require('browser-sync');
let nodemon = require('nodemon');

gulp.task('default', ['compile','nodemon'], function () {

});

gulp.task('nodemon', function(cb) {
  	
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

gulp.task('reload', ['compile'], function(){
});

gulp.task('compile', function () {
  return compile();
})


function compile() {
  var js = babelize(jsFiles)
    .pipe(gulp.dest(targetDir));


  return gulp.src(indexFile)
    .pipe(inject(js, {relative: true, ignorePath: ['dev/']}))
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
