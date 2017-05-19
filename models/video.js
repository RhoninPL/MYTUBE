var Sequelize = require('sequelize');

module.exports = function (sequelize) {
    const Video = sequelize.define("videos",
        {
            Id: {
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            Title: {
                type: Sequelize.STRING
            },
            Genre: {
                type: Sequelize.STRING
            },
            ReleaseYear: {
                type: Sequelize.DATE
            },
            Director: {
                type: Sequelize.STRING
            },
            VideoPath: {
                type: Sequelize.STRING
            }
        }, {
            timestamps: false,
        });

    return Video;
};