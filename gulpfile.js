require('coffee-script').register();

var gulp       = require('gulp'),
    typescript = require('gulp-typescript'),
    rename     = require('gulp-rename'),
    uglify     = require('gulp-uglify'),
    jasmine    = require('gulp-jasmine'),
    benchmark  = require('gulp-bench'),
    browserify = require('browserify'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    merge      = require('merge2'),
    es6ify     = require('es6ify');


var typescriptProject = typescript.createProject('tsconfig.json', { typescript: require('typescript') });

gulp.task('typescript', function() {
  var result = gulp
    .src('src/**/*.ts')
    .pipe(typescript(typescriptProject))

  return merge([
    result.dts.pipe(gulp.dest('dist')),
    result.js.pipe(gulp.dest('dist'))
  ]);
});

gulp.task('browserify', ['typescript'], function() {
  return browserify('dist/sonic.js', {standalone: 'Sonic', sourceType: 'module'})
    .transform(es6ify)
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
