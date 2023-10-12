const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase-admin/app');
const app = express()

const admin = require("firebase-admin");

// Fetch the service account key JSON file contents
const serviceAccount = require("./cs307-mytree-firebase-adminsdk-9bjjb-227c08db8.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  // The database URL depends on the location of the database
//   databaseURL: "https://DATABASE_NAME.firebaseio.com"
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
// var db = admin.database();
// var ref = db.ref("restricted_access/secret_document");
// ref.once("value", function(snapshot) {
//   console.log(snapshot.val());
// });

const db = getFirestore();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())  

app.post('/api/activities', (req, res) => {
    console.log(req.body)
    res.json({status: 'success'})

})


app.listen(5001, () => {console.log("Server started on port 5001")})

