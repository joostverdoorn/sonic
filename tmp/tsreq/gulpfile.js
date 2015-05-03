var gulp = require('gulp');
var typescript = require('gulp-typescript');
var browserify = require('gulp-browserify');
// import tsconfig   = require('./tsconfig.json')
var project;
project = typescript.createProject('tsconfig.json');
project.typescript = require('typescript');
console.log(project.src);
gulp.task('default', function () {
    project.src().pipe(typescript(project)).js.pipe(browserify()).pipe(gulp.dest('dist'));
});
