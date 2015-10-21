var gulp = require('gulp'),
  react = require('gulp-react');

gulp.task('jsx-trans', function() {
  return gulp.src('app/scripts/components/*.jsx')
    .pipe(react())
    .pipe(gulp.dest('app/build/components'));
})

gulp.task('watch', function() {
  gulp.watch('app/scripts/components/*.jsx', ['jsx-trans']);
});
