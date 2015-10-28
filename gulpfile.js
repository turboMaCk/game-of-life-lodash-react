var gulp = require('gulp');
var watch = require('gulp-watch');
var browserify = require('browserify');
var babelify = require('babelify');
var source = require('vinyl-source-stream');

gulp.task('build', function () {
  browserify({
    entries: 'src/app.jsx',
    extensions: ['.jsx'],
    debug: true
  })
  .transform(babelify)
  .bundle()
  .pipe(source('bundle.js'))
  .pipe(gulp.dest('tmp'));
});

gulp.task('watch', function() {
  gulp.start('build')
  gulp.watch('src/**', ['build']);
  gulp.watch('tests/**', ['test']);
});

gulp.task('default', ['build', 'watch']);
