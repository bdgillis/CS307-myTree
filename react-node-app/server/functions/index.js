const functions = require("firebase-functions");
const admin = require("firebase-admin");
const firebase = require("firebase");
admin.initializeApp();
// const database = admin.firestore();


exports.resetWkly = functions.pubsub.schedule("0 0 * * 1").onRun((context) => {
  const colRef = firebase.firestore().collection("users");
  const colSnapshot = async () => await colRef.get();

  const resetFieldAct = {weeklyNumActivities: 0};
  const resetFieldCSt = {weeklyCarbonScore: 0};


  // Array of update promises
  const update1 = colSnapshot.docs.map((doc) =>
    colRef.doc(doc.id).update(resetFieldAct));
  const update2 = colSnapshot.docs.map((doc) =>
    colRef.doc(doc.id).update(resetFieldCSt));
  // Run the promises simulatneously
  async () => await Promise.all(update1);
  async () => await Promise.all(update2);


  // database.doc("/users").update({
  //   "weeklyCarbonScore": 0});
  // database.doc("/users").update({
  //   "weeklyNumActivities": 0});
  // return console.log("This will be run every 1 minutes!");
});
