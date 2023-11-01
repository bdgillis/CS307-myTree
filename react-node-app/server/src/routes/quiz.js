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
        const docRef = await db.collection('users').doc(req.body.uid).set({
            bio: req.body.bio,
            carbonScore: 0,
            hometown: req.body.hometown,
            targetCategory: req.body.activeCategory,
            quizTaken: req.body.quizTaken, 
            numActivities: 0,
            username: req.body.username,
            incomingRequests: [],
            outgoingRequests: []
        });
        
        console.log('Added document with ID: ', docRef.id);
        res.json({status: 'success', id: docRef.id});
    } catch (err) {
        console.log('Error: ', err);
    }

});


router.get('/:username', async (req, res) => {
    try {
        console.log("username: " + req.params.username); 
        const docRef = db.collection('users');
        const snapshot = await docRef.where("username", "==", req.params.username).get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            res.json({status: 'success', available: true});
        } else {
            res.json({status: 'success', available: false});
        }    
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({error: 'Internal server error'})
    }
});


module.exports = router;