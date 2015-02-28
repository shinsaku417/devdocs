var morgan      = require('morgan'), // used for logging incoming request
    bodyParser  = require('body-parser'),
    helpers     = require('./helpers.js'), // some custom middleware
    path        = require('path');


module.exports = function (app, express) {

  app.use(morgan('dev'));
  app.use(bodyParser.urlencoded({extended: true}));
  app.use(bodyParser.json());
  app.use(express.static(__dirname + '/../public'));

  app.use(helpers.errorLogger);
  app.use(helpers.errorHandler);

  var docsRouter = express.Router();
  var userRouter = express.Router();
  var answerRouter = express.Router();
  var exampleRouter = express.Router();
  var questionRouter = express.Router();

  app.use('/api/users/', userRouter);
  app.use('/api/docs/', docsRouter);
  app.use('/api/answers/', answerRouter);
  app.use('/api/examples/', exampleRouter);
  app.use('/api/questions/', questionRouter);

  // inject our routers into their respective route files
  require('./routers/userRouter.js')(userRouter);
  require('./routers/docsRouter.js')(docsRouter);
  require('./routers/answerRouter.js')(answerRouter);
  require('./routers/exampleRouter.js')(exampleRouter);
  require('./routers/questionRouter.js')(questionRouter);

  // app.get('/', function(req, res) {
  //   res.sendFile(path.resolve(__dirname + '/../client/index.html'));
  // });

  // app.all('*', function(req, res, next) {
  //   res.status(404).send('Huh?\n');
  // });

};
