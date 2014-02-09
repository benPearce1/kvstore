// var http = require('http');
// var port = process.env.port || 80
// http.createServer(function (req, res) {
  // res.writeHead(200, {'Content-Type': 'text/plain'});
  // res.end("hello from azure");
// }).listen(port);
// console.log('Server running at http://127.0.0.1:1337/');

var http = require('http');
http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  res.end('Hello World\n');
}).listen(1337, '127.0.0.1');
console.log('Server running at http://127.0.0.1:1337/');