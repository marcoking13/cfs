var fs  = require("fs");
var path = require("path");
var express = require("express");
var expressLayouts = require('express-ejs-layouts');
var user_routes = require("./routes/user/user_routes.js");
var admin_routes = require("./routes/admin/admin_routes.js");
var db = require("./util/database.js");
var bodyParser = require("body-parser");

var app = express();
var port = process.env.PORT || 3002;

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
