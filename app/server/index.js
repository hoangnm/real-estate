const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const jwt = require('./helpers/jsonwebtoken');
const config = require('config');

const acl = require('./helpers/acl');
const routes = require('./routes');
const models = require('./models');
const products = require('./routes/products');
const customers = require('./routes/customers');
const accounts = require('./routes/accounts');
const groups = require('./routes/group-account');
const cities = require('./routes/cities');
const wards = require('./routes/wards');
const districts = require('./routes/districts');
const customerstatus = require('./routes/customer-status');
const appresources = require('./routes/app-resources');
const login = require('./routes/login');

const APP_CONFIG = config.get('appConfig');
const app = express();

app.set('views', __dirname + '/views');
app.set('view engine', 'pug');

app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'uploads/images')));

app.get('/', routes.index);

app.all('/api/*', (req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header('Access-Control-Allow-Methods', 'OPTIONS,GET,POST,PUT,DELETE');
  res.header("Access-Control-Allow-Headers", "Content-Type, Authorization, X-Requested-With, X-Access-Token");
  if ('OPTIONS' === req.method) {
    res.send(200);
  } else {
    return next();
  }
});

app.use('/api/login', login);
app.use('/api/cities', cities);
app.use('/api/wards', wards);
app.use('/api/districts', districts);
app.use('/api/customer_status', customerstatus);
app.use('/api/app_resources', appresources);

app.use('/api/*', (req, res, next) => {
  var token = req.body.token || req.query.token || req.headers['x-access-token'];

  if (token) {

    jwt.verify(token, function (err, decoded) {
      if (err) {
        return res.json({ success: false, message: 'Failed to authenticate token.' });
      }
      req.decoded = decoded;
      next();
    });

  } else {
    return res.status(403).send({
      success: false,
      message: 'No token provided.'
    });
  }
});

app.all(/api\/(\w*)/, (req, res, next) => {
  const isAllowed = acl.isAllowed(req.method, req.decoded, req.params[0], req.body);
  if (!isAllowed) {
    return res.json({
      error: 'no permission'
    });
  }
  next();
});

app.use('/api/products', products);
app.use('/api/customers', customers);
app.use('/api/accounts', accounts);
app.use('/api/group_accounts', groups);

models.init(() => {
  app.listen(APP_CONFIG.port, () => {
    console.log('App listening on port ' + APP_CONFIG.port);
  });
});