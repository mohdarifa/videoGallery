'use strict';

var apiRouter = require('express').Router();

var videoController = new (require('../controllers/video'))();
apiRouter.post('/upload', videoController.upload);

module.exports = apiRouter