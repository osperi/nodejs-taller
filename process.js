"use strict";

const Twitter = require('twitter');
const { saveTweet } = require('./model.js');

//require('dotenv').config();

const client = new Twitter({
  consumer_key: "W2IScdVN7wSaeCZhWBCop60Bi",
  consumer_secret: "qEpOp3CgPZQK8ejjmoj8fBjnURSKifGIlExOhaxBFHioLjRf34",
  access_token_key: "19240639-e3bDa3ilJ8DQzcl59LbMFaFHIiWUpnUXYLuAsrPep",
  access_token_secret: "xUozRwv1QWsksalQTgdwFFT8K8BLbb0cxyzlfC7RK1mTv"
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
});

process.on('uncaughtException', function(err) {
  console.error(err.stack);
  console.log("Node NOT Exiting...");
});