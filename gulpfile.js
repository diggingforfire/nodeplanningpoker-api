'use strict';

var gulp 			= require('gulp');
var sass 			= require('gulp-sass');
var autoprefixer 	= require('gulp-autoprefixer');

gulp.task('sass', function () {
  return gulp.src('./static/sass/*.scss')
    .pipe(sass().on('error', sass.logError))
    .pipe(gulp.dest('./static/sass/'));
});

gulp.task('auto-prefixer', function () {
	return gulp.src('./static/sass/*.css')
		.pipe(autoprefixer({
			browsers: ['last 2 versions'],
			cascade: false
		}))
		.pipe(gulp.dest('./static/cardtheme'));
});

gulp.task('sass:watch', function () {
  gulp.watch('./static/sass/*.scss', ['sass'])
  gulp.watch('./static/sass/*.css', ['auto-prefixer'])
});

gulp.task('default', ['sass:watch']);
