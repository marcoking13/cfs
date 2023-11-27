const {MongoClient} = require("mongodb");
require("dotenv").config();
var ObjectId = require('mongodb').ObjectId;


const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();


const handler = async (id,toggle) =>{
  try {
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection("schedules");

    const response = await collection.updateOne({ _id: new ObjectId(id)}, {$set: {isFavorite: toggle}});


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
