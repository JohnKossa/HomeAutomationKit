# HomeAutomationKit
The system consists of a central server and many peripherals. Each perepheral registers to the server when it comes online and publishes its available API. It periodically publishes events to the server according to its function. The server can invoke API commands with calls on that channel.

The server consists of multiple components including:

a mongodb table that keeps track of the current state of the system

a mongodb table that keeps a log of events sent by peripherals for reporting purposes

a set of basic services that provide events like a basic timer, weather service, etc.

a scripting layer that allows users to design triggers for when certain API calls will be made
## Adding a new peripheral
New peripherals can be created by instantiating their respective objects in the python runtimes on the remote devices.

Each should be extended from the BasicPeripheral class and have their class attribtes filled out accordingly.

## Channel List
### Server
#### periphreal_register
Used by periphreals to register with the server.

Messages of the form:
```javascript
{
  "<device_name>":{
    "<api_command_1>":{
      "parameters":{
        <parameters> 
      } 
    }
  }
}
```
#### peripheral_event
Used by peripherals to send events and data back to the server.

Messages of the form:
```javascript
{
  "<device_name>":{
    "type": "<type of event that happened>",
    "message": "<a human readable message of what is being reported>",
    "data": <a dictionary or primative of the data being sent to the server>
  }
}
```
### Peripheral Channels
Peripherals each subscribe to a channel that matches their name. Each subscribes to the channel and receves messages to trigger their API calls.
```javascript
{
  "<api call>":{
    "<parameter_1_name>": <parameter_1>,
    "<parameter_2_name>": <parameter_2>
  }
}
```
## MongoDB Tables
### status
Stores the current state of the system.
Messages of the form:
```javascript
{
  "<fact_name>":{
      "value": <value>,
      "reported": <time the fact was added>,
      "stale_time?": <time the fact should be considered unreliable>
  }
}
```
### eventLog
Stores events sent by peripherals
```javascript
{
  "<fact_name>":{
      "message": "<message>",
      "data": <data>,
      "reported": <time the fact was added>,
      "reporter": <ReporterEntry>
  }
}
```
ReporterEntry
```javascript
{
    "device_name": "<device_name>",
    "device_type": "<device_type>",
    "groups": [<groups list>]
}
```

