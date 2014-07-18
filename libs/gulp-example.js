var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var gulp = require('gulp');
var through = require('through2');
var marked = require('marked');
var ejs = require('ejs');
var gutil = require('gulp-util');
var File = gutil.File;


function gulp_example(file, encoding, callback){
// add new source map file to stream
  var exampleDir = path.join(__dirname, "..", "resource/example");
  var folders = fs.readdirSync(exampleDir);
  var self = this;
  var template = fs.readFileSync( path.join(__dirname,"..", "template/common/example.ejs") ,'utf8');
  ejs.clearCache();
  var examples = folders.forEach(function(name){
    var content = fs.readFileSync(path.join(exampleDir, name, 'README.md'), "utf8");
    var file = new File({
      path: path.join(__dirname, "..", "examples", name+".html"),
      contents: new Buffer(
        ejs.render(template, {
          cache: false,
          content: marked(content),
          filename: path.join(__dirname,"..", "template/common/"+name+".ejs")
        })
      )
    });
    self.push(file);
  })
  callback();
}

module.exports = through.obj(gulp_example);