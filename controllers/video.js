'use strict';

var multer  = require('multer'),
    fs = require('fs'),
    path = require('path'),
    VideoService = require('../services/video'),
    config = require('../config'); 

class VideoController {

    constructor() {

        this.videoService = new VideoService();

        this.listVideos = this.listVideos.bind(this);
        this.upload = this.upload.bind(this);
        this.delete = this.delete.bind(this);
        this.download = this.download.bind(this);
        this.errorResponseHandler = this.errorResponseHandler.bind(this);
    }

    listVideos(req, res) {
        this.videoService.getVideos()
            .then(videos => {
                res.render('index', { title: 'Video library - Node JS', videos: videos, config: config });
            });
    }

    upload(req, res) {
        this.videoService.upload(req, res)
            .then((videoFiles) => {
                return this.videoService.create(videoFiles);
            })
            .then((videos) => {
                res.render('videos', {videos: videos, config: config});
            })
            .catch((err) => {
                this.errorResponseHandler(res, err);
            });
    }

    delete(req, res, next) {
        var data = req.body;
        this.videoService.getVideo(data.videoId)
            .then((video) => {
                if ( !video ) {
                    res.status(400).json({success: false, message: "Video not found."});
                }

                fs.unlink(path.join(publicPath, config.UPLOADS_PATH, video.filename), (err) => {
                    if (err) {
                        res.status(400).json({success: false, message: "Failed to delete video."});
                    }

                    return this.videoService.deleteVideo(video.id);
                })
            })
            .then(() => {
                res.json({success: true, message: "Video deleted."});
            })
            .catch((err) => {
                this.errorResponseHandler(res, err);
            });
    }

    download(req, res) {
        try {
            this.videoService.getVideo(req.params.videoId)
                .then((video) => {
                    if ( !video ) {
                        res.status(400).json({success: false, message: "Video not found."});
                    }

                    var file = path.join(publicPath, config.UPLOADS_PATH, video.filename);
                    res.download(file);
                })
                .catch((err) => {
                    this.errorResponseHandler(res, err);
                });
        }
        catch(err) {
            this.errorResponseHandler(res, err);
        };
    }

    errorResponseHandler(res, err) {
        console.log(err)
        let msg = err.custom_error ? err.custom_error : "Some error occured.";
        res.status(400).json({ok: false, response_status: 'error', message: msg});
    }

}

module.exports = VideoController;