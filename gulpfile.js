var gulp = require('gulp'),
    cheerio = require('gulp-cheerio'),
    svgSprite = require('gulp-svg-sprite'),
    svgmin = require('gulp-svgmin'),
    replace = require('gulp-replace'),
    sass = require('gulp-sass')(require('sass'));
const concat = require('gulp-concat');
const fileInclude = require('gulp-file-include');
const rename = require('gulp-rename');
const sourcemaps = require('gulp-sourcemaps');
const bulk = require('gulp-sass-bulk-importer');
const prefixer = require('gulp-autoprefixer');
const clean = require('gulp-clean-css');
var watch = require('gulp-watch');

var svgPaths = ['resources/**/*.svg', 'resources/**/**/*.svg']
var cssPaths = ['resources/scss/*.scss', 'resources/scss/**/*.scss', 'resources/scss/**/**/*.scss', 'resources/css/*.css', 'resources/css/**/.css', 'resources/css/**/**/.css', 'resources/lib/bootstrap/scss/bootstrap.scss']
var jsPaths = ['resources/js/*.js', 'resources/js/**/*.js', 'resources/js/**/**/*.js']
var publicPath = 'public/assets'

gulp.task('svg-sprite', function () {
    return gulp.src(svgPaths)
        // minify svg
        .pipe(svgmin({
            js2svg: {
                pretty: true
            }
        }))
        // remove all fill and style declarations in out shapes
        .pipe(cheerio({
            run: function ($) {
                $('[fill]').removeAttr('fill');
                $('[stroke]').removeAttr('stroke');
                $('[style]').removeAttr('style');
            },
            parserOptions: {xmlMode: true}
        }))
        // cheerio plugin create unnecessary string '>', so replace it.
        .pipe(replace('&gt;', '>'))
        // build svg sprite
        .pipe(svgSprite({
            mode: {
                symbol: {
                    sprite: "../sprite.svg"
                }
            }
        }))
        .pipe(gulp.dest(publicPath))
});

gulp.task('sass-compile', function () {
    return gulp.src(cssPaths)
        .pipe(sourcemaps.init())
        .pipe(bulk())
        .pipe(sass())
        .pipe(prefixer({
            overrideBrowserslist: ['last 8 versions'],
            browsers: [
                'Android >= 4',
                'Chrome >= 20',
                'Firefox >= 24',
                'Explorer >= 11',
                'iOS >= 6',
                'Opera >= 12',
                'Safari >= 6',
            ],
        }))
        .pipe(clean())
        .pipe(concat('style.css'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(publicPath))
});

gulp.task('js-compile', function () {
    return gulp.src(jsPaths)
        .pipe(sourcemaps.init())
        .pipe(concat('script.js'))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(publicPath))
});

gulp.task('watch', function () {
    gulp.watch(svgPaths, {usePolling: true}, gulp.series('svg-sprite'));
    gulp.watch(cssPaths, {usePolling: true}, gulp.series('sass-compile'));
    gulp.watch(jsPaths, {usePolling: true}, gulp.series('js-compile'));
});

gulp.task('default', gulp.series(['svg-sprite', 'sass-compile', 'js-compile']));
