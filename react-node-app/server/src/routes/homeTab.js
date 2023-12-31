const express = require('express');
const router = express.Router();
const calcScore = require('../carbonScore.js')
const admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue, Filter} = require('firebase-admin/firestore');
const db = getFirestore();
const { query, where, getDocs } = require('firebase-admin/firestore');


// Get User info for user profile
router.get('/:uid', async (req, res) => {
    try {
        console.log("profile/uid")
        console.log("uid: " + req.params.uid);

        const user = db.collection('users').doc(req.params.uid);
        const doc = await user.get();
        if (!doc.exists) {
          // console.log('No such document!');
        } else {
          // console.log("document found")
          //console.log('Document data:', doc.data());
        }
        res.send(doc.data());
    } catch (err) {
        console.log('Error: ', err);
    }
});

// Get User info for public profile
router.get('/username=:username', async (req, res) => {
    try {
        console.log("profile/username")

        console.log("username: " + req.params.username);
        const docRef = db.collection('users');
        const snapshot = await docRef.where("username", "==", req.params.username).get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            res.json({ status: 'success', available: true });
        } else {
            res.json({ status: 'success', available: false, id: snapshot.docs[0].id, user: snapshot.docs[0].data() });
        }
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({ error: 'Internal server error' })
    }

});

router.get('/activity/:username', async (req, res) => {
    try {
        console.log("activity/username")

        console.log("username: " + req.params.username); 
        const docRef = db.collection('users');
        const snapshot = await docRef.where("username", "==", req.params.username).get();
        console.log(snapshot.docs)
        const activities = {}; // define empty object
        const docId = snapshot.docs[0].id;

        const activityRef = db.collection('users').doc(docId).collection('activities');
        const activitySnapshot = await activityRef.get();
        activitySnapshot.forEach(doc => {
            activities[doc.id] = doc.data(); // add each document to the object
        });
        console.log("Returning activties for user: " + req.params.username);
        console.log(activities);
        res.json({status: 'success', activities: activities});
    
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({error: 'Internal server error'})
    }
});

module.exports = router;