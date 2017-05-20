var express = require('express');
var router = express.Router();
var Video = require('../models/video');
var Sequelize = require('sequelize');
var fs = require('fs');
var path = require("path");

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
    var file = path.resolve(__dirname, "../movies/VID_20170503_160808.mp4");
    fs.stat(file, function (error, stats) {
        if (error) {
            if (error.code === 'ENOENT') {
                return respond.sendStatus(404);
            }

            respond.end(error);
        }

        var range = request.headers.range;
        if (!range) {
            return respond.sendStatus(416);
        }

        var positions = range.replace(/bytes=/, "").split("-");
        var start = parseInt(positions[0], 10);
        var total = stats.length;
        var end = positions[1] ? parseInt(positions[1], 10) : total - 1;
        var chunksize = (end - start) + 1;

        respond.writeHead(206, {
            "Content-Range": "bytes " + start + "-" + end + "/" + total,
            "Accept-Ranges": "bytes",
            "Content-Length": chunksize,
            "Content-Type": "video/mp4"
        });

        var stream = fs.createReadStream(file, { start: start, end: end })
            .on('open', function () {
                stream.pipe(respond);
            })
            .on('error', function (error) {
                respond.end(error);
            });
    })
});

module.exports = router;