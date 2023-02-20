var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");

const GetAboutUsPage = (req,res,next) => {
    res.render(path.join(rootDir,"views","/user/about_us.ejs"),{
      pageTitle:"About Us",
      active_path:"/about_us"
    });
}

const GetSchedulePage = (req,res,next)=>{
  res.render(path.join(rootDir,"views","/user/schedule.ejs"),{
    pageTitle:"Schedule Online",
    active_path:"/schedule"
  });
}

const GetHomePage = (req,res,next)=>{
  res.render(path.join(rootDir,"views","/user/index.ejs"),{
    pageTitle:"Home",
    active_path:"/"
  });
}

const GetContactUsPage = (req,res,next)=>{
  res.render(path.join(rootDir,"views","/user/contact_us.ejs"),{
    pageTitle:"Contact Us",
    active_path:"/contact_us"
  });
}


exports.GetAboutUsPage = GetAboutUsPage;
exports.GetSchedulePage = GetSchedulePage;
exports.GetHomePage = GetHomePage;
exports.GetContactUsPage = GetContactUsPage;
