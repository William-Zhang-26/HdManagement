from src.server.bo.Status import Status

class Automat(Status):

    def __init__(self):
        """ Hier wird der Anfangszustand initialisiert"""
        super().__init__()
        self._current_status = ""
        self._status_id = 0


    def set_current_status(self, new_status):
        """ Hier wird der Zustand gesetzt"""
        self._current_status = new_status

    def get_current_status(self):
        """ Hier wird der Akutelle Status ausgegeben"""
        return self._current_status

    def is_in_status(self, status):
        """ Hier wird überprüft ob der Zustand in dem gewünschten Zustand ist"""
        return status == self._current_status

    def set_status_id(self, new_status_id):
        """Hier wird der Status ID gesetzt"""
        self._status_id = new_status_id

    def get_status_id(self):
        """Auslesen der Status ID"""
        return self._status_id
""""
class Project(Automat):
    Aufzählung der Klassenvariablen/statische Attribute, diese gilt für die ganze Klasse
    s_new = Status("neu")
    s_approved = Status("abgelehnt")
    s_dismissed = Status("genehmigt")
    s_inreview = Status("in Bewertung")
    s_reviewed = Status("Bewertung abgeschlossen")

    def __init__(self, status):
        super().__init__(Project.s_new)
        self.__name = status

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
        new_condition = Condition()
        return new_condition
"""