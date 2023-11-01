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
        const numFriend = numActRef.data().numFriends;
        
        const docRef = await db.collection('users').doc(req.body.uid).collection('friends').doc(`A${numAct + 1}`).set({
            username: req.body.username,
            uid: req.body.uid
        });
        const actRef = await db.collection('users').doc(req.body.uid).update({
            numFriends: numFriend + 1
        });
        
        console.log('Added document with ID: ', docRef.id);
        res.json({status: 'success', id: docRef.id, friends:numFriend + 1});
    } catch (err) {
        console.log('Error: ', err);
    }
});

router.get('/username=:username', async (req, res) => {
    try {
        console.log("username: " + req.params.username); 
        const docRef = db.collection('users');
        const snapshot = await docRef.where("username", "==", req.params.username).get();

        if (snapshot.empty) {
            console.log('No matching documents.');
            res.json({status: 'success', available: true});
        } else {
            res.json({status: 'success', available: false, id: snapshot.docs[0].id, user: snapshot.docs[0].data()});
        }    
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({error: 'Internal server error'})
    }
});

router.get('/uid=:uid', async (req, res) => {
    try {
        console.log("uid: " + req.params.uid); 
        const docRef = await db.collection('users').doc(req.params.uid);
        const doc = await docRef.get();
        console.log(doc.data());
        res.json({status: 'success', username: doc.data().username, userDoc: doc.data()});
          
    } catch (err) {
        console.log('Error: ', err);
        res.status(500).json({error: 'Internal server error'})
    }
});


module.exports = router;