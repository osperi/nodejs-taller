"use strict";

const { fork } = require('child_process');
const express = require('express');
const bodyParser = require('body-parser');
const router = require('./router.js');

//require('dotenv').config();

const port = 8181;
const childUrl = 'process.js';

const app = express();
const child = fork(childUrl);

app.set('child', child);
app.use(bodyParser.json());
app.use('/api/v1/', router);

app.listen(port);
