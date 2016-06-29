import gulp from 'gulp';
import sass from 'gulp-sass';
import htmlmin from 'gulp-htmlmin';
import watch from 'gulp-watch';
import minifyCss from 'gulp-minify-css';
import sourcemaps from 'gulp-sourcemaps';
import rename from 'gulp-rename';

const dirs = {
  src: 'client',
  dest: 'public'
}

const {src, dest} = dirs;

const paths = {
  moveAssets: {
    src: './assets/**/*',
    dest: `./${dest}/assets`
  },
  sassToCSS: {
    src: `./${src}/scss/main.scss`,
    newName: 'style.css',
    dest: `./${dest}/css`
  },
  unCSS: {
    src: `./${dest}/css/style.css`,
    html: [`./${src}/*.html`],
    dest: `./${dest}/css`,
    ignore: []
  },
  minifyCSS: {
    src: `./${src}/css/style.css`,
    newName: 'style.min.css',
    dest: `./${dest}/css`
  },
  html: {
    src: `./${src}/*.html`,
    dest: `${dest}`
  },
  scss: {
    src: `./${src}/scss/main.scss`, 
    dest: `./${dest}/css`,
    watch: [
      `./${src}/scss/**/*.scss`
    ]
  }
};

gulp.task('moveAssets', () => {
  return gulp.src(paths.moveAssets.src)
    .pipe(gulp.dest(paths.moveAssets.dest));
});

gulp.task('moveHTML', () => {
  return gulp.src(paths.html.src)
    .pipe(gulp.dest(paths.html.dest));
});

gulp.task('minifyHTML', ['moveHTML'], () => {
  return gulp.src(paths.html.src)
    .pipe(htmlmin({collapseWhitespace: true}))
    .pipe(gulp.dest(paths.html.dest));
});

gulp.task('sassToCSS', () => {
  return gulp.src(paths.sassToCSS.src)
    .pipe(sourcemaps.init())
    .pipe(sass().on('error', sass.logError))
    .pipe(sourcemaps.write())
    .pipe(rename(paths.sassToCSS.newName))
    .pipe(gulp.dest(paths.sassToCSS.dest));
});

gulp.task('minifyCSS', ['sassToCSS'], () => {
  return gulp.src(paths.minifyCSS.src)
    .pipe(minifyCss())
    .pipe(rename(paths.minifyCSS.newName))
    .pipe(gulp.dest(paths.minifyCSS.dest));
});

gulp.task('watch', () => {
  gulp.watch(paths.moveAssets.src, ['moveAssets']);
  gulp.watch(paths.html.src, ['moveHTML']);
  gulp.watch(paths.scss.watch, ['sassToCSS']);
});

gulp.task('default', ['moveAssets', 'moveHTML', 'sassToCSS', 'watch']);
gulp.task('build', ['moveAssets', 'minifyHTML', 'minifyCSS']);