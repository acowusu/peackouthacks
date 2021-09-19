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
var admin = require("firebase-admin");

admin.initializeApp();

const app = express();

// Automatically allow cross-origin requests
app.use(cors({ origin: true }));
app.get("/:lat/:lon/:distance", async (req, res) => {
  console.log(req, res);
  const result = await getDonors(
    db,
    req.params.lat,
    req.params.lon,
    req.params.distance
  );
  console.log(result);

  res.json(result);
});

// Add middleware to authenticate requests

exports.getDonors = functions.https.onRequest(app);
exports.createUser = functions.firestore
  .document("users/{userId}")
  .onCreate((snap, context) => {
    const record = snap.data();
    const data = {
      name: record.name,
      lat: record.location.latitude,
      lon: record.location.longitude,
      uid: context.params.userId,
      description: record.description,
      photos: record.photos.map((photo) => photo.url),
      profileurl: record.profile.url,
    };
    console.log(data);

    return insertDonor(db, data);
    // perform desired operations ...
  });
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(functions.config().sendgrid.key);
const firedb = admin.firestore();
const mail = express();
mail.use(express.json());
// Automatically allow cross-origin requests
mail.use(cors({ origin: true }));
app.post("/connect", async function (req, res) {
  admin
    .auth()
    .verifyIdToken(req.body.currentUser)
    .then((decodedToken) => {
      const uid = decodedToken.uid;
      const userRef = firedb.collection("users").doc(uid);
      userRef.get().then(async (doc) => {
        if (!doc.exists) {
          console.log("No such document!");
        } else {
          const userData = doc.data();
          console.log("Document data:", userData);
          let recipient = "";
          try {
            const response = await admin.auth().getUser(req.body.reciever);
            console.log(response);
            recipient = response.email;
          } catch (error) {
            console.log(error);
            res.send(`Not authorised ${error}`);
          }
          const msg = {
            to: recipient, // Change to your recipient
            from: { email: "hello@handmedown.biz", name: "HandMeDown" }, // Change to your verified sender
            reply_to: { email: userData.email, name: userData.name },
            subject: `You have a new connection with ${userData.name}`,
            text: "and easy to do anywhere, even with Node.js",
            html: /*html */ `Hi you have a new connection with <strong>${userData.name}</strong> 
            <br>
            
            <image  width="120"  src="${userData.profile.url}" style="margin: 0; border: 0; padding: 0; display: block;"/>
              
              
              <br>
              Reply to this email to get orgamise a meeting with ${userData.name} and start exhanging items !`,
          };
          sgMail
            .send(msg)
            .then(() => {
              console.log("Email sent");
              res.send("email sent");
            })
            .catch((error) => {
              console.error(error);
              res.status(500).send("email not sent");
            });
          //
          //
          //
          //
        }
      });
    })
    .catch((error) => {
      res.send(`Not authorised ${error}`);
    });
});
exports.mail = functions.https.onRequest(app);
