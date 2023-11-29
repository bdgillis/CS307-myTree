const express = require('express');
const router = express.Router();
const calcScore = require('../carbonScore.js')
const admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue, Filter} = require('firebase-admin/firestore');
const db = getFirestore();
const { query, where, getDocs } = require('firebase-admin/firestore');


//A group invite is defined as an active member of a group sending and invite to a user to join their group


//get all group invites for specific user
router.get('/', async (req, res) => {
    try {
        console.log("groupInvites/")

        const user = db.collection('users').doc(req.body.uid);
        const doc = await user.get();
        if (!doc.exists) {
            console.log('No such document!');
            res.json({ status: 'error', error: 'user does not exist' });
        } else {
            if (doc.data().groupInvites == null) {
                res.json({ status: 'success', groupInvites: [] });
            } else {
                res.json({ status: 'success', groupInvites: doc.data().groupInvites });
            }
        }
    } catch (err) {
        console.log('Error: ', err);
        res.json({ status: 'error', error: 'could not retrieve group invites' });
    }
});

//invite user to group
router.post('/invite/:groupname', async (req, res) => {
    try {
        // console.log("groupRequests/invite/:groupname")

        console.log(req.body)
        const receivingRef = await db.collection('users').doc(req.body.uid).update({
            groupInvites: FieldValue.arrayUnion(req.params.groupname)
        });
        // const sendingRef = await db.collection('groups').doc(req.params.groupname).update({
        //     sentInvites: FieldValue.arrayUnion(req.body.username)
        // });
        // DECIDING NOT TO KEEP TRACK OF SENT INVITES PER GROUP
        res.json({ status: 'success' });
    } catch (err) {
        console.log('Error: ', err);
        res.json({ status: 'error', error: 'could not invite user to group' });
    }
});


//accept group invite
router.post('/accept', async (req, res) => {
    try {
        console.log("groupRequest/accept")

        const receivingRef = await db.collection('users').doc(req.body.uid).update({
            groupInvites: FieldValue.arrayRemove(req.body.groupname),
            groups: FieldValue.arrayUnion(req.body.groupname)
        });

        const sendingRef = await db.collection('groups').doc(req.body.groupname).update({
            users: FieldValue.arrayUnion(req.body.uid)
        });

        

        
    } catch (err) {
        console.log('Error: ', err);
    }
});

//decline group invite
router.post('/decline', async (req, res) => {
    try {
        console.log("groupInvites/decline")

        console.log(req.body)
        const receivingRef = await db.collection('users').doc(req.body.receivingUid).update({
            groupInvites: FieldValue.arrayRemove(req.body.sendingUsername),
        });

    } catch (err) {
        console.log('Error: ', err);
    }
});

module.exports = router;