const mongoose = require("mongoose");

const questionSchema = new mongoose.Schema({
  question_name: {
    type: String,
    required: true,
  },
  option_a: {
    type: String,
    required: true,
  },
  option_b: {
    type: String,
    required: true,
  },
  option_c: {
    type: String,
    required: true,
  },
  option_d: {
    type: String,
    required: true,
  },
  question_answer: {
    type: String,
    required: true,
  },
  subject_name: {
    type: String,
    required: true,
  },
  exam: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Exam",
    required: true,
  },
});

module.exports = mongoose.model("Question", questionSchema);
