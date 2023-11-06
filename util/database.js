const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
var url_2 = "mongodb://marcokhodr16@gmail.com:Thirdpi1@iad2-c9-2.mongo.objectrocket.com:52798/cfs?replicaSet=2be5fbe4b39d43b5852229afe35aa089";
var url =  "mongodb://localhost:27017/" ;

const MongoConnect = (cb) => {

  MongoClient.connect(url).then((client)=>{
    _db = client.db("cfs");
    cb("Success")
  });

}

const GetDb = () => {

  if(_db){
    return _db;
  }
  else{
    return null;
  }

}


exports.MongoConnect = MongoConnect;
exports.GetDb = GetDb;
