const express = require('express');
const bodyParser = require('body-parser');
const { initializeApp } = require('firebase-admin/app');
const { getFirestore, Timestamp, FieldValue, Filter } = require('firebase-admin/firestore');
const app = express();


const admin = require("firebase-admin");

// Fetch the service account key JSON file contents
const serviceAccount = require("./cs307-mytree-firebase-adminsdk-9bjjb-227c08db8.json");
// const { get } = require('request');

// Initialize the app with a service account, granting admin privileges
admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
});

// As an admin, the app has access to read and write all data, regardless of Security Rules
const db = getFirestore();
const { query, where, getDocs } = require('firebase-admin/firestore');

const activitiesRouter = require('./src/routes/activities.js');
const editActivityHistoryRouter = require('./src/routes/editActivityHistory.js');
const quizRouter = require('./src/routes/quiz.js');
const friendsRouter = require('./src/routes/friends.js');
const profileRouter = require('./src/routes/profile.js');


app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use('/api/activities', activitiesRouter);
app.use('/api/editActivityHistory', editActivityHistoryRouter);
app.use('/api/quiz', quizRouter);
app.use('/api/friends', friendsRouter);
app.use('/api/profile', profileRouter);

        

app.get('/api/FirstTab/', async (req, res) => {
    const total = []; // define empty object
    const listAllUsers = (nextPageToken) => {

        // List batch of users, 1000 at a time.
        admin.auth()
            .listUsers(1000, nextPageToken)
            .then((listUsersResult) => {
                if (listUsersResult.pageToken) {
                    // List next batch of users.
                    listAllUsers(listUsersResult.pageToken);
                }
                res.send(listUsersResult);
            })
            .catch((error) => {
                console.log('Error listing users:', error);
            });

    };

    // Start listing users from the beginning, 1000 at a time.
    listAllUsers();

})



app.listen(5001, () => { console.log("Server started on port 5001") })

