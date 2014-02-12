var http = require('http');
var port = process.env.port || 80
var url = require('url');
var fs = require('fs');
var azure = require('azure');
var blobService = azure.createBlobService();
blobService.createContainerIfNotExists('data', function(error){
    if(!error){
        // Container exists and is private
    }
});

function createNewData(id)
{
	d = new Object();
	d.id = id;
	d.dict = {};
	return d;
}

function getFileName(id)
{
	return 'data/' + id + '.json';
}

function write(id, data)
{
	blobService.createBlockBlobFromTest('data',id,JSON.stringify(data,null,4), 
		function(error) {
			if(!error)
			{
				// it worked!
			}
		});
	// fs.writeFile(getFileName(id), JSON.stringify(data,null,4));
}

http.createServer(function (req, res) {
  res.writeHead(200, {'Content-Type': 'text/plain'});
  var url_parts = url.parse(req.url, true);
  
  var path = url_parts.path;
  if (path.charAt(0) == '/')
  {
	path = path.substr(1,path.length);
  }
  var a = path.split('/');
  
  // check for any request parameters
  if (a.length == 0)
  {
	res.writeHead(404);
	res.end('Not found');
  }
  
  if (a[0] == 'init')
  {
	var uuid = require('node-uuid');
	var id = uuid.v4();
	
	write(id, createNewData(id));
	// generate new api key and storage
	res.writeHead(200);
	res.end(id);
  }
  
  var apikey = a[0];
  
  if (apikey.length != 36)
  {
	res.writeHead(400);
	res.end('api key error');
  }
  
  var action = a[1];
  var name = a[2];
  
  console.log('{' + apikey + '} ' + action + ' ' + name );
  
  if (action == 'get')
  {
	fs.readFile(getFileName(apikey), function(err, data) {
		if (err)
		{
			console.log(err);
			return;
		}
		data = JSON.parse(data);
	
		if (data.dict[name] != null)
		{
			res.writeHead(200);
			res.end(data.dict[name]);
		}
		else
		{
			res.writeHead(200);
			res.end();
		}});
  } 
  else if (action == 'set')
  {
	
	fs.readFile(getFileName(apikey), function(err, data) {
		if (err)
		{
			console.log(err);
			return;
		}
		
		data = JSON.parse(data);
		//console.log(data);
		data.dict[name] = a[3];
		write(apikey,data);
		res.writeHead(200);
		res.end(a[3]);
	});
	
  }
}).listen(port, '127.0.0.1');
console.log('Server running at http://127.0.0.1:' + port + '/');
