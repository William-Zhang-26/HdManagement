class Condition:

    def __init__(self):
        self._name = ""

    def get_condition(self):
        """Auslesen des Zustandes"""
        return self._condition

    def set_condition(self, condition):
        """Setzen des Zustandes"""
        self._condition = condition

condition =["neu","abgelehnt","genehmigt","in Bewertung","Bewertung abgeschlossen"]
for counter, value in enumerate(condition):
    if counter == 0:
        print("Formular eingegangen")
        if counter == 0:
            print("Formular eingegangen")

        if counter == 1:
            print("Projekt abgelehnt")

        if counter == 2:
            print("Projekt genehigt")

        if counter == 3:
            print("Projekt abgeschlossen")

        if counter == 4:
            print("Bewertung abgeschlossen")


    @staticmethod
    def from_dict(dict = dict()):
        new_condition = Condition()
        return new_condition