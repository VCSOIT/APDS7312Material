import express from "express";
import db from "../db/conn.mjs";
import { ObjectId } from "mongodb";
import CheckAuth from "../checkauth.mjs";


const router = express.Router();

// This section will help you get a list of all the records.
router.get("/", async (req, res) => {
  let collection = await db.collection("record");
  let results = await collection.find({}).toArray();
  res.send(results).status(200);
});

// This section will help you get a single record by id
router.get("/:id", async (req, res) => {
  const checkAuth = new CheckAuth(req, res, () => {
    let collection = db.collection("record");
    let query = {_id: new ObjectId(req.params.id)};
    let result = collection.findOne(query);

    if (!result) res.send("Not found").status(404);
    else res.send(result).status(200);
  });

  checkAuth.checkToken();
});


// This section will help you update a record by id.
router.patch("/:id", async (req, res) => {
  const checkAuth = new CheckAuth(req, res, () => {
    const query = { _id: new ObjectId(req.params.id) };
    const updates =  {
      $set: {
        name: req.body.name,
        position: req.body.position,
        level: req.body.level
      }
    };

    let collection = db.collection("record");
    let result = collection.updateOne(query, updates);

    res.send(result).status(200);
  });

  checkAuth.checkToken();

});

// This section will help you delete a record
router.delete("/:id", (req, res) => {
  const checkAuth = new CheckAuth(req, res, () => {
    const query = { _id: new ObjectId(req.params.id) };

    const collection = db.collection("record");
    let result = collection.deleteOne(query);

    res.send(result).status(200);
  });

  checkAuth.checkToken();
});



router.post('/create', (req, res) => {
 const checkAuth = new CheckAuth(req, res, () => {
  let newDocument = {
    name: req.body.name
  };
  let collection = db.collection("record");
  let result = collection.insertOne(newDocument);
  res.send(result).status(204);
 });

 checkAuth.checkToken();
});


export default router;