# HomeAutomationKit
Home automation using RabbitMQ, MongoDB, and Node.js

The system consists of a central server and many peripherals. Each perepheral registers to the server when it comes online and publishes its available API. It periodically publishes events to the server according to its function. The server can invoke API commands with calls on that channel.

## Rabbit Channels
### periphreal_register
Used by periphreals to register with the server.
Messages of the form:

{
  `"device_name"`:{
    `"api_command_1"`:{
      "parameters":{
        `parameters` 
      } 
    }
  }
}

### peripheral_event
Used by peripherals to send events and data back to the server.
Messages of the form:

{
  `"device_name"`:{
    "type": `"type of event that happened"`,
    "message": `"a human readable message of what is being reported"`,
    "data": `a dictionary or primative of the data being sent to the server`
  }
}

## Peripheral Channels
Peripherals each subscribe to a channel that matches their name. Each subscribes to the channel and receves messages to trigger their API calls.

{
  `"api call"`:{
    `"parameter_1"`: `parameter_1`,
    `"parameter_2"`: `parameter_2`
  }
}
