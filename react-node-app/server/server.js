const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const app = express();
const calcScore = require('./carbonScore.js').default;

const admin = require("firebase-admin");

// Fetch the service account key JSON file contents
const serviceAccount = require("./cs307-mytree-firebase-adminsdk-9bjjb-227c08db8.json");

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = getFirestore();

app.use(bodyParser.urlencoded({extended: false}))
app.use(bodyParser.json())  

app.post('/api/activities', async (req, res) => {
    console.log(req.body)
    try {
        const docRef = await db.collection('users').doc(req.body.uid).collection('activities').add({
            activeCategory: req.body.activeCategory,
            activeActivity: req.body.activeActivity,
            activityParam: req.body.activityParam,
            timestamp: req.body.timestamp,
        });
        const score = calcScore(req.body);
        const userRef = await db.collection('users').doc(req.body.uid).update({
            carbonScore: FieldValue.increment(score),
        });
        
        console.log('Added document with ID: ', docRef.id);
        res.json({status: 'success', id: docRef.id, score: req.body.activityParam});
    } catch (err) {
        console.log('Error: ', err);
    }
        
});

// Send quiz results to DB
app.post('/api/quiz', async (req, res) => {
    console.log(req.body)
    try {
        const docRef = await db.collection('users').doc(req.body.uid).set({
            bio: req.body.bio,
            carbonScore: 0,
            hometown: req.body.hometown,
            targetCategory: req.body.activeCategory
        });
        
        console.log('Added document with ID: ', docRef.id);
        res.json({status: 'success', id: docRef.id, score: req.body.activityParam});
    } catch (err) {
        console.log('Error: ', err);
    }
        
});

// Get User info for profile
app.get('/api/profile/:uid', async (req, res) => {
    try {
        const user = db.collection('users').doc(req.params.uid);
        const doc = await user.get();
        if (!doc.exists) {
            console.log('No such document!');
          } else {
            console.log("document found")
            //console.log('Document data:', doc.data());
          }
        res.send(doc.data());
        
    } catch (err) {
        console.log('Error: ', err);
    }
        
});

app.get('/api/profileData', async (req, res) => {
    console.log(req.body)
    try {
        const user = db.collection('users').doc(req.body.uid);
        const doc = await user.get();
        if (!doc.exists) {
            console.log('No such document!');
          } else {
            console.log("document found")
            console.log('Document data:', doc.data());
          }
        
    } catch (err) {
        console.log('Error: ', err);
    }
        
});




app.listen(5001, () => {console.log("Server started on port 5001")})

