const mongoose = require("mongoose");

const examSchema = new mongoose.Schema({
  subject: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Subject",
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  level: {
    type: Number,
    required: true,
  },
  num_of_Question: {
    type: Number,
    required: true,
  },
  total_marks: {
    type: Number,
    required: true,
  },
  pass_marks: {
    type: Number,
    required: true,
  },
  questions: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Question",
    },
  ],
});

const Exam = mongoose.model("Exam", examSchema);
module.exports = Exam;
