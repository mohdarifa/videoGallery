'use strict';

var Video = require('../models').Video;

class VideoRepository {

    constructor() {
        this.getVideos = this.getVideos.bind(this);
        this.create = this.create.bind(this);
    }

    getVideos() {
        return Video.findAll({
            order: ["createdAt"]
        });
    }

    create(videos) {
        return Video.bulkCreate(videos);
    }

}

module.exports = VideoRepository;