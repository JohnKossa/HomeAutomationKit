# Peripherals
Peripheral objects encapsulate the behaviors of the remote device and adapt it into the system via interchange over Rabbit queues.

Peripherals register themselves with the home server when put online, publishing their API specifications to the remote server and setting up a channel that matches their name.

Peripherals publish events to the server to be cataloged and used as triggers for user defined behaviors.
## Class Properties
### Type
The unique type of the device

Example: "led_display_custom"
### Groups
List of groups that applies to the device.

Examples: ["display", "led_panel"]
### API
JSON encoded list of commands that the device can emit.
```javascript
{
    "set_display":{
        "display_string":{
            "type": "string",
            "required": True
        },
        "ttl":{
            "type": "integer",
            "required": False
        }
    },
    "clear":{}
}
```
## Instance Properties
### name
The unique name of the device, made by combining the device type with a random 5 digit number.
## Extending
New types of devices should be extended from the BasicPeripheral class and should set their own class variables accordingly. They should also set their own implementations for the API calls they declare.