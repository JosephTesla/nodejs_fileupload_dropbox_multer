module.exports = function(app){
    var core = require('./../controllers/core.controller');

    app.route('/').get(core.home);
    
    app.post('/upload', core.fileUploadMulter);   // file upload using multer
};