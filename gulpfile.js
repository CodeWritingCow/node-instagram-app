// load gulp plugins
var gulp = require('gulp'),
	cleanCSS = require('gulp-clean-css'),
	rename = require('gulp-rename');

// task for minifying css
gulp.task('minify-css', function() {
	// grab css files, minify them, save as *.min.css
	return gulp.src('public/css/*.css')
			   .pipe(cleanCSS())
			   .pipe(rename({ suffix: '.min' }))
			   .pipe(gulp.dest('dist/public/css'));
});

// TODO: task for minifying JavaScript

// TODO: task for minifying *.ejs