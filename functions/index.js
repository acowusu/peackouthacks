const functions = require("firebase-functions");

const databaseConnection = require("./db");
const getDonors = require("./getDonors");
const insertDonor = require("./insertDonor");
// const updateDonors = require
const db = new databaseConnection();
// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
const express = require("express");
const cors = require("cors");

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.get("/:lat/:lon/:distance", (req, res) => {
  console.log(req, res);
  res.send(getDonors(db, req.params.lat, req.params.lon, req.params.distance));
});

// Add middleware to authenticate requests

exports.getDonors = functions.https.onRequest(app);
exports.createUser = functions.firestore
  .document("users/{userId}")
  .onCreate((snap, context) => {
    const record = snap.data();
    const data = {
      name: record.name,
      lat: record.location.lat,
      lon: record.location.lon,
      uid: context.params.userId,
      description: record.description,
      photos: record.photos.map((photo) => photo.url),
      profileurl: record.profile.url,
    };
    console.log(data);

    insertDonor(db, data);
    // perform desired operations ...
  });
