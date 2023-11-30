const express = require('express');
const router = express.Router();
const calcScore = require('../carbonScore.js')
const admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue, Filter} = require('firebase-admin/firestore');
const db = getFirestore();
const { query, where, getDocs } = require('firebase-admin/firestore');


//A group request is defined as a user requesting to join a group they are not already a part of

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

//get incoming group requests for specific group
router.get('/incoming/:groupname', async (req, res) => {
    try {
        const group = db.collection('groups').doc(req.params.groupname);
        const doc = await group.get();
        if (!doc.exists) {
            console.log('No group with groupname: ' + req.params.groupname);   
            res.json({exists: false});
        } else {
            console.log('Group with groupname: ' + req.params.groupname + ' exists');
            const incomingRequests = [];
            var counter = 0;

            for (const user of doc.data().incomingRequests) {
                const userRef = await db.collection('users').doc(user).get();
                incomingRequests[counter++] = userRef.data().username;
            }
            
            res.json({incomingRequests: incomingRequests});
        }

    } catch (err) {
        console.log('Error: ', err);
    }
});


//send group join request
router.post('/:groupname', async (req, res) => {
    try {
        console.log("groupRequests/:groupname")

        console.log(req.body)
        const receivingRef = await db.collection('groups').doc(req.params.groupname).update({
            incomingRequests: FieldValue.arrayUnion(req.body.uid)
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

//accept group join request
router.post('/accept/:groupname', async (req, res) => {
    try {
        console.log("groupRequest/accept")

        const receivingRef = await db.collection('users').doc(req.body.uid).update({
            groupRequests: FieldValue.arrayRemove(req.params.groupname),
            groups: FieldValue.arrayUnion(req.params.groupname)
        });

        const sendingRef = await db.collection('groups').doc(req.params.groupname).update({
            incomingRequests: FieldValue.arrayRemove(req.body.uid),
            users: FieldValue.arrayUnion(req.body.uid)
        });
        res.json({ status: 'success' });
    } catch (err) {
        console.log('Error: ', err);
        res.json({ status: 'error', error: 'could not accept group request' });
    }
});

//decline group join request
router.post('/decline/:groupname', async (req, res) => {
    try {
        console.log("groupRequest/decline")

        const receivingRef = await db.collection('users').doc(req.body.uid).update({
            groupRequests: FieldValue.arrayRemove(req.params.groupname)
        });

        const sendingRef = await db.collection('groups').doc(req.params.groupname).update({
            incomingRequests: FieldValue.arrayRemove(req.body.uid)
        });
        res.json({ status: 'success' });
    } catch (err) {
        console.log('Error: ', err);
        res.json({ status: 'error', error: 'could not decline group request' });
    }
});


module.exports = router;