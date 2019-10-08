var gulp = require('gulp');
var sass = require('gulp-sass');
var browserSync = require('browser-sync');
var clean = require('gulp-clean');
var express = require('express')
var nodemon = require('gulp-nodemon');

// gulp bundle 

gulp.task('sass', function() {
    return gulp.src('scss/**/*.scss')
        .pipe(sass())
        .pipe(gulp.dest('css'))
        .pipe(browserSync.stream({ match: '**/*.css' }));
})

gulp.task('reload', function(done) {
    browserSync.reload();
    done();
})

gulp.task('watch', function() {
    browserSync.create();
    browserSync.init({
        injectChanges: true,
        notify: false,
        server: {
            baseDir: "./"
        }
    });
    gulp.watch('scss/**/*.scss', gulp.series('sass'));
    gulp.watch(['**/*.html', 'js/**/*.js'], gulp.series('reload'));
})

gulp.task('nodemon', function (cb) {
    
    var started = false;
    
    return nodemon({
        script: 'server.js'
    }).on('start', function () {
        if (!started) {
            cb();
            started = true; 
        } 
    });
});

gulp.task('pack-js', function() {
    return gulp.src(['./js/**/*.js'])
        .pipe(gulp.dest('dist/js'));
});

gulp.task('pack-css', function() {
    return gulp.src(['./css/**/*.css'])
        .pipe(gulp.dest('dist/css'));
});

gulp.task('pack-html', function() {
    return gulp.src(['./**/*.html', '!node_modules/**/*', '!dist/**/*'])
        .pipe(gulp.dest('dist'));
});

gulp.task('clean', function() {
    return gulp.src('./dist', { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task('bundle', gulp.series(['clean', 'sass', 'pack-js', 'pack-css', 'pack-html', 'nodemon']))