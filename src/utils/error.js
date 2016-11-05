var fs = require('fs');
var request = require('request');

var options = process.argv;


if(options[2]) {
  var line = options
}else {
  console.log('input line of err');
  return;
}

function fetch(url) {
  return new Promise(function(resolve, reject) {
    request(url, function(err, res) {
      if(err) reject(err);
      resolve(res);
    })
  })
}
fetch('http://127.0.0.1:8081/index.android.bundle?platform=android&dev=true&hot=false&minify=false')
  .then(function(res, body){
    if(res.statusCode === 200) {
      let content = res.body;
      //fs.writeFileSync('error.txt', content, 'utf8');
      // 
      let lines = content.split('\n');
      //console.log(lines.length);
      let pre = lines[line-2];
      let next = lines[line];
      console.log([pre, lines[line-1], next].join('\n'));
    }else {
      console.log(res.statusCode);
    }
  })
  .catch(function(err){
    console.log(err);
  })