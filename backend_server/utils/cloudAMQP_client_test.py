from cloudAMQP_client import CloudAMQPClient

TEST_CLOUDAMQP_URL = ""
TEST_QUEUE_NAME = "test"

def test_basic():    
    client = CloudAMQPClient(TEST_CLOUDAMQP_URL, TEST_QUEUE_NAME)

    sentMsg = {'test': 'test'}
    client.send_message(sentMsg)
    receivedMsg = client.get_message()
    assert sentMsg == receivedMsg
    print('[x] cloud_amqp_client test passed')

if __name__ == '__main__':
    test_basic()
