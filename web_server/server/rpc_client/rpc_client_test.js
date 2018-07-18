var client = require('./rpc_client');

function test_add() {
    client.add(2, 3, function(res) {     
        console.assert(res == 5);
    })
}

console.log("testing RPC client ----")
test_add();