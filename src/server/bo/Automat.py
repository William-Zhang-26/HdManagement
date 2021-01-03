from src.server.bo.NamedBusinessObject import NamedBusinessObject

class Automat(NamedBusinessObject):

    def __init__(self, anfangszustand = "neu"):
        """ Hier wird der Anfangszustand initialisiert"""
        super().__init__()
        self._current_state = anfangszustand
        self._state_id = 1

    def first_event (self, first_event):
        if first_event == 'neu':
            return first_event

        return self

    def sec_event(self, sec_event):
        if sec_event == 'abgelehnt':
            return sec_event

        return self

    def third_event(self, third_event):
        if third_event == 'genehmigt':
            return third_event

        return self

    def fourth_event(self, fourth_event):
        if fourth_event == 'in Bewertung':
            return fourth_event

        return self

    def fifth_event(self, fifth_event):
        if fifth_event == 'Bewertung abgeschlossen':
            return fifth_event

        return self

    def set_state(self, new_state):
        """ Hier wird der Zustand gesetzt"""
        self._current_state = new_state

    def get_state(self):
        """ Hier wird der Akutelle Status ausgegeben"""
        return self._current_state

    def is_in_state(self, state):
        """ Hier wird überprüft ob der Zustand in dem gewünschten Zustand ist"""
        return state == self._current_state

    def set_state_id(self, state_id):
        """Hier wird der Status ID gesetzt"""
        self._state_id = state_id

    def get_state_id(self):
        """Auslesen der Status ID"""
        return self._state_id

    @staticmethod
    def from_dict(dict = dict()):
        new_automat = Automat()
        new_automat.set_id(dict["id"])
        new_automat.set_name(dict["name"])
        new_automat.set_state_id(dict["state_id"])
        new_automat.set_create_time(dict["create_time"])
        return new_automat
