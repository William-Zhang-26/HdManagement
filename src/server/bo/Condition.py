from src.server.bo.NamedBusinessObject import NamedBusinessObject

class Condition (NamedBusinessObject):

    def __init__(self):
        super().__init__()

    def __eq__(self, other):
        if isinstance(other, Condition):
            """Hier wird überprüft ob es den Zustand in den Zuständen gibt"""
            return self._name == other._name
        else:
            return False