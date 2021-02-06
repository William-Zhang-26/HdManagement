from server.bo.NamedBusinessObject import NamedBusinessObject

class State (NamedBusinessObject):
    """
    Realisierung der Zustände
    """

    def __init__(self, state="neu"):
        super().__init__()
        self._name = state

    def __eq__(self, other):
        if isinstance(other, State):
            """Hier wird überprüft ob es den Zustand in den Zuständen gibt"""
            return self._name == other._name
        else:
            return False


    def __str__(self):
        return self._name

    @staticmethod
    def from_dict(dict=dict()):
        new_state = State()
        new_state.set_id(dict["id"])
        new_state.set_name(dict["name"])
        new_state.set_create_time(dict["create_time"])
        return new_state
