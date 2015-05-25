var gulp = require('gulp');
var browserify = require('gulp-browserify');
var rename = require('gulp-rename');
var connect = require('gulp-connect');
var open = require('gulp-open');
var watch = require('gulp-watch');
var sass = require('gulp-sass');

var port = process.env.port || 3031;


gulp.task('sass', function () {
	gulp.src('./sass/**/*.scss')
		.pipe(sass().on('error', sass.logError))
		.pipe(gulp.dest('build/css'));
});

gulp.task('browserify', function () {
	gulp.src('js/app.jsx')
		.pipe(browserify({
			transform: ['babelify', 'reactify']
		}))
		.pipe(rename('app.js'))
		.pipe(gulp.dest('build'));
});

gulp.task('open', function(){
	var options = {
		url: 'http://localhost:' + port
	};

	gulp.src('index.html')
	.pipe(open('', options));
});

gulp.task('connect', function () {
	connect.server({
		hostname: 'localhost',
		port: port,
		livereload: true
	});
});

gulp.task('jsx', function() {
	gulp.src('js/**/*.jsx')
		.pipe(connect.reload());
});

gulp.task('html', function(){
	gulp.src('*.html')
	.pipe(connect.reload());
});

gulp.task('watch', function () {
	gulp.watch(['js/**/*.js', 'js/**/*.jsx'], function () {
		gulp.start('browserify');
	});
	gulp.watch('sass/**/*.scss', ['sass']);

	gulp.watch('index.html', ['html']);
	gulp.watch('js/**/*.jsx', ['jsx']);
});

gulp.task('default', ['browserify']);

gulp.task('serve', ['browserify', 'connect', 'open', 'sass' ,'watch']);