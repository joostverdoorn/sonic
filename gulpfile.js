var gulp       = require('gulp'),
    sourcemaps = require('gulp-sourcemaps'),
    rename     = require('gulp-rename'),
    foreach    = require('gulp-foreach'),
    uglify     = require('gulp-uglify'),
    typescript = require('gulp-typescript'),
    merge      = require('merge2'),
    source     = require('vinyl-source-stream'),
    buffer     = require('vinyl-buffer'),
    browserify = require('browserify'),
    babelify   = require('babelify'),
    report     = require('tap-spec'),
    through    = require('through2'),
    stream     = require('stream'),
    spawn      = require('child_process').spawn,
    exec       = require('child_process').exec;

var typescriptProject = typescript.createProject('tsconfig.json');

gulp.task('typescript', () => {
  var result = gulp
    .src(['src/**/*.ts'], {base: 'src'})
    .pipe(sourcemaps.init())
    .pipe(typescript(typescriptProject))

  return merge([
    result.dts.pipe(gulp.dest('dist')),
    result.js
      .pipe(sourcemaps.write('.',{includeContent:false, sourceRoot: '../src'}) )
      .pipe(gulp.dest('dist'))
  ]);
});

gulp.task('browserify', () => {
  return browserify('dist/sonic.js', {standalone: 'Sonic', sourceType: 'module', debug: true})
    .transform(babelify)
    .bundle()
    .pipe(source('sonic.browser.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('uglify', () => {
  return gulp
    .src('dist/sonic.browser.js')
    .pipe(uglify())
    .pipe(rename('sonic.browser.min.js'))
    .pipe(gulp.dest('dist'))
});

gulp.task('dist',    gulp.series('typescript', 'browserify', 'uglify'));
gulp.task('d',       gulp.task('dist'));
gulp.task('default', gulp.task('dist'));

gulp.task('spec', gulp.series('typescript', done => {
  var passing = true;

  gulp.src('spec/*.js')
    .pipe(foreach((stream, file) => {
      var child = spawn("node")

      browserify(file.path, { sourceType: 'module' })
        .transform(babelify)
        .bundle()
        .pipe(source('test.js'))
        .pipe(buffer())
        .pipe(through({objectMode: true}, (file, encoding, callback) => {
          callback(null, file.contents)
        })).pipe(child.stdin);

      return child.stdout;
    })).on('data', data => {
      if (data.indexOf('not ok') > -1) passing = false;
    }).on('end', () => {
      if (passing) return done();
      process.stdout.write("\007");
      done('failed');
    })
    .pipe(report())
    .pipe(process.stdout);
}));
gulp.task('s', gulp.task('spec'));

gulp.task('watch', function() {
  gulp.watch('src/*.ts', gulp.task('dist'));
});
gulp.task('w', gulp.series('watch'));

gulp.task('watch-spec', gulp.parallel(
  gulp.series('spec', gulp.series('browserify', 'uglify')),
  () => gulp.watch(['src/*.ts', 'spec/*.js'], gulp.series('spec', gulp.series('browserify', 'uglify')))
));
gulp.task('ws', gulp.series('watch-spec'));
