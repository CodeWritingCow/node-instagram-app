// load gulp plugins
var gulp = require('gulp'),
	cleanCSS = require('gulp-clean-css'),
	ejsmin = require('gulp-ejsmin'),
	rename = require('gulp-rename'),
	uglify = require('gulp-uglify');

// task for minifying css
gulp.task('min-css', function() {
	// grab css files, minify them, save as *.min.css
	return gulp.src('public/css/*.css')
			   .pipe(cleanCSS())
			   .pipe(rename({ suffix: '.min' }))
			   .pipe(gulp.dest('dist/public/css'));
});

// task for minifying JavaScript
gulp.task('min-js', function() {
	return gulp.src('server.js')
			   .pipe(uglify())
			   .pipe(rename({ suffix: '.min' }))
			   .pipe(gulp.dest('dist'));
});

// task for minifying pages/*.ejs
gulp.task('min-ejs-pages', function() {
	return gulp.src('./views/pages/*.ejs')
			   .pipe(ejsmin({ removeComment: true }))
			   .pipe(gulp.dest('./dist/views/pages'));
});

// task for minifying partials/*.ejs
gulp.task('min-ejs-partials', function() {
	return gulp.src('./views/partials/*.ejs')
			    .pipe(ejsmin({ removeComment: true }))
			    .pipe(gulp.dest('./dist/views/partials'));
});

// task for running min-ejs-pages and min-ejs-partials
gulp.task('min-ejs', ['min-ejs-pages', 'min-ejs-partials']);

// TODO: task for building app for deployment
// exports required files to dist folder