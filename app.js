var Video = require('./models/video');
var express = require('express');
var app = express();
var routing = require('./routes/movies');
var bodyParser = require('body-parser');



// video.findAll().then(videos => {
//     console.log(videos);
// });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use('/api', routing);

module.exports = app;