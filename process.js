"use strict";

const Twitter = require('twitter');
const { saveTweet } = require('./model.js');

//require('dotenv').config();

const client = new Twitter({
  consumer_key: "",
  consumer_secret: "",
  access_token_key: "",
  access_token_secret: ""
});

let stream = undefined;
let status = 'STOP';

function onTweet(data) {
  // console.log(data.text);
  // setTimeout(() => stream.once('data', onTweet), 1000);
  saveTweet(data).then(() => {
    setTimeout(() => stream.once('data', onTweet), 1000);
  });
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
}); <<
<< << < HEAD

process.on('uncaughtException', function(err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
}); ===
=== = >>>
>>> > 27 a84b061dfcabb4bb5e628a2f45335004c0456b