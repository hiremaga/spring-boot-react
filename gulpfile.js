'use strict';

const browserify = require('browserify');
const buffer = require('vinyl-buffer');
const globby = require('globby');
const gulp = require('gulp');
const $ = require('gulp-load-plugins')();
const source = require('vinyl-source-stream');
const through = require('through2');
const watchify = require('watchify');

gulp.task('js', function () {
    var b = browserify({
        entries: 'src/main/js/application.js',
        debug: true
    });

    return transformStream(b.bundle())
        .pipe(gulp.dest('target/classes/static/js'));
});

gulp.task('jasmine', function () {
    var bundledStream = through();

    transformStream(bundledStream)
        .pipe($.jasmineBrowser.specRunner({console: true}))
        .pipe($.jasmineBrowser.headless());

    globby(['src/main/js/*.js', 'src/test/js/**/*_spec.js']).then(function(entries) {
        var b = browserify({
            entries: entries,
            debug: true
        });

        b.external('react/addons');
        b.external('react/lib/ReactContext');
        b.external('react/lib/ExecutionEnvironment');

        b.bundle().pipe(bundledStream);
    }).catch(function(err) {
        bundledStream.emit('error', err);
    });

    return bundledStream;
});

function transformStream(stream) {
    return stream
        .pipe(source('application.js'))
        .pipe(buffer())
        .pipe($.sourcemaps.init({loadMaps: true}))
        .pipe($.uglify())
        .on('error', $.util.log)
        .pipe($.sourcemaps.write('./'));
}
