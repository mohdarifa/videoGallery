'use strict';

var VideoRepository = require('../repositories/video'),
    config = require('../config'),
    multer = require('multer'),
    path = require('path');

class VideoService {

	constructor() {
		this.videoRepository = new VideoRepository();
		this.getVideos = this.getVideos.bind(this);
		this.upload = this.upload.bind(this);
		this.create = this.create.bind(this);
	}

	getVideos(user) {
		return this.videoRepository.getVideos()
				   .then(videos => {
				   		return Promise.resolve(videos);
				   })
				   .catch(err => {
				   		return Promise.reject(err);
				   });
	}

	upload(req, res) {
	    var storage = multer.diskStorage({
		      destination: function (req, file, cb) {
		        cb(null, path.join('public', config.UPLOADS_PATH));
		      },
		      filename: function (req, file, cb) {
		      	var extension = file.originalname.substr(file.originalname.lastIndexOf('.'))
		        cb(null, 'video-' + Date.now() + extension);
		      }
		    }),
	    	upload = multer({ storage: storage }).array('videos');

	    var uploadPromise = new Promise(function(resolve, reject) {
	    	upload(req, res, function(err) {
				if (err) {
					console.log(err)
					return reject({custom_error: 'Failed to upload videos.'});
				}
				return resolve(req.files);
			});
	    });

		return uploadPromise; 
	}

	create(videoFiles) {
		var createVideoPromises = [],
			newVideos = [];
		videoFiles.map((file, index) => {

			var video = {
				filename: file.filename,
				mimetype: file.mimetype,
				size: file.size
			};
			var promise = this.videoRepository.create(video)
								.then(newVideo => {
									newVideos.push(newVideo);
									return newVideos;
								});

			createVideoPromises.push(promise);
		});

		return Promise.all(createVideoPromises)
					.then((newVideos) => {
						return Promise.resolve(newVideos[0]);
					})
					.catch(function(err) {
						return Promise.reject(err);
					});
	}

	getVideo(videoId) {
		return this.videoRepository.getVideoById(videoId)
					.then(function(video) {
						return Promise.resolve(video);
					})
					.catch(function(err) {
						return Promise.reject(err);
					});
	}

	deleteVideo(videoId) {
		return this.videoRepository.deleteVideoById(videoId)
					.then(function() {
						return Promise.resolve();
					})
					.catch(function(err) {
						return Promise.reject(err);
					});
	}

}

module.exports = VideoService