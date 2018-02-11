"use strict";

const Twitter = require('twitter');
const { saveTweet } = require('./model.js');

require('dotenv').config();

const client = new Twitter({
  consumer_key: process.env.CONSUMER_KEY,
  consumer_secret: process.env.CONSUMER_SECRET,
  access_token_key: process.env.ACCESS_TOKEN_KEY,
  access_token_secret: process.env.ACCESS_TOKEN_SECRET
});

let stream = undefined;
let status = 'STOP';

function onTweet(data) {
  if (process.env.OUTPUT_TYPE == "mongodb") {
    saveTweet(data).then(() => {
      setTimeout(() => stream.once('data', onTweet), 1000);
    });
  } else {
    console.log(data.text);
    setTimeout(() => stream.once('data', onTweet), 1000);
  }
}

process.on('message', (msg) => {
  if (msg.cmd === 'START' && status === 'STOP') {
    stream = client.stream('statuses/filter', { track: msg.filter });
    stream.once('data', onTweet);
    status = msg.cmd;
  }
  if (msg.cmd === 'STOP' && status === 'START') {
    stream.destroy();
    stream = undefined;
    status = msg.cmd;
  }
});

process.on('uncaughtException', function(err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
});