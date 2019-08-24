var express = require('express');
var usersController = require("../controller/usersController");
var router = express.Router();
const authMiddleware = require("../middleware/auth");
router.post("/loginup",usersController.loginup);
router.post("/loginin",usersController.loginin);
//中间件栈的概念
router.post("/isloginin",authMiddleware,usersController.isloginin);
module.exports = router;

