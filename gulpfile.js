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
var merge      = require('merge2');

var typescriptProject = typescript.createProject('tsconfig.json', { typescript: require('typescript') });

gulp.task('typescript', function() {
  var result = gulp
    .src('src/**/*.ts')
    .pipe(typescript(typescriptProject))

  return merge([
    result.dts.pipe(gulp.dest('dist/d.ts')),
    result.js.pipe(gulp.dest('dist'))
  ]);

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
    .pipe(jasmine({
      includeStackTrace: true
    }))
});

gulp.task('perf', function () {
  return gulp
    .src('perf/**/*.coffee')
    .pipe(benchmark({defer: true}))
});

gulp.task('dist', ['uglify']);
gulp.task('default', ['dist'])

gulp.task('watch', function() {
  gulp.watch('src/*.ts', ['dist']);
})
