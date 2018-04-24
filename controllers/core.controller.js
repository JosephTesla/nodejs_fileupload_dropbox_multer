var multer = require('multer');
var path = require('path');
var Photo = require('./../models/Photo.js');
var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/photolist');

var storage = multer.diskStorage({
    destination: function(req, file, callback){
        callback(null, './public/upload');
    },
    filename: function(req, file, callback){
        var filename = file.fieldname + '-' + Date.now() + path.extname(file.originalname);
        callback(null, filename);
    }
});

// var data = [{caption: 'Photo', src: '/upload/file-1524515555196.png'},
//             {caption: 'Photo', src: '/upload/file-1524515567531.png'},
//             {caption: 'Photo', src: '/upload/file-1524515572833.png'},
//             {caption: 'Photo', src: '/upload/file-1524515578826.jpg'}];

module.exports.home = function(req, res){
    Photo.find(function(err, data){
        if(err){
            console.log(err);
        }else{
            res.render('./../public/views/index.ejs', {photos: data});
        }
    })
};

// multer upload
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
                // res.status(200).send(data);
            });
        }
    });
};