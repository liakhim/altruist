let preprocessor = 'sass';

const { src, dest, parallel, watch } = require('gulp');
const concat = require('gulp-concat');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const autoprefixer = require('gulp-autoprefixer');
const cleancss = require('gulp-clean-css');
const fs = require("file-system");
const gulpRigger = require('gulp-rigger')
// TODO: расскоментировать для сжатия
// function compress(b, method = null) {
//     switch (method) {
//         case 'brotli':
//             return b.pipe(brotli.compress({
//                 extension: 'brotli',
//                 skipLarger: true,
//                 // the options are documented at https://nodejs.org/docs/latest-v10.x/api/zlib.html#zlib_class_brotlioptions
//                 params: {
//                     // brotli parameters are documented at https://nodejs.org/docs/latest-v10.x/api/zlib.html#zlib_brotli_constants
//                     [zlib.constants.BROTLI_PARAM_QUALITY]: zlib.constants.BROTLI_MAX_QUALITY,
//                 },
//             }));
//         case 'gzip':
//             return b.pipe(gzip({ threshold: 1024 }));
//         default:
//             return b;
//     }
// }
function browsersync() {
    browserSync.init({ // Инициализация Browsersync
        server: { baseDir: './' }, // Указываем папку сервера
        notify: false, // Отключаем уведомления
        online: true // Режим работы: true или false
    })
}


function html () {
    // пока доступна только одна вложенность (больше не требуется)
    // если нужно - переделать на рекурсию
    // получаем всё что внутри папки
    const childs = fs.readdirSync('src/pages/');
    childs.forEach(item => {
        // проверяем папка это или файл html
        if (item.split('.').length > 1 && item.split('.')[item.split('.').length - 1] === 'html') {
            src('src/pages/' + item) // источник
                .pipe(gulpRigger()) // прогоняем через rigger
                .pipe(dest('./')) // выгружаем
        } else {
            // получаем всё что внутри вложенной папки
            const folderChilds = fs.readdirSync('src/pages/' + item + '/');
            folderChilds.forEach(it => {
                src('src/pages/' + item + '/' + it) // источник
                    .pipe(gulpRigger()) // прогоняем через rigger
                    .pipe(dest('pages/' + item + '/')) // выгружаем
            })
        }
    })
    // browserSync.reload()
}

function styles(method=null) {
    let b = src(['src/scss/main.scss']) // источник
        .pipe(eval(preprocessor)()) // преобразуем значение переменной "preprocessor" в функцию
        .pipe(concat('app.min.css')) // конкатенируем в файл app.min.js
        .pipe(autoprefixer({ overrideBrowserslist: ['last 10 versions'], grid: true })) // префиксы
        // TODO: расскоментировать для сжатия
        .pipe(cleancss( { level: { 1: { specialComments: 0 } }/* , format: 'beautify' */ } ))
        .pipe(dest('dist/css/')); // папка выгрузки
    return b;
    // return compress(b, method)
    //     .pipe(dest('assets/css/'))
    //     // .pipe(browserSync.stream()) // перезагружаем
}

function startwatch() {
    watch('src/scss/**/*').on('change', styles);
    watch('src/pages/**/*').on('change', html);
    watch('src/html-modules/*.html').on('change', html);
}

exports.build = parallel(styles, html);
exports.default = parallel(styles, html, browsersync, startwatch);
