var level = require('level');

module.exports = function () {
    return level(
        __dirname + '/../data/challenges.db',
        { valueEncoding: 'json' }
    );
};
