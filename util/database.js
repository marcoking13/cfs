const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
var url = "mongodb://localhost:27017/";

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
