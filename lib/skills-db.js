var level = require('level');

module.exports = function () {
    return level(
        __dirname + '/../data/skills.db',
        { valueEncoding: 'json' }
    );
};
