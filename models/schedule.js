// const db = require("./../util/database.js");
//
// class Schedule {
//
//   constructor(data){
//     this.name = data.name;
//     this.date = data.date;
//     this.time = data.time;
//     this.windowCount = data.windowCount;
//     this.address = data.address;
//   }
//
//   save(){
//
//     var db_instance = db.GetDb();
//
//     db_instance.collection("schedules").insertOne(this).then((result)=>{
//     }).catch(err => {console.log(err)})
//
//   }
//
//   static async findAll(cb){
//
//     var db_instance = db.GetDb();
//     var schedules =  await db_instance.collection("schedules").find({}).toArray();
//     cb(schedules);
//
//   }
//
// }
//
//
// module.exports =  Schedule;
