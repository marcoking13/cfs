// Docs onconst {MongoClient} = require("mongodb");
require("dotenv").config();
var ObjectId = require('mongodb').ObjectId;


const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();


const handler = async (id) =>{
  try {
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection("browsers");
    var objectID = new ObjectId(id);
    const response = await collection.deleteOne({_id:objectID});
    return {
      status:200,
      body:JSON.stringify(response)
    }

  }
    catch (error){
      return {
        statusCode:500,body:error.toString()
      }
      }
    }


module.exports = handler;
