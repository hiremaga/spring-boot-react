var gulp = require('gulp');
var $ = require('gulp-load-plugins')();

gulp.task('js', function () {
    gulp.src('src/main/js/application.js')
        .pipe($.browserify({
            insertGlobals : true,
            debug : !gulp.env.production
        }))
        .pipe(gulp.dest('target/classes/static/js'))
});
