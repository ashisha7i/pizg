const gulp = require('gulp');
const uglify = require('gulp-uglify');
const imagemin = require('gulp-imagemin');
const zip = require('gulp-zip');
const clean = require('gulp-clean');

const localDist = './localdist';
const webStoreZipDest = './dist';

gulp.task('cleanDists', (a) => {
  /* gulp.src('./dist/**', { read: false }).pipe(clean());
  gulp.src('./localdist/**', { read: false }).pipe(clean()); */
  console.log('Clean Dists Commentd For Now');
  a();
});

gulp.task('minify', (a) => {
  gulp.src(['./content.js','./popup.js'])
    .pipe(uglify().on('error', function(e){
      console.log(e); }))
    .pipe(gulp.dest(localDist));
  a();
});

gulp.task('copyStatic', (a) => {
  gulp.src(['./jquery*.min.js', './base64js.min.js', './pako.min.js', './vkbeautify.js', './*.html','./README', './manifest.json'])
    .pipe(gulp.dest(localDist));
  a();
});

gulp.task('imageMin', (a) => {
  gulp.src('./icon*.png').pipe(imagemin()).pipe(gulp.dest(localDist));
  a();
});

gulp.task('zipAsIs', (a) => {
  gulp.src(['./**', '!./localdist/**', '!./dist','!./node_modules/**', '!./package*.json', '!./gulpfile.js'])
    .pipe(zip('PIZG.zip'))
    .pipe(gulp.dest(webStoreZipDest));
  a();
});

gulp.task('default', gulp.series('cleanDists', 'zipAsIs', 'minify', 'imageMin', 'copyStatic'));