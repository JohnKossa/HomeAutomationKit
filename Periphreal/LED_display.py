from Periphreal.basic_peripheral import BasicPeripheral


class LEDDisplay(BasicPeripheral):
    type = 'led_display_custom'
    groups = ["display", "led_panel"]
    api = {
        "set_display": {
            "display_string": {
                "type": "string",
                "required": True
            },
            "ttl": {
                "type": "integer",
                "required": False
            }
        },
        "clear_display": {}
    }

    def set_display(self, display_string, ttl=60):
        pass

    def clear_display(self):
        pass

    def __init__(self):
        self.commands["set_display"] = self.set_display
        self.commands["clear_display"] = self.clear_display
