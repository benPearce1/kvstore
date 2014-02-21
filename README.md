kvstore
=======

Key Value storage, written in nodejs, accessed via url's either in the browser, using CURL, or via code.

Url format:
Create new API key:
```
  hostname/init
```

Set value:
```
  hostname/apikey/set/key/value
```
Value can also be passed as data in a PUT request.

Calling via CURL:
```
  curl localhost/apikey/init
    - returns **apikey**

  curl localhost/apikey/set/keyname/value
  
  curl -d "posted data" -X POST localhost/apikey/set/keyname 

  curl -d @filename -X POST localhost/apikey/set/keyname 
 
```


Get value:
```
  domainname.com/apikey/get/key
```

All output is done using *text/plain*

Two storage modules are available: file and azure blob storage.

Configure the appropriate storage module by editing the storage configuration at the top of the server.js file.


If you wish to run on your own Azure instance, you will need to:
* Create a new nodejs hosted website
* Create a blob storage container 
* Create a linked resource from the website to the storage account
* On the website instance configure the following app settings, with the values set to point to the Azure storage account created earlier:
  - AZURE_STORAGE_ACCESS_KEY
  - AZURE_STORAGE_ACCOUNT
  - StorageContainerName

  
Data configuartion requires a *data* directory in the same directory as the server.js file.  
