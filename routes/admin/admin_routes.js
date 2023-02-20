var express = require("express");
var router = express.Router();
var path = require("path");
var rootDir = require("./../../util/path.js")
var adminController = require("./../../controllers/admin/adminController.js");

router.post("/admin/schedule",adminController.GetScheduleData);
router.get("/admin/home",adminController.GetIndexPage);


module.exports = router;
