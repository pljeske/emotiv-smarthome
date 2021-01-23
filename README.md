# Development Setup
1. Configure Emotiv connection (client_id, client_secret, profile) in /emotiv_connection/cortex_connection/cortex_connection.py
2. Run "docker-comopose up" in folder docker-servers
3. Run React app in preferred IDE

# Staging Setup
1. Configure Emotiv connection (client_id, client_secret, profile) in /emotiv_connection/cortex_connection/cortex_connection.py
2. Run "docker-compose up" in root folder
3. Go to http://localhost:8080

# Smarthome Setup
Per room you need to setup the following endpoints in your smarthome setup (for example in Node Red):
1. GET-Endpoint for getting light status (e.g. /kitchen/light) (response: {"state": "on"} or {"state": "off"})
2. GET-Endpoint for switching light (e.g. /kitchen/light/switch)
3. GET-Endpoint for getting temperature status (e.g. /kitchen/temperature) (response: {"current_temp": 18, "goal_temp": 22}) 
4. POST-Endpoint for setting temperature (e.g. /kitchen/temperature) (request-body: {"temperature": 22})

An example flow defining the endpoints for the Node Red addon for Home Assistant (https://www.home-assistant.io/hassio/) can be found in the homeassistant_flow folder.
