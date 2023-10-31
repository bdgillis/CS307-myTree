const express = require('express');
const router = express.Router();
const calcScore = require('../carbonScore.js')
const admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue, Filter} = require('firebase-admin/firestore');
const db = getFirestore();
const { query, where, getDocs } = require('firebase-admin/firestore');


router.post('/', async (req, res) => {
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

module.exports = router;