// Docs on event and context https://docs.netlify.com/functions/build/#code-your-function-2
const {MongoClient} = require("mongodb");
require("dotenv").config();
var ObjectId = require('mongodb').ObjectId;



const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();


const handler = async (id,laborer) =>{
  try {
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection("laborers");
    var _id = new ObjectId(laborer.person_id);

    var response = collection.findOne({_id:_id});

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
