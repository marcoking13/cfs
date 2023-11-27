// Docs onconst {MongoClient} = require("mongodb");
require("dotenv").config();


const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();


const handler = async (event) =>{
  try {
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const collection = database.collection("completed");
    const response = await collection.deleteMany({});
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
