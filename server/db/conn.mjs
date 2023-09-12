import { MongoClient } from "mongodb";
import dotenv from "dotenv";
dotenv.config();


const variable = process.env.MONGO_CONN_STRING || $MONGO_CONN_STRING ;
console.log(variable);



//const connectionString = "mongodb+srv://sarinatill18:sarinacm@cluster0.mip3zez.mongodb.net/" ;
                         
//console.log(connectionString);
//const connectionString = process.env.ATLAS_URI;
//console.log(connectionString);

const client = new MongoClient(variable);

let conn;
try {
  conn = await client.connect();
  console.log("successfully connected to Db")
} catch(e) {
  console.error(e);
}



  let db = conn.db("apds");



  export default db;