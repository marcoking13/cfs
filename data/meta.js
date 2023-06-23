const db = require("./../util/database.js");
var ObjectId = require('mongodb').ObjectId;

class Meta {

  constructor(){
    this.total_views = 0;
    this.unique_views = 0;
    this.average_bounce_rates = [];
    this.total_bounce_rates = [];
    this.browsers = {
      firefox:0,
      google:0,
      explorer:0,
      safari:0
    };
    this.pages = {
      home:0,
      contact:0,
      schedule:0,
      about:0
    }

    this.time_running = 0;
  }


  static  async AddPageView  (ip,find){

    var db_instance = db.GetDb();
    var find = await db_instance.collection("vistors").findOne({ip:ip});

    if(!find){
      await db_instance.collection("unique_visitors").insertOne({ip:ip});
    }else{
      await db_instance.collection("visitors").insertOne({ip:ip});
    }


  }

  static async AddBrowserView(browser){

    var db_instance = db.GetDb();
    var instance = await db_instance.collection("browsers").findOne({browser:browser});
    console.log(instance);
    if(instance){
      await db_instance.collection("browsers").updateOne({ browser: browser}, {$set: {qty: instance.qty + 1}});
    }else{
        await db_instance.collection("browsers").insertOne({browser:browser,qty:1});
    }

    const s =  await db_instance.collection("browsers").find({}).toArray();
    console.log(s);

  }

  static async AddRootView(browser){

    var db_instance = db.GetDb();
    var instance = await db_instance.collection("pages").findOne({name:browser});
    console.log(instance);
    if(instance){
      await db_instance.collection("pages").updateOne({ name: browser}, {$set: {qty: instance.qty + 1}});
    }else{
        await db_instance.collection("pages").insertOne({name:browser,qty:1});
    }

    const s =  await db_instance.collection("pages").find({}).toArray();
    console.log(s);

  }

  static async FindAllBrowsers(cb){
      var db_instance = db.GetDb();
      const s =  await db_instance.collection("browsers").find({}).toArray();
      cb(s);
  }

  static async FindAllRoots(cb){
      var db_instance = db.GetDb();
      const s =  await db_instance.collection("pages").find({}).toArray();
      await db_instance.collection("pages").deleteOne({_id: new ObjectId("64928d0baee03fa0d26f2696")});
      cb(s);
  }

  static  async GetVisitorCount  (){
    var db_instance = db.GetDb();
    var total_views = await db_instance.collection("unique_visitors").find({}).toArray();
    var unique_views = await db_instance.collection("visitors").find({}).toArray();

    return {
      total_views:total_views.length,
      unique_views:unique_views.length
    }

  }





}


module.exports = Meta;
