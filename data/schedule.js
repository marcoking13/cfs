const db = require("./../util/database.js");
var ObjectId = require('mongodb').ObjectId;

class Schedule {

  constructor(name,address,windows,date,time,favorite){

      this.name = name;
      this.address = address;
      this.windows = windows;
      this.date = date;
      this.time = time;
      this.total = 0;
      this.outside = 0;
      this.isFavorite = false;
  }

  async save(){

    var db_instance = db.GetDb();

    this.total_all_prices();

    db_instance.collection("schedules").insertOne(this).then((result)=>{
    }).catch(err => {console.log(err)});

  }

  static async MakeFavorite(id,toggle,cb){
      var db_instance = db.GetDb();
      var data = await db_instance.collection("schedules").updateOne({ _id: new ObjectId(id)}, {$set: {isFavorite: toggle}});
      if(data){
        cb(true)
      }else{
        cb(false);
      }
  }

  static async returnAll(){
    var db_instance = db.GetDb();
    var schedules =  await db_instance.collection("schedules").find({}).toArray();
    return schedules;
  }


  static async findAll(cb){

    var db_instance = db.GetDb();
    var schedules =  await db_instance.collection("schedules").find({}).toArray();
    cb(schedules);

  }

  static async deleteAll(cb){

    var db_instance = db.GetDb();
    var schedules =  await db_instance.collection("schedules").deleteMany();
    cb(schedules);

  }

  static async deleteThese(quotes,cb){

    var db_instance = db.GetDb();
    var flag = false;
    if(quotes.length >= 0){
      for ( var i = 0; i < quotes.length; i++){
        var objectID = new ObjectId(quotes[i])
        var schedules =  await db_instance.collection("schedules").deleteOne({_id:objectID});
      }
      flag = true;
    }
    cb(flag);

  }

  static async completeThese(quotes,cb){

    var db_instance = db.GetDb();
    var flag = false;
    await db_instance.collection("completed").deleteMany({});

    if(quotes.length >=0){
      for ( var i = 0; i < quotes.length; i++){

        var objectID = new ObjectId(quotes[i]);
        var quote = await db_instance.collection('schedules').findOne({_id:objectID});
        var schedules =  await db_instance.collection("completed").insertOne(quote);

        await db_instance.collection("schedules").deleteOne({_id:objectID});
        await db_instance.collection("completed").find({}).toArray();

      }
      flag  = true;
    }


    cb(flag);

  }

  total_all_prices(){

    for (var i = 0; i < this.windows.length; i++){

      if(typeof this.windows[i].total_price == "number" ){
        this.total += this.windows[i].total_price;
      }

    }

    this.total = Math.round(this.total);
    this.outside = Math.round(this.total * .5);


  }

}


module.exports = Schedule;
