from src.server.bo.NamedBusinessObject import NamedBusinessObject

class State (NamedBusinessObject):

    def __init__(self, state="New"):
        super().__init__()
        self._name = state

    def __eq__(self, other):
        if isinstance(other, State):
            """Hier wird überprüft ob es den Zustand in den Zuständen gibt"""
            return self._name == other._name
        else:
            return False

    def first_event(self, first_event):
        pass

    def sec_event(self, sec_event):
        pass

    def third_event(self, third_event):
        pass

    def fourth_event(self, fourth_event):
        pass

    def fifth_event(self, fifth_event):
        pass

    def __str__(self):
        return self.__class__.__name__

    @staticmethod
    def from_dict(dict=dict()):
        new_state = State()
        new_state.set_id(dict["id"])
        new_state.set_name(dict["name"])
        new_state.set_create_time(dict["create_time"])
        return new_state