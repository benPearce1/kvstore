kvstore
=======

Key Value storage, written in nodejs, accessed via url's either in the browser, using CURL, or via code.

Url format:
Create new API key:
```
  domainname.com/init
```

Set value:
```
  domainname.com/apikey/set/key/value
```

Get value:
```
  domainname.com/apikey/get/key
```


All output is done using *text/plain*

The code is currently designed to be hosted on Windows Azure and relys on Azure Blob Storage.

If you wish to run on your own Azure instance, you will need to:
* Create a new nodejs hosted website
* Create a blob storage container 
* Create a linked resource from the website to the storage account
* On the website instance configure two app settings, with the values set to point to the Azure storage account created earlier:
  - AZURE_STORAGE_ACCESS_KEY
  - AZURE_STORAGE_ACCOUNT
  
  
