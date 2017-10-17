'use strict';

var multer  = require('multer'),
    VideoService = require('../services/video'),
    config = require('../config'); 

class VideoController {

    constructor() {
        this.videoService = new VideoService();

        this.listVideos = this.listVideos.bind(this);
        this.upload = this.upload.bind(this);
    }

    listVideos(req, res) {
        this.videoService.getVideos()
            .then(videos => {
            	res.render('index', { title: 'Video library - Node JS', videos: videos, config: config });
            });
    }

    upload(req, res) {
        var this1 = this;
        this1.videoService.upload(req, res)
            .then(function(videoFiles) {
                return this1.videoService.create(videoFiles);
            })
            .then(function(videos) {
/*                var html = "";
                videos.map(function(video) {
                    html += new EJS({url: 'video.ejs'}).render(video);
                });*/
                
                //res.status(200).json({success: true, message: "Files are uploaded.", videos: videos});
                res.render('videos', {videos: videos, config: config});
            })
            .catch(function(err) {
                console.log(err)
                let msg = err.custom_error ? err.custom_error : "Some error occured.";
                res.status(500).json({ok: false, response_status: 'error', message: msg});
            });
    }

}

module.exports = VideoController;