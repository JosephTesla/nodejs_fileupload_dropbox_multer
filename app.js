var express = require('express');
var bodyParser = require('body-parser');

var app = express();

var port = 3000;
var host = '127.0.0.1';

app.set('view engine', 'ejs');
app.use(express.static('./public'));
app.use(bodyParser.urlencoded({extended: true}));

require('./routes/core.routes.js')(app);

app.listen(port, host, function(){
    console.log(`Listening to http://${host}:${port}`);
});