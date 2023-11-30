const express = require('express');
const router = express.Router();
const admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue, Filter} = require('firebase-admin/firestore');
const db = getFirestore();
const { query, where, getDocs } = require('firebase-admin/firestore');

router.post('/send', async (req, res) => {
    try {
        console.log("nudges/send");
        console.log(req.body);
        const receivingRef = await db.collection('users').doc(req.body.receivingUid).update(
            { nudges: FieldValue.arrayUnion(req.body.sendingUid) }
        );
        res.json({ status: 'success' });
    } catch (err) {
        console.log('Error: ', err);
        res.json({ status: 'error', error: 'could not send nudge' });
    }

});

router.get('/get/:uid', async (req, res) => {
    try {
        console.log("nudges/get");
        const user = db.collection('users').doc(req.params.uid);
        const doc = await user.get();
        if (!doc.exists) {
            console.log('No such document!');
            res.json({ status: 'error', error: 'user does not exist' });
        } else {
            if (doc.data().nudges == null) {
                res.json({ status: 'success', nudges: [] });
            } else {
                res.json({ status: 'success', nudges: doc.data().nudges });
            }
        }
    
    } catch (err) {
        console.log('Error: ', err);
    }
});

router.post('/dismiss', async (req, res) => {
    try{
        console.log("nudges/dismiss");
        const receivingRef = await db.collection('users').doc(req.body.receivingUid).update(
            { nudges: FieldValue.arrayRemove(req.body.sendingUid) }
        );
        res.json({ status: 'success' });
    } catch {
        console.log('Error: ', err);
        res.json({ status: 'error', error: 'could not invite user to group' });
    }
});


module.exports = router;