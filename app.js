var Video = require('./models/video');

var Sequelize = require('sequelize');
var sequelize = new Sequelize('MYTUBE', 'video_service', 'video_service', {
    host: 'localhost',
    dialect: 'mssql',
});

var video = new Video(sequelize);

video.findAll().then(videos => {
    console.log(videos);
});