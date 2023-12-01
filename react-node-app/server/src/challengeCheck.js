function challengeCheck(activity, challenge) {

    var prog = Number(challenge.progress);  
    var goal = Number(challenge.parameter);
    var param = Number(activity.activityParam);
    if (challenge === null) {
        return null;
    } else if (challenge.category === activity.activeCategory && challenge.subCategory === activity.activeActivity) {
        prog += param;
        challenge.progress = "" + prog ;
    }
    if (prog >= goal) {
        challenge.completed = true;
    }   
    return challenge;
}

module.exports = challengeCheck;