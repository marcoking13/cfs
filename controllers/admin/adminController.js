var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");
var Quote = require("./../../config/quote.js");
var Schedule = require("./../../config/schedule.js");

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

const GetScheduleData = (req,res,next) =>{

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
  new_schedule.total_all_prices();
  new_schedule.save();

  res.redirect("/")

}

const GetIndexPage = (req,res,next) => {

  Schedule.findAll((schedules)=>{

    if(schedules){
        res.render(path.join(rootDir,"views","/admin/index.ejs"),{
          quotes:schedules,
          pageTitle:"Admin Home",
          active_path:"/admin/home"
        })
      }else{
        console.log(schedules)
      }

    });

}

exports.GetScheduleData = GetScheduleData;
exports.GetIndexPage = GetIndexPage;
