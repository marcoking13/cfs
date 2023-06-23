var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");

const Quote = require("./../../data/quote.js");
const Schedule = require("./../../data/schedule.js");
const Meta = require("./../../data/meta.js");
const Pricing = require("./../../config/pricing.js");
const Clients = require("./../../config/clients.js");

const ShowcaseHeadings = require("./../../config/showcase_headings.js");
const BeforeAndAfterConfig = require("./../../config/before_and_after_config.js");
const Values = require("./../../config/values.js");

const isLoaded = false;

const { detect } = require('detect-browser');


// handle the case where we don't detect the browser

var modal = null;
var lock = false;

function returnLockClass(isLocked){
  if(lock){
    return "lock";
  }else{
    return " ";
  }
}

// const AddBrowserView = (req,res) =>{
//   const browserName = req.body.name;
//   Meta.AddBrowserView(browserName);
// }

function AddPageView(req){
    const ipAddress = req.ip;
    Meta.AddPageView(ipAddress);
}


const GetAboutUsPage = (req,res,next) => {

    AddPageView(req);

    res.render(path.join(rootDir,"views","/user/about_us.ejs"),{
      pageTitle:"About Us",
      active_path:"/about_us",
      lock:returnLockClass(lock),
      showcase:ShowcaseHeadings[1]
    });

}

const ExitOutOfModal = (req,res,next) => {

    modal = null;
    lock = null;
    var url = req.body;
    url.key.replace(' ', '');
    res.redirect(url.key);


}

const GetSchedulePage = (req,res,next)=>{
  AddPageView(req);
  res.render(path.join(rootDir,"views","/user/schedule.ejs"),{
    pageTitle:"Schedule Online",
    active_path:"/schedule",
    lock:returnLockClass(lock),
    modal:modal,
    showcase:ShowcaseHeadings[3],
    before_and_after_images: BeforeAndAfterConfig
  });

}

async function  getData(req){
  var data = req.body;
  var name = req.body.firstName + " " + req.body.lastName;
  var sizes = [data.smWindowCount,data.mdWindowCount,data.lgWindowCount,data.screenCount];
  var windows = [];


  var config = {
    name:name,
    smWindowCount:data.smWindowCount,
    mdWindowCount:data.mdWindowCount,
    screenCount:data.screenCount,
    lgWindowCount:data.lgWindowCount,
    address:data.address
  };



  for (var i = 0; i < Pricing.length; i++) {

    var ps = Pricing[i];
    var new_quote = new Quote(ps.key,ps.price,sizes[i],ps.price_half);

    new_quote.total();
    windows.push(new_quote);

  }

  var new_schedule = new Schedule(config.name,config.address,windows,config.date,config.time);

  const response = await new_schedule.save();


  modal = {
    wrapper:"active_wrapper",
    modal:"active_modal",
    outside:new_schedule.outside,
    total_price:Math.round(new_schedule.total)
  }

  lock = true;

}



const GetScheduleData = async(req,res,next) =>{

    await getData(req);
    res.redirect(req.body.key);

}

const GetHomePage = (req,res,next)=>{

   AddPageView(req);
   res.render(path.join(rootDir,"views","/user/index.ejs"),{
    pageTitle:"Home",
    values:Values,
    modal:modal,
    clients:Clients,
    lock:returnLockClass(lock),
    active_path:"/",
    showcase:ShowcaseHeadings[0]
  });

}

const GetContactUsPage = (req,res,next)=>{
  AddPageView(req);
  res.render(path.join(rootDir,"views","/user/contact_us.ejs"),{
    pageTitle:"Contact Us",
    clients:Clients,
    active_path:"/contact_us",
    lock:returnLockClass(lock),
    modal:modal,
    showcase:ShowcaseHeadings[1]
  });

}

exports.GetAboutUsPage = GetAboutUsPage;
exports.GetSchedulePage = GetSchedulePage;
exports.ExitOutOfModal = ExitOutOfModal;
exports.GetScheduleData = GetScheduleData;
exports.GetHomePage = GetHomePage;
exports.GetContactUsPage = GetContactUsPage;
