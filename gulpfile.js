'use strict';
var gulp = require( 'gulp' );
var rename = require('gulp-rename');
var header = require('gulp-header');
var uglify = require('gulp-uglify');
var minifyCss = require('gulp-minify-css');
var util= require( 'gulp-util' );
var concat = require('gulp-concat');
var GulpSSH = require('gulp-ssh');

var CSS="./css/";
var DIST="./dist/";
var JSPuth="./js/";
var DISTJS=DIST+'js/';
var DISTCSS=DIST+'css/';

var Version='1.0.0';    //版本号
var Author='Junr';      //作者
var buildDate = util.date(Date.now(), 'isoDate')+" "+util.date(Date.now(), 'isoTime');         //更新时间
var banner = '/*\n * Junr.me '+Version+'\n * '+buildDate+'\n * Copyright (c) 2016 Licensed MIT <> \n */ \n';

//测试环境发布参数
var config = {
    host: '192.168.10.107',
    port: 22,
    username: 'kbang',
    password: 'kbang@kbang'
}

var gulpSSH = new GulpSSH({
    ignoreErrors: false,
    sshConfig: config
})
gulp.task('ftp', function () {
    return gulp
        .src(['./dist/*/*'])
        .pipe(gulpSSH.dest('/home/kbang/'))
})
gulp.task('JS', function() {
    return gulp.src(JSPuth+'*.js')
        //.pipe(ngmin({dynamic: false}))
        //.pipe(stripDebug())
        .pipe(concat('base.min.'+Version+'.js'))
        .pipe(uglify({outSourceMap: false}))
        .pipe(header(banner))
        .pipe(gulp.dest(DISTJS));
});
gulp.task('CSS', function() {
    gulp.src(CSS+'*.css')
        .pipe(concat('base.min.'+Version+'.css'))
        .pipe(minifyCss({
            advanced: true
        }))
        .pipe(header(banner))
        .pipe(gulp.dest(DISTCSS));
});
gulp.task('default', ['JS','CSS']);