var express = require("express");
var router = express.Router();
var path = require("path");
var userController = require("./../../controllers/user/userController.js")
var rootDir = require("./../../util/path.js")

router.get("/",userController.GetHomePage);
router.get("/about",userController.GetAboutUsPage);
router.get("/schedule",userController.GetSchedulePage);
router.post("/modal",userController.GetScheduleData)
router.post("/exit",userController.ExitOutOfModal)

router.get("/contact_us",userController.GetContactUsPage);


module.exports = router;
