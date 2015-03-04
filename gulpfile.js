'use strict';

var gulp = require('gulp');
var del = require('del');

// Load plugins
var $ = require('gulp-load-plugins')();
var browserify = require('browserify');
var reactify = require('reactify');
// var less = require('gulp-less');
var livereload = require('gulp-livereload');
var nodemon = require('gulp-nodemon');
var jshint = require('gulp-jshint');
var autoprefixer = require('gulp-autoprefixer');
var cache = require('gulp-cache');
var imagemin = require('gulp-imagemin');
var size = require('gulp-size');
var source = require('vinyl-source-stream');

// Clean
gulp.task('clean', function(){
  del.sync([
    './public/dist/css',
    './public/dist/images',
    './public/dist/js'
  ]);
});

// HTML
gulp.task('html', function () {
  return gulp.src('public/*.html')
    // .pipe($.useref())
    .pipe(gulp.dest('./public/dist'))
    .pipe(size());
});

// css
gulp.task('css', function () {
  return gulp.src('./public/css/*.css')
    .pipe(autoprefixer()) // modifies css to work cross-browser
    .pipe(gulp.dest('./public/dist/css'))
    .pipe(livereload());
});

// Images
gulp.task('images', function () {
  return gulp.src('public/images/**/*')
    .pipe(cache(imagemin({
      optimizationLevel: 3,
      progressive: true,
      interlaced: true
    })))
    .pipe(gulp.dest('./public/dist/images'))
    .pipe(size());
});

// Compile React
gulp.task('compile', function(){
  var b = browserify();
  b.transform(reactify);
  b.add('./public/js/main.js');
  return b.bundle()
    .pipe(source('main.js'))
    .pipe(gulp.dest('./public/dist/js'))
    .pipe(livereload());
});

// Lint the JS files
gulp.task('lint-server', function(){
  return gulp.src(['./server/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

gulp.task('lint-client', function(){
  return gulp.src(['./public/**/*.js'])
    .pipe(jshint())
    .pipe(jshint.reporter('default'));
});

// Webserver
gulp.task('serve', function () {
  return nodemon({
    'watch': 'server/'
  });
});


// Watch
gulp.task('watch', function () {
  livereload.listen();

  gulp.watch('./public/*.html', ['html']);
  gulp.watch('./public/css/*.css', ['css']);
  gulp.watch('./public/images/**/*', ['images']);
  gulp.watch('./public/js/**/*.js', ['compile']);
  // gulp.watch('./server/*.js', ['lint-server'])
});

// Lint
gulp.task('lint', ['lint-client', 'lint-server']);

// Build
gulp.task('build', ['clean', 'html', 'css', 'images', 'compile']);

// Default task
gulp.task('default', ['build', 'serve', 'watch']);
