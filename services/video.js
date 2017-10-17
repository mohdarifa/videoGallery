'use strict';

var VideoRepository = require('../repositories/video'),
    config = require('../config'),
    multer = require('multer');

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
		        cb(null, config.UPLOADS_PATH)
		      },
		      filename: function (req, file, cb) {
		        cb(null, file.fieldname + '-' + Date.now())
		      }
		    }),
	    	upload = multer({ storage: storage }).array('videos');

	    var uploadPromise = new Promise(function(resolve, reject) {
	    	upload(req, res, function(err) {
				if (err) {
					return reject({custom_error: 'Failed to upload videos.'});
				}
				return resolve(req.files);
			});
	    });

		return uploadPromise; 
	}

	create(videoFiles) {
		var createVideos = [];
		videoFiles.map(function(file) {
			var extension = file.originalname.substr(file.originalname.lastIndexOf('.') + 1);
			createVideos.push({
				filename: file.filename,
				extension: extension,
				size: file.size
			});
		});

		return this.videoRepository.create(createVideos)
					.then(function() {
						return Promise.resolve(createVideos);
					})
					.catch(function(err) {
						return Promise.reject(err);
					});
	}

}

module.exports = VideoService