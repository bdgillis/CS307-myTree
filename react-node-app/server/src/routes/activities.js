const express = require('express');
const router = express.Router();
const calcScore = require('../carbonScore.js')
const admin = require("firebase-admin");
const database = admin.firestore();
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const db = getFirestore();
const { query, where, getDocs } = require('firebase-admin/firestore');
const awardCheck = require('../awardCheck.js');
const challengeCheck = require('../challengeCheck.js');
const functions = require('firebase-functions');
const doc = require('firebase-admin').firestore().doc;


router.post('/', async (req, res) => {
    console.log(req.body)
    console.log("Activities")
    try {
        const numActRef = await db.collection('users').doc(req.body.uid).get();
        const numAct = numActRef.data().numActivities;
        const weeklyNumAct = numActRef.data().weeklyNumActivities;


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

        const chalRef = db.collection('users').doc(req.body.uid).collection('challenge');
        const chalSnapshot = await chalRef.get();
        const challenge = {}
        if (!chalSnapshot.empty) {
            chalSnapshot.forEach(doc => {
                challenge[0] = (doc.data());
            })
            console.log(challenge[0]);
            // if (challenge.length != 0) {
            const challengeCompleted = challengeCheck(req.body, challenge[0]);
            console.log(challengeCompleted);

            if (challengeCompleted.completed) {
                const chalDelete = db.collection('users').doc(req.body.uid).collection('challenge').doc('challenge').delete();
                const string = challenge[0].subCategory + " " + challenge[0].parameter + "  " + challenge[0].suffix;
                const chalUpdate = db.collection('users').doc(req.body.uid).update({
                    numChallenges: FieldValue.increment(1),
                    completedChallenges: FieldValue.arrayUnion(string)
                });
            } else {
                const chalUpdate = db.collection('users').doc(req.body.uid).collection('challenge').doc('challenge').update({
                    progress: challengeCompleted.progress
                });
            }
        }

        const awards = awardCheck(activityHistory);
        console.log("awards: " + awards);


        const score = calcScore(req.body.activeCategory, req.body.activeActivity, req.body.activityParam);

        const userRef = await db.collection('users').doc(req.body.uid).update({
            numActivities: numAct + 1,
            carbonScore: FieldValue.increment(score),
            weeklyNumActivities: weeklyNumAct + 1,
            weeklyCarbonScore: FieldValue.increment(score),
            awards: awards
        });

        console.log('Added document with ID: ', docRef.id);

        res.json({ status: 'success', id: docRef.id, score: score, awards: awards });
    } catch (err) {
        console.log('Error: ', err);
    }
});


module.exports = router;

