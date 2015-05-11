require('coffee-script').register();

var gulp       = require('gulp');
var typescript = require('gulp-typescript');
var rename     = require('gulp-rename');
var uglify     = require('gulp-uglify');
var jasmine    = require('gulp-jasmine');
var benchmark  = require('gulp-bench');
var browserify = require('browserify');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');

gulp.task('typescript', function() {
  return gulp
    .src('src/**/*.ts')
    .pipe(typescript({
            target: 'es5',
            module: 'commonjs',
            typescript: require('typescript')
          }))
    .js
    .pipe(gulp.dest('dist'));
});

gulp.task('browserify', ['typescript'], function() {
  return browserify('dist/sonic.js', {standalone: 'Sonic'})
    .bundle()
    .pipe(source('sonic.browser.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'))
});

gulp.task('uglify', ['browserify'], function (){
  return gulp
    .src('dist/sonic.browser.js')
    .pipe(uglify())
    .pipe(rename('sonic.browser.min.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('spec', function() {
  return gulp
    .src('spec/**/*.coffee')
    .pipe(jasmine())
});

gulp.task('perf', function () {
  return gulp
    .src('perf/**/*.coffee')
    .pipe(benchmark())
});

gulp.task('dist', ['uglify']);

gulp.task('watch', function() {
  gulp.watch('src/*.ts', ['dist']);
})
