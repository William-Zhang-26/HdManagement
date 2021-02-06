from server.bo.NamedBusinessObject import NamedBusinessObject

class Automat(NamedBusinessObject):
    """
    Realisierung der Automaten
    """

    def __init__(self, anfangszustand = "neu"):
        """ Hier wird der Anfangszustand initialisiert"""
        super().__init__()
        self._current_state = anfangszustand


    def set_state(self, new_state):
        """ Hier wird der Zustand gesetzt"""
        self._current_state = new_state

    def get_state(self):
        """ Hier wird der Akutelle Status ausgegeben"""
        return self._current_state

    def is_in_state(self, state):
        """ Hier wird überprüft ob der Zustand in dem gewünschten Zustand ist"""
        return state == self._current_state


    @staticmethod
    def from_dict(dict = dict()):
        new_automat = Automat()
        new_automat.set_id(dict["id"])
        new_automat.set_name(dict["name"])
        new_automat.set_create_time(dict["create_time"])
        return new_automat
