var gulp = require('gulp');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var ngAnnotate = require('gulp-ng-annotate');
var tempCache = require('gulp-angular-templatecache');
var minifyHtml = require('gulp-minify-html');
var inject = require('gulp-inject');
var watch = require('gulp-watch');

gulp.task('libs-js', function () {
	gulp.src('UI/libs/**/*.min.js')
	.pipe(concat('vendors.js'))
	.pipe(ngAnnotate())
	.pipe(uglify())
	.pipe(gulp.dest('./.tmp/js'));
});

gulp.task('css', concatCss);

function concatCss() {
	gulp.src('UI/**/*.css')
	.pipe(concat('styles.css'))
	.pipe(gulp.dest('./.tmp/styles'));
}

gulp.task('scripts-js', buildScripts);

function buildScripts() {
	gulp.src(['UI/todoapp/todo.module.js', 'UI/todoapp/**/*.js'])
	.pipe(concat('app.js'))
	.pipe(ngAnnotate())
	.pipe(uglify())
	.pipe(gulp.dest('./.tmp/js'));
}

gulp.task('inject', function () {
	gulp.src('UI/index.html')
	.pipe(inject(gulp.src('./.tmp/js/vendors.js', {read: false}), {ignorePath: '.tmp', addRootSlash: false, name: 'head'}))
	.pipe(inject(gulp.src(['./.tmp/js/app.js', './.tmp/js/templates.js'], {read: false}), {ignorePath: '.tmp', addRootSlash: false}))
	.pipe(inject(gulp.src('./.tmp/styles/styles.css'), {ignorePath: '.tmp', addRootSlash: false}))
	.pipe(gulp.dest('./.tmp'));
});

gulp.task('templatecache', buildTemplates);

function buildTemplates() {
	return gulp.src('UI/todoapp/**/*.html')
	.pipe(tempCache(
		'templates.js', {
			module: 'todo',
			standAlone: false
		}))
	.pipe(gulp.dest('./.tmp/js/'));
}

gulp.task('watch-styles', function () {
	return watch('UI/styles/**/*.css', { ignoreInitial: false }, concatCss);
});

gulp.task('watch-scripts', function () {
	return watch('UI/todoapp/**/*.js', { ignoreInitial: false }, buildScripts);
});

gulp.task('watch-templates', function () {
	return watch('UI/todoapp/**/*.html', { ignoreInitial: false }, buildTemplates);
});

gulp.task('build', ['libs-js', 'scripts-js', 'templatecache', 'css', 'inject']);

gulp.task('watchers', ['watch-styles', 'watch-scripts', 'watch-templates']);

gulp.task('serve', ['build', 'watchers']);