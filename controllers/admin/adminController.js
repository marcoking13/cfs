var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");
var Quote = require("./../../data/quote.js");
var Schedule = require("./../../data/schedule.js");



const GetIndexPage = (req,res,next) => {

  Schedule.findAll((schedules)=>{

    if(schedules){
        res.render(path.join(rootDir,"views","/admin/index.ejs"),{
          quotes:schedules,
          modal:null,
          pageTitle:"Admin Home",
          active_path:"/admin/home"
        })
      }else{
        console.log(schedules)
      }

    });

}

exports.GetIndexPage = GetIndexPage;
