var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var QuizSchema = new mongoose.Schema({
  name: String,
  image_url: String,
  question: [Schema.Types.Mixed],
  publish: { type: String, default: 'off' },
  auther: { type: Number, default: 1 },
  updated_at: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Quiz', QuizSchema);
