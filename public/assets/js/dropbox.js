// upload to dropbox
$('#dropbox-btn').click(function(){
    var ACCESS_TOKEN = $('#token').val();
    console.log(ACCESS_TOKEN);
    var dbx = new Dropbox.Dropbox({ accessToken: ACCESS_TOKEN });
    var file = $('#file')[0].files[0];
    dbx.filesUpload({ path: '/dropbox/' + file.name, contents: file }).then(function (response) {
        console.log(response);
        alert('Successfully uploaded!');
        
        // getSrc(db.id);
        
    }).catch(function (error) {
        alert(error);
        console.error(error);
    });
    return false;
});