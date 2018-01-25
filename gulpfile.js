'use strict';

var gulp = require('gulp');
var sass = require('gulp-sass');
var sourcemaps = require('gulp-sourcemaps');
var cleanCSS = require('gulp-clean-css')


gulp.task('sass',function(){
	return gulp.src('./src/App.scss')
	.pipe(sass().on('error',sass.logError))
	.pipe(gulp.dest('./src'))
});

gulp.task('watch:sass',function(){
	gulp.watch('./src/App.scss',['sass'])
})

gulp.task('default',['sass','watch:sass'])