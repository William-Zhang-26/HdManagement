from src.server.bo.User import User

class Student(User):
    """
    Realisierung der Studenten
    """
    def __init__(self):
        super().__init__()
        self._lastname = ""
        self._firstname = ""
        self._course = ""
        self._matriculation_number = 0
        self._mail = ""
        self._project_id = 0

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

    def get_matriculation_number(self):
        """Auslesen der Matrikelnummer"""
        return self._matriculation_number

    def set_matriculation_number(self, new_matriculation_number):
        """Setzen der Matrikelnummer (Nicht möglich)"""
        self._matriculation_number = new_matriculation_number

    def get_mail(self):
        """Auslesen der Mail"""
        return self._mail

    def set_mail(self, new_mail):
        """Setzen der Mail"""
        self._mail = new_mail

    def get_project_id(self):
        """Auslesen der Projekt_id"""
        return self._project_id

    def set_project_id(self, new_project_id):
        """Setzen der Projekt_id (Nicht möglich)"""
        self._project_id = new_project_id

    @staticmethod
    def from_dict(dict = dict()):
        new_student = Student()
        new_student.set_id(dict["id"])
        new_student.set_lastname(dict["lastname"])
        new_student.set_firstname(dict["firstname"])
        new_student.set_course(dict["course"])
        new_student.set_matriculation_number(dict["matriculation_number"])
        new_student.set_mail(dict["mail"])
        new_student.set_project_id(dict["project_id"])
        new_student.set_create_time(dict["create_time"])
        return new_student
