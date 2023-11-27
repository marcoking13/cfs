const {MongoClient} = require("mongodb");
require("dotenv").config();


const mongoClient = new MongoClient(process.env.MONGODB_URI);

const clientPromise = mongoClient.connect();


const handler = async (event) =>{
  try {
    const database = (await clientPromise).db(process.env.MONGODB_DATABASE);
    const schedule = database.collection("price_sheet");
    const results = await collection.find({}).toArray();
    return {
      status:200,
      body:JSON.stringify(results)
    }

  }
    catch (error){
      return {
        statusCode:500,body:error.toString()
      }
      }
    }


module.exports = handler;
