"""
This file should be loaded onto periphreals.
It consists of the basic set of rabbit communication setup necessary for the periphreal to:
    register with the core as a new periphreal
    publish its api
    receive commands
    publish events
"""

import json
import pika
import random


class Event:
    def __init__(self, message, data=None):
        self.message = message
        self.data = data

    def __iter__(self):
        return [("message", self.message), ("data", self.data)]


class BasicPeripheral:
    type = 'unknown_device'
    groups = ['unknown_device']
    api = {
        "test": {
            "parameters": {}
        }
    }

    def __init__(self):
        self.connection = pika.BlockingConnection(pika.ConnectionParameters('localhost'))
        self.channel = self.connection.channel()
        self.name = type+random.randint(1, 10000)

    def register_to_core(self):
        self.channel.basic_publish(exchange='', routing_key='peripheral_register', body=json.dumps({self.name: api}))

    def subscribe_to_commands(self):
        # TODO Figure out how to distribute queue names
        pass

    def publish_event(self, event):
        self.channel.basic_publish(exchange='', routing_key='peripheral_event', body=json.dumps({self.name: dict(event)}))

