const express = require('express');
const mongoose = require('mongoose');
const port = process.env.PORT || 3000;
const app = express();
const upload = require('express-fileupload');
const routes = require('./routes/routes');
const path = require('path');
const cors = require('cors');

mongoose
  .connect('mongodb://localhost/file_name', {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true
  })
  .then(() => {
    console.log('connected to mongoDb');
  })
  .catch((err) => {
    console.log('error: ', err);
  });


app.set('view engine', 'ejs');
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(upload());
app.use(express.json());
app.use('/', routes);
app.use('/files', express.static(path.join(__dirname + '/static')));


app.listen(port, () => {
  console.log(`listening on port ${port}`);
});