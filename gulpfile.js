var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var inject = require('gulp-inject');

gulp.task('libs-js', function () {
	gulp.src('UI/libs/**/*.min.js')
	.pipe(concat('app.js'))
	.pipe(ngAnnotate())
	.pipe(uglify())
	.pipe(gulp.dest('./.tmp/js'));
});

gulp.task('scripts-js', function () {
	gulp.src(['UI/todoapp/todo.module.js', 'UI/todoapp/**/*.js'])
	.pipe(concat('todo.js'))
	.pipe(ngAnnotate())
	.pipe(uglify())
	.pipe(gulp.dest('./.tmp/js'));
});

gulp.task('inject', function () {
	gulp.src('UI/index.html')
	.pipe(inject(gulp.src('./.tmp/js/*.js', {read: false}), {ignorePath: '.tmp', addRootSlash: false, name: 'head'}))
	.pipe(gulp.dest('./.tmp'));
});

gulp.task('default', ['libs-js', 'scripts-js', 'inject']);