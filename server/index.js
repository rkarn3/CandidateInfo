const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const dotenv = require('dotenv');
const cors = require('cors');


dotenv.config();

let candidatesRouter = require('./routes/candidates');

const app = express();
app.use(cors());


let port = 8000

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/candidates', candidatesRouter);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

module.exports = app;
