const express = require("express");
//创建路由对象
const router = express.Router();
//引入posController
const posController = require("../controller/posController");
const authMiddleware = require("../middleware/auth");
router.post("/add",posController.add);
router.get("/find",authMiddleware,posController.find);
//动态参数加    :
router.get("/:id",posController.findById);
router.post("/update",posController.update);
router.get("/delete/:id",posController.deletes);
module.exports = router;

 

  