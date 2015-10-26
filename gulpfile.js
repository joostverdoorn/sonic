require('coffee-script').register();

var gulp       = require('gulp'),
    merge      = require('merge2'),
    path       = require('path'),
    istanbul   = require('gulp-istanbul'),
    buffer     = require('vinyl-buffer'),
    rename     = require('gulp-rename'),
    foreach    = require('gulp-foreach'),
    debug      = require('gulp-debug'),
    uglify     = require('gulp-uglify'),
    source     = require('vinyl-source-stream'),
    jasmine    = require('gulp-jasmine'),
    babelify   = require('babelify'),
    coffeeify  = require('gulp-coffeeify'),
    babel      = require('gulp-babel'),
    benchmark  = require('gulp-bench'),
    typescript = require('gulp-typescript'),
    browserify = require('browserify');


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
    .transform(babelify)
    .bundle()
    .pipe(source('sonic.browser.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('uglify', ['browserify'], function (){
  return gulp
    .src('dist/sonic.browser.js')
    .pipe(uglify())
    .pipe(rename('sonic.browser.min.js'))
    .pipe(gulp.dest('dist'))
})

gulp.task('browserify-bundles', ['typescript'], function() {
  return gulp.src(['dist/**/*.js', '!dist/**/*.browser.*'])
    .pipe(foreach(function(stream, file) {
        var name = path.basename(file.path, '.js')
        // console.log(name);
        return browserify('dist/'+name+'.js', {standalone: name, sourceType: 'module', paths: ['dist'], debug: true})
          .transform(babelify)
          .bundle()
          .pipe(source(name+'.js'))
          .pipe(gulp.dest('test/src'))
      }))
    // }))

});

gulp.task('instrument', ['browserify-bundles'], function() {
  return gulp
    .src(['test/src/*.js'])
    .pipe(istanbul({
      // includeUntested: true,

    }))
    .pipe(gulp.dest('test/src'))
})

gulp.task('coffeeify', ['instrument'], function() {
  return gulp.src(['spec/**/*.coffee', '!spec/node_modules/**/*.coffee'])
    .pipe(coffeeify({
      options: {
        debug: true,
        paths: [
          __dirname + '/spec',
          __dirname + '/test/'
        ]
      }
    }))
    .pipe(gulp.dest('test/spec'))
});

gulp.task('spec', ['coffeeify'], function() {
  return gulp
    .src('test/spec/**/*.js')
    .pipe(jasmine({ includeStackTrace: true }))
    .pipe(istanbul.writeReports({
      dir: 'coverage',
      reporters: ['html']
    }));
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
