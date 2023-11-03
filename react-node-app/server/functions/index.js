const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const database = admin.firestore();


exports.resetWkly = functions.pubsub.schedule("0 0 * * 1").onRun((context) => {
  database.doc("users/4b8JhDbo58PCvkzGoE5MZvmpzuT2").update({
    "weeklyCarbonScore": 0});
  database.doc("users/4b8JhDbo58PCvkzGoE5MZvmpzuT2").update({
    "weeklyNumActivities": 0});
  return console.log("This will be run every 1 minutes!");
});
