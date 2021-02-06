from server.bo.NamedBusinessObject import NamedBusinessObject

class Semester(NamedBusinessObject):
    """
    Realisierung des Semesters
    """
    def __init__(self):
        super().__init__()
        self._current_semester = 0


    def get_current_semester(self):
        """Auslesen des akutellen Semesters"""
        return self._current_semester

    def set_current_semester(self, new_current_semester):
        """Setzen des akutellen Semesters"""
        self._current_semester = new_current_semester

    @staticmethod
    def from_dict(dict = dict()):
        new_semester = Semester()
        new_semester.set_id(dict["id"])
        new_semester.set_name(dict["name"])
        new_semester.set_current_semester(dict["current_semester"])
        new_semester.set_create_time(dict["create_time"])
        return new_semester
