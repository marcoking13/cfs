var fs  = require("fs");
var path = require("path");
var express = require("express");
var expressLayouts = require('express-ejs-layouts');
var app = express();
var bodyParser = require("body-parser");
var port = process.env.PORT || 3002;

var user_routes = require("./routes/user/user_routes.js");
var admin_routes = require("./routes/admin/admin_routes.js");

var db = require("./util/database.js");

app.use(bodyParser.urlencoded());

app.use(express.static('public'));
app.use(user_routes);
app.use(admin_routes);

app.set("view engine","ejs");

db.MongoConnect(()=>{
  app.listen(port,()=>{
    console.log("Website is running on localhost:"+port);
  });
});
