Uploading File Using Multer with Nodejs and Jquery
=========
Uploading File into Dropbox with Nodejs and Jquery
=========

### Description:
This program will show you how to upload file into local storage and dropbox using nodejs and jquery.

**Running the application**

To run this application you must install nodejs and mongodb in your computer.

**Mongodb running**
```
sudo service start mongodb
```

**Server running**
```
npm install nodemon
nodemon app.js
```
After starting **mongodb** and running the **server** open your browser and goto http://localhost.com:3000 or http://127.0.0.1:3000. Then you will see this page as home page.

![Web App Demo](https://dl.dropbox.com/s/23d8f8744blmozb/filupload.png?dl=0)

### Multer File Uploading:

In **multer** file upload, you don't need to input any access token. Just insert a **caption** and select any **file (*here photo to show image thumbnails*)**, then click on the **Upload** button.

## Here is a demo

![File upload demo](https://dl.dropbox.com/s/xpbba15bk4gfpao/uploadimage.png?dl=0)

## Codes

**HTML Form**
```html
<form class="form-control" enctype="multipart/form-data">
  <input type="text" class="input-form" name="accesstoken" id="token" placeholder="Access token">
  <input type="text" class="input-form" name="caption" id="caption" placeholder="Photo caption">
  <input type="file" class="input-form" name="file" onchange="previewPhoto()" id="file">
  <button type="submit" class="upload-btn" id="upload-btn">Upload</button>
  <button type="submit" class="upload-btn" id="dropbox-btn">Dropbox Upload</button>
</form>
```

**Jquery**
```javascript
$('#upload-btn').click(function(){
    var inputFile = $('#file')[0].files[0];
    var formData = new FormData();
    formData.append('file', inputFile, inputFile.name);
    formData.append('caption', $('#caption').val());
    
    $.ajax({
        type: 'POST',
        url: '/upload',
        data: formData,
        processData: false,
        contentType: false,
        success: function(){
            alert('File uploaded!');
            location.reload();
        }
    });
    return false;
});
```
Since we are uploading files thats mean we can't pass the json object to the nodejs. So we are using **formData** here to pass the file.

**Nodejs**
```javascript
var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public/upload');
    },
    filename: function(req, file, callback){
        var filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        callback(null, filename);
    }
});

module.exports.fileUploadMulter = function(req, res, next){
    var upload = multer({
        storage: storage
    }).single('file')

    upload(req, res, function(err){
        if(err){
            console.log(err);
        }else {
            var src = '/upload/' + req.file.filename;
            var data = {caption: req.body.caption, src: src};
            var photo = new Photo(data);

            photo.save(function(err, data){
                if(err) throw err;
                res.json(data); 
            });
        }
    });
};
```
These lines of code below are storing the form input into mongodb
```javascript
var src = '/upload/' + req.file.filename;
var data = {caption: req.body.caption, src: src};
  var photo = new Photo(data);
  photo.save(function(err, data){
    if(err) throw err;
    res.json(data); 
  });
```

### Dropbox File Uploading:

For dropbox file uploading first you need to create an app console in Dropbox API.

Link: https://www.dropbox.com/developers/apps

Now create an app and generate the access token. Some screenshot might help you..

**Step 1:**
![Dropbox App Concole](https://dl.dropbox.com/s/za6chfbyf6n2ex6/db0.png?dl=0)

**Step 2:**
![Dropbox App Console](https://dl.dropbox.com/s/2o402oeqxehu8o3/db1.png?dl=0)

**Step 3:**
![Dropbox App Console](https://dl.dropbox.com/s/l59zypamo37skxg/db2.png?dl=0)

**Step 4:**
![Dropbox App Console](https://dl.dropbox.com/s/ttsmvxp3cv2a7hm/db3.png?dl=0)

After generating the **Access Token** copy it and paste it into **Access Token** then Select a **file** and click on the **Dropbox Upload** button. Then you will see a success message and check dropbox app folder. The fill will be uploaded.

## Here is a demo

**Upload file**
![Dropbox upload](https://dl.dropbox.com/s/p7y8ikgmsdvwkk1/dropbox_1.png?dl=0)

**Check it in your dropbox folder**
![Dropbox upload](https://dl.dropbox.com/s/w72i4cwgol4u8sy/honululu.png?dl=0)


## Code:

**Html form**

Same as Multer

**Jquery**
```javascript
// upload to dropbox
$('#dropbox-btn').click(function(){
    var ACCESS_TOKEN = $('#token').val();
    console.log(ACCESS_TOKEN);
    var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });
    var file = $('#file')[0].files[0];
    dbx.filesUpload({ path: '/' + file.name, contents: file }).then(function (response) {
        console.log(response);
        alert('Successfully uploaded!');
        
        // getSrc(db.id);
        
    }).catch(function (error) {
        alert(error);
        console.error(error);
    });
    return false;
});
```
This line of code below, here the path is root of your app folder. To upload into any specific folder you must create a folder in the app folder then change the path to `{path: '/<< your folder name>>'}`. In demo the file is uploaded into dropbox folder inside app folder.

```
 dbx.filesUpload({ path: '/' + file.name, contents: file }).then(function (response) {
```
**Nodejs**

No nodejs code for dropbox now. **Coming soon...**
