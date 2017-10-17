'use strict';

var Video = require('../models').Video;

class VideoRepository {

    constructor() {
        this.getVideos = this.getVideos.bind(this);
        this.create = this.create.bind(this);
    }

    getVideos() {
        return Video.findAll({
            order: [
                ["createdAt", "DESC"]
            ]
        });
    }

    create(video) {
        return Video.create(video)
                    .then((result) => {
                        return Promise.resolve(result);
                    });
    }

    bulkCreate(videos) {
        return Video.bulkCreate(videos);
    }

    getVideoById(videoId) {
        return Video.findOne({
            where: {
                id: videoId
            }
        });
    }

    deleteVideoById(videoId) {
        return Video.destroy({
            where: {
                id: videoId
            }
        });
    }

}

module.exports = VideoRepository;