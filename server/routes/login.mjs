import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import jwt from "jsonwebtoken";
const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("user");
  let results = await collection.find({}).toArray();
  console.log(results);
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  let collection = await db.collection("user");
  let query = {_id: new ObjectId(req.params.id)};
  let result = await collection.findOne(query);

  if (!result) res.send("user").status(404);
  else res.send(result).status(200);
});

// This section will help you create a new record.
// router.post("/", async (req, res) => {
 
//   let newDocument = {
//     username: req.body.username,
//     password: req.body.password,  
//   };

//   let collection = await db.collection("user");
//   let result = await collection.insertOne(newDocument);
//   res.send(result).status(204);
 
// });

router.post("/", async (req, res) => {
 
  let collection = await db.collection("user");
  let result = await collection.findOne({username:req.body.username});
  console.log("The user you asked for is " ,result);
  
  const token = jwt.sign({username:req.body.username, password  : req.body.password},"this_secret_should_be_longer_than_it_is",{expiresIn:"1h"})
  console.log("your new token is", token)
  res.send(result).status(204);
 
});

// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };
  const updates =  {
    $set: {
      name: req.body.name,
      position: req.body.position,
      level: req.body.level
    }
  };

  let collection = await db.collection("user");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("user");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;