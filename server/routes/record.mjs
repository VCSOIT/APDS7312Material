import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import CheckAuth from "../checkauth.mjs";




const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {

  console.log(req.headers, "GET HEADERS")
  let collection = await db.collection("record");
  let results = await collection.find({}).toArray();
  console.log(results);
  res.send(results).status(200);
});
  

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  console.log(req.headers, "HEADERS")
  const checkAuth = new CheckAuth(req, res, () => {
  let collection =  db.collection("record");
  let query = {_id: new ObjectId(req.params.id)};
  let result = collection.findOne(query);

  if (!result) res.send("record").status(404);
  else res.send(result).status(200);
});

checkAuth.checkToken();
});

// This section will help you create a new record.
router.post("/", async (req, res) => {
  console.log(req.headers, "POST HEADERS")
  const checkAuth = new CheckAuth(req, res, () => {

  let newDocument = {
    name: req.body.name,
    position: req.body.position,
    level: req.body.level,
  };
  let collection =  db.collection("record");
  let result =  collection.insertOne(newDocument);
  res.send(result).status(204);
});

checkAuth.checkToken();
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

  let collection = await db.collection("apds");
  let result = await collection.updateOne(query, updates);

  res.send(result).status(200);
});

// This section will help you delete a record
router.delete("/:id", async (req, res) => {
  const query = { _id: new ObjectId(req.params.id) };

  const collection = db.collection("apds");
  let result = await collection.deleteOne(query);

  res.send(result).status(200);
});

export default router;