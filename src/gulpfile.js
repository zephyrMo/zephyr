const gulp = require('gulp');
const sass = require('gulp-sass');
const Sync = require('browser-sync');
sass.compiler = require('node-sass');
const watch = require('gulp-watch')

gulp.task('compile',function(){
    gulp.src('./sass/*.scss')
    .pipe(sass({outputStyle:'expanded'})
    .on('error',sass.logError))
    .pipe(gulp.dest('./css'))
})
// 静态服务器
gulp.task('server',function(){
	Sync({
		// 服务器路径
		// server:'./',
		// 代理服务器，必须绑定到当前服务器路径一致
		proxy:'http://bookuu:8080/html/shouye.html',
		// 端口
		port:2323,
		// 监听文件修改，自动刷新
		files:['./**/*.html','./css/*.css']
	});
	// 监听sass文件修改，并自动编译
    watch('./sass/*.scss',gulp.series('compile'))
})

