let fs = require("fs");
let path = require("path");
let config = require("./deploy.config");
let cr = require("./copyRecursive");

let source = config.source;
let target = config.target;

if (!fs.lstatSync(source).isDirectory() || !fs.lstatSync(target).isDirectory())
  return;

fs.promises.rmdir(target, { recursive: true }).then(() => {
  files = fs.readdirSync(source);
  files.forEach(function(file) {
    var curSource = path.join(source, file);
    if (fs.lstatSync(curSource).isDirectory()) {
      cr.copyFolder(curSource, target);
    } else {
      var curTarget = path.join(target, file);
      cr.copyFile(curSource, curTarget);
    }
  });
});
