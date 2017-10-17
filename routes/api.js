'use strict';

var apiRouter = require('express').Router();

var videoController = new (require('../controllers/video'))();
apiRouter.post('/video/upload', videoController.upload);
apiRouter.delete('/video/delete', videoController.delete);
apiRouter.get('/video/download/:videoId', videoController.download);

module.exports = apiRouter