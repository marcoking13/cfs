var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");
var Quote = require("./../../data/quote.js");
var Schedule = require("./../../data/schedule.js");
var Meta = require("./../../data/meta.js");

var brow = {
  firefox:0,
  safari:0,
  chrome:0,
  edge:0
}


const GetIndexPage = (req,res,next) => {

    renderHomeQuotes(req,res)
}
const GetQuotePage = (req,res,next) => {

  Schedule.findAll((schedules)=>{
    var new_schedules = [];

    if(schedules.length > 3){
      for(var i = 0; i<3; i++){
        new_schedules.push(schedules[i]);
      }
    }

        res.render(path.join(rootDir,"views","/admin/quote.ejs"),{
          quotes:new_schedules,
          modal:null,
          pageTitle:"Admin Home",
          active_path:"/admin/home"
        })
      })

}

const MakeFavorite = async(req,res,next) => {

    var _id = req.body._id;
    var isFav = req.body.isFav;
    var fav = await Schedule.MakeFavorite(_id,isFav,(success)=>{
      renderHomeQuotes(req,res)
    });

}


const renderHomeQuotes = async (req,res)=>{



  Meta.FindAllRoots((roots)=>{

    console.log(roots);

    Meta.FindAllBrowsers((browsers)=>{

      for(var i = 0; i < browsers.length;i++){

        if(browsers[i].browser == "Edge"){
          brow.edge = browsers[i].qty
        }
        else if(browsers[i].browser == "Chrome"){
          brow.chrome = browsers[i].qty
        }
        else if(browsers[i].browser == "Safari"){
          brow.safari = browsers[i].qty
        }
        else if(browsers[i].browser == "Firefox"){
          brow.firefox = browsers[i].qty
        }
      }

      console.log(brow);



    Schedule.findAll(async (schedules)=>{
      var new_schedules = [];
      var count = 3;
      var meta_views = await Meta.GetVisitorCount();
      await GetBrowserCounts();

      if(schedules.length > count){
        count = 3;
      }else{
        count = schedules.length;
      }

      for(var i = 0; i < count; i++){
        new_schedules.push(schedules[i]);
      }

        res.render(path.join(rootDir,"views","/admin/index.ejs"),{
            quotes:new_schedules,
            modal:null,
            pageTitle:"Admin Home",
            meta:{
              views: meta_views,
              brow:brow,
              pages:
              roots

            },
            active_path:"/admin/home"
          })
        })
     });
  })
}


    const AddBrowserView = (req,res,next) =>{
      const browserName = Object.keys(req.body)[0];

      Meta.AddBrowserView(browserName);
    }

    const RootCount = (req,res,next) =>{
      const pageName = Object.keys(req.body)[0];

      console.log(pageName)
      Meta.AddRootView(pageName);
    }

const DeleteQuotes = (req,res,next) => {

  Schedule.deleteThese(req.body.quotes,(data)=>{
      console.log("Schedule Time");
      res.redirect("/admin/home");
    });

}

const GetBrowserCounts = async ()=>{


    Meta.FindAllBrowsers((browsers)=>{

      for(var i = 0; i < browsers.length;i++){

        if(browsers[i].browser == "Edge"){
          brow.edge = browsers[i].qty
        }
        else if(browsers[i].browser == "Chrome"){
          brow.chrome = browsers[i].qty
        }
        else if(browsers[i].browser == "Safari"){
          brow.safari = browsers[i].qty
        }
        else if(browsers[i].browser == "Firefox"){
          brow.firefox = browsers[i].qty
        }
      }

      console.log(brow);


    })


}

exports.DeleteQuotes = DeleteQuotes;
exports.GetIndexPage = GetIndexPage;
exports.RootCount = RootCount;

exports.GetQuotePage = GetQuotePage;
exports.AddBrowserView = AddBrowserView;
exports.MakeFavorite = MakeFavorite;
