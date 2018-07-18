const jayson = require('jayson');

const client = jayson.client.http({
    hostname: 'localhost',
    port: 4040
})

function add(a, b, callback) {
    client.request('add', [a, b], function(err, res) {
        if (err) { throw err; }
        callback(res.result);
    })
}

module.exports = {
    add: add
};