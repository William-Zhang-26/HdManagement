from src.server.bo.NamedBusinessObject import NamedBusinessObject

class Semester(NamedBusinessObject):
    """
    Realisierung des Semesters
    """
    def __init__(self):
        super().__init__()
        self._semester = None


    def get_semester(self):
        """Auslesen des Semesters"""
        return self._semester

    def set_semester(self, semester):
        """Setzen des Semesters"""
        self._semester = semester

    @staticmethod
    def from_dict(dict = dict()):
        new_semester = Semester()
        new_semester.set_id(dict["id"])
        new_semester.set_name(dict["name"])
        new_semester.set_semester(dict["semester"])
        return new_semester
