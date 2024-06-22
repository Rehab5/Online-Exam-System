const router = require("express").Router();
const usersController = require("../controllers/userController");


router.post("/login", usersController.login);

router.post("/register", usersController.register);

module.exports = router;
