const express = require('express');
const morgan = require('morgan');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/nonstagram', { useNewUrlParser: true });

const app = express();

const users = require('./routes/users');
const galleries = require('./routes/galleries');
const images = require('./routes/images');

require('./passport.js');

// Middleware

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.json());

// Routes

app.options('*', cors());

app.use('/', users);
app.use('/gallery', galleries);
app.use('/images', images);

// Catch 404 errors and pass them to error handle function

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// Error handler function
app.use((err, req, res, next) => {
  const error = app.get('env') === 'development' ? err : {};
  const status = err.status || 500;
  // Respond to client
  res.status(status).json({
    error: {
      message: error.message
    }
  });
  // Respond to terminal
  console.error(err);
});

const port = app.get('port') || 3001
app.listen(port, () => console.log(`Server is listening on port ${port}`));
