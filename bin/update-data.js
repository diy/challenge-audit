var db = require('./_db')();
var util = require('util');
var async = require('async');
var JSONstream = require('JSONstream');

var challengesDb = require(__dirname + '/../lib/challenges-db')();
var skillsDb = require(__dirname + '/../lib/skills-db')();

function query (name, fields, callback) {
    var query = util.format(
        'SELECT %s FROM %s',
        fields.join(','),
        name
    );

    return db.query(query);
}

function activeQuery (name, fields, callback) {
    var query = util.format(
        'SELECT %s FROM %s WHERE active = 1',
        fields.join(','),
        name
    );

    return db.query(query);
}

var challenges = [
    'id', 'title', 'short', 'description', 'difficulty', 'skill_id'
];

var examples = [
    'id', 'title', 'source', 'url', 'tag', 'challenge_id'
];

var skills = [
    'id', 'url', 'title', 'description'
];

db.connect();

async.auto({
    skills: function (callback) {
        var skillsLookup = {};
        var skillsQuery = activeQuery('skills', skills);
        skillsQuery.on('result', function (row) {
            skillsDb.put(row.id + '', row);
        });

        skillsQuery.on('end', callback);
    },

    challenges: function (callback) {
        var challengesQuery = activeQuery('challenges', challenges);
        challengesQuery.on('result', function (row) {
            var noGood = (
                !row.title ||
                !row.description
            );

            if (noGood) return;

            challengesDb.put(row.id + '', row);
        });

        challengesQuery.on('end', function () {
            var examplesQuery = query('examples', examples);
            examplesQuery.on('result', function (row) {
                db.pause();
                challengesDb.get(row.challenge_id + '', function (err, val) {
                    if (err || !val) {
                        db.resume();
                        return;
                    }

                    if (typeof val.examples === 'undefined') val.examples = [];

                    val.examples.push(row);

                    challengesDb.put(val.id + '', val);
                    db.resume();
                });
            });

            examplesQuery.on('end', callback);
        });
    }
}, function () {
    db.end();
});
