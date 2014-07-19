var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var gulp = require('gulp');
var through = require('through2');
var marked = require('marked');
var ejs = require('gulp-ejs');
var gutil = require('gulp-util');
var File = gutil.File;
var example = require('./libs/gulp-example.js');


gulp.task('build', function(){
  // var exampleDir = path.join(__dirname, "resource/example")
  // var folders = fs.readdirSync(exampleDir);
  // var examples = folders.forEach(function(name){
  //   var file = fs.readFileSync(path.join(exampleDir, name));
  //   return {
  //     title: marked(file)
  //   }
  // })
  gulp.src('./template/*.ejs')
    .pipe(ejs({
      examples: [],
      msg: 'Hello Gulp!'
    }))
    .on('error', gutil.log)
    .pipe(gulp.dest('./'));

  gulp.src('./template/common/example.ejs')
    .pipe(example)
    .on('error', gutil.log)
      .pipe(gulp.dest('./'));


})


gulp.task('dev', function(){
  gulp.watch(['./template/**/*.ejs', "./resource/example/**/*.md"], ['build'])

})
