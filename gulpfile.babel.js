// generated on 2016-07-24 using generator-chrome-extension 0.5.6
import gulp from 'gulp';
import gulpLoadPlugins from 'gulp-load-plugins';
import del from 'del';
import runSequence from 'run-sequence';
import {stream as wiredep} from 'wiredep';
import webpack from 'webpack';
import path from 'path';

var query = {
  presets: ['react', 'es2015']
}

const $ = gulpLoadPlugins();

gulp.task('extras', () => {
  return gulp.src([
    'app/*.*',
    'app/_locales/**',
    '!app/scripts.babel',
    '!app/*.json',
    '!app/*.html',
  ], {
    base: 'app',
    dot: true
  }).pipe(gulp.dest('dist'));
});

function lint(files, options) {
  return () => {
    return gulp.src(files)
      .pipe($.eslint(options))
      .pipe($.eslint.format());
  };
}

gulp.task('lint', lint('app/scripts.babel/**/*.js', {
  extends: 'airbnb',
  env: {
    es6: true
  },
  parserOptions: {
    sourceType: 'module'
  },
  plugins: [
    'react'
  ]
}));

gulp.task('webpack', cb => {
  webpack({
    context: __dirname,
    entry: {
      popup: './app/scripts.babel/popup.js'
    },
    output: {
      path: path.join(__dirname, "dist/scripts"),
      filename: '[name].js',
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          // babel
          test: /\.js/,
          exclude: /node_modules/,
          loaders: ['babel-loader?'+JSON.stringify(query)],
          include: __dirname
        },
        {
          test: /\.html$/,
          loader: "file?name=[name].[ext]",
        },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.png$/, loader: "url-loader?limit=100000" },
        { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: "url-loader?limit=100000"},
        { test: /\.(jpg|gif)$/, loader: "file-loader" }
      ]
    },
  }, (err, stats) => {
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
      svgoPlugins: [{cleanupIDs: false}]
    }))
    .on('error', function (err) {
      console.log(err);
      this.end();
    })))
    .pipe(gulp.dest('dist/images'));
});

gulp.task('html',  () => {
  return gulp.src('app/*.html')
    .pipe($.useref({searchPath: ['.tmp', 'app', '.']}))
    // .pipe($.sourcemaps.init())
    // .pipe($.if('*.js', $.uglify()))
    // .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
    // .pipe($.sourcemaps.write())
    .pipe($.if('*.html', $.htmlmin({removeComments: true, collapseWhitespace: true})))
    .pipe(gulp.dest('dist'));
});

gulp.task('chromeManifest', () => {
  return gulp.src('app/manifest.json')
    .pipe($.chromeManifest({
      buildnumber: true,
      background: {
        target: 'scripts/background.js',
        exclude: [
          'scripts/chromereload.js'
        ]
      }
  }))
  .pipe($.if('*.css', $.cleanCss({compatibility: '*'})))
  .pipe($.if('*.js', $.sourcemaps.init()))
  .pipe($.if('*.js', $.uglify()))
  .pipe($.if('*.js', $.sourcemaps.write('.')))
  .pipe(gulp.dest('dist'));
});

gulp.task('webpack-dev', cb => {
  webpack({
    context: __dirname,
    entry: {
      popup: './app/scripts.babel/popup.js'
    },
    output: {
      path: path.join(__dirname, "app/scripts"),
      filename: '[name].js',
    },
    devtool: 'source-map',
    module: {
      loaders: [
        {
          // babel
          test: /\.js/,
          exclude: /node_modules/,
          loaders: ['babel-loader?'+JSON.stringify(query)],
          include: __dirname
        },
        {
          test: /\.html$/,
          loader: "file?name=[name].[ext]",
        },
        { test: /\.css$/, loader: "style-loader!css-loader" },
        { test: /\.png$/, loader: "url-loader?limit=100000" },
        { test: /\.(ttf|otf|eot|svg|woff(2)?)$/, loader: "url-loader?limit=100000"},
        { test: /\.(jpg|gif)$/, loader: "file-loader" }
      ]
    },
  }, (err, stats) => {
    if (err) {
      throw new gutil.PluginError('webpack', err);
    }

    cb();
  });
});

gulp.task('clean', del.bind(null, ['.tmp', 'dist']));

gulp.task('watch', ['lint', 'webpack', 'webpack-dev', 'html'], () => {
  $.livereload.listen();

  gulp.watch([
    'app/*.html',
    'app/scripts/**/*.js',
    'app/images/**/*',
    'app/styles/**/*',
    'app/_locales/**/*.json'
  ]).on('change', $.livereload.reload);

  gulp.watch('app/scripts.babel/**/*.js', ['lint', 'webpack', 'webpack-dev']);
  gulp.watch('bower.json', ['wiredep']);
});

gulp.task('size', () => {
  return gulp.src('dist/**/*').pipe($.size({title: 'build', gzip: true}));
});

gulp.task('wiredep', () => {
  gulp.src('app/*.html')
    .pipe(wiredep({
      ignorePath: /^(\.\.\/)*\.\./
    }))
    .pipe(gulp.dest('app'));
});

gulp.task('package', function () {
  var manifest = require('./dist/manifest.json');
  return gulp.src('dist/**')
      .pipe($.zip('github tagger-' + manifest.version + '.zip'))
      .pipe(gulp.dest('package'));
});

gulp.task('build', (cb) => {
  runSequence(
    'lint', 'webpack', 'webpack-dev', 'chromeManifest',
    ['html', 'images', 'extras'],
    'size', cb);
});

gulp.task('default', ['clean'], cb => {
  runSequence('build', cb);
});
