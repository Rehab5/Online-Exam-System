const router = require("express").Router();
const subjectController = require("../controllers/subjectController");


router.post("/", subjectController.createSubject);

router.delete("/", subjectController.deleteSubject);

module.exports = router;
