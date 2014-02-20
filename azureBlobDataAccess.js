var azure = require('azure');
var blobService = azure.createBlobService();

blobService.createContainerIfNotExists('data', function(error){
    if(!error){
        // Container exists and is private
    }
});

var put = function write(id, data, callback)
{
	blobService.createBlockBlobFromText(process.env.StorageContainerName, id, JSON.stringify(data,null,4), 
		function(error) {
			if(!error)
			{
				// it worked!
			}
		});
};

var get = function (id, callback)
{
	blobService.getBlobToText(process.env.StorageContainerName, id, function(error, data, blockBlob, response) {
		data = JSON.parse(data);
		callback(error, data);
	});
};

exports.put = put;
exports.get = get;