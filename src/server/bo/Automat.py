class Condition:

    def __init__(self, condition="New"):
        self.name = condition

    def get_name(self):
        """Auslesen des Zustandes"""
        return self.name

    def set_name(self, condition):
        """Setzen des Zustandes"""
        self.name = condition

    def __eq__(self, other):
        if isinstance(other, Condition):
            """Hier wird überprüft ob es den Zustand in den Zuständen gibt"""
            return self.name == other.name
        else:
            return False

class Automat(Condition):

    def __init__(self, initial_condition):
        """ Hier wird der Anfangszustand initialisiert"""
        super().__init__()
        self.current_condition = initial_condition


    def set_condition(self, condition):
        """ Hier wird der aktuelle Zustand gesetzt"""
        self.current_condition = condition

    def is_in_condition(self, condition):
        """ Hier wird der akutelle Zustand zurückgegeben"""
        return condition == self.current_condition

class Project(Automat):
    """ Aufzählung der Klassenvariablen/statische Attribute, diese gilt für die ganze Klasse"""
    s_new = Condition("New")
    s_approved = Condition("Approved")
    s_dismissed = Condition("Dismissed")
    s_inreview = Condition("In Review")
    s_reviewed = Condition("Reviewed")

    def __init__(self, condition):
        super().__init__(Project.s_new)
        self.__name = condition

    def __str__(self):
        return self.__name

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