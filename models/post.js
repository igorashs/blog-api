const moment = require('moment');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const postSchema = new Schema({
  title: { type: String, required: true, max: 60 },
  date: { type: Date, default: new Date() },
  isPublished: { type: Boolean, default: false },
  text: { type: String, required: true, max: 1600 }
});

postSchema.virtual('timestamp').get(function () {
  return moment().calendar(this.date);
});

module.exports = mongoose.model('Post', postSchema);
