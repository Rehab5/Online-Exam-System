const Subject = require("../models/subject");

// Create a new subject

exports.createSubject = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) {
      return res.status(400).json({ message: "Subject name is required" });
    }

    const newSubject = new Subject({ name });
    await newSubject.save();
    res
      .status(201)
      .json({ message: "Subject created successfully", subject: newSubject });
  } catch (error) {
    res.status(500).json({ message: "Error creating subject", error });
  }
};

// Delete a subject by ID

exports.deleteSubject = async (req, res) => {
  try {
    const { id } = req.params;
    const subject = await Subject.findByIdAndDelete(id);

    if (!subject) {
      return res.status(404).json({ message: "Subject not found" });
    }

    res.status(200).json({ message: "Subject deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting subject", error });
  }
};
