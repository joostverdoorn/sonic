import gulp       = require('gulp');
import typescript = require('gulp-typescript');
import browserify = require('gulp-browserify');
// import tsconfig   = require('./tsconfig.json')

var project;

project = typescript.createProject('tsconfig.json');
project.typescript = require('typescript');

console.log(project.src);

gulp.task('default', () => {
  project.src()
      .pipe(typescript(project)).js
      .pipe(browserify())
      .pipe(gulp.dest('dist'))
})
