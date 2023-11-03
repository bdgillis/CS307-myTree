const express = require('express');
const router = express.Router();
const calcScore = require('../carbonScore.js')
const admin = require("firebase-admin");
const database = admin.firestore();
const { getFirestore, Timestamp, FieldValue, Filter} = require('firebase-admin/firestore');
const db = getFirestore();
const { query, where, getDocs } = require('firebase-admin/firestore');
const awardCheck = require('../awardCheck.js');
const functions = require('firebase-functions');


router.post('/', async (req, res) => {
    console.log(req.body)
    try {
        const numActRef = await db.collection('users').doc(req.body.uid).get();
        const numAct = numActRef.data().numActivities;
        //const weeklyNumAct = numActRef.data().weeklyNumActivities;

        
        const docRef = await db.collection('users').doc(req.body.uid).collection('activities').doc(`A${numAct + 1}`).set({
            activeCategory: req.body.activeCategory,
            activeActivity: req.body.activeActivity,
            activityParam: req.body.activityParam,
            timestamp: req.body.timestamp,
        });
        
        const actRef = db.collection('users').doc(req.body.uid).collection('activities');
        const snapshot = await actRef.get();
        const activityHistory = {}
        snapshot.forEach(doc => {
            activityHistory[doc.id] = doc.data();
        })
        
        const awards = awardCheck(activityHistory);
        console.log("awards: " + awards);


        const score = calcScore(req.body.activeCategory, req.body.activeActivity, req.body.activityParam);


        
        const userRef = await db.collection('users').doc(req.body.uid).update({
            numActivities: numAct + 1,
            carbonScore: FieldValue.increment(score),
            //weeklyNumActivities: weeklyNumAct + 1,
            //weeklyCarbonScore: FieldValue.increment(score),
            awards: awards
        });
        
        console.log('Added document with ID: ', docRef.id);

        res.json({status: 'success', id: docRef.id, score: score, awards: awards});
    } catch (err) {
        console.log('Error: ', err);
    }
});


module.exports = router;

// exports.resetWeekly = functions.pubsub.schedule('5 * * * *').onRun((context) => {
//     console.log('This will be run every 5 minutes!');
//     weeklyNumActivities: 0;
//     weeklyCarbonScore: 0;
//     return null;
// })