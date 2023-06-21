const express = require("express");
const app = express();
var admin = require("firebase-admin");
var serviceAccount = require("./serviceAccountKey.json");
const saltedMd5=require('salted-md5')
const path=require('path');
const multer=require('multer')
require('dotenv').config()

const upload=multer({storage: multer.memoryStorage()})

//firebase setup
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: process.env.DATABASE_URL,
  storageBucket: "gs://practice-app-28.appspot.com"
});

//express functionality
//The app.locals object has properties that are local variables within the application, and will be available in templates rendered with res.render.
app.locals.bucket = admin.storage().bucket()


app.get("/", (req, res) => {
  res.json("Firebase Storage");
});

app.post("/", upload.single("filename"), async(req, res) => {
  try{
    const name = saltedMd5(req.file.originalname, 'SUPER-S@LT!')
    const fileName = name + path.extname(req.file.originalname)
    await app.locals.bucket.file(`files/${fileName}`).createWriteStream().end(req.file.buffer)
    return res.send({
      name: req.file.originalname,
      type: req.file.mimetype,
  })
  }
  catch (error) {
    console.log(error)
      return res.status(400).send(error.message)
  }
});

app.listen(5000, ()=>{
    console.log("server running at port 5000")
});