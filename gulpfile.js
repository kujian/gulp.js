// var browserify = require('browserify');  
var gulp = require('gulp');
var browserify = require('gulp-browserify');
var uglify = require('gulp-uglify');  
var browserSync = require('browser-sync').create();
var sass        = require('gulp-sass');
var reload      = browserSync.reload;

var config = {
  baseDir: 'app',
  watchFiles: [ 'app/*.html', 'app/css/*.css', 'app/js/*.js' ]
}

gulp.task('server',['sass'], function() {
  browserSync.init({
    files: config.watchFiles,
    server: {
      baseDir: config.baseDir
    }
  });
  gulp.watch("app/scss/*.scss", ['sass']);
  gulp.watch("app/script/*.js", ['js-watch']);
  gulp.watch("app/*.html").on('change', reload);
})
// scss编译后的css将注入到浏览器里实现更新
gulp.task('sass', function() {
    return gulp.src("app/scss/*.scss")
        .pipe(sass())
        .pipe(gulp.dest("app/css"))
        .pipe(reload({stream: true}));
});
// 处理完JS文件后返回流
gulp.task('js', function () {
    return gulp.src('app/script/*.js')
        .pipe(browserify())
        .pipe(uglify())
        .pipe(gulp.dest('app/js'));
});

// 创建一个任务确保JS任务完成之前能够继续响应
// 浏览器重载
gulp.task('js-watch', ['js'], browserSync.reload);
gulp.task('default',['server']); //定义默认任务
