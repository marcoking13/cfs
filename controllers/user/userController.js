var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");

const Quote = require("./../../data/quote.js");
const Schedule = require("./../../data/schedule.js");
const Pricing = require("./../../config/pricing.js");
const ShowcaseHeadings = require("./../../config/showcase_headings.js");
const BeforeAndAfterConfig = require("./../../config/before_and_after_config.js");
const Values = require("./../../config/values.js");

console.log(Values);

var modal = null;
var lock = false;


const GetAboutUsPage = (req,res,next) => {

    res.render(path.join(rootDir,"views","/user/about_us.ejs"),{
      pageTitle:"About Us",
      active_path:"/about_us",
      lock:false,
      showcase:ShowcaseHeadings[1]
    });

}

const ExitOutOfModal = (req,res,next) => {
  modal = null;
  res.redirect("/");
}

const GetSchedulePage = (req,res,next)=>{

  res.render(path.join(rootDir,"views","/user/schedule.ejs"),{
    pageTitle:"Schedule Online",
    active_path:"/schedule",
    lock:false,
    modal:modal,
    showcase:ShowcaseHeadings[3],
    before_and_after_images: BeforeAndAfterConfig
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
      total_price:Math.round(new_schedule.total * .9)
    }

    lock = true;

    res.redirect("/");

}

const GetHomePage = (req,res,next)=>{

  res.render(path.join(rootDir,"views","/user/index.ejs"),{
    pageTitle:"Home",
    values:Values,
    modal:modal,
    lock:lock,
    active_path:"/",
    showcase:ShowcaseHeadings[0]
  });

}

const GetContactUsPage = (req,res,next)=>{

  res.render(path.join(rootDir,"views","/user/contact_us.ejs"),{
    pageTitle:"Contact Us",
    active_path:"/contact_us",
    lock:lock,
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
