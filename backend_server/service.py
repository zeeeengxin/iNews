"""Backend service"""

from jsonrpclib.SimpleJSONRPCServer import SimpleJSONRPCServer

import operations

SERVER_HOST = 'localhost'
SERVER_PORT = 4040

def add(num1, num2):
    print("add is called with %d and %d" % (num1, num2))
    return num1 + num2

def get_one_news():
    print("get_one_news is called")
    # res = mongodb_client.get_db()['news'].find_one() (only provide api)
    return operations.get_one_news()

RPC_SERVER = SimpleJSONRPCServer((SERVER_HOST, SERVER_PORT))
RPC_SERVER.register_function(add, "add")
RPC_SERVER.register_function(get_one_news, "get_one_news")

print("Starting PRC server on %s:%d" % (SERVER_HOST, SERVER_PORT))

RPC_SERVER.serve_forever()
