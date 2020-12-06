from src.server.bo.Condition import Condition

class Automat(Condition):

    def __init__(self, initial_condition):
        """ Hier wird der Anfangszustand initialisiert"""
        super().__init__()
        self.current_condition = initial_condition


    def set_condition(self, condition):
        """ Hier wird der aktuelle Zustand gesetzt"""
        self.current_condition = condition

    def is_in_condition(self, condition):
        """ Hier wird überprüft ob der Zustand in dem gewünschten Zustand ist"""
        return condition == self.current_condition
""""
class Project(Automat):
    Aufzählung der Klassenvariablen/statische Attribute, diese gilt für die ganze Klasse
    s_new = Condition("neu")
    s_approved = Condition("abgelehnt")
    s_dismissed = Condition("genehmigt")
    s_inreview = Condition("in Bewertung")
    s_reviewed = Condition("Bewertung abgeschlossen")

    def __init__(self, condition):
        super().__init__(Project.s_new)
        self.__name = condition

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