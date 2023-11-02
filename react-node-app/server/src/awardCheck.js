const { getFirestore, Timestamp, FieldValue, Filter} = require('firebase-admin/firestore');
const db = getFirestore();


function awardCheck(activityHistory) {
    let tcount = 0;
    let ecount = 0;
    let hcount = 0;
    for (let act of Object.entries(activityHistory)) {
        switch (act[1].activeCategory) {
            case "Transportation":
                tcount += 1;
                break;
            case "Eating":
                ecount += 1;
                break;
            case "Household":
                hcount += 1;
                break; 
        }
    }

    //return vector of booleans if each count is greater than 2
    return [tcount >= 3, ecount >= 3, hcount >= 3];

}

module.exports = awardCheck;