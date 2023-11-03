const express = require('express');
const router = express.Router();
const calcScore = require('../carbonScore.js')
const admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue, Filter} = require('firebase-admin/firestore');
const db = getFirestore();
const { query, where, getDocs } = require('firebase-admin/firestore');
const awardCheck = require('../awardCheck.js')

router.get('/:uid', async (req, res) => {
    try {
        console.log("Activityhistory/uid")
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

router.post('/', async (req, res) => {
    console.log(req.body)
    console.log("Activityhistory/")

    try {

        const actRef = db.collection('users').doc(req.body.uid).collection('activities');
        const snapshot = await actRef.get();
        const activityHistory = {}
        snapshot.forEach(doc => {
            activityHistory[doc.id] = doc.data();
        })
        
        const awards = awardCheck(activityHistory);
        console.log("awards after edit: " + awards);  

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
            //weeklyCarbonScore: FieldValue.increment(diff),
            awards: awards
        });

        res.json({status: 'success', score: diff});

        console.log(newScore);


    } catch (err) {
        console.log('Error: ', err);
    }

});

module.exports = router;