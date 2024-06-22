const Exam = require("../models/exam");
const Subject = require("../models/subject");

exports.createExam = async (req, res) => {
  try {
    const {
      subject_name,
      description,
      level,
      num_of_Question,
      total_marks,
      pass_marks,
    } = req.body;

    // Find the Subject by its name to retrieve its _id
    const subject = await Subject.findOne({ name: subject_name });
    if (!subject) {
      return res.status(404).json({ error: "Subject not found" });
    }

    // Create new exam document with subject reference
    const exam = new Exam({
      subject: subject._id, // Assign the _id of the found subject
      description,
      level,
      num_of_Question,
      total_marks,
      pass_marks,
    });

    const result = await exam.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

exports.getAllExams = async (req, res) => {
  try {
    const exams = await Exam.find();
    res.status(200).json(exams);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.getExam = async (req, res) => {
  try {
    const { id } = req.params;
    const exam = await Exam.findById(id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.status(200).json(exam);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.updateExam = async (req, res) => {
  const { id } = req.params;
  try {
    // Find the Exam by ID first
    let exam = await Exam.findById(id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }

    // Check if subject_name or subjectId is provided in req.body (at least one is required)
    if (!req.body.subject_name && !req.body.subjectId) {
      return res
        .status(400)
        .json({ error: "Subject name or subjectId is required" });
    }

    // Update subject reference based on subjectId if provided, otherwise update based on subject_name
    if (req.body.subjectId) {
      exam.subject = req.body.subjectId; // Update subject reference with provided subjectId
    } else if (req.body.subject_name) {
      // Find the Subject by its name to retrieve its _id
      const subject = await Subject.findOne({ name: req.body.subject_name });
      if (!subject) {
        return res.status(404).json({ error: "Subject not found" });
      }
      exam.subject = subject._id; // Update subject reference with _id of found Subject
    }

    // Optional updates for other fields
    if (req.body.description) {
      exam.description = req.body.description;
    }
    if (req.body.level) {
      exam.level = req.body.level;
    }
    if (req.body.num_of_Question) {
      exam.num_of_Question = req.body.num_of_Question;
    }
    if (req.body.total_marks) {
      exam.total_marks = req.body.total_marks;
    }
    if (req.body.pass_marks) {
      exam.pass_marks = req.body.pass_marks;
    }

    // Save the updated Exam document
    const updatedExam = await exam.save();

    // Construct the custom response object
    const response = {
      _id: updatedExam._id,
      subject_id: updatedExam.subject, // Assuming this is the reference to the Subject's _id
      subject_name: req.body.subject_name || updatedExam.subject_name, // Use provided subject_name or existing one
      description: updatedExam.description,
      level: updatedExam.level,
      num_of_Question: updatedExam.num_of_Question,
      total_marks: updatedExam.total_marks,
      pass_marks: updatedExam.pass_marks,
      __v: updatedExam.__v,
    };

    // Send the custom response
    res.status(200).json(response);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.deleteExam = async (req, res) => {
  const { id } = req.params;
  try {
    const exam = await Exam.findByIdAndDelete(id);
    if (!exam) {
      return res.status(404).json({ message: "Exam not found" });
    }
    res.status(204).json({ message: "Exam deleted successfully" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
