const mongodb = require("mongodb");
const MongoClient = mongodb.MongoClient;
let _db;
var url ="mongodb://marcokhodr116@gmail.com:thirdpi1@us-central1.gcp.realm.mongodb.com:27020/?authMechanism=PLAIN&authSource=%24external&ssl=true&appName=application-0-xlgfu:mongodb-atlas:local-userpass" || "mongodb://localhost:27017/" ;

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
