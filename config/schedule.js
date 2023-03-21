const db = require("./../util/database.js");

class Schedule {

  constructor(name,address,windows,date,time){

      this.name = name;
      this.address = address;
      this.windows = windows;
      this.date = date;
      this.time = time;
      this.total = 0;
      this.outside = 0;
  }

  async save(){

    var db_instance = db.GetDb();
    this.total_all_prices();

    db_instance.collection("schedules").insertOne(this).then((result)=>{
    }).catch(err => {console.log(err)});

  }


  static async findAll(cb){

    var db_instance = db.GetDb();
    var schedules =  await db_instance.collection("schedules").find({}).toArray();
    cb(schedules);

  }

  total_all_prices(){

    for (var i = 0; i < this.windows.length; i++){

      this.total += this.windows[i].total_price;
    }

    this.total = Math.round(this.total);
    this.outside = Math.round(this.total * .5);
  }



}


module.exports = Schedule;
