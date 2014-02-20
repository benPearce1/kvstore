var fs = require('fs');

function getFileName(id)
{
	return 'data/' + id + '.json';
}

var put = function write(id, data)
{
	fs.writeFile(getFileName(id), JSON.stringify(data,null,4));
};

var get = function (id, callback)
{
	fs.readFile(getFileName(id), function(err, data) { 
		data = JSON.parse(data);
		callback(err,data); 
	});
};

exports.put = put;
exports.get = get;