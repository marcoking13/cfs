var express = require("express");
var path = require("path");
var rootDir = require("./../../util/path.js");
const Quote = require("./../../config/quote.js");
const Schedule = require("./../../config/schedule.js");
var modal = null;
var lock = false;

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
      active_path:"/about_us",
      lock:false,
      heading_1:"About",
      heading_2:"Custom Facility Services",
      showcase_img:"./assets/showcase_1.png"
    });

}

const ExitOutOfModal = (req,res,next) => {
  modal = null;
  res.render(path.join(rootDir,"views","/user/index.ejs"),{
    pageTitle:"Home Page",
    active_path:"/",
    lock:false,
    modal:modal
  })
}

const GetSchedulePage = (req,res,next)=>{
  res.render(path.join(rootDir,"views","/user/schedule.ejs"),{
    pageTitle:"Schedule Online",
    active_path:"/schedule",
    lock:false,
    modal:modal,
    heading_1:"Schedule Today!",
    heading_2:"480-774-9493",
    showcase_img:"./assets/showcase_3.png",
    before_and_after_images: [
      {
        before:"./assets/images/before_1.png",
        after:"./assets/images/after_1.png"
      },
      {
        before:"./assets/images/before_2.png",
        after:"./assets/images/after_2.png"
      },
      {
        before:"./assets/images/before_3.png",
        after:"./assets/images/after_3.png"
      },
      {
        before:"./assets/images/before_4.png",
        after:"./assets/images/after_4.png"
      },
      {
        before:"./assets/images/before_5.png",
        after:"./assets/images/after_5.png"
      },
      {
        before:"./assets/images/before_6.png",
        after:"./assets/images/after_6.png"
      },
      {
        before:"./assets/images/before_7.png",
        after:"./assets/images/after_7.png"
      },
      {
        before:"./assets/images/before_8.png",
        after:"./assets/images/after_8.png"
      }
    ]
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
  lock = true;
  res.redirect("/");

}

const GetHomePage = (req,res,next)=>{
  res.render(path.join(rootDir,"views","/user/index.ejs"),{
    pageTitle:"Home",
    modal:modal,
    lock:lock,
    active_path:"/",
    heading_1:"About",
    heading_2:"Custom Facility Services",
    showcase_img:"./assets/showcase_3.png"
  });
}

const GetContactUsPage = (req,res,next)=>{
  res.render(path.join(rootDir,"views","/user/contact_us.ejs"),{
    pageTitle:"Contact Us",
    active_path:"/contact_us",
    lock:lock,
    heading_1:"480-939-9292",
    heading_2:"info@customfacilityservices.com",
    showcase_img:"./assets/contact_us_b.png",
    modal:modal
  });
}


exports.GetAboutUsPage = GetAboutUsPage;
exports.GetSchedulePage = GetSchedulePage;
exports.ExitOutOfModal = ExitOutOfModal;

exports.GetScheduleData = GetScheduleData;
exports.GetHomePage = GetHomePage;
exports.GetContactUsPage = GetContactUsPage;
