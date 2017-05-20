var express = require('express');
var router = express.Router();
var Video = require('../models/video');
var Sequelize = require('sequelize');
var fs = require('fs');

var sequelize = new Sequelize('MYTUBE', 'video_service', 'video_service', {
    host: 'localhost',
    dialect: 'mssql',
});

var video = new Video(sequelize);

router.route('/movies')
    .get(function (req, res) {
        video.findAll().then(videos => {
            res.json(videos);
        });
    })
    .post(function (request, respond) {
        console.log(request.body.json);
        video.create({
            Title: request.body.title,
            Genre: request.body.genre,
            ReleaseYear: request.body.releaseYear,
            Director: request.body.director,
            VideoPath: request.body.videoPath
        });

        respond.send({ message: 'ok!' })
    });

router.route('/movie/:id/stream').get(function (request, respond) {
    var stream = fs.createReadStream('movies/1/Matrix_Fart.3gp')
        .on('open', function () {
            stream.pipe(respond);
        })
});

module.exports = router;