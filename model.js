"use strict";

const mongoose = require('mongoose');

require('dotenv').config();

mongoose.connect("mongodb://" + process.env.MONGODB_URL);
mongoose.Promise = global.Promise;

const TweetSchema = mongoose.Schema({
  created_at: String,
  id: String,
  text: String,
});

const Tweet = mongoose.model('Tweet', TweetSchema);

exports.getTweets = () => {
  return Tweet.find({}).exec();
};

exports.getTweet = (id) => {
  return Tweet.findOne({ id: id }).exec();
};

exports.getTweetsByFilter = (filter) => {
  return Tweet.findOne(filter).exec();
};

exports.saveTweet = (tweet) => {
  return (new Tweet(tweet)).save();
};