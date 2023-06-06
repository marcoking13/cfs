var express = require("express");
var router = express.Router();
var path = require("path");
var rootDir = require("./../../util/path.js")
var adminController = require("./../../controllers/admin/adminController.js");

router.get("/admin/home",adminController.GetIndexPage);
router.post("/admin/delete_quotes",adminController.DeleteQuotes);

module.exports = router;
