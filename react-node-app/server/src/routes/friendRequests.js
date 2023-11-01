const express = require('express');
const router = express.Router();
const calcScore = require('../carbonScore.js')
const admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue, Filter} = require('firebase-admin/firestore');
const db = getFirestore();
const { query, where, getDocs } = require('firebase-admin/firestore');

/*IMPORTANT: ALL UNFINISHED AND TENTATIVE TO UI DESIGN*/
/* Specifically: requests by username or uid */
/* Also: send username in parameter or in body */


//get incoming friend requests for specific user
router.get('/incoming/:uid', async (req, res) => {
    try {
        const user = db.collection('users').doc(req.params.uid);
        const doc = await user.get();
        if (!doc.exists) {
            console.log('No such document!'+req.params.uid);
          } else {
            console.log("document found")
            //console.log('Document data:', doc.data());
          }
        
        res.json({status: 'success', requests: doc.data().incomingRequests});
    } catch (err) {
        console.log('Error: ', err);
    }
});

//get outgoing friend requests for specific user
router.get('/outgoing', async (req, res) => {
    try {
        const user = db.collection('users').doc(req.body.uid);
        const doc = await user.get();
        if (!doc.exists) {
            console.log('No such document!');
          } else {
            console.log("document found")
            //console.log('Document data:', doc.data());
          }
        
          res.json({status: 'success', requests: doc.data().incomingRequests});
    } catch (err) {
        console.log('Error: ', err);
    }
});

//send friend request to specific user
    //add this request to the user's list of outgoing requests
    //add this request to the other user's list of incoming requests
router.post('/', async (req, res) => {
    try {
        
        
        const receivingRef = await db.collection('users').doc(req.body.receivingUid).update({
            incomingRequests: FieldValue.arrayUnion(req.body.sendingUid)
        });
        const sendingRef = await db.collection('users').doc(req.body.sendingUid).update({
            outgoingRequests: FieldValue.arrayUnion(req.body.receivingUid)
        });
        res.json({status: 'success'});
    } catch (err) {
        console.log('Error: ', err);
    }
});

//accept friend request from specific user
    //add this user to the other user's list of friends
    //add the other user to this user's list of friends
    //remove this user from the other user's list of incoming requests
    //remove the other user from this user's list of outgoing requests

    //decide on sendng uids in params or body
router.post('/accept:sendingUid', async (req, res) => {
    try {
        const receivingRef = await db.collection('users').doc(req.body.receivingUid).update({
            incomingRequests: FieldValue.arrayRemove(req.params.sendingUid),
            friends: FieldValue.arrayUnion(req.params.sendingUid)
        });
        const sendingRef = await db.collection('users').doc(req.body.sendingUid).update({
            outgoingRequests: FieldValue.arrayRemove(req.body.receivingUid),
            friends: FieldValue.arrayUnion(req.body.receivingUid)
        });
        res.json({status: 'success'});
    } catch (err) {
        console.log('Error: ', err);
    }
});

module.exports = router;