var JSONstream = require('JSONstream');
var map = require('map-stream');
var crispy = require('./calculate-crispyness');
var format = require('format-data');

var db = require('./challenges-db')();
var skills = require('./skills-db')();

function mapChallenge (challenge, callback) {
    skills.get(challenge.skill_id + '', function (err, skill) {
        if (err || !skill) return callback();

        var examples = 0;
        if (challenge.examples) examples = challenge.examples.length;

        var c = crispy(challenge);

        return callback(null, {
            skill: skill.title,
            skillUrl: 'https://diy.org/skills/' + skill.url,
            url: 'https://diy.org/skills/' + skill.url + '/challenges/' + challenge.id,
            title: challenge.title,
            description: challenge.description,
            length: challenge.description.length,
            stats: {
                crispy: Math.floor(c.reduce(function (memo, i) { return memo + i; }, 0) * 100),
                media: c[0],
                length: c[1],

                examples: examples
            }
        });
    });
}

function mapCsv (data, callback) {
    return callback(null, {
        skill: data.skill,
        'skill url': data.skillUrl,
        title: data.title,
        url: data.url,
        description: data.description,
        length: data.description.length,
        crispy: data.stats.crispy,
        examples: data.stats.examples,
        'media score': data.stats.media,
        'length score': data.stats.length,
    });
}

db.createValueStream()
    .pipe(map(mapChallenge))
    .pipe(map(mapCsv))
    .pipe(format('csv'))
    .pipe(process.stdout)
