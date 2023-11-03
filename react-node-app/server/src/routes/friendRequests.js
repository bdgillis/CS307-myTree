const express = require('express');
const router = express.Router();
const calcScore = require('../carbonScore.js')
const admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const db = getFirestore();
const { query, where, getDocs } = require('firebase-admin/firestore');

/*IMPORTANT: ALL UNFINISHED AND TENTATIVE TO UI DESIGN*/
/* Specifically: requests by username or uid */
/* Also: send username in parameter or in body */


//get incoming friend requests for specific user
router.get('/incoming/:uid', async (req, res) => {
    try {
        console.log("friendrequest/incoming/uid")

        const user = db.collection('users').doc(req.params.uid);
        const doc = await user.get();
        if (!doc.exists) {
            console.log('No such document!');
            res.json({ status: 'error', error: 'user does not exist' });
        } else {
            if (doc.data().incomingRequests == null) {
                res.json({ status: 'success', incomingRequests: [] });
            } else {
                res.json({ status: 'success', incomingRequests: doc.data().incomingRequests });
            }
        }

    } catch (err) {
        console.log('Error: ', err);
    }
});

//get outgoing friend requests for specific user
router.get('/outgoing', async (req, res) => {
    try {
        console.log("friendrequest/outgoing")

        const user = db.collection('users').doc(req.body.uid);
        const doc = await user.get();
        if (!doc.exists) {
            console.log('No such document!');
            res.json({ status: 'error', error: 'user does not exist' });
        } else {
            if (doc.data().outgoingRequests == null) {
                res.json({ status: 'success', outgoingRequests: [] });
            } else {
                res.json({ status: 'success', outgoingRequests: doc.data().outgoingRequests });
            }
        }


    } catch (err) {
        console.log('Error: ', err);
    }
});

//send friend request to specific user
//add this request to the user's list of outgoing requests
//add this request to the other user's list of incoming requests
router.post('/', async (req, res) => {
    try {
        console.log("friendrequest")

        console.log(req.body)
        const receivingRef = await db.collection('users').doc(req.body.receivingUid).update({
            incomingRequests: FieldValue.arrayUnion(req.body.sendingUsername)
        });
        const sendingRef = await db.collection('users').doc(req.body.sendingUid).update({
            outgoingRequests: FieldValue.arrayUnion(req.body.receivingUsername)
        });
        res.json({ status: 'success' });
    } catch (err) {
        console.log('Error: ', err);
        res.json({ status: 'error', error: 'user does not exist' });
    }
});

//accept friend request from specific user
//add this user to the other user's list of friends
//add the other user to this user's list of friends
//remove this user from the other user's list of incoming requests
//remove the other user from this user's list of outgoing requests

//decide on sendng uids in params or body
router.post('/accept', async (req, res) => {
    try {
        console.log("friendrequest/acept")

        const receivingRef = await db.collection('users').doc(req.body.receivingUid).update({
            incomingRequests: FieldValue.arrayRemove(req.body.sendingUsername),
            friends: FieldValue.arrayUnion(req.body.sendingUsername)
        });


        const sendingRef = await db.collection('users');
        const snapshot = await sendingRef.where("username", "==", req.body.sendingUsername).get();

        const data = snapshot.docs[0].data();
        let outgoingRequests = data.outgoingRequests;
        outgoingRequests = FieldValue.arrayRemove(req.body.receivingUsername)
        let friends = data.friends;
        friends = FieldValue.arrayUnion(req.body.receivingUsername)

        const docRef = sendingRef.doc(snapshot.docs[0].id);
        docRef.update({ outgoingRequests: outgoingRequests, friends: friends })
            .then(() => {
                console.log("Document updated successfully.");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    } catch (err) {
        console.log('Error: ', err);
    }
});

router.post('/decline', async (req, res) => {
    try {
        console.log("friendrequest/decline")

        console.log(req.body)
        const receivingRef = await db.collection('users').doc(req.body.receivingUid).update({
            incomingRequests: FieldValue.arrayRemove(req.body.sendingUsername),
        });

        const sendingRef = await db.collection('users');
        const snapshot = await sendingRef.where("username", "==", req.body.sendingUsername).get();

        const data = snapshot.docs[0].data();
        let outgoingRequests = data.outgoingRequests;
        outgoingRequests = FieldValue.arrayRemove(req.body.receivingUsername)

        const docRef = sendingRef.doc(snapshot.docs[0].id);
        docRef.update({ outgoingRequests: outgoingRequests})
            .then(() => {
                console.log("Document updated successfully.");
            })
            .catch((error) => {
                console.error("Error updating document: ", error);
            });
    } catch (err) {
        console.log('Error: ', err);
    }
});

module.exports = router;