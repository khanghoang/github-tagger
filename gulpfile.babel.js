// generated on 2016-07-24 using generator-chrome-extension 0.5.6
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import { stream as wiredep } from 'wiredep';
import webpack from 'webpack';
import getWebpackConfig from './getWebpackConfig';

let buildFlags = require('yargs')
  .boolean('production')
  .boolean('local')
  .default('local', false)
  .boolean('playstore')
  .default('playstore', false)
  .argv;

const $ = gulpLoadPlugins();

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    'app/scripts/*.js',
    'app/_locales/**',
    '!app/scripts/chromereload.js',
    '!app/scripts.babel',
    '!app/*.json',
    '!app/*.html',
  ], {
    base: 'app',
    dot: true,
  }).pipe(gulp.dest('dist'));
});

function lint(files, options) {
  return () => (
    gulp.src(files)
      .pipe($.eslint(options))
      .pipe($.eslint.format())
  );
}

gulp.task('lint', lint('app/scripts.babel/**/*.js', {
  extends: 'airbnb',
  env: {
    es6: true,
  },
  parserOptions: {
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
}));

gulp.task('webpack', cb => {
  const { production = false, local = true, playstore = false } = buildFlags;
  webpack(
    getWebpackConfig({ production, local, playstore }),
    (err) => {
      if (err) {
        throw new gutil.PluginError('webpack', err);
      }
      cb();
    });
});

gulp.task('images', () => {
  return gulp.src('app/images/**/*')
    .pipe($.if($.if.isFile, $.cache($.imagemin({
      progressive: true,
      interlaced: true,
      // don't remove IDs from SVGs, they are often used
      // as hooks for embedding and styling
      svgoPlugins: [{ cleanupIDs: false }],
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('html', () => {
  return gulp.src('app/*.html')
    .pipe($.useref({ searchPath: ['.tmp', 'app', '.'] }))
    .pipe($.if('*.html', $.htmlmin({ removeComments: true, collapseWhitespace: true })))
    .pipe(gulp.dest('dist'));
});

gulp.task('chromeManifest', () => {
  return gulp.src('app/manifest-production.json')
    .pipe($.rename('manifest.json'))
    .pipe($.chromeManifest({
      buildnumber: false,
      background: {
        target: 'scripts/background.js',
        exclude: [
          'scripts/chromereload.js',
        ],
      },
    }))
  .pipe($.if('*.css', $.cleanCss({ compatibility: '*' })))
  .pipe(gulp.dest('dist'));
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('watch', ['lint', 'webpack', 'html'], () => {
  $.livereload.listen();

  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    'app/styles/**/*',
    'app/_locales/**/*.json',
  ]).on('change', $.livereload.reload);

  gulp.watch('app/scripts.babel/**/*.js', ['lint', 'webpack']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('size', () => {
  return gulp.src('dist/**/*').pipe($.size({ title: 'build', gzip: true }));
});

gulp.task('wiredep', () => {
  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./,
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('manifest-production', function () {
  return gulp.src([
    'app/manifest-production.json',
  ], {
    base: 'app',
    dot: true,
  })
  .pipe($.rename('manifest.json'))
  .pipe(gulp.dest('dist'));
});

gulp.task('package', function () {
  const manifest = require('./dist/manifest.json');
  return gulp.src('dist/**')
      .pipe($.zip('github tagger-' + manifest.version + '.zip'))
      .pipe(gulp.dest('package'));
});

gulp.task('build', (cb) => {
  runSequence(
    'lint', 'webpack',
    ['html', 'images', 'extras'],
    'size', cb);
});

gulp.task('build-play-store', ['clean'], cb => {
  buildFlags = {
    production: true,
    local: false,
    playstore: true,
  };

  runSequence(
    'lint', 'webpack', 'chromeManifest',
    ['html', 'images', 'extras'],
    'package',
    'size', cb);
});

