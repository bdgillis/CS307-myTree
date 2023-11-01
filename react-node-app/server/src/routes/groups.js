const express = require('express');
const router = express.Router();
const calcScore = require('../carbonScore.js')
const admin = require("firebase-admin");
const { getFirestore, Timestamp, FieldValue, Filter} = require('firebase-admin/firestore');
const db = getFirestore();
const { query, where, getDocs } = require('firebase-admin/firestore');


/*IMPORTANT: ALL TENTATIVE TO UI DESIGN*/
/* Specifically: groupname or groupid */
/* Also: send groupname in parameter or in body */
/* Also: decide on what fields are in each group doc */


//get group with specific name (id)
router.get('/:groupname', async (req, res) => {
    try {
        const group = db.collection('groups').doc(req.params.groupname);
        const doc = await group.get();
        if (!doc.exists) {
            console.log('No group with groupname: ' + req.params.groupname);   
        } 
        res.json(doc.data().users);
    } catch (err) {
        console.log('Error: ', err);
    }

});

//get all groups
router.get('/', async (req, res) => {
    try {
        const groups = db.collection('groups');
        const snapshot = await groups.get();
        let groupList = [];
        snapshot.forEach(doc => {
            groupList.push(doc.data());
        });
        res.json(groupList);
    } catch (err) {
        console.log('Error: ', err);
    }
});


//create a group with specific name (id)
    //add this group to the user's list of groups
router.post('/create/:groupname', async (req, res) => {
    try {
        //if groupname already exists, send error
        const group = db.collection('groups').doc(req.params.groupname);
        const doc = await group.get();
        if (doc.exists) {
            res.json({status: 'error', error: 'group already exists'});
        } else {
            const docRef = await db.collection('groups').doc(req.params.groupname).set({
                owner: req.body.uid
            });
            const userRef = await db.collection('users').doc(req.body.uid).collection('groups').doc(req.params.groupname).set({
                groups: FieldValue.arrayUnion(req.params.groupname)
            });
            res.json({status: 'success', id: docRef.id});
        }

    } catch (err) {
        console.log('Error: ', err);
    }

});

//join a group with specific name (id)
    //add this group to the user's list of groups
router.post('/join/:groupname', async (req, res) => {
    try {
        //if groupname doesn't exist, send error
        const group = db.collection('groups').doc(req.params.groupname);
        const doc = await group.get();
        if (!doc.exists) {
            res.json({status: 'error', error: 'group already exists'});
        } else {
            const docRef = await db.collection('groups').doc(req.params.groupname).update({
                users: FieldValue.arrayUnion(req.body.uid)
            });
            const userRef = await db.collection('users').doc(req.body.uid).update({
                groups: FieldValue.arrayUnion(req.params.groupname)
            });
            res.json({status: 'success', id: docRef.id});
        }

    } catch (err) {
        console.log('Error: ', err);
    }

});

module.exports = router;