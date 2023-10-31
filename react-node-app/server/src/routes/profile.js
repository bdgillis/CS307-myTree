const express = require('express');
const router = express.Router();
const calcScore = require('../carbonScore.js')
const admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue, Filter} = require('firebase-admin/firestore');
const db = getFirestore();
const { query, where, getDocs } = require('firebase-admin/firestore');



router.get('/:uid', async (req, res) => {
    try {
        const user = db.collection('users').doc(req.params.uid);
        const doc = await user.get();
        if (!doc.exists) {
            // console.log('No such document!');
          } else {
            // console.log("document found")
            //console.log('Document data:', doc.data());
          }
        res.send(doc.data());
    } catch (err) {
        console.log('Error: ', err);
    }
});

module.exports = router;