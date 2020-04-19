const del               = require('del');
const gulp              = require('gulp');
const path              = require('path');
const gulpLoadPlugins   = require('gulp-load-plugins');

const plugins = gulpLoadPlugins();

const paths = {
    js: ['src/**/*.js', '!dist/**', 'src/bin/**', '!node_modules/**', '!coverage/**'],
    nonJs: ['src/config/*.json', 'src/**/*.proto'],
    tests: 'src/tests/*.js'
};

// Clean up dist and coverage directory
gulp.task('clean', async () =>
    del(['dist/**', 'coverage/**', '!dist', '!coverage'])
);

// Copy non-js files to dist
gulp.task('copy', async () =>
    gulp.src(paths.nonJs,  { base: 'src' })
        .pipe(plugins.newer('dist'))
        .pipe(gulp.dest('dist'))
);

// Compile ES6 to ES5 and copy to dist
gulp.task('babel', async () =>
    gulp.src([...paths.js, '!gulpfile.babel.js'], { base: 'src' })
        .pipe(plugins.newer('dist'))
        .pipe(plugins.sourcemaps.init())
        .pipe(plugins.babel())
        .pipe(plugins.sourcemaps.write('.', {
            includeContent: false,
            sourceRoot(file) {
                return path.relative(file.path, __dirname);
            }
        }))
        .pipe(gulp.dest('dist'))
);

// default task: clean dist, compile js files and copy non-js files.
gulp.task('default', gulp.series('clean', 'copy', 'babel'));