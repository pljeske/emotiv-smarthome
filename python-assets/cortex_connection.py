import json

from cortex2 import EmotivCortex2Client
import time
import websockets
import asyncio


class CortexConnection:
    def __init__(self, url: str, client_id: str, client_secret: str, profile: str, websocket_uri: str):
        self.url = url
        self.client = EmotivCortex2Client(url,
                                          client_id=client_id,
                                          client_secret=client_secret,
                                          check_response=True,
                                          authenticate=True,
                                          debug=True)
        self.profile = profile
        self.websocket_uri = websocket_uri

    def connect_to_cortex(self):
        # Test API connection by using the request access method
        self.client.request_access()
        # Explicit call to Authenticate (approve and get Cortex Token)
        self.client.authenticate()
        # Connect to headset, connect to the first one found, and start a session for it
        self.client.query_headsets()
        self.client.connect_headset(0)
        self.client.create_session(0)
        self.client.subscribe(streams=['com'])
        self.client.load_profile(self.profile)

    def start_listening(self):
        counter = 0
        timer = time.time()
        while True:
            counter += 1
            if counter % 5000 == 0:
                print(self.client.request_access())

            # Try stopping the subscriber thread
            if counter == 50000:
                self.client.stop_subscriber()
                break
            try:
                data = self.client.receive_data()
                # print(counter)
                time_now = time.time()
                ## TEST ##
                # send_message(data, self.websocket_uri)
                # asyncio.get_event_loop().run_until_complete(self.send_message(data['com'][0]))
                # print(data['com'][0])
                # only send to websocket if more than 3 seconds have passed
                if time_now - timer > 3:
                    asyncio.get_event_loop().run_until_complete(self.send_message(data))
                    print(data)
                    timer = time.time()
                # if time_now - timer > 3:  # if data['com'][1] > 0.2 and time_now - timer > 3:
                #     asyncio.get_event_loop().run_until_complete(self.send_message(data['com'][0]))
                #     print(data['com'][0])
                #     timer = time.time()
            except Exception as e:
                print(e)

    async def send_message(self, command: dict) -> None:
        data = {'command': command['com'][0], 'probability': command['com'][1],
                'ago': '{}ms'.format(str(int((time.time() - command['time']) * 1000)))}
        message = json.dumps(data)
        print('message sent: ' + message)
        async with websockets.connect(self.websocket_uri) as websocket:
            await websocket.send(message)
            #await websocket.recv()


if __name__ == "__main__":
    connection = CortexConnection(url="wss://localhost:6868",
                                  client_id="fDWLTEwn8RIOPgosLTrFIKzgirQl8367XsiPxLZ2",
                                  client_secret="mL5iWPiDypFJxG653Mi9j6tSOwNvisfa24ACa10NjSnOCsDLpt9AWkGAhvt753R8jthjMR3eGIFMQorEd751QqRKLTXeQgXIKIzi5sdEyo9atyuAqMI0L4sKNhRhuG49",
                                  profile="lucas",
                                  websocket_uri="ws://localhost:4000")
    connection.connect_to_cortex()
    connection.start_listening()


# # find out docker host address
# url = "wss://localhost:6868"
#
# # Remember to start the Emotiv App before you start!
# # Start client with authentication
# client = EmotivCortex2Client(url,
#                              client_id='fDWLTEwn8RIOPgosLTrFIKzgirQl8367XsiPxLZ2',
#                              client_secret="mL5iWPiDypFJxG653Mi9j6tSOwNvisfa24ACa10NjSnOCsDLpt9AWkGAhvt753R8jthjMR3eGIFMQorEd751QqRKLTXeQgXIKIzi5sdEyo9atyuAqMI0L4sKNhRhuG49",
#                              check_response=True,
#                              authenticate=True,
#                              debug=True)
#
# # Test API connection by using the request access method
# client.request_access()
#
# # Explicit call to Authenticate (approve and get Cortex Token)
# client.authenticate()
#
# # Connect to headset, connect to the first one found, and start a session for it
# client.query_headsets()
# client.connect_headset(0)
# client.create_session(0)
#
# # Subscribe to the motion and mental command streams
# # Spins up a separate subscription thread
# client.subscribe(streams=["com"])
#
# # Test message handling speed
# a = client.subscriber_messages_handled
# time.sleep(5)
# b = client.subscriber_messages_handled
# print((b - a) / 5)
#
# client.load_profile('lucas')
#
# # Grab a single instance of data
# print(client.receive_data())
#
# # Continously grab data, while making requests periodically
# counter = 0
# timer = time.time()
# while True:
#     counter += 1
#     # time.sleep(0.1)
#
#     if counter % 5000 == 0:
#         print(client.request_access())
#
#     # Try stopping the subscriber thread
#     if counter == 50000:
#         client.stop_subscriber()
#         break
#     try:
#         data = client.receive_data()
#         # print(counter)
#         time_now = time.time()
#         if data['com'][1] > 0.6 and time_now - timer > 3:
#             print(data['com'][0])
#             timer = time.time()
#     except Exception as e:
#         print(e)
