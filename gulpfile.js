require('coffee-script').register();

var gulp       = require('gulp');
var typescript = require('gulp-typescript');
var source     = require('vinyl-source-stream');
var buffer     = require('vinyl-buffer');
var browserify = require('browserify');
var jasmine    = require('gulp-jasmine');

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

gulp.task('browserify', function() {
  return browserify('./dist/sonic.js', {standalone: 'Sonic'})
    .bundle()
    .pipe(source('sonic.browser.js'))
    .pipe(buffer())
    .pipe(gulp.dest('dist'))
});

gulp.task('spec', function() {
  return gulp.src('spec/**/*.coffee')
    .pipe(jasmine())
});

gulp.task('watch', function() {
  gulp.watch('src/*.ts', ['dist']);
})

gulp.task('dist', ['typescript', 'browserify']);
