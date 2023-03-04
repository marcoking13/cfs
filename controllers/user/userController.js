var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");
const Quote = require("./../../config/quote.js");
const Schedule = require("./../../config/schedule.js");
var modal = null

const price_sheet = [
   {
    key:"small",
    price:1.5,
    price_half:1
  },
  {
  key:"medium",
  price:2,
  price_half:1.5
  },
  {
  key:"large",
  price:4,
  price_half:2.5
  }
]




const GetAboutUsPage = (req,res,next) => {
    res.render(path.join(rootDir,"views","/user/about_us.ejs"),{
      pageTitle:"About Us",
      active_path:"/about_us"
    });
}

const GetSchedulePage = (req,res,next)=>{
  res.render(path.join(rootDir,"views","/user/schedule.ejs"),{
    pageTitle:"Schedule Online",
    active_path:"/schedule",
    lock:false,
    modal:modal
  });
}



const GetScheduleData = async(req,res,next) =>{

  var data = req.body;
  var name = req.body.firstName + " " + req.body.lastName;
  var sizes = [data.smWindowCount,data.mdWindowCount,data.lgWindowCount];
  var windows = [];

  var config = {
    name:name,
    date:data.date,
    time:data.time,
    smWindowCount:data.smWindowCount,
    mdWindowCount:data.mdWindowCount,
    lgWindowCount:data.lgWindowCount,
    address:data.address
  };

  for (var i = 0; i < price_sheet.length; i++) {
    var ps = price_sheet[i];
    console.log(Quote);
    var new_quote = new Quote(ps.key,ps.price,sizes[i],ps.price_half);
    new_quote.total();
    windows.push(new_quote);
  }

  var new_schedule = new Schedule(config.name,config.address,windows,config.date,config.time);

   const response = await new_schedule.save();
console.log(new_schedule.total_price);
  modal = {
    wrapper:"active_wrapper",
    modal:"active_modal",
    outside:new_schedule.outside,

    total_price:Math.round(new_schedule.total * .9)
  },
  // res.render(path.join(rootDir,"views","/user/index.ejs"),{
  //
  //   modal:modal,
  //   lock:"lock_screen",
  //   pageTitle:"Admin Home",
  //   active_path:"/"
  // });
  res.redirect("/");

}

const GetHomePage = (req,res,next)=>{
  res.render(path.join(rootDir,"views","/user/index.ejs"),{
    pageTitle:"Home",
    modal:modal,
    lock:"",
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
exports.GetScheduleData = GetScheduleData;
exports.GetHomePage = GetHomePage;
exports.GetContactUsPage = GetContactUsPage;
