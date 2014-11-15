function mediaMentionScore (desc) {
    var s = desc.toLowerCase();
    var hasMedia = (
        s.indexOf('video') > -1 ||
        s.indexOf('photo') > -1 ||
        s.indexOf('write an original song') > -1
    );

    if (hasMedia) return .2;
    return 0;
}

function lengthScore (desc) {
    var l = desc.length;

    if (l >= 120) return .1;
    if (l >= 90 && desc <= 139) return .2;
    if (l <= 90) return .3;

    return 0;
}

function examplesLengthScore (examples) {
    examples = examples || [];

    var l = examples.length;

    if (l >= 1 && l <= 3) .3;
    if (l >= 4) return .1;

    return 0;
}

module.exports = function (challenge) {
    var crispy = [];

    var desc = challenge.description;

    crispy.push(mediaMentionScore(desc));
    crispy.push(lengthScore(desc));
    crispy.push(examplesLengthScore(challenge.examples));

    return crispy;
};
