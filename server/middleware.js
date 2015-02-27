var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js'), // some custom middleware
    path        = require('path');


module.exports = function (app, express) {

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../client'));

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  var docsRouter = express.Router();
  var userRouter = express.Router();

  app.use('/api/users/', userRouter);
  app.use('/api/docs/', docsRouter);

  // inject our routers into their respective route files
  require('./routers/userRouter.js')(userRouter);
  require('./routers/docsRouter.js')(docsRouter);

  // app.get('/', function(req, res) {
  //   res.sendFile(path.resolve(__dirname + '/../client/index.html'));
  // });

};