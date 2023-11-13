const express = require('express');
const router = express.Router();
const calcScore = require('../carbonScore.js')
const admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue, Filter} = require('firebase-admin/firestore');
const db = getFirestore();
const { query, where, getDocs } = require('firebase-admin/firestore');


//get outgoing group requests for specific user
router.get('/userRequests', async (req, res) => {
    try {
        console.log("groupRequests/userRequests")

        const user = db.collection('users').doc(req.body.uid);
        const doc = await user.get();
        if (!doc.exists) {
            console.log('No such document!');
            res.json({ status: 'error', error: 'user does not exist' });
        } else {
            if (doc.data().groupRequests == null) {
                res.json({ status: 'success', groupRequests: [] });
            } else {
                res.json({ status: 'success', groupRequests: doc.data().groupRequests });
            }
        }


    } catch (err) {
        console.log('Error: ', err);
    }
});

//get incoming friend requests for specific user
router.get('/incoming/:groupname', async (req, res) => {
    try {
        console.log("groupRequests/incoming/:groupname")

        const user = db.collection('groups').doc(req.params.groupname);
        const doc = await user.get();
        if (!doc.exists) {
            console.log('No such document!');
            res.json({ status: 'error', error: 'group does not exist' });
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


//send group request
router.post('/:groupname', async (req, res) => {
    try {
        console.log("groupRequests/:groupname")

        console.log(req.body)
        const receivingRef = await db.collection('groups').doc(req.params.groupname).update({
            incomingRequests: FieldValue.arrayUnion(req.body.username)
        });
        const sendingRef = await db.collection('users').doc(req.body.uid).update({
            groupRequests: FieldValue.arrayUnion(req.params.groupname)
        });
        res.json({ status: 'success' });
    } catch (err) {
        console.log('Error: ', err);
        res.json({ status: 'error', error: 'could not request to join group' });
    }
});

//not completely copied from friends yet, need to change
router.post('/accept', async (req, res) => {
    try {
        console.log("groupRequest/accept")

        const receivingRef = await db.collection('users').doc(req.body.uid).update({
            groupRequests: FieldValue.arrayRemove(req.body.groupname),
            groups: FieldValue.arrayUnion(req.body.groupname)
        });


        const sendingRef = await db.collection('users');
        const snapshot = await sendingRef.where("username", "==", req.body.username).get();

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


//not completely copied from friends yet, need to change
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