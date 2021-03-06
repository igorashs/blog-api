const moment = require('moment');
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const commentSchema = new Schema({
  username: { type: String, required: true, max: 15 },
  date: { type: Date, default: new Date() },
  text: { type: String, required: true, max: 300 },
  post: { type: Schema.Types.ObjectId, ref: 'Post', required: true }
});

commentSchema.virtual('timestamp').get(function () {
  return moment(this.date).calendar();
});

module.exports = mongoose.model('Comment', commentSchema);
