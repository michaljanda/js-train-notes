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

gulp.task('default', ['compile'], function () {
  let app = express();
  let p = proxy.createProxyServer({ target: 'http://localhost:5000/' });

  app.all('/api/*', function (req, res) {
    p.web(req, res);
  });

  app.get('/', function (req, res) {
    fs.readFile(targetDir + '/index.html', 'utf-8', function (err, jsp) {
      res.set('Content-Type', 'text/html; charset=utf-8');
      res.end(jsp.replace(/<%[\s\S]*?%>/g, ''));
    });
  });

  app.listen(80, _.partial(open, 'http://localhost/'));
  app.use('/bower_components', express.static('./bower_components'));
  app.use(express.static('./dev'));

  connect.server({livereload: true, port: 21});

  let watched = [].concat(indexFile, jsFiles, tplFiles);
  let watcher = gulp.watch(watched, _.noop);



  watcher.on('change', function() {
    gulp.start('reload');
  });

});

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
