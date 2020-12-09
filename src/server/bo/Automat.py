from src.server.bo.NamedBusinessObject import NamedBusinessObject

class Automat(NamedBusinessObject):

    def __init__(self, anfangszustand):
        """ Hier wird der Anfangszustand initialisiert"""
        super().__init__()
        self._current_state = anfangszustand
        self._state_id = 0


    def set_state(self, new_state):
        """ Hier wird der Zustand gesetzt"""
        self._current_state = new_state

    def get_state(self):
        """ Hier wird der Akutelle Status ausgegeben"""
        return self._current_state

    def is_in_state(self, state):
        """ Hier wird überprüft ob der Zustand in dem gewünschten Zustand ist"""
        return state == self._current_state

    def set_state_id(self, new_state_id):
        """Hier wird der Status ID gesetzt"""
        self._state_id = new_state_id

    def get_state_id(self):
        """Auslesen der Status ID"""
        return self._state_id
""""
class Project(Automat):
    Aufzählung der Klassenvariablen/statische Attribute, diese gilt für die ganze Klasse
    s_new = State("neu")
    s_approved = State("abgelehnt")
    s_dismissed = State("genehmigt")
    s_inreview = State("in Bewertung")
    s_reviewed = State("Bewertung abgeschlossen")

    def __init__(self, state):
        super().__init__(Project.s_new)
        self.__name = state

    def __str__(self):
        return self.__name

"""
""" Zum Probieren
p = Projekt("Marketing & AI (Stingel, Thies)")

if p.is_in_state(Projekt.s_new):
    print(p, "in New!")

p.set_state(Projekt.s_approved)

if p.is_in_state(Projekt.s_approved):
    print(p, "in Approved!")
"""
""""
    @staticmethod
    def from_dict(dict = dict()):
        new_state = State()
        return new_state
"""