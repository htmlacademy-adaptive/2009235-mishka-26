import gulp from 'gulp';
import plumber from 'gulp-plumber';
import sass from 'gulp-dart-sass';
import postcss from 'gulp-postcss';
import rename from 'gulp-rename';
import cssmin from 'postcss-csso';
import htmlmin from 'gulp-htmlmin';
import autoprefixer from 'autoprefixer';
import browser from 'browser-sync';
import terser from 'gulp-terser';
import squoosh from 'gulp-libsquoosh';
import svgmin from 'gulp-svgmin';
import svgstore from 'gulp-svgstore';
import del from 'del';
import concat from 'gulp-concat';
import fileinclude from 'gulp-file-include';

const styles2 = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true })
    .pipe(plumber())
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([
      autoprefixer()
    ]))
    .pipe(gulp.dest('source/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// Styles
const styles = () => {
  return gulp.src('source/sass/style.scss', { sourcemaps: true }) //style.scss
    .pipe(plumber()) //отвечает за обработку ошибок
    .pipe(sass().on('error', sass.logError))
    .pipe(postcss([ //style.css
      autoprefixer(), //добавление автопрефиксов
      cssmin() //сжатие style.css
    ]))
    .pipe(rename('style.min.css'))
    .pipe(gulp.dest('build/css', { sourcemaps: '.' }))
    .pipe(browser.stream());
}

// HTML
const html = () => {
  return gulp.src('source/*.html')
    .pipe(fileinclude({
      prefix: '@@',
      basepath: '@file'
    }))
    .pipe(htmlmin({ collapseWhitespace: true }))
    .pipe(gulp.dest('build'));
}

//Scripts
const scripts = () => {
  return gulp.src('source/js/*.js')
    .pipe(concat('scripts.js')) //in one file
    .pipe(terser())
    .pipe(rename({
      suffix: ".min"
    }))
    .pipe(gulp.dest('build/js'));
}

//Images@2x
const copyImages = () => {
  return gulp.src(['source/img/**/*.{jpg,png}', '!source/img/favicons/*'])
    .pipe(rename({
      suffix: "@2x"
    }))
    .pipe(gulp.dest('build/img'));
}

//Images@1x
const SmalImages = () => {
  return gulp.src(['source/img/**/*.{jpg,png}', '!source/img/favicons/*'])
    .pipe(
      squoosh((src) => ({
        preprocessOptions: {
          resize: {
            width: Math.round(src.width / 2),
            height: Math.round(src.height / 2),
          },
        },
      }))
    )
    .pipe(rename({
      suffix: "@1x"
    }))
    .pipe(gulp.dest('build/img'));
}

//WebP
const createWebp = () => {
  return gulp.src(['build/img/**/*.{jpg,png}', '!build/img/favicons/*'])
    .pipe(squoosh({
      webp: {},
    }))
    .pipe(gulp.dest('build/img'));
}

//SVG
const svg = () => {
  return gulp.src(['source/img/**/*.svg', '!source/img/icons/*.svg'])
  //return gulp.src('source/img/**/*.svg')
    .pipe(svgmin())
    .pipe(gulp.dest('build/img'));
}

const sprite = () => {
  return gulp.src('source/img/icons/*.svg')
     .pipe(svgmin())
     .pipe(svgstore({ //svg in sprite
      inlineSvg: true
     }))
     .pipe(rename('sprite.svg'))
     .pipe(gulp.dest('build/img'));
}

const copy = (done) => {
  return gulp.src([
    'source/fonts/*.{woff2,woff}',
    'source/*.ico',
    'source/manifest.webmanifest',
    'source/img/favicons/*',
], {
  base:'source'
})
  .pipe(gulp.dest ('build'))
  done();
}

const clean = (done) => {
  return del('build'); //удаляет удаленное из source в build
};


// Server
const server = (done) => {
  browser.init({
    server: {
      baseDir: 'build'
    },
    cors: true,
    notify: false,
    ui: false,
  });
  done();
}

//Reload
const reload = (done) => {
  browser.reload();
  //done();
}

// Watcher
const watcher = () => {
  gulp.watch('source/sass/**/*.scss').on('change', styles); //при изменении запустить задачу styles & reload
  gulp.watch('source/js/*.js').on('change', gulp.series(scripts, reload));
  gulp.watch('source/*.html').on('change', gulp.series(html,reload));
}


//Build (задача запускающая задачи)
//gulp.series - осущевтляет последовательный запуск задач
//gulp.parallel - рараллельное выполение задач
export const build = gulp.series(
  clean,
  copy,
  copyImages,
  SmalImages,
  gulp.parallel(
    styles,
    html,
    scripts,
    svg,
    sprite,
    createWebp
  ),
  sprite
);

//Default for gulp(для разработки)
export default gulp.series(
  clean,
  copy,
  copyImages,
  SmalImages,
  gulp.parallel(
    styles2,
    styles,
    html,
    scripts,
    svg,
    createWebp
  ),
  sprite,
  server,
  watcher
);
