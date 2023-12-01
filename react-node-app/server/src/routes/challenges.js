const express = require('express');
const router = express.Router();
const calcScore = require('../carbonScore.js')
const admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const db = getFirestore();
const { query, where, getDocs } = require('firebase-admin/firestore');

router.get('/get/:uid', async (req, res) => {
    try {
        console.log("challenge/check")
        const docRef = await db.collection('users').doc(req.params.uid).collection('challenge').get();
        if (docRef.empty) {
            res.json({ status: 'empty', challenge: null });
        } else {
            res.json({ status: 'exists', challenge: docRef.docs[0].data() });
        }
    } catch (err) {
        console.log('Error: ', err);
        res.json({ status: 'error', error: err });
    }
});

router.post('/set', async (req, res) => {
    try {
        console.log("challenge/set")
        console.log(req.body)
        const docRef = await db.collection('users').doc(req.body.uid).collection('challenge').doc('challenge').set({
            category: req.body.category,
            subCategory: req.body.subCategory,
            parameter: req.body.parameter,
            progress: 0,
            suffix: req.body.suffix,
        });
        console.log('Added document with ID: ', docRef.id);
        res.json({ status: 'success', id: docRef.id });
    } catch (err) {
        console.log('Error: ', err);
    }
});

module.exports = router;