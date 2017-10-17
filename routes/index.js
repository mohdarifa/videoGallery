var apiRouter = require('./api');
var videoController = new (require('../controllers/video'))();

module.exports = function (app) {

  app.use('/api', apiRouter);

  /* GET home page. */
 /* app.get('/', (req, res) => {
    let markup = "";
    res.render('index', { title: 'Video library - Node JS' });
  });*/
  app.get('/', videoController.listVideos);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // error handler
  app.use(function(err, req, res, next) {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};
  
    // render the error page
    res.status(err.status || 500);
    res.render('error');
  });

}