var http = require('http');
var port = process.env.port || 80
var store = require('./azureBlobDataAccess');
//var store = require('./fileDataAccess');

function createNewData(id)
{
	d = new Object();
	d.id = id;
	d.dict = {};
	return d;
}

function write(id, data)
{
	store.put(id,data);
}

function getParameters(u)
{
	var url = require('url');
	var url_parts = url.parse(u, true);
  
	var path = url_parts.path;
	if (path.charAt(0) == '/')
	{
		path = path.substr(1,path.length);
	}
	var a = path.split('/');
	
	return a;
}

http.createServer(function (req, res) {
	var action, name, value, apikey;

	res.writeHead(200, {'Content-Type': 'text/plain'});
	var params = getParameters(req.url);
	
	if (params.length == 0)
	{
		res.writeHead(404);
		res.end('Not found');
	}
	else
	{
		if (params[0] == 'init')
		{
			action = params[0];
		}
		else
		{
			apikey = params[0];
			action = params[1];
			name = params[2];
			if (params.length = 4)
			{
				value = params[3];
			}
		}
  
		if (action == 'init')
		{
			var uuid = require('node-uuid');
			var id = uuid.v4();
			
			write(id, createNewData(id));
			// generate new api key and storage
			res.writeHead(200);
			res.end(id);
		}
	  
		console.log('{' + apikey + '} ' + action + ' ' + name );
	  
		if (action == 'get')
		{
			store.get(apikey, function(error, data) {
				if (error)
				{
					console.log(error);
					return;
				}
			
				if (data.dict[name] != null)
				{
					res.writeHead(200);
					res.end(data.dict[name]);
				}
				else
				{
					res.writeHead(200);
					res.end();
				}
			});
		} 
		else if (action == 'set')
		{
			//lockfile.lock(apikey + '.lock',{}, function(er) { });
			store.get(apikey, function(error,data) {
				if (error)
				{
					console.log(error);
					//lockfile.unlock(apikey + '.lock',{}, function(er) { });
					return;
				}
				console.log(data)
				if (req.method == 'GET' && value != null)
				{
					// value was passed on url
					data.dict[name] = value;
					write(apikey,data);
					//lockfile.unlock(apikey + '.lock',{}, function(er) { });
					res.writeHead(200, data.dict[name]);
					res.end();
				}
				else if (req.method == 'POST')
				{
					// look for data in posted values
					req.on('data', function(chunk) { 
						data.dict[name] = chunk.toString();
						write(apikey,data);
						lockfile.unlock(apikey + '.lock',{}, function(er) { });
					});
					
					req.on('end', function() {
						res.writeHead(200);
						res.end(data.dict[name]);
					});
				}
			});
		}
	}
}).listen(port, '127.0.0.1');
console.log('Server running at http://127.0.0.1:' + port + '/');
