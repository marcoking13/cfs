var express = require("express");
var router = express.Router();
var path = require("path");
var rootDir = require("./../../util/path.js")
var adminController = require("./../../controllers/admin/adminController.js");

router.get("/admin/home",adminController.GetIndexPage);
router.get("/admin/quotes",adminController.GetQuotePage);
router.post("/admin/favorite",adminController.MakeFavorite);
router.post("/admin/browser",adminController.AddBrowserView);
router.post("/admin/delete_quotes",adminController.DeleteQuotes);
router.post("/admin/roots",adminController.RootCount);


module.exports = router;
