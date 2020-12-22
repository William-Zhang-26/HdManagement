from src.server.bo.User import User

class Student(User):
    """
    Realisierung der Studenten
    """
    def __init__(self):
        super().__init__()
        self._course = ""
        self._matriculation_number = 0
        self._participation_id = 0

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
        """Setzen der Matrikelnummer"""
        self._matriculation_number = new_matriculation_number

    def get_participation_id(self):
        """Auslesen der Teilnehmer_ID"""
        return self._participation_id

    def set_participation_id(self, new_participation_id):
        """Setzen der Teilnehmer_ID"""
        self._participation_id = new_participation_id

    @staticmethod
    def from_dict(dict = dict()):
        new_student = Student()
        new_student.set_id(dict["id"])
        new_student.set_name(dict["name"])
        new_student.set_firstname(dict["firstname"])
        new_student.set_course(dict["course"])
        new_student.set_matriculation_number(dict["matriculation_number"])
        new_student.set_mail(dict["mail"])
        new_student.set_google_id(dict["google_id"])
        new_student.set_participation_id(dict["participation_id"])
        new_student.set_create_time(dict["create_time"])
        return new_student
