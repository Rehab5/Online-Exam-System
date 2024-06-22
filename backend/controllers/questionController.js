const Exam = require("../models/exam");
const Question = require("../models/question");

exports.createQuestion = async (req, res) => {
  try {
    const {
      question_name,
      option_a,
      option_b,
      option_c,
      option_d,
      question_answer,
      subject_name,
    } = req.body;

    // Find the Subject by subject_name to retrieve subjectId
    const subject = await Subject.findOne({ name: subject_name });

    if (!subject) {
      return res
        .status(404)
        .json({ message: "Subject not found for the provided subject_name" });
    }

    // Find the Exam by subjectId
    const exam = await Exam.findOne({ subject: subject._id });

    if (!exam) {
      return res
        .status(404)
        .json({ message: "Exam not found for the provided subject_name" });
    }

    // Create the new Question
    const newQuestion = new Question({
      question_name,
      option_a,
      option_b,
      option_c,
      option_d,
      question_answer,
      subject_name,
      exam: exam._id, // Associate the question with the exam
    });

    // Save the new question to the database
    await newQuestion.save();

    // Construct the response object with exam_id included
    const responseQuestion = {
      _id: newQuestion._id,
      question_name: newQuestion.question_name,
      option_a: newQuestion.option_a,
      option_b: newQuestion.option_b,
      option_c: newQuestion.option_c,
      option_d: newQuestion.option_d,
      question_answer: newQuestion.question_answer,
      subject_name: newQuestion.subject_name,
      exam_id: exam._id, // Include exam_id in the response
      __v: newQuestion.__v, // Include version if needed
    };

    // Return success response
    res.status(201).json(responseQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
exports.getAllQuestions = async (req, res) => {
  try {
    const questions = await Question.find();
    res.status(200).json(questions);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getQuestionById = async (req, res) => {
  try {
    const { id } = req.params;
    const question = await Question.findById(id);
    res.status(200).json(question);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

exports.updateQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    const question = req.body;
    const updatedQuestion = await Question.findByIdAndUpdate(id, question, {
      new: true,
    });
    res.status(200).json(updatedQuestion);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteQuestion = async (req, res) => {
  try {
    const id = req.params.id;
    await Question.findByIdAndDelete(id);
    res.status(200).json({ message: "Question deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
