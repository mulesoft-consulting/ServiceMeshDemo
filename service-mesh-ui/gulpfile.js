var gulp = require('gulp');
var sass = require('gulp-sass');
var header = require('gulp-header');
var browserSync = require('browser-sync').create();
var clean = require('gulp-clean');
var argv = require('minimist')(process.argv.slice(2));
//parameterize initialization
//run delete of dist before bundling

console.log("CUSTOMER_URL is: ", argv.c);
console.log("PAYMENT_URL is: ", argv.p);
console.log("ORDER_URL is: ", argv.o);

// gulp  bundle -c "http://52.168.30.92:8080" -o "http://52.224.219.48:8080" -p "http://40.114.70.224:8080"

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

gulp.task('serve', function() {
    browserSync.init({
        injectChanges: true,
        notify: false,
        server: {
            baseDir: "./dist"
        }
    });
})

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

gulp.task('inject-url', function() {
    return gulp.src(['./dist/js/main.js'])
        .pipe(header("var CUSTOMER_URL = '" + argv.c + "';"))
        .pipe(header("var PAYMENT_URL = '" + argv.p + "';"))
        .pipe(header("var ORDER_URL = '" + argv.o + "';"))
        .pipe(gulp.dest('./dist/js/'));
})

gulp.task('clean', function() {
    return gulp.src('./dist', { read: false, allowEmpty: true })
        .pipe(clean());
});

gulp.task('bundle', gulp.series(['clean', 'sass', 'pack-js', 'inject-url', 'pack-css', 'pack-html', 'serve']))