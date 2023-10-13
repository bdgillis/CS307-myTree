const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const app = express();
const calcScore = require('./carbonScore.js')

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
        const numActRef = await db.collection('users').doc(req.body.uid).get();
        //I want to get only the number of activities
        const numAct = numActRef.data().numActivities;
        
        const docRef = await db.collection('users').doc(req.body.uid).collection('activities').doc(`A${numAct + 1}`).set({
            activeCategory: req.body.activeCategory,
            activeActivity: req.body.activeActivity,
            activityParam: req.body.activityParam,
            timestamp: req.body.timestamp,
        });
        const actRef = await db.collection('users').doc(req.body.uid).update({
            numActivities: numAct + 1
        });

        const score = calcScore(req.body.activeCategory, req.body.activeActivity, req.body.activityParam);
        
        const userRef = await db.collection('users').doc(req.body.uid).update({
            carbonScore: FieldValue.increment(score),
        });
        
        console.log('Added document with ID: ', docRef.id);
        res.json({status: 'success', id: docRef.id, score: score});
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
            targetCategory: req.body.activeCategory,
            quizTaken: req.body.quizTaken, 
            numActivities: 0
        });
        
        console.log('Added document with ID: ', docRef.id);
        res.json({status: 'success', id: docRef.id});
    } catch (err) {
        console.log('Error: ', err);
    }
});

app.get('/api/editActivityHistory/:uid', async (req, res) => {
    try {
        console.log("uid: " + req.params.uid); 
        const docRef = db.collection('users').doc(req.params.uid).collection('activities');
        const snapshot = await docRef.get();
        
        const activities = {}; // define empty object

        snapshot.forEach(doc => {
            activities[doc.id] = doc.data(); // add each document to the object
        });
        console.log("Returning activties for uid: " + req.params.uid);
        res.json({status: 'success', activities: activities});
    
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({error: 'Internal server error'})
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
        
app.post('/api/editActivityHistory', async (req, res) => {
    console.log(req.body)
    try {
        const oldRef = await db.collection('users').doc(req.body.uid).collection('activities').doc(req.body.selectedActivity).get();

        const oldScore = calcScore(oldRef.data().activeCategory, oldRef.data().activeActivity, oldRef.data().activityParam);
        
        const newRef = await db.collection('users').doc(req.body.uid).collection('activities').doc(req.body.selectedActivity).set({
            activeCategory: req.body.activeCategory,
            activeActivity: req.body.activeActivity,
            activityParam: req.body.activityParam,
            timestamp: req.body.timestamp,
        });
        const newScore = calcScore(req.body.activeCategory, req.body.activeActivity, req.body.activityParam);
        const diff = newScore - oldScore;
        const userRef = await db.collection('users').doc(req.body.uid).update({
            carbonScore: FieldValue.increment(diff),
        });
        
        res.json({status: 'success', id: docRef.id, score: diff});

    } catch (err) {
        console.log('Error: ', err);
    }
        
});


app.listen(5001, () => {console.log("Server started on port 5001")})

