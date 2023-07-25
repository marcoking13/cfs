const Quote = require("./../../data/quote.js");
const Schedule = require("./../../data/schedule.js");
const Meta = require("./../../data/meta.js");
const Pricing = require("./../../config/pricing.js");
const Clients = require("./../../config/clients.js");
const ShowcaseHeadings = require("./../../config/showcase_headings.js");
const BeforeAndAfterConfig = require("./../../config/before_and_after_config.js");
const Values = require("./../../config/values.js");


function returnLockClass(lock){

  if(lock){
    return "lock";
  }else{
    return " ";
  }

}

function AddPageView(req){
    const ipAddress = req.ip;
    Meta.AddPageView(ipAddress);
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


exports.getData = getData;
exports.AddPageView = AddPageView;
exports.returnLockClass = returnLockClass;
