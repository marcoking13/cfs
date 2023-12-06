var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");
const utility = require("./user_utlity.js");

const Quote = require("./../../data/quote.js");
const Gallery = require("./../../config/gallery.js");
const Schedule = require("./../../data/schedule.js");
const Meta = require("./../../data/meta.js");
const Pricing = require("./../../config/pricing.js");
const Clients = require("./../../config/clients.js");
const ShowcaseHeadings = require("./../../config/showcase_headings.js");
const BeforeAndAfterConfig = require("./../../config/before_and_after_config.js");
const Values = require("./../../config/values.js");

const isLoaded = false;
const { detect } = require('detect-browser');

var modal = null;
var lock = false;

var data_rendered_to_page = {
    pageTitle:"",
    values:Values,
    active_path:"",
    lock:utility.returnLockClass(lock),
    modal:modal,
    clients:Clients,
    showcase:null,
    gallery:Gallery,
    schedule:null,
    before_and_after_images: BeforeAndAfterConfig
}

function returnData (title,path,index,css_path,req,schedule){

  //utility.AddPageView(req);

  var new_data = {...data_rendered_to_page};

  new_data.pageTitle = title;
  new_data.active_path = path;
  new_data.modal = modal
    new_data.schedule = schedule;
  new_data.lock = utility.returnLockClass(lock);
  new_data.showcase = ShowcaseHeadings[index];

  return new_data;

}

const GetAboutUsPage = (req,res,next) => {

    var data = returnData("About Us","/about_us",1,"about.css",req);
    res.render(path.join(rootDir,"views","/user/about_us.ejs"),data);

}

const ExitOutOfModal = (req,res,next) => {

    var url = req.body;

    modal = null;
    lock = null;

    url.key.replace(' ', '');
    res.redirect(url.key);

}

const GetSchedulePage = (req,res,next)=>{

  var data = returnData("Schedule Online","/schedule",3,"quote.css",req);

  res.render(path.join(rootDir,"views","/user/schedule.ejs"),data);

}

const GetScheduleData = async(req,res,next) =>{

  var data = req.body;
  var quote = new Schedule(data.name,data.address,0,null,null,data.small,data.medium,data.large,data.screens);
  console.log(quote);
  quote.save();




}

const GetHomePage = (req,res,next)=>{

   var data = returnData("Home","/",0,"home.css",req);
   //Schedule.deleteAll();

   res.render(path.join(rootDir,"views","/user/index.ejs"),data);

}

const GetContactUsPage = (req,res,next)=>{

  var data = returnData("Contact Us","/contact_us",2,"contact.css",req);

  res.render(path.join(rootDir,"views","/user/contact_us.ejs"),data);

}


exports.GetAboutUsPage = GetAboutUsPage;
exports.GetSchedulePage = GetSchedulePage;
exports.ExitOutOfModal = ExitOutOfModal;
exports.GetScheduleData = GetScheduleData;
exports.GetHomePage = GetHomePage;
exports.GetContactUsPage = GetContactUsPage;
