from server.bo.NamedBusinessObject import NamedBusinessObject

class Semester(NamedBusinessObject):
    """
    Realisierung des Semesters
    """
    def __init__(self):
        super().__init__()
        self._semester_number = " "


    def get_semester_number(self):
        """Auslesen der Semester Nummer"""
        return self._semester_number

    def set_semester_number(self, new_semester_number):
        """Setzen der Semester Nummer"""
        self._semester_number = new_semester_number

    @staticmethod
    def from_dict(dict = dict()):
        new_semester = Semester()
        new_semester.set_id(dict["id"])
        new_semester.set_name(dict["name"])
        new_semester.set_semester_number(dict["semester_number"])
        new_semester.set_create_time(dict["create_time"])
        return new_semester
