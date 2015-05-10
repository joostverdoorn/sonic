import gulp       = require('gulp');
import typescript = require('gulp-typescript');
import source     = require('vinyl-source-stream');
import buffer     = require('vinyl-buffer');
import browserify = require('browserify');

gulp.task('typescript', function() {
  return gulp
    .src('src/*.ts')
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


gulp.task('watch', function() {
  gulp.watch('src/*.ts', ['dist']);
})

gulp.task('dist', ['typescript', 'browserify']);
