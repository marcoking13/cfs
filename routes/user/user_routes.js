var express = require("express");
var router = express.Router();
var path = require("path");
var userController = require("./../../controllers/user/userController.js")
var rootDir = require("./../../util/path.js")

router.get("/",userController.GetHomePage);
router.post("/schedule",userController.GetScheduleData);
router.get("/about",userController.GetAboutUsPage);
router.get("/schedule",userController.GetSchedulePage);
router.get("/contact_us",userController.GetContactUsPage);


module.exports = router;
