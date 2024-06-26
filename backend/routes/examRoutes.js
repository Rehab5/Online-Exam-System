const express = require("express");
const router = express.Router();
const examController = require("../controllers/examController");


router.post("/", examController.createExam);

router.get("/", examController.getAllExams);

router.get("/:id", examController.getExam);

router.put("/:id", examController.updateExam);

router.delete("/:id", examController.deleteExam);


module.exports = router;
