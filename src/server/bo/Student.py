from src.server.bo.NamedBusinessObject import NamedBusinessObject

class Student(NamedBusinessObject):
    """
    Realisierung der Studenten
    """
    def __init__(self):
        super().__init__()
        self._lastname = ""
        self._firstname = ""
        self._course = ""
        self._matricel_number = None
        self._mail = ""
        self._project_id = None

    def get_lastname(self):
        """Auslesen des Nachnamens"""
        return self._lastname

    def set_lastname(self, new_lastname):
        """Setzen des Nachnamens"""
        self._lastname = new_lastname

    def get_firstname(self):
        """Auslesen des Vornamens"""
        return self._firstname

    def set_firstname(self, new_firstname):
        """Setzen des Vornamens"""
        self._firstname = new_firstname

    def get_course(self):
        """Auslesen des Studiengangs"""
        return self._course

    def set_course(self, new_course):
        """Setzen des Studiengangs"""
        self._course = new_course

    def get_matricel_number(self):
        """Auslesen der Matrikelnummer"""
        return self._matricel_number

    def set_matricel_number(self, matricel_number):
        """Setzen der Matrikelnummer (Nicht möglich)"""
        self._matricel_number = matricel_number

    def get_mail(self):
        """Auslesen der Mail"""
        return self._mail

    def set_mail(self, new_mail):
        """Setzen der Mail"""
        self._mail = new_mail

    def get_project_id(self):
        """Auslesen der Projekt_id"""
        return self._project_id

    def set_project_id(self, project_id):
        """Setzen der Projekt_id (Nicht möglich)"""
        self._project_id = project_id

    @staticmethod
    def from_dict(dict = dict()):
        new_student = Student()
        new_student.set_id(dict["id"])
        new_student.set_lastname(dict["lastname"])
        new_student.set_firstname(dict["firstname"])
        new_student.set_course(dict["course"])
        new_student.set_matricel_number(dict["matricel_number"])
        new_student.set_mail(dict["mail"])
        new_student.set_project(dict["project_id"])
        return new_student